export const categoriesData:{
    id:number,
    title:string,
    tasks:{
        id:string,
        task:string,
        createdAt: Date,
        date: Date,
        priority: string,
        done: boolean,
    }[]
}[] = [
    {
        id: 1,
        title: 'coding',
        tasks:[
           {
             id: '1a',
            task: 'learn HTML',
            priority: 'important',
            createdAt: new Date(),
            date: new Date(),
            done: false
           }
        ]
    },
    {
        id: 2,
        title: 'work',
        tasks:[
           {
             id: '2a',
            task: 'create HTML',
            createdAt: new Date(),
            date: new Date(),
            priority: 'important',
            done: false
           }
        ]
    }
]