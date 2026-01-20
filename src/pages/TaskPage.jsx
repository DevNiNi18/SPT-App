import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/modal";
import { useState } from "react";
import { Icon } from "@iconify/react";

const TaskPage = () => {
  // state contolling the form
  const [taskFormModal, setTaskFormModal] = useState(false)
  const { state } = useLocation();
  const navigate = useNavigate();

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
          className="w-7 h-7 cursor-pointer" onClick={() => navigate("/dashboard")}
        />

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl sm:text-5xl font-bold">
            {projectTitle}
          </h2>
          <p className="text-md text-gray-500">
            Due: {dueDate}
          </p>
        </div>
      </div>


        {/* Progress bar (same logic, bigger UI) */}
        <div className="max-w-xl">
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

      {/* Task form will go here */}
      <section className="mb-6">
        <Modal isOpen={taskFormModal} setIsOpen={setTaskFormModal}>
          
        </Modal>
      </section>

      {/* Task list will go here */}
      <section>
        {/* placeholder */}
      </section>

    </main>
  );
};

export default TaskPage;
