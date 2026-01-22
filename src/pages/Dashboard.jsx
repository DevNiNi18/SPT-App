import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Modal from "../components/modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [projectFormModal, setProjectFormModal] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const projectFormSchema = z.object({
    projectTitle: z.string().min(1, "Field is required"),
    dueDate: z.string().min(1, "Select Date"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectFormSchema),
  });

  // Fetch projects and calculate progress
  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch projects
        const { data: projects, error: projectsError } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (projectsError) throw projectsError;

        // Fetch tasks for each project and calculate progress
        const projectsWithProgress = await Promise.all(
          (projects || []).map(async (project) => {
            const { data: tasks, error: tasksError } = await supabase
              .from("tasks")
              .select("id, completed")
              .eq("project_id", project.id);

            if (tasksError) {
              console.error("Error fetching tasks:", tasksError);
              return { ...project, progress: 0 };
            }

            const totalTasks = tasks?.length || 0;
            const completedTasks =
              tasks?.filter((task) => task.completed).length || 0;
            const progress =
              totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return {
              ...project,
              projectTitle: project.title,
              dueDate: project.due_date,
              progress,
            };
          })
        );

        setProjectData(projectsWithProgress);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const onSubmit = async (data) => {
    if (!user) return;

    setIsSubmitting(true);
    setError("");

    try {
      const { data: newProject, error: insertError } = await supabase
        .from("projects")
        .insert([
          {
            user_id: user.id,
            title: data.projectTitle,
            due_date: data.dueDate,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Add to local state with progress 0
      setProjectData((prev) => [
        {
          ...newProject,
          projectTitle: newProject.title,
          dueDate: newProject.due_date,
          progress: 0,
        },
        ...prev,
      ]);

    setProjectFormModal(false);
    reset();
    } catch (err) {
      console.error("Error creating project:", err);
      setError(err.message || "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Remove from local state
    setProjectData((prev) => prev.filter((project) => project.id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
      setError(err.message || "Failed to delete project");
    }
  };

  const getProgressStatus = (progress) => {
    if (progress === 100) return "Completed";
    if (progress > 0) return "In progress";
    return "Not started";
  };

  return (
    <main className="text-[#333333] w-full min-h-screen px-4 sm:px-6 md:px-10 py-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={projectFormModal} setIsOpen={setProjectFormModal}>
        <div className="flex items-start sm:items-center justify-between p-6 border-b border-gray-200">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#333333]">
              Create a New Project
            </h2>
            <p className="text-sm text-gray-500">
              Fill in the details below to add a new project.
            </p>
          </div>

          <button
            onClick={() => setProjectFormModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon icon="mdi:close" className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Project Title</label>
            <input
              {...register("projectTitle")}
              type="text"
              placeholder="e.g., Design Portfolio Website"
                className="border border-gray-300 text-sm px-4 w-full rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent transition-all"
            />
          </div>
          {errors.projectTitle && (
              <div className="text-red-500 text-sm -mt-2">
              {errors.projectTitle.message}
            </div>
          )}

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Due Date</label>
            <input
              {...register("dueDate")}
              type="date"
                className="border border-gray-300 px-4 w-full rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent transition-all"
            />
          </div>
          {errors.dueDate && (
              <div className="text-red-500 text-sm -mt-2">
              {errors.dueDate.message}
            </div>
          )}
          </div>

          <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setProjectFormModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#4ECDC4] text-white px-6 py-2.5 text-sm font-semibold rounded-xl hover:bg-[#3C9D97] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {isSubmitting ? "Saving..." : "Create Project"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-2">
            Project Dashboard
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your projects and track your progress
          </p>
        </div>
        <button
          className="bg-[#4ECDC4] px-6 py-3 rounded-xl text-sm text-white hover:bg-[#3C9D97] font-semibold cursor-pointer w-full sm:w-auto transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          onClick={() => setProjectFormModal(true)}
        >
          <Icon icon="mdi:plus" className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#4ECDC4] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500">Loading projects...</p>
          </div>
        </div>
      ) : projectData.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl w-full bg-white p-8 sm:p-12">
          <div className="flex flex-col justify-center items-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center">
              <Icon icon="mdi:folder-plus-outline" className="w-10 h-10 text-[#4ECDC4]" />
            </div>
            <h4 className="font-bold text-xl text-gray-800">No projects yet</h4>
            <p className="text-sm text-gray-500 max-w-md">
              Get started by creating your first project and keep track of your work.
            </p>
            <button
              className="bg-[#4ECDC4] px-6 py-3 rounded-xl text-sm text-white hover:bg-[#3C9D97] font-semibold cursor-pointer transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              onClick={() => setProjectFormModal(true)}
            >
              <Icon icon="mdi:plus" className="w-5 h-5" />
              Add Your First Project
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projectData.map((project) => (
            <div
              onClick={() => navigate("/taskPage", { state: project })}
              className="bg-white flex flex-col gap-6 p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer w-full transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              key={project.id}
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start gap-3">
                  <p className="font-bold text-xl break-words text-gray-800 flex-1">
                    {project.projectTitle}
                  </p>
                  <button
                    onClick={(e) => handleDelete(project.id, e)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                  <Icon
                    icon="mdi:trash-can"
                      className="w-5 h-5 text-gray-400 hover:text-red-500"
                  />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Icon icon="mdi:calendar" className="w-4 h-4" />
                  <span>Due: {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-600">{getProgressStatus(project.progress || 0)}</span>
                  <span className="font-bold text-[#4ECDC4]">{project.progress || 0}%</span>
                </div>
                <div className="bg-gray-200 h-3 rounded-full w-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#4ECDC4] to-[#3C9D97] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${project.progress || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
