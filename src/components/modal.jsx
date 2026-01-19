export default function Modal({ children, size, isOpen, setIsOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setIsOpen((prev) => !prev)}
      ></div>

      {/* Modal box */}
      <div
        className={`relative bg-white w-full max-w-lg rounded-lg shadow-lg text-[#333333] ${size}`}
      >
        {children}
      </div>
    </div>
  );
}
