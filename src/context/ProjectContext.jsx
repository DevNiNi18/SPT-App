// import { createContext, useContext, useState } from "react";

// const ProjectContext = createContext();

// export const ProjectProvider = ({ children }) => {
//   const [projects, setProjects] = useState([]);

//   const addProject = (project) => {
//     setProjects((prev) => [...prev, project]);
//   };

//   const updateProject = (updatedProject) => {
//     setProjects((prev) =>
//       prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
//     );
//   };

//   const deleteProject = (id) => {
//     setProjects((prev) => prev.filter((p) => p.id !== id));
//   };

//   return (
//     <ProjectContext.Provider
//       value={{ projects, addProject, updateProject, deleteProject }}
//     >
//       {children}
//     </ProjectContext.Provider>
//   );
// };

// export const useProjects = () => useContext(ProjectContext);
