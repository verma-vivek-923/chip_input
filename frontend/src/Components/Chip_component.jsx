import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import {LoadingCirlce, LoadingDots} from "./Loading"
import toast from "react-hot-toast";



const Chip_component = () => {
  const [chipText, setChipText] = useState("");
  const [allChips, setAllChips] = useState([]);
  const [loadingAdd,setLoadingAdd]=useState("")
  const [loadingDelete,setLoadingDelete]=useState("")

  useEffect(() => {
    const fetchAllChips = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/chips/fetchChip`
      );

      console.log(data?.allChip);
      setAllChips(data?.allChip);
    };
    fetchAllChips();
  }, []);

  const handleAdd = async (e) => {
    setLoadingAdd(true)
    e.preventDefault();
    if (!chipText.trim()) return;
    const newChip = {
      chipText: chipText.trim(),
    };

    try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/chips/add`,
          { chip_text: chipText }
        );
    
        console.log(data);
    
        setAllChips([newChip, ...allChips]);
        setChipText("");
        setLoadingAdd(false)
        
    } catch (error) {
        setLoadingAdd(false)
    }
    // localStorage.setItem("chips",{allChips})
  };

  const handleDelete = async (id) => {
    try {
        setLoadingDelete(true)
        const { data } = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/chips/delete/${id}`
        );
        
        setAllChips(allChips.filter((chip) => chip._id !== id));
        toast.success("CHip Deleted")
        setLoadingDelete(false)
        
    } catch (error) {
        console.log(error)
        setLoadingDelete(false)
        toast.error("Something Went Wrong")
        
    }


  };



  return (
    <div className="min-h-screen w-screen bg-[#101114] flex flex-col justify-center items-center">
      <h2 className="text-[#00ffc4] text-4xl mt-24 md:mt-[-200px] md:text-6xl font-bold">
        Chip Input{" "}
      </h2>

      <div className="bg-[#1c1d20] flex-grow md:flex-grow-0 w-full h-full md:w-[60vw]  mt-6 rounded-xl p-6 overflow-y-auto">
        <form onSubmit={handleAdd} className="relative">
          <input
            type="text"
            placeholder="Write Your chipText"
            value={chipText}
            onChange={(e) => setChipText(e.target.value)}
            className="w-full h-12 rounded-full border-2 border-[#4a4d57] bg-transparent text-white px-5 text-lg outline-none placeholder:text-[#bbb] caret-[#00ffc4]"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-[95%] w-20 rounded-full bg-[#00ffc4] text-black hover:bg-[#00ffc386] transition"
          >
            ADD
          </button>
        </form>

        <ul className="mt-4 flex gap-2 scrollbar overflow-auto items-center">
          {allChips && allChips?.length > 0 ? (
            allChips?.map((chip) => (
              <li
                key={chip.id}
                className="flex items-center hover:bg-[#00ffc4]/5 justify-between border-2 border-[#00ffc4]/30 bg-transparent text-white rounded-full gap-1 px-2 pl-4  py-2 mt-2 cursor-pointer duration-300"
              >
                <div className="flex items-center gap-4 ">
                  {/* <input
                  type="checkbox"
                  id={`chk-${chip.id}`}
                  className="hidden"
                  checked={chip.completed}
                  onChange={() => toggleComplete(chip.id)}
                /> */}
                  {/* <label
                  htmlFor={`chk-${chip.id}`}
                  className={`w-5 h-5 rounded-full border-2 border-[#00ffc4] flex items-center justify-center cursor-pointer transition duration-300 ${
                    chip.completed ? "bg-[#00ffc4]" : ""
                  }`}
                >
                  {chip.completed && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#101114"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  )}
                </label> */}
                  <label
                    className={`text-sm md:text-md capitalize lg:text-lg flex-grow cursor-pointer`}
                  >
                    {chip?.chipText}
                  </label>
                </div>

                <button
                  onClick={() => handleDelete(chip._id)}
                  className="hover:scale-105 flex items-center cursor-pointer  transition text-[#4a4d57] hover:text-red-600 transition"
                >
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="fill-[#4a4d57] hover:fill-red-600 transition"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
                </svg> */}
                  <RxCross2 size={20} />
                  {/* <RxCrossCircled /> */}
                </button>
              </li>
            ))
          ) : (
            <li className="mx-auto">
               
                <LoadingDots/>
                
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Chip_component;
