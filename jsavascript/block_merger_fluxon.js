
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
        "blockId": 2,
        "startTime": "2012-05-18 18:00",
        "endTime": "2012-05-18 20:00",
    }
]

block = blocks[0]
res = []

blocks.map((item) => {
    if (item.blockId == block.blockId){
        block.endTime = item.endTime
    }
    else{
        res.push(block)
        block = item
    }
})

res.push(block)

console.log(res)