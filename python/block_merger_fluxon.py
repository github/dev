# Blocks Input

blocks = [
    {
        "blockId": 1,
        "startTime": "2012-05-18 07:00",
        "endTime": "2012-05-18 10:00",
    },
    {
        "blockId": 1,
        "startTime": "2012-05-18 12:00",
        "endTime": "2012-05-18 13:00",
    },
    {
        "blockId": 2,
        "startTime": "2012-05-18 13:00",
        "endTime": "2012-05-18 15:00",
    },
    {
        "blockId": 2,
        "startTime": "2012-05-18 15:00",
        "endTime": "2012-05-18 16:00",
    },
    {
        "blockId": 1,
        "startTime": "2012-05-18 18:00",
        "endTime": "2012-05-18 20:00",
    }
]


# Expected Output
# [
#     {
#         "blockId": 1,
#         "startTime": "2012-05-18 07:00",
#         "endTime": "2012-05-18 13:00",
#     },
#     {
#         "blockId": 2,
#         "startTime": "2012-05-18 13:00",
#         "endTime": "2012-05-18 16:00",
#     },
#     {
#         "blockId": 1,
#         "startTime": "2012-05-18 16:00",
#         "endTime": "2012-05-18 20:00",
#     }
# ]


def mergeBlock(blocks):
  result = []
  tempBlock = {
    blockId = blocks[0].blockId,
    startTime = blocks[0].startTime
    endTime = blocks[0].endTime
  }

  for j,i in enumerate(blocks):
    if j == len(blocks)-1:
      tempBlock = {
        blockId = i.blockId,
        startTime = tempBlock.startTime not None  ? tempBlock.startTime || i.startTime,
        endTime = i.endTime
      }
      result.append(tempBlock)
    if tempBlock.blockId == i.blockId:
      tempBlock['endTime'] = i.endTime
    else:
      result.append(tempBlock)
      tempBlock = {
        blockId = i.blockId,
        startTime = i.startTime,
        endTimme = i.endTime
      }
  return result

print(mergeBlock(blocks))


-----correct solution------

def mergeBlock(blocks):
  result = []
  tempBlock = blocks[0]
# for rest of the block
  for i in blocks:
    if tempBlock["blockId"] == i["blockId"]:
      tempBlock['endTime'] = i["endTime"]
    else:
      result.append(tempBlock)
      tempBlock = i
# append the last block
  result.append(tempBlock)  
  return result