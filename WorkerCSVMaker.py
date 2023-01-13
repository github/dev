people = int(input())

workers = []


for i in range(people):
    name = input(f"Enter name for person {i + 1}: ")
    wType = input(f"Enter worker type for person {i + 1}: ")
    worker = {'name': name, 'vac': False, 'wType': wType, 'points': 0, 'p_avg':0}
    workers.append(worker)

print(workers)