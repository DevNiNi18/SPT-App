export default function Card({ children, size, className }) {
  return (
    <div>
      <div
        className={`${size} bg-white w-[70%] max-w-[600px]  m-auto rounded-2xl min-h-[280px] border border-red-500 text-[#333333]`}
      >
        {children}
      </div>
    </div>
  );
}
