import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { LoadingCirlce, LoadingDots } from "./Loading";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Chip_component = () => {
  const [chipText, setChipText] = useState("");
  const [allChips, setAllChips] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState("");
  const [loadingDeleteId, setloadingDeleteIdId] = useState(null);

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
    setLoadingAdd(true);
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
      setLoadingAdd(false);
    } catch (error) {
      setLoadingAdd(false);
    }
    // localStorage.setItem("chips",{allChips})
  };

  const handleDelete = async (id) => {
    try {
      setloadingDeleteIdId(id);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/chips/delete/${id}`
      );

      setAllChips(allChips.filter((chip) => chip._id !== id));
      toast.success("CHip Deleted", {
        style: {
          background: "#333",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#333",
        },
      });
      setloadingDeleteIdId(null);
    } catch (error) {
      console.log(error);
      setloadingDeleteIdId(null);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#101114] flex flex-col justify-center items-center">
      <motion.h2
        initial={{ y: "-100%" }}
        animate={{ y: "0" }}
        transition={{ duration: 0.4 }}
        className="text-[#00ffc4] text-4xl mt-24 md:mt-[-200px] md:text-6xl font-bold"
      >
        Chip Input{" "}
      </motion.h2>

      <div className="bg-[#1c1d20] flex-grow md:flex-grow-0 w-full h-full md:w-[60vw]  mt-2 rounded-xl p-6 overflow-y-auto">
        <motion.form
          initial={{ y: 20, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -20, opacity: 0, rotateX: 90 }}
          transition={{delay:0.4, duration: 0.5, ease: "easeInOut" }}
          onSubmit={handleAdd}
          className="relative"
        >
          <input
            type="text"
            placeholder="Write Your chipText"
            value={chipText}
            onChange={(e) => setChipText(e.target.value)}
            className="w-full h-12 rounded-full border-2 border-[#4a4d57] bg-transparent text-white px-5 text-lg outline-none placeholder:text-[#bbb] caret-[#00ffc4]"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-[95%] w-20 font-semibold rounded-full bg-gradient-to-r from-[#00ffc4] via-[#00aaff] to-[#00ffc4] 
             bg-[length:200%_200%] animate-gradientMove text-black hover:bg-[#00ffc386] transition"
          >
            {loadingAdd ? <LoadingCirlce /> : "ADD"}
          </button>
        </motion.form>

        <motion.ul
        initial={{x:"120%"}}
        animate={{x:0}}
        transition={{delay:0.9,duration:0.9}}
        className="mt-4 flex gap-2 scrollbar overflow-auto items-center">
          {allChips && allChips?.length > 0 ? (
            allChips?.map((chip) => (
              <li
                key={chip.id}
                className="flex items-center hover:bg-[#00ffc4]/5 justify-between border-2 border-[#00ffc4]/30 bg-transparent text-white rounded-full gap-1 px-2 pl-4  py-2 mt-2 cursor-pointer  "
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
                    className={`text-sm md:text-md capitalize lg:text-lg  cursor-pointer`}
                  >
                    {chip?.chipText}
                  </label>
                </div>

                <button
                  onClick={() => handleDelete(chip._id)}
                  className="hover:scale-105 flex items-center cursor-pointer  transition text-[#4a4d57] hover:text-red-600 transition"
                >
                  {loadingDeleteId === chip._id ? (
                    <LoadingCirlce />
                  ) : (
                    <RxCross2 size={20} />
                  )}
                  {/* <RxCrossCircled /> */}
                </button>
              </li>
            ))
          ) : (
            <li className="mx-auto">
              <LoadingDots />
            </li>
          )}
        </motion.ul>
      </div>
    </div>
  );
};

export default Chip_component;
