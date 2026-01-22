import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/modal";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";

const TaskPage = () => {
  // state controlling the form
  const [taskFormModal, setTaskFormModal] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  // for adding tasks
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  // task form validation
  const taskFormSchema = z.object({
    addNewTask: z.string().min(1, "Field is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskFormSchema),
  });

  // Fetch tasks and calculate progress
  useEffect(() => {
    if (!state?.id) return;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const { data: tasks, error: tasksError } = await supabase
          .from("tasks")
          .select("*")
          .eq("project_id", state.id)
          .order("created_at", { ascending: false });

        if (tasksError) throw tasksError;

        setTaskData(tasks || []);

        // Calculate progress
        const totalTasks = tasks?.length || 0;
        const completedTasks =
          tasks?.filter((task) => task.completed).length || 0;
        const calculatedProgress =
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        setProgress(calculatedProgress);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [state?.id]);

  const onSubmit = async (data) => {
    if (!state?.id) return;

    setIsSubmitting(true);
    setError("");

    try {
      const { data: newTask, error: insertError } = await supabase
        .from("tasks")
        .insert([
          {
            project_id: state.id,
            title: data.addNewTask,
      completed: false,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Add to local state
      setTaskData((prev) => [newTask, ...prev]);
      
      // Recalculate progress
      const totalTasks = taskData.length + 1;
      const completedTasks = taskData.filter((t) => t.completed).length;
      setProgress(Math.round((completedTasks / totalTasks) * 100));

    setTaskFormModal(false);
    reset();
    } catch (err) {
      console.error("Error creating task:", err);
      setError(err.message || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Remove from local state
      const updatedTasks = taskData.filter((task) => task.id !== id);
      setTaskData(updatedTasks);

      // Recalculate progress
      const totalTasks = updatedTasks.length;
      const completedTasks = updatedTasks.filter((t) => t.completed).length;
      const calculatedProgress =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      setProgress(calculatedProgress);
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message || "Failed to delete task");
    }
  };

  const handleToggleComplete = async (taskId, currentCompleted) => {
    try {
      const { error: updateError } = await supabase
        .from("tasks")
        .update({ completed: !currentCompleted })
        .eq("id", taskId);

      if (updateError) throw updateError;

      // Update local state
      const updatedTasks = taskData.map((task) =>
        task.id === taskId ? { ...task, completed: !currentCompleted } : task
      );
      setTaskData(updatedTasks);

      // Recalculate progress
      const totalTasks = updatedTasks.length;
      const completedTasks = updatedTasks.filter((t) => t.completed).length;
      const calculatedProgress =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      setProgress(calculatedProgress);
    } catch (err) {
      console.error("Error updating task:", err);
      setError(err.message || "Failed to update task");
    }
  };

  if (!state) {
    return (
      <div className="p-6 text-center">
        <p>No project selected</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 text-[#4ECDC4] hover:underline"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { projectTitle, dueDate } = state;

  const getProgressStatus = (progress) => {
    if (progress === 100) return "Completed";
    if (progress > 0) return "In progress";
    return "Not started";
  };

  return (
    <main className="w-full min-h-screen px-4 sm:px-6 md:px-10 py-6 text-[#333333]">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Project header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icon icon="mdi:arrow-left" className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">{projectTitle}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icon icon="mdi:calendar" className="w-4 h-4" />
            <span>Due: {new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-2xl mb-8 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-gray-700">{getProgressStatus(progress)}</span>
          <span className="font-bold text-[#4ECDC4] text-lg">{progress}%</span>
        </div>

        <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#4ECDC4] to-[#3C9D97] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Task form modal */}
      <Modal isOpen={taskFormModal} setIsOpen={setTaskFormModal}>
        <div className="flex items-start sm:items-center justify-between p-6 border-b border-gray-200">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#333333]">
              Add New Task
            </h2>
            <p className="text-sm text-gray-500">
              Create a new task for this project
            </p>
          </div>

          <button
            onClick={() => setTaskFormModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon icon="mdi:close" className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Task Title</label>
            <input
              {...register("addNewTask")}
              type="text"
              placeholder="e.g., Finish project proposal"
                className="border border-gray-300 px-4 py-3 rounded-xl outline-none w-full focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent transition-all"
            />
            </div>
            {errors.addNewTask && (
              <div className="text-red-500 text-sm -mt-2">
                {errors.addNewTask.message}
              </div>
            )}
          </div>

          <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
              className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setTaskFormModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
              disabled={isSubmitting}
              className="bg-[#4ECDC4] text-white px-6 py-2.5 text-sm font-semibold rounded-xl hover:bg-[#3C9D97] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
              {isSubmitting ? "Adding..." : "Add Task"}
              </button>
            </div>
          </form>
      </Modal>

      {/* Task list */}
      <section className="flex flex-col gap-4">
        <button
          onClick={() => setTaskFormModal(true)}
          className="bg-[#4ECDC4] text-white font-semibold w-full sm:w-[80%] p-4 rounded-xl text-center cursor-pointer hover:bg-[#3C9D97] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Icon icon="mdi:plus" className="w-5 h-5" />
          Create New Task
        </button>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-[#4ECDC4] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          </div>
        ) : taskData.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl w-full sm:w-[80%] bg-white p-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center">
                <Icon icon="mdi:check-circle-outline" className="w-8 h-8 text-[#4ECDC4]" />
              </div>
              <p className="text-gray-600 font-medium">No tasks yet</p>
              <p className="text-sm text-gray-500">Create your first task to get started!</p>
            </div>
        </div>
        ) : (
          <div className="flex flex-col gap-3 w-full sm:w-[80%]">
          {taskData.map((task) => (
            <div
              key={task.id}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all"
              >
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => handleToggleComplete(task.id, task.completed)}
                  className="w-5 h-5 cursor-pointer rounded border-gray-300 text-[#4ECDC4] focus:ring-[#4ECDC4]"
                />
                <p
                  className={`flex-1 text-gray-800 ${
                    task.completed ? "line-through text-gray-400" : "font-medium"
                  }`}
                >
                  {task.title}
                </p>
                <button
                onClick={(e) => {
                e.stopPropagation();
                handleDelete(task.id);
              }}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Icon
                icon="mdi:trash-can"
                    className="w-5 h-5 text-gray-400 hover:text-red-500"
              />
                </button>
            </div>
          ))}
        </div>
        )}
      </section>
    </main>
  );
};

export default TaskPage;
