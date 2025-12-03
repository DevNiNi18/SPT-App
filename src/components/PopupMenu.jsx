import { Icon } from "@iconify/react";

const PopupMenu = ({ setProjectFormModal }) => {
  return (
    <>
      <section className="bg-white w-[35%] max-w-full h-[350px] fixed inset-0 m-auto z-1000 rounded-lg transition-all duration-500 ease-in-out animate-fadeIn text-[#333333]">
        <div className="flex items-center justify-between m-5">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Create a New Project</h2>
            <p className="text-[15px]">
              Fill in the details below to add a new project.
            </p>
          </div>

          <div>
            <Icon
              icon="mdi:close"
              className="w-5 h-5"
              onClick={() => {
                setProjectFormModal((prev) => !prev);
              }}
            />
          </div>
        </div>

        <form>
          <div className="flex flex-col m-5 gap-1">
            <label className="font-semibold">Project Title</label>
            <input
              type="text"
              placeholder="e.g., Design Portfolio Website"
              className="border text-[14px] border-[gainsboro] px-2 w-[90%] rounded-lg py-3 focus:outline-[#4ECDC4]"
            />
          </div>

          <div className="flex flex-col m-5 gap-1">
            <label className="font-semibold">Due Date</label>
            <input
              type="date"
              className="border border-[gainsboro] px-2 w-[90%] rounded-lg py-3 focus:outline-[#4ECDC4]"
            />
          </div>

          <div className="flex justify-center items-center gap-3 ml-40">
            <button className="border border-[gainsboro] py-1.5 px-3 text-[14px] font-semibold rounded-md hover:bg-[#3C9D97] hover:text-white">
              Cancel
            </button>
            <button className="bg-[#4ECDC4] text-white py-1.5 px-3 text-[14px] font-semibold rounded-md hover:bg-[#3C9D97]">
              Save Project
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default PopupMenu;
