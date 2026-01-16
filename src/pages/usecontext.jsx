const usecontext = () => {
  return (
    <div>usecontext</div>
  )
}
{projectData.map((project, index) => (
          <div key={index}>
            <p>{project.projectTitle}</p>
            <p>{project.dueDate}</p>
          </div>
        ))}
export default usecontext