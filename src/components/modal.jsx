export default function Modal({children,size, isOpen, setIsOpen}){
  
// lg ,md ,sm
  return (
    <div className={`${!isOpen && "hidden" }`}>
      <div className={`${size} fixed inset-0 bg-black/30 `} onClick={()=> setIsOpen(prev => !prev)}>
      <div className="bg-white rounded-lg min-h-[350px] max-w-[500px] fixed inset-0 w-[35%] mx-auto my-60 ">
      {children}
      </div>
      </div>
    </div>
  )
}


// <div className={cn(`fixed inset-0 bg-black/30 `, size)}>
