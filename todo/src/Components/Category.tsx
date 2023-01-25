import React from 'react';
import { useNavigate } from 'react-router-dom';

type categoryType = {
  title: string,
  id: number ,
}
function Category({ title, id }: categoryType) {
  const navigate = useNavigate()
  return (
    <div className='w-[90%] rounded-xl bg-white  h-[70px] mx-auto overflow-hidden flex flex-row mt-[5px]'>
      <div className='w-[3%] h-full bg-red-500'></div>
      <div className='flex justify-between px-[5%] items-center w-[97%] text-[20px]'>
        <p className='text-[#666] font-[500]'>{title}</p>
        <i className="fa-solid fa-arrow-right-long cursor-pointer"  onClick={() => navigate("/categories/" + id)}></i>
      </div>
    </div>
  )
}
export default Category;