import React from "react";
import { Icon } from "@iconify/react";

const ProjectCard = ({
  projectTitle,
  dueDate,
  status = "Not Started",
  progress = 0,
  onDelete,
}) => {
  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get color based on status
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "text-[#10B981]";
      case "In Progress":
        return "text-[#3B82F6]";
      case "Not Started":
        return "text-[#6B7280]";
      default:
        return "text-[#6B7280]";
    }
  };

  // Get progress bar color
  const getProgressBarColor = () => {
    if (progress === 100) return "bg-[#4ECDC4]";
    if (progress > 0) return "bg-[#3B82F6]";
    return "bg-gray-200";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-[#333333]">{projectTitle}</h3>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete project"
          >
            <Icon icon="mdi:delete-outline" className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Due Date */}
      <p className="text-sm text-[#7a7777] mb-4">Due: {formatDate(dueDate)}</p>

      {/* Status */}
      <div className="mb-2">
        <p className={`text-sm font-medium ${getStatusColor()}`}>{status}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getProgressBarColor()} transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="text-right">
        <span className={`text-sm font-semibold ${getStatusColor()}`}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
