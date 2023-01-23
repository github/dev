import React from 'react';
import { useNavigate } from 'react-router-dom';

type taskType = {
  id: string,
  task:string,
  priority: string,
  done: boolean,
}

function Todo({task}:taskType) {
  const navigate = useNavigate()
  return (
    <div className='w-[90%] rounded-xl bg-white  h-[50px] mx-auto overflow-hidden flex flex-row mt-[5px] cursor-pointer' >
      <div className='w-[3%] h-full bg-red-500'></div>
      <div className='flex justify-between px-[5%] items-center w-[97%] text-[18px]'>
        <p className='text-[#666] text-[16px] font-[500] w-[80%]' onClick={()=>navigate('/task/:id')}>{task}</p>
        <input type="checkbox" name="status" id="" className='w-[50px]'/>
      </div>

    </div>
  )
}

export default Todo;