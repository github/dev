import React,{useState,useEffect} from 'react';

export function App(props) {
  const [c,setC] = useState(0)
  const [a,setA] = useState(0)
  useEffect(()=>{
    console.log('inside use effect of C')
  },[c])

  useEffect(()=>{
    console.log('inside use effect of A')
  },[a])

  console.log('outer')
  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen! {c}</h2>
      <button onClick={() => setC(c+1)}>Increment C </button>
      <button onClick={() => setA(a+1)}>Increment A</button>
    </div>
  );
}

// Log to console
console.log('Hello console')