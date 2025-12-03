import { Icon } from "@iconify/react";
import { useState } from "react";
import PopupMenu from "../components/PopupMenu";
import ModalOverlay from "../components/ModalOverlay";

const Dashboard = () => {
  // State controlling the project form modal
  const [projectFormModal, setProjectFormModal] = useState(false);

  return (
    <main className="bg-[#F7F7F7] text-[#333333] w-full h-screen relative">
      {projectFormModal && (
        <PopupMenu
          projectFormModal={projectFormModal}
          setProjectFormModal={setProjectFormModal}
        />
      )}
      {projectFormModal && (
        <ModalOverlay
          projectFormModal={projectFormModal}
          setProjectFormModal={setProjectFormModal}
        />
      )}
      <div className="ml-20 flex gap-100 mt-5">
        <h2 className="text-3xl font-bold">Project Dashboard</h2>
        <button
          className="bg-[#4ECDC4] px-4 py-2 rounded-xl text-[13px] text-white hover:bg-[#3C9D97] duration-300 ease-in-out font-semibold cursor-pointer"
          onClick={() => {
            setProjectFormModal((prev) => !prev);
          }}
        >
          + Add Project
        </button>
      </div>

      <div className="border border-dashed border-[#c1c1c1] mt-10 rounded-lg ml-20 w-[70%] h-[70%] bg-white">
        <div className="flex flex-col justify-center items-center gap-2 mt-30">
          <Icon icon="mdi:archive" className="w-15 h-15 text-[#4ECDC4]" />
          <h4 className="font-bold">No project yet</h4>
          <p className="text-[15px] text-[#7a7777]">
            Click "Add Project" to get started and keep track of your work.
          </p>
          <button
            className="bg-[#4ECDC4] px-4 py-2 rounded-xl text-[13px] text-white hover:bg-[#3C9D97] duration-300 ease-in-out font-semibold cursor-pointer"
            onClick={() => {
              setProjectFormModal((prev) => !prev);
            }}
          >
            + Add Your First Project
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
