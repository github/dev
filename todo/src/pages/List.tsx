import React from 'react';
import Todo from '../Components/Todo';
import { categoriesData } from '../data';
import { useNavigate, useParams } from 'react-router-dom';

function List() {
  const navigate = useNavigate()
  const {id} = useParams();
  const tasks = categoriesData.find(category=> category.id.toString() === id);

  return (
    <div className='w-full h-full flex flex-col relative items-center'>
      <div className='w-full border-b-2'>
        <h2 className='mt-[5%] text-[20px] font-bold text-center text-white'>Tasks</h2>
        <div className='flex w-full justify-between'>
          <h4 className='text-start pl-[10%] font-[500] text-[#fff] cursor-pointer' onClick={()=>navigate(-1)}>back</h4>
          <h4 className='text-end pr-[10%] font-[500] text-[#fff]'>done</h4>
        </div>
      </div>
        <div className='mt-[2%] flex flex-col w-full'>
            {
              tasks?.tasks.map(task=>{
                return  <Todo key={task.id} {...task}/>
              })
            }   
        </div>
        <button className='w-[80px] h-[80px] rounded-full flex items-center justify-center bg-yellow-600 fixed bottom-[50px] text-[30px]' onClick={()=>navigate('/newTask')}><i className="fa-solid fa-plus" ></i></button>
    </div>
  )
}

export default List;