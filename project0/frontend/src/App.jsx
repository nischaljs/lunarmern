

//  https://jsonplaceholder.typicode.com/todos
// http://localhost:3000/api/todos

import { useEffect, useState } from "react";

const App = () => {

  const [completeData,setCompleteData] = useState([]);
  
  const getProducts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    setCompleteData(data);
    console.log(data);
  }

  useEffect(() => {
    getProducts();
  }, [])


  return (
    <div>
      <h1>Todos</h1>

      {
        completeData.map((singleTodo)=> {
          return (
            <p>{singleTodo.title}</p>
          )
        })
      }
    </div>
  )
}


export default App;