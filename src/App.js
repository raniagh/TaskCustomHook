import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  //Using custom hook
  const [tasks, setTasks] = useState([]);

  //call to the custom hook
  const {
    isLoading,
    error,
    //Rename sendRequest propertie to fetchTasks
    sendRequest: fetchTasks,
  } = useHttp();

  useEffect(() => {
    //the specific treatment for APP.js == applyData in useHttp
    //taskData is the data argument in applyData the result of request's response
    const transformedTask = (tasksData) => {
      const loadedTasks = [];
      for (const taskKey in tasksData) {
        loadedTasks.push({ id: taskKey, text: tasksData[taskKey].text });
      }
      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: "https://react-http-79508-default-rtdb.firebaseio.com/tasks.json",
      },
      transformedTask
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  //Without custom hook
  /* const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-6b4a6.firebaseio.com/tasks.json"
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
 */

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
