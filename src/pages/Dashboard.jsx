import { Icon } from "@iconify/react";
import { useState } from "react";
import Modal from "../components/modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projectFormModal, setProjectFormModal] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const navigate = useNavigate();

  const projectFormSchema = z.object({
    projectTitle: z.string().nonempty("Field is required"),
    dueDate: z.string().nonempty("Select Date"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectFormSchema),
  });

  const onSubmit = (data) => {
    const newProject = {
      id: Date.now().toString(),
      projectTitle: data.projectTitle,
      dueDate: data.dueDate,
    };
    setProjectData((prev) => [...prev, newProject]);
    setProjectFormModal(false);
    reset();
  };

  const handleDelete = (id) => {
    setProjectData((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <main className="text-[#333333] w-full min-h-screen px-4 sm:px-6 md:px-10 py-6">
      {/* Modal */}
      <Modal isOpen={projectFormModal} setIsOpen={setProjectFormModal}>
        <div className="flex items-start sm:items-center justify-between m-4 sm:m-5 gap-3">
          <div className="flex flex-col">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Create a New Project
            </h2>
            <p className="text-sm sm:text-[15px]">
              Fill in the details below to add a new project.
            </p>
          </div>

          <Icon
            icon="mdi:close"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setProjectFormModal(false)}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-2 sm:px-4">
          <div className="flex flex-col m-4 sm:m-5 gap-1">
            <label className="font-semibold">Project Title</label>
            <input
              {...register("projectTitle")}
              type="text"
              placeholder="e.g., Design Portfolio Website"
              className="border text-sm border-[gainsboro] px-3 w-full rounded-lg py-3 focus:outline-[#4ECDC4]"
            />
          </div>
          {errors.projectTitle && (
            <div className="text-red-500 text-sm mx-5 -mt-3">
              {errors.projectTitle.message}
            </div>
          )}

          <div className="flex flex-col m-4 sm:m-5 gap-1">
            <label className="font-semibold">Due Date</label>
            <input
              {...register("dueDate")}
              type="date"
              className="border border-[gainsboro] px-3 w-full rounded-lg py-3 focus:outline-[#4ECDC4]"
            />
          </div>
          {errors.dueDate && (
            <div className="text-red-500 text-sm mx-5 -mt-3">
              {errors.dueDate.message}
            </div>
          )}

          <div className="flex justify-end items-center gap-3 px-4 sm:px-5 pb-4">
            <button
              type="button"
              className="border border-[gainsboro] py-2 px-4 text-sm font-semibold rounded-md hover:bg-red-400 hover:text-white"
              onClick={() => setProjectFormModal(false)}
            >
              Cancel
            </button>
            <button className="bg-[#4ECDC4] text-white py-2 px-4 text-sm font-semibold rounded-md hover:bg-[#3C9D97]">
              Save Project
            </button>
          </div>
        </form>
      </Modal>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold">Project Dashboard</h2>
        <button
          className="bg-[#4ECDC4] px-4 py-2 rounded-xl text-sm text-white hover:bg-[#3C9D97] font-semibold cursor-pointer w-full sm:w-auto"
          onClick={() => setProjectFormModal(true)}
        >
          + Add Project
        </button>
      </div>

      {/* Content */}
      {projectData.length === 0 ? (
        <div className="border border-dashed border-[#c1c1c1] mt-10 rounded-lg w-full bg-white p-6 sm:p-10">
          <div className="flex flex-col justify-center items-center gap-3 text-center min-h-[320px]">
            <Icon icon="mdi:archive" className="w-12 h-12 text-[#4ECDC4]" />
            <h4 className="font-bold text-lg">No project yet?</h4>
            <p className="text-sm sm:text-[15px] text-[#7a7777] max-w-md">
              Click "Add Project" to get started and keep track of your work.
            </p>
            <button
              className="bg-[#4ECDC4] px-4 py-2 rounded-xl text-sm text-white hover:bg-[#3C9D97] font-semibold cursor-pointer"
              onClick={() => setProjectFormModal(true)}
            >
              + Add Your First Project
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
          {projectData.map((project) => (
            <div
              onClick={() => navigate("/taskPage", { state: project })}
              className="bg-white flex flex-col gap-6 p-6 sm:p-8 rounded-2xl shadow-md cursor-pointer w-full"
              key={project.id}
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start gap-3">
                  <p className="font-bold text-lg sm:text-xl md:text-2xl break-words">
                    {project.projectTitle}
                  </p>
                  <Icon
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(project.id);
                    }}
                    icon="mdi:trash-can"
                    className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer text-[#ababab]"
                  />
                </div>
                <p className="text-sm sm:text-base">Due: {project.dueDate}</p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm sm:text-base">
                  <h3>Not started</h3>
                  <p>0%</p>
                </div>
                <div className="bg-gray-200 h-3 rounded-2xl w-full"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
