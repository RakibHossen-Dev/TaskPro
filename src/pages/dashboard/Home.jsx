// import { CiCirclePlus } from "react-icons/ci";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { useContext, useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// import { FaClock, FaDotCircle, FaRegClock } from "react-icons/fa";
// import { FaEllipsis } from "react-icons/fa6";
// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const axiosPublic = useAxiosPublic();
//   const { user } = useContext(AuthContext);
//   const { data: tasks = [], refetch } = useQuery({
//     queryKey: ["articles", user.email],
//     queryFn: async () => {
//       const res = await axiosPublic.get(`/tasks/${user.email}`);
//       return res.data;
//     },
//   });
//   const onSubmit = async (data) => {
//     console.log(data);
//     const date = new Date();
//     const taskDate = date.toLocaleDateString("en-GB").split("/").join("-");

//     const taskInfo = {
//       title: data.title,
//       category: data.category,
//       taskDate: taskDate,
//       description: data.description,
//       email: user?.email,
//     };
//     console.log(taskInfo);
//     axiosPublic.post("/tasks", taskInfo).then((res) => {
//       console.log(res);
//       refetch();
//     });

//     document.getElementById("my_modal_1").close();
//   };

//   console.log(tasks);

//   return (
//     <div>
//       {/* Add Task Button */}

//       <div
//         onClick={() => document.getElementById("my_modal_1").showModal()}
//         className="max-w-[350px] cursor-pointer h-[180px] rounded-md bg-white p-4 flex flex-col justify-center items-center  border border-gray-200"
//       >
//         <CiCirclePlus className="text-2xl mb-3" />
//         Add Task
//       </div>

//       <div className="grid grid-cols-3  items-center gap-5 mt-5">
//         {tasks.map((task) => (
//           <>
//             <div className="p-3 rounded-md border border-gray-200 bg-white">
//               <div className="flex justify-end">
//                 <button className="text-gray-600">
//                   <FaEllipsis className="cursor-pointer"></FaEllipsis>
//                 </button>
//               </div>

//               <h3 className="text-black font-bold mb-2">{task?.title} </h3>
//               <div className="flex items-center gap-2">
//                 <FaRegClock className="text-gray-600"></FaRegClock>
//                 <h3 className="text-black">{task?.taskDate} </h3>
//               </div>
//               <p className="text-gray-600">{task?.description}</p>
//             </div>
//           </>
//         ))}
//       </div>

//       {/* Modal */}
//       <dialog id="my_modal_1" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Add New Task</h3>

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* Task Title */}
//             <div className="py-2">
//               <label className="block text-sm font-medium">Task Title:</label>
//               <input
//                 type="text"
//                 placeholder="Enter task title"
//                 className="input input-bordered w-full mt-1"
//                 {...register("title", { required: "Task title is required" })}
//               />
//               {errors.title && (
//                 <p className="text-red-500 text-sm">{errors.title.message}</p>
//               )}
//             </div>

//             {/* Task Category */}
//             <div className="py-2">
//               <label className="block text-sm font-medium">Category:</label>
//               <select
//                 className="select select-bordered w-full mt-1"
//                 {...register("category", { required: "Category is required" })}
//               >
//                 <option value="Work">Work</option>
//                 <option value="Personal">Personal</option>
//                 <option value="Urgent">Urgent</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.category && (
//                 <p className="text-red-500 text-sm">
//                   {errors.category.message}
//                 </p>
//               )}
//             </div>

//             {/* Task Description */}
//             <div className="py-2">
//               <label className="block text-sm font-medium">Description:</label>
//               <textarea
//                 placeholder="Enter task description"
//                 className="textarea textarea-bordered w-full mt-1"
//                 rows="3"
//                 {...register("description", {
//                   required: "Description is required",
//                 })}
//               ></textarea>
//               {errors.description && (
//                 <p className="text-red-500 text-sm">
//                   {errors.description.message}
//                 </p>
//               )}
//             </div>

//             {/* Modal Action Buttons */}
//             <div className="modal-action">
//               <button
//                 type="button"
//                 className="btn"
//                 onClick={() => document.getElementById("my_modal_1").close()}
//               >
//                 Close
//               </button>
//               <button type="submit" className="btn ">
//                 Save Task
//               </button>
//             </div>
//           </form>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Home;

import { CiCirclePlus } from "react-icons/ci";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaRegClock, FaEdit, FaTrash } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";

const Home = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (id) => setOpenMenuId(openMenuId === id ? null : id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["articles", user.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${user.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const date = new Date();
    const taskDate = date.toLocaleDateString("en-GB").split("/").join("-");
    const taskInfo = {
      title: data.title,
      category: data.category,
      taskDate: taskDate,
      description: data.description,
      email: user?.email,
    };

    axiosPublic.post("/tasks", taskInfo).then((res) => {
      refetch();
    });

    document.getElementById("my_modal_1").close();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await axiosPublic.delete(`/tasks/${id}`);
      refetch();
    }
  };

  return (
    <div>
      {/* Add Task Button */}
      <div
        onClick={() => document.getElementById("my_modal_1").showModal()}
        className="max-w-[350px] cursor-pointer h-[180px] rounded-md bg-white p-4 flex flex-col justify-center items-center border border-gray-200"
      >
        <CiCirclePlus className="text-2xl mb-3" />
        Add Task
      </div>

      {/* Task List */}
      <div className="grid grid-cols-3 items-center gap-5 mt-5">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="p-3 rounded-md border border-gray-200 bg-white relative"
          >
            {/* 3 Dot Button */}
            <div className="flex justify-end relative">
              <button
                className="text-gray-600"
                onClick={() => toggleMenu(task._id)}
              >
                <FaEllipsis className="cursor-pointer" />
              </button>

              {/* Dropdown Menu */}
              {openMenuId === task._id && (
                <div className="absolute top-6 right-0 w-28 bg-white border border-gray-200 shadow-md rounded-md z-10">
                  <button className="flex justify-center border-b border-b-gray-200 items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100">
                    <FaEdit className="text-gray-500" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex justify-center items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100 "
                  >
                    <FaTrash className="text-gray-500" /> Delete
                  </button>
                </div>
              )}
            </div>

            <h3 className="text-black font-bold mb-2">{task?.title}</h3>
            <div className="flex items-center gap-2">
              <FaRegClock className="text-gray-600" />
              <h3 className="text-black">{task?.taskDate}</h3>
            </div>
            <p className="text-gray-600">{task?.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Task Title */}
            <div className="py-2">
              <label className="block text-sm font-medium">Task Title:</label>
              <input
                type="text"
                placeholder="Enter task title"
                className="input input-bordered w-full mt-1"
                {...register("title", { required: "Task title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Task Category */}
            <div className="py-2">
              <label className="block text-sm font-medium">Category:</label>
              <select
                className="select select-bordered w-full mt-1"
                {...register("category", { required: "Category is required" })}
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Urgent">Urgent</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Task Description */}
            <div className="py-2">
              <label className="block text-sm font-medium">Description:</label>
              <textarea
                placeholder="Enter task description"
                className="textarea textarea-bordered w-full mt-1"
                rows="3"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Modal Action Buttons */}
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Close
              </button>
              <button type="submit" className="btn">
                Save Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Home;
