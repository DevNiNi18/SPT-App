export default function Modal({ children, size, isOpen, setIsOpen }) {
  return (
    <div className={`${!isOpen && "hidden"}`}>
      <div
        className={`${size} fixed inset-0 bg-black/30 backdrop-blur-sm`}
        onClick={() => setIsOpen((prev) => !prev)}
      ></div>
      <div className="bg-white w-[35%] max-w-full h-[380px] fixed inset-0 m-auto z-1000 rounded-lg transition-all duration-500 ease-in-out animate-fadeIn text-[#333333]">
        {children}
      </div>
    </div>
  );
}
