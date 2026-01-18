import { useLocation } from "react-router-dom"

const TaskPage = () => {
  const {state} = useLocation();
  console.log(state);
  
  return (
    <div>
      <h1 className="border">{state.projecTitle}</h1>
    </div>
  )
}

export default TaskPage