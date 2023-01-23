import React from 'react';
import Notification from '../Components/Notification';
import { useNavigate } from 'react-router-dom';

function AddTask() {
    const navigate = useNavigate();
  return (
    <div className='w-full h-full '>
        <div className="rounded-full border-2 flex items-center justify-center border-white absolute w-[30px] h-[32px] left-[10px] top-[12px] bg-white cursor-pointer" onClick={()=>navigate(-1)}> <i className="fa-solid fa-chevron-left"></i> </div>
        <h4 className= 'text-white text-center mt-[5%] border-b-2 border-b-white py-[3%]'>Add new task</h4>
        <div className='mt-[3%] w-full flex flex-col items-center'>
            <label htmlFor="" className='w-[80%]'>
                <p className='text-white text-[18px]'>title</p>
                <input type="text" className='w-full' />
            </label>
            <label htmlFor="" className='w-[80%]'>
                <p className='text-white text-[18px]'>priority</p>
                <input type="text" className='w-full' />
            </label>
            <label htmlFor="" className='w-[80%]'>
                <p className='text-white text-[18px]'>date</p>
                <input type="date" className='w-full' />
            </label>
            <label htmlFor="" className='w-[80%]'>
                <p className='text-white text-[18px]'>description</p>
                <textarea name="" id="" cols="20" rows="10" className='w-full p-2'></textarea>
            </label>
            <Notification/>
            <button type="submit" className='mt-[3%] bg-white px-6 py-1 rounded-lg font-[500] text-[18px]'>save</button>
        </div>
    </div>
  )
}

export default AddTask