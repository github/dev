#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import json
import sqlite3
import shutil

def printProgressBar(
    iteration,
    total,
    prefix="Progress:",
    suffix="Complete",
    decimals=1,
    length=100,
    fill="█",
    printEnd="\r",
):
    """
    Call in a loop to create terminal progress bar
    @params:
        iteration   - Required  : current iteration (Int)
        total       - Required  : total iterations (Int)
        prefix      - Optional  : prefix string (Str)
        suffix      - Optional  : suffix string (Str)
        decimals    - Optional  : positive number of decimals in percent complete (Int)
        length      - Optional  : character length of bar (Int)
        fill        - Optional  : bar fill character (Str)
        printEnd    - Optional  : end character (e.g. "\r", "\r\n") (Str)
    """
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + "-" * (length - filledLength)
    print("\r%s |%s| %s%% %s" % (prefix, bar, percent, suffix), end=printEnd)
    # Print New Line on Complete
    if iteration == total:
        print()


def create_contracts_table(DB):
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    try:
        create_table = '''create table contracts(
                                                        id INTEGER PRIMARY KEY NOT NULL,
                                                        address VARCHAR(50) NOT NULL,
                                                        name VARCHAR(50),
                                                        metadata TEXT,
                                                        version INTEGER DEFAULT 1,
                                                        checkPoints text DEFAULT NULL)'''

        sql_create_address_index = "create index address_index on contracts(address)"
        cursor.execute(create_table)
        cursor.execute(sql_create_address_index)
    except:
        clean_table = "DELETE FROM contracts"
        cursor.execute(clean_table)

    cursor.close()
    conn.commit()
    conn.close()


def get_contract_info(contract_path):
    with open(contract_path, 'r') as f:
        try:
            content = json.loads(f.read())
            content_address = content["address"].lower()
            contract_name = content["name"]
            contract_metadate = json.dumps(content["metadata"])
            contract_version = 1
            contract_checkPoints = json.dumps(content.get("checkPoints",[]))
        except:
            raise

    return content_address, contract_name, contract_metadate, contract_version, contract_checkPoints


def merge_abis_to_sqlite(DB, contracts_path):
    

    if not os.path.exists(contracts_path):
        return None

    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    fileslist = os.listdir(contracts_path)

    if len(fileslist):
        sum_of_file = len(fileslist) - 1
        location = 0
        for file in fileslist:
            if file.endswith(".json"):
                try:
                    address, name, metabase, version, check_points = get_contract_info(contract_path=contracts_path+file)
                except Exception as e:
                    print(e)
                    print("{file} is error......".format(file=file))
                    continue

                sql_insert_info = "insert into contracts (address,name, metadata, version, checkPoints) values (?,?,?,?,?)"
                cursor.execute(sql_insert_info, (address, name, metabase, version, check_points))
                location += 1
                printProgressBar(location, sum_of_file, prefix=f"processing: {contracts_path}")

    cursor.close()
    conn.commit()
    conn.close()


if __name__ == "__main__":
    ignored = [".github", ".git", "outputs"]
    targets = [ name for name in os.listdir('.') if os.path.isdir(os.path.join('.', name)) and name not in ignored]
    if not os.path.exists("./outputs/contracts/ethereum"):
        os.makedirs("./outputs/contracts/ethereum")
    DB="./outputs/contracts/ethereum/contracts.db"
    create_contracts_table(DB)
    for each_target in targets:
        path = f"./{each_target}/"
        merge_abis_to_sqlite(DB, contracts_path=path)
    shutil.make_archive('contracts', 'zip', root_dir='./outputs', base_dir='contracts/ethereum')
