import numpy as np

#def distributor(numberList, )

#Workers
workers = [{'name': '김민기', 'vac': False, 'wType': 't', 'points': 0, 'p_avg': 0}, {'name': '오태연', 'vac': False, 'wType': 'i', 'points': 0, 'p_avg': 0}, {'name': '신경민', 'vac': False, 'wType': 't', 'points': 0, 'p_avg': 0}, {'name': '이승수', 'vac': False, 'wType': 't', 'points': 0, 'p_avg': 0}, {'name': '노현', 'vac': False, 'wType': 't', 'points': 0, 'p_avg': 0}, {'name': '박금강', 'vac': False, 'wType': 'g', 'points': 0, 'p_avg': 0}, {'name': '서동현', 'vac': False, 'wType': 't', 'points': 0, 'p_avg': 0}, {'name': '박건', 'vac': False, 'wType': 's', 'points': 0, 'p_avg': 0}, {'name': '장건', 'vac': False, 'wType': 's', 'points': 0, 'p_avg': 0}, {'name': '임상현', 'vac': False, 'wType': 'g', 'points': 0, 'p_avg': 0}, {'name': '박종선', 'vac': False, 'wType': 'g', 'points': 0, 'p_avg': 0}, {'name': '이일희', 'vac': False, 'wType': 'i', 'points': 0, 'p_avg': 0}, {'name': '최혁', 'vac': False, 'wType': 'm', 'points': 0, 'p_avg': 0}, {'name': '심혁', 'vac': False, 'wType': 't', 'points': 0, 'p_avg': 0}, {'name': '채현우', 'vac': False, 'wType': 'g', 'points': 0, 'p_avg': 0}, {'name': '허정현', 'vac': False, 'wType': 't', 'points': 0, 'p_avg': 0}, {'name': '유창우', 'vac': False, 'wType': 't', 'points': 0, 'p_avg': 0}]


# list of numbers
looper = 1
for loops in range(5):
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  # number of people
  people = len(workers)

  # assign numbers to each person
  for i, number in enumerate(numbers):
    min_avg_worker = min(workers, key=lambda x: x['p_avg'])
    min_avg_worker['points'] += number
    min_avg_worker['p_avg'] = min_avg_worker['points'] /len(numbers)*looper 

  looper+=1

  #for x in workers:
  #  print(x['name'],x['points'],x['p_avg'])
  #print(' ')

for p in workers:
  print(p['points'])
print(' ')

for avg in workers:
  print(avg['p_avg'])
print(' ')
    
