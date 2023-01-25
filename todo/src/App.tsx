import React from 'react';
import './App.css';
import Categories from './pages/categories';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import List from './pages/List';
import AddTask from './pages/AddTask';
import ModalView from './pages/ModalView';
function App() {
  return (
    <div className='relative lg:mx-auto my-auto lg:mt bg-slate-400 h-[100vh]  lg:h-[600px] w-[100vw] lg:w-[400px] overflow-y-hidden'>
      <Router>
        <Routes>
          <Route path="/" element={<Categories />}/>
          <Route  path="/categories/:id" element={<List />}/>
          <Route  path="/newTask" element={<AddTask />}/>
          <Route  path="/newCategory" element={<ModalView/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;