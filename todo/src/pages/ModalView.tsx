import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../data';

function ModalView() {
  const navigate = useNavigate();
  const [input,setInput] = useState('');

  const addCategory = () =>{
    let newCategory:{
      id: number ,
      title:string,
      tasks:{
        id:string,
        task:string,
        createdAt: Date,
        date: Date,
        priority: string,
        done: boolean,
    }[]
  } = {
      id: categoriesData.length + 1,
      title: input,
      tasks:[]
    }
   
    let existingCategory = categoriesData.find(category=>  category.title.toLowerCase() === newCategory.title.toLowerCase());
    if (existingCategory || newCategory.title == '') {
      return
    }
    categoriesData.push(newCategory)
    navigate('/')
  }

  return (
    <div className='w-full h-full relative'>
      <div className="rounded-full border-2 flex items-center justify-center border-white absolute w-[30px] h-[32px] left-[10px] top-[12px] bg-white cursor-pointer" onClick={()=>navigate(-1)}> <i className="fa-solid fa-chevron-left"></i> </div>
        <h4 className= 'text-white text-center mt-[5%] border-b-2 border-b-white py-[3%] text-[20px] font-[600]'>New Category</h4>
        <div className='mt-[3%] w-full flex flex-col items-center'>
            <label htmlFor="" className='w-[80%]'>
                <p className='text-white text-[18px]'>Name</p>
                <input type="text" className='w-full p-1' onChange={(e)=> setInput(e.target.value)} />
            </label>
            <button type="submit" className='mt-[3%] bg-white px-6 py-1 rounded-lg font-[500] text-[18px]' onClick={addCategory}>save</button>
        </div>
    </div>
  )
}

export default ModalView