import React from 'react';
import Category from '../Components/Category';
import { categoriesData } from '../data';
import { useNavigate } from 'react-router-dom';

function categories() {
  const navigate = useNavigate()
  return (
    <>
      <div className='w-full h-full flex flex-col relative items-center overflow-y-scroll'>
        <h2 className='mt-[5%] text-[24px] font-bold text-center'>Categories</h2>
        <div className='mt-[5%] flex flex-col w-full'>
            {
              categoriesData.map(category=>{
                return   <Category key={category.id} {...category} />
              })
            }
        </div>
        <button className='w-[80px] h-[80px] rounded-full flex items-center justify-center bg-yellow-600 fixed bottom-[50px] text-[30px]' onClick={()=>navigate('/newCategory')}><i className="fa-solid fa-plus" ></i></button>
    </div>
    </>
  )
}

export default categories