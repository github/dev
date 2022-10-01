import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig";
import { set, ref, onValue, remove, update } from "firebase/database";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  doc, getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { uid } from "uid";
function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const collectionRef = collection(database, "tasks")
  useEffect(() => {
    const getTodos = async()=>{
      const data = await getDocs(collectionRef)
      setTodos(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
    }
    getTodos()
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await addDoc(collectionRef, {
      title:todo,
      description:"no",
      completed:true,
      created:Timestamp.now()
    }) 
    setTodo("");
  };

  const deleteTodo = async (id) => {
    const taskDocRef = doc(database, "tasks", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  const updateTodo = async (id) => {
    const taskDocRef = doc(database, "tasks", id);
    try {
      await updateDoc(taskDocRef, {
        title: todo,
      });
    } catch (err) {
      alert(err);
    }
    setTodo("");
  };
  return (
    <div className="App">
      <form onSubmit={add}>
        <input
          type="text"
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
      <br />
      {todos.map((todo, i) => {
        return (
          <div key={i}>
            {todo.id} - {todo.title}{" "}
            <button onClick={() => deleteTodo(todo.id)}>X</button>
            {updateId === todo.id && isEdit ? (
              <button onClick={() => updateTodo(todo.id)}>Update</button>
            ) : (
              <button
                onClick={() => {
                  setIsEdit(true);
                  setTodo(todo.title);
                  setUpdateId(todo.id);
                }}
              >
                Edit
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
