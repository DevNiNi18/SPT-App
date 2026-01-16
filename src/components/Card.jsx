import { cn } from '../lib/utils'

export default function Card({ children, size, className }) {
  return (
    <div>
      <div
        className={cn("bg-white w-[70%] max-w-[600px]  m-auto rounded-2xl min-h-[400px] shadow-lg text-[#333333]", className)}
      >
        {children}
      </div>
    </div>
  );
}


