const ModalOverlay = ({ setProjectFormModal }) => {
  return (
    <main className="bg-black/40 w-full h-screen z-998 inset-0 fixed backdrop-blur-sm" onClick={() => {
      setProjectFormModal((prev) => !prev)
    }}></main>
  )
}

export default ModalOverlay