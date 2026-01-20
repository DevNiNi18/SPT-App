import { Icon } from "@iconify/react";
import { useState } from "react";
import Modal from "../components/modal";
import ProjectCard from "../components/ProjectCard"; // Import the ProjectCard
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // State controlling the modal
  const [projectFormModal, setProjectFormModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate()

  // Auth for the project form
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
    // Create new project with unique ID
    const newProject = {
      id: Date.now().toString(),
      projectTitle: data.projectTitle,
      dueDate: data.dueDate,
      status: "Not Started",
      progress: 0,
    };

    // Add to projects array
    setProjects((prev) => [...prev, newProject]);
    setProjectFormModal(false);
    console.log("project data", data.projectTitle);

    reset();
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <main className="bg-[#F7F7F7] text-[#333333] w-full min-h-screen relative">
      {/* Inputs for the modal */}
      <Modal isOpen={projectFormModal} setIsOpen={setProjectFormModal}>
        <div className="flex items-center justify-between m-5">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Create a New Project</h2>
            <p className="text-[15px]">
              Fill in the details below to add a new project.
            </p>
          </div>

          <div>
            <Icon
              icon="mdi:close"
              className="w-5 h-5 hover:scale-140 cursor-pointer"
              onClick={() => {
                setProjectFormModal(false);
              }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col m-5 gap-1">
            <label className="font-semibold">Project Title</label>
            <input
              {...register("projectTitle")}
              type="text"
              placeholder="e.g., Design Portfolio Website"
              className="border text-[14px] border-[gainsboro] px-2 w-[90%] rounded-lg py-3 focus:outline-[#4ECDC4]"
            />
          </div>
          {errors.projectTitle && (
            <div className="text-red-500 text-[13px] ml-6 -mt-5">
              {errors.projectTitle.message}
            </div>
          )}

          <div className="flex flex-col m-5 gap-1">
            <label className="font-semibold">Due Date</label>
            <input
              {...register("dueDate")}
              type="date"
              className="border border-[gainsboro] px-2 w-[90%] rounded-lg py-3 focus:outline-[#4ECDC4]"
            />
          </div>
          {errors.dueDate && (
            <div className="text-red-500 text-[13px] ml-6 -mt-5">
              {errors.dueDate.message}
            </div>
          )}

          <div className="flex justify-center items-center gap-3 ml-40 mb-5">
            <button
              type="button"
              className="border border-[gainsboro] py-1.5 px-3 text-[14px] font-semibold rounded-md hover:bg-red-400 hover:text-white transition-colors"
              onClick={() => {
                setProjectFormModal(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4ECDC4] text-white py-1.5 px-3 text-[14px] font-semibold rounded-md hover:bg-[#3C9D97] transition-colors"
            >
              Save Project
            </button>
          </div>
        </form>
      </Modal>

      {/* Header */}
      <div className="ml-20 flex justify-between items-center mr-20 mt-5">
        <h2 className="text-3xl font-bold">Project Dashboard</h2>
        <button
          className="bg-[#4ECDC4] px-4 py-2 rounded-xl text-[13px] text-white hover:bg-[#3C9D97] duration-300 ease-in-out font-semibold cursor-pointer"
          onClick={() => {
            setProjectFormModal(true);
          }}
        >
          + Add Project
        </button>
      </div>

      {/* Projects Display */}
      {projects.length > 0 ? (
        <div className="ml-20 mr-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectTitle={project.projectTitle}
              dueDate={project.dueDate}
              status={project.status}
              progress={project.progress}
              onDelete={() => handleDeleteProject(project.id)}
              onClick={() => navigate("/taskPage", { state: project })}
            />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[#c1c1c1] mt-10 rounded-lg ml-20 mr-20 h-[500px] bg-white">
          <div className="flex flex-col justify-center items-center gap-2 h-full">
            <Icon icon="mdi:archive" className="w-15 h-15 text-[#4ECDC4]" />
            <h4 className="font-bold">No project yet</h4>
            <p className="text-[15px] text-[#7a7777]">
              Click "Add Project" to get started and keep track of your work.
            </p>
            <button
              className="bg-[#4ECDC4] px-4 py-2 rounded-xl text-[13px] text-white hover:bg-[#3C9D97] duration-300 ease-in-out font-semibold cursor-pointer"
              onClick={() => {
                setProjectFormModal(true);
              }}
            >
              + Add Your First Project
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
