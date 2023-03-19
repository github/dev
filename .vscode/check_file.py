#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import sys

class MissingFieldError(Exception):
    def __init__(self, message):
        self.message = message

class MetadataFieldError(Exception):
    def __init__(self, message):
        self.message = message


def check_file(path):
    with open(path) as f:
        contract_json = json.load(f)
        if(contract_json.get('name') is None or contract_json.get('chainId') is None or contract_json.get('address') is None or contract_json.get('metadata') is None or contract_json.get('version') is None):
            raise MissingFieldError('Require Field missing, name,chainId,address,metadata,version is required, please check the read me file')
        
        try:
            contract_json.get('metadata').get('output').get('abi')
        except AttributeError as e:
            raise MetadataFieldError('Metadata field verfication error: please check the readme file')

if __name__ == "__main__":
    file_path = sys.argv[1]
    filetype = file_path.split('.')[-1]
    if filetype == 'json':
        print(file_path)
        check_file(file_path)