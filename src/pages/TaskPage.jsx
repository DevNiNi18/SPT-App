import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/modal";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TaskPage = () => {
  // state controlling the form
  const [taskFormModal, setTaskFormModal] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  // for adding tasks
  const [taskData, setTaskData] = useState([]);

  // task form validation
  const taskFormSchema = z.object({
    addNewTask: z.string().nonempty("Field is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskFormSchema),
  });

  const onSubmit = (data) => {
    const newTask = {
      id: Date.now().toString(),
      addNewTask: data.addNewTask,
      completed: false,
    };

    setTaskData((prev) => [...prev, newTask]);
    setTaskFormModal(false);
    reset();
  };

  const handleDelete = (id) => {
    setTaskData((prev) => prev.filter((task) => task.id !== id));
  };

  if (!state) {
    return (
      <div className="p-6 text-center">
        <p>No project selected</p>
      </div>
    );
  }

  const { projectTitle, dueDate, progress } = state;

  return (
    <main className="w-full min-h-screen px-4 sm:px-6 md:px-10 py-6 text-[#333333]">
      {/* Project header */}
      <div className="flex items-center gap-5 mb-8">
        <Icon
          icon="mdi:arrow-left"
          className="w-7 h-7 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl sm:text-5xl font-bold">{projectTitle}</h2>
          <p className="text-md text-gray-500">Due: {dueDate}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-xl mb-8">
        <div className="flex justify-between text-sm sm:text-base mb-1">
          <span>
            {progress === 100
              ? "Completed"
              : progress > 0
              ? "In progress"
              : "Not started"}
          </span>
          <span>{progress}%</span>
        </div>

        <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-gray-200 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Task form modal */}
      <Modal isOpen={taskFormModal} setIsOpen={setTaskFormModal}>
        <div className="p-8">
          <div className="flex justify-between p-2">
            <h1 className="text-2xl font-bold">Add New Task</h1>
            <Icon
              icon="mdi:close"
              className="w-7 h-7 cursor-pointer"
              onClick={() => setTaskFormModal(false)}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-2 sm:px-4">
            <input
              {...register("addNewTask")}
              type="text"
              placeholder="e.g., Finish project proposal"
              className="border border-[gainsboro] p-3 rounded-lg outline-none w-full mt-2"
            />
            {errors.addNewTask && (
              <div className="text-red-500 text-sm mt-2">
                {errors.addNewTask.message}
              </div>
            )}

            <div className="flex gap-3 mt-10 w-full">
              <button
                type="button"
                className="border border-[gainsboro] py-2 px-4 text-sm font-semibold rounded-md hover:bg-red-400 hover:text-white w-1/2"
                onClick={() => setTaskFormModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#4ECDC4] text-white py-2 px-4 text-sm font-semibold rounded-md hover:bg-[#3C9D97] w-1/2"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Task list */}
      <section className="flex flex-col gap-4">
        <div
          className="bg-[#4ECDC4] text-white font-bold w-[full] sm:w-[80%] p-4 rounded-3xl text-center cursor-pointer"
          onClick={() => setTaskFormModal(true)}
        >
          + Create New Task
        </div>

        <div className="flex flex-col gap-3">
          {taskData.map((task) => (
            <div
              key={task.id}
              className="flex items-center w-[80%] mt-5 gap-3 bg-white p-4 rounded-lg shadow-sm"
              >
              <input type="checkbox" className="w-5 h-5 " />
              <p>{task.addNewTask}</p>
              <Icon
                onClick={(e) => {
                e.stopPropagation();
                handleDelete(task.id);
              }}
                icon="mdi:trash-can"
                className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer text-[#ababab]"
              />
            </div>
          ))}
          
        </div>
      </section>
    </main>
  );
};

export default TaskPage;
