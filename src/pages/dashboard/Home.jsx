// import { CiCirclePlus } from "react-icons/ci";
// import { useState, useEffect, useContext } from "react";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../providers/AuthProvider";
// import { FaRegClock, FaEdit, FaTrash } from "react-icons/fa";
// import { FaEllipsis } from "react-icons/fa6";

// const Home = () => {
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const toggleMenu = (id) => setOpenMenuId(openMenuId === id ? null : id);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal visibility
//   const [taskData, setTaskData] = useState({
//     title: "",
//     category: "To-Do",
//     description: "",
//   });
//   const [errors, setErrors] = useState({});

//   const axiosPublic = useAxiosPublic();
//   const { user } = useContext(AuthContext);

//   const { data: tasks = [], refetch } = useQuery({
//     queryKey: ["tasks", user.email],
//     queryFn: async () => {
//       const res = await axiosPublic.get(`/tasks/${user.email}`);
//       return res.data;
//     },
//   });

//   const validate = () => {
//     const newErrors = {};
//     if (!taskData.title) newErrors.title = "Task title is required";
//     if (!taskData.category) newErrors.category = "Category is required";
//     if (!taskData.description)
//       newErrors.description = "Description is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const onSubmit = async () => {
//     if (!validate()) return;
//     const date = new Date();
//     const taskDate = date.toLocaleDateString("en-GB").split("/").join("-");
//     const taskInfo = {
//       title: taskData.title,
//       category: taskData.category,
//       taskDate: taskDate,
//       description: taskData.description,
//       email: user?.email,
//     };

//     await axiosPublic.post("/tasks", taskInfo);
//     refetch();
//     setIsModalOpen(false); // Close the modal after saving
//     setTaskData({ title: "", category: "To-Do", description: "" }); // Reset the form
//   };

//   const handleTaskDelete = async (id) => {
//     await axiosPublic.delete(`/tasks/${id}`);
//     refetch();
//   };

//   const handleTaskEdit = (task) => {
//     setSelectedTask(task);
//     setIsEditModalOpen(true); // Open edit modal
//   };

//   useEffect(() => {
//     if (selectedTask) {
//       setTaskData({
//         title: selectedTask.title,
//         category: selectedTask.category,
//         description: selectedTask.description,
//       });
//     }
//   }, [selectedTask]);

//   const handleTaskUpdate = async () => {
//     if (!validate()) return;
//     const updatedTask = {
//       title: taskData.title,
//       category: taskData.category,
//       description: taskData.description,
//     };
//     await axiosPublic.put(`/tasks/${selectedTask._id}`, updatedTask);
//     refetch();
//     setIsEditModalOpen(false); // Close the edit modal after updating
//   };

//   useEffect(() => {
//     // Handle the modal visibility by directly calling .showModal() when isModalOpen is true
//     const modal = document.getElementById("add-task-modal");
//     if (modal && isModalOpen) {
//       modal.showModal();
//     } else if (modal) {
//       modal.close();
//     }
//   }, [isModalOpen]);

//   useEffect(() => {
//     // Handle the edit modal visibility
//     const editModal = document.getElementById("edit-task-modal");
//     if (editModal && isEditModalOpen) {
//       editModal.showModal();
//     } else if (editModal) {
//       editModal.close();
//     }
//   }, [isEditModalOpen]);

//   return (
//     <div>
//       {/* Add Task Button */}
//       <div
//         onClick={() => setIsModalOpen(true)}
//         className="lg:w-[340px] cursor-pointer h-[180px] rounded-md bg-white p-4 flex flex-col justify-center items-center border border-gray-200"
//       >
//         <CiCirclePlus className="text-2xl mb-3" />
//         Add Task
//       </div>

//       {/* Task List */}
//       <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-5">
//         {["To-Do", "In Progress", "Done"].map((category) => (
//           <div key={category}>
//             <h3 className="text-xl font-semibold text-center mb-3">
//               {category}
//             </h3>

//             {tasks.filter((task) => task.category === category).length > 0 ? (
//               tasks
//                 .filter((task) => task.category === category)
//                 .map((task) => (
//                   <div
//                     key={task._id}
//                     className="p-3 rounded-md border border-gray-200 bg-white relative mb-5"
//                   >
//                     {/* 3 Dot Button */}
//                     <div className="flex justify-end relative">
//                       <button
//                         className="text-gray-600"
//                         onClick={() => toggleMenu(task._id)}
//                       >
//                         <FaEllipsis className="cursor-pointer" />
//                       </button>

//                       {/* Dropdown Menu */}
//                       {openMenuId === task._id && (
//                         <div className="absolute top-6 right-0 w-28 bg-white border border-gray-200 shadow-md rounded-md z-10">
//                           <button
//                             onClick={() => handleTaskEdit(task)}
//                             className="flex justify-center border-b border-b-gray-200 items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100"
//                           >
//                             <FaEdit className="text-gray-500" /> Edit
//                           </button>
//                           <button
//                             onClick={() => handleTaskDelete(task._id)}
//                             className="flex justify-center items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100 "
//                           >
//                             <FaTrash className="text-gray-500" /> Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>

//                     <h3 className="text-black font-bold mb-2">{task?.title}</h3>
//                     <div className="flex items-center gap-2">
//                       <FaRegClock className="text-gray-600" />
//                       <h3 className="text-black">{task?.taskDate}</h3>
//                     </div>
//                     <p className="text-gray-600">{task?.description}</p>
//                   </div>
//                 ))
//             ) : (
//               <p className="text-gray-500 text-center">No tasks found.</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Add Task Modal */}
//       <dialog id="add-task-modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Add New Task</h3>
//           <div className="py-2">
//             <label className="block text-sm font-medium">Task Title:</label>
//             <input
//               type="text"
//               placeholder="Enter task title"
//               className="input input-bordered w-full mt-1"
//               value={taskData.title}
//               onChange={(e) =>
//                 setTaskData({ ...taskData, title: e.target.value })
//               }
//             />
//             {errors.title && (
//               <p className="text-red-500 text-sm">{errors.title}</p>
//             )}
//           </div>

//           <div className="py-2">
//             <label className="block text-sm font-medium">Category:</label>
//             <select
//               className="select select-bordered w-full mt-1"
//               value={taskData.category}
//               onChange={(e) =>
//                 setTaskData({ ...taskData, category: e.target.value })
//               }
//             >
//               <option value="To-Do">To-Do</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Done">Done</option>
//             </select>
//             {errors.category && (
//               <p className="text-red-500 text-sm">{errors.category}</p>
//             )}
//           </div>

//           <div className="py-2">
//             <label className="block text-sm font-medium">Description:</label>
//             <textarea
//               placeholder="Enter task description"
//               className="textarea textarea-bordered w-full mt-1"
//               rows="3"
//               value={taskData.description}
//               onChange={(e) =>
//                 setTaskData({ ...taskData, description: e.target.value })
//               }
//             ></textarea>
//             {errors.description && (
//               <p className="text-red-500 text-sm">{errors.description}</p>
//             )}
//           </div>

//           <div className="modal-action">
//             <button
//               type="button"
//               className="btn"
//               onClick={() => setIsModalOpen(false)}
//             >
//               Close
//             </button>
//             <button type="button" className="btn" onClick={onSubmit}>
//               Save Task
//             </button>
//           </div>
//         </div>
//       </dialog>

//       {/* Edit Task Modal */}
//       <dialog id="edit-task-modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Update Task</h3>
//           <div className="py-2">
//             <label className="block text-sm font-medium">Task Title:</label>
//             <input
//               type="text"
//               placeholder="Enter task title"
//               className="input input-bordered w-full mt-1"
//               value={taskData.title}
//               onChange={(e) =>
//                 setTaskData({ ...taskData, title: e.target.value })
//               }
//             />
//             {errors.title && (
//               <p className="text-red-500 text-sm">{errors.title}</p>
//             )}
//           </div>

//           <div className="py-2">
//             <label className="block text-sm font-medium">Category:</label>
//             <select
//               className="select select-bordered w-full mt-1"
//               value={taskData.category}
//               onChange={(e) =>
//                 setTaskData({ ...taskData, category: e.target.value })
//               }
//             >
//               <option value="To-Do">To-Do</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Done">Done</option>
//             </select>
//             {errors.category && (
//               <p className="text-red-500 text-sm">{errors.category}</p>
//             )}
//           </div>

//           <div className="py-2">
//             <label className="block text-sm font-medium">Description:</label>
//             <textarea
//               placeholder="Enter task description"
//               className="textarea textarea-bordered w-full mt-1"
//               rows="3"
//               value={taskData.description}
//               onChange={(e) =>
//                 setTaskData({ ...taskData, description: e.target.value })
//               }
//             ></textarea>
//             {errors.description && (
//               <p className="text-red-500 text-sm">{errors.description}</p>
//             )}
//           </div>

//           <div className="modal-action">
//             <button
//               type="button"
//               className="btn"
//               onClick={() => setIsEditModalOpen(false)}
//             >
//               Close
//             </button>
//             <button type="button" className="btn" onClick={handleTaskUpdate}>
//               Update Task
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Home;

import { CiCirclePlus } from "react-icons/ci";
import { useState, useEffect, useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaEllipsis, FaRegClock } from "react-icons/fa6";
const Home = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (id) => setOpenMenuId(openMenuId === id ? null : id);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    category: "To-Do",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [groupedTasks, setGroupedTasks] = useState({});

  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    const grouped = categories.reduce((acc, category) => {
      acc[category] = tasks.filter((task) => task.category === category);
      return acc;
    }, {});
    setGroupedTasks(grouped);
  }, [tasks]);

  const validate = () => {
    const newErrors = {};
    if (!taskData.title) newErrors.title = "Task title is required";
    if (!taskData.category) newErrors.category = "Category is required";
    if (!taskData.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    const date = new Date();
    const taskDate = date.toLocaleDateString("en-GB").split("/").join("-");
    const taskInfo = {
      title: taskData.title,
      category: taskData.category,
      taskDate: taskDate,
      description: taskData.description,
      email: user?.email,
    };

    await axiosPublic.post("/tasks", taskInfo);
    refetch();
    setIsModalOpen(false);
    setTaskData({ title: "", category: "To-Do", description: "" });
  };

  const handleTaskDelete = async (id) => {
    await axiosPublic.delete(`/tasks/${id}`);
    refetch();
  };

  const handleTaskEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    if (selectedTask) {
      setTaskData({
        title: selectedTask.title,
        category: selectedTask.category,
        description: selectedTask.description,
      });
    }
  }, [selectedTask]);

  const handleTaskUpdate = async () => {
    if (!validate()) return;
    const updatedTask = {
      title: taskData.title,
      category: taskData.category,
      description: taskData.description,
    };
    await axiosPublic.put(`/tasks/${selectedTask._id}`, updatedTask);
    refetch();
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const modal = document.getElementById("add-task-modal");
    if (modal && isModalOpen) {
      modal.showModal();
    } else if (modal) {
      modal.close();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const editModal = document.getElementById("edit-task-modal");
    if (editModal && isEditModalOpen) {
      editModal.showModal();
    } else if (editModal) {
      editModal.close();
    }
  }, [isEditModalOpen]);

  const categories = ["To-Do", "In Progress", "Done"];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;

    const sourceTasks = [...groupedTasks[sourceCategory]];
    const [removed] = sourceTasks.splice(source.index, 1);

    if (sourceCategory === destCategory) {
      sourceTasks.splice(destination.index, 0, removed);
      setGroupedTasks((prev) => ({
        ...prev,
        [sourceCategory]: sourceTasks,
      }));
    } else {
      removed.category = destCategory;
      const destTasks = [...groupedTasks[destCategory]];
      destTasks.splice(destination.index, 0, removed);
      setGroupedTasks((prev) => ({
        ...prev,
        [sourceCategory]: sourceTasks,
        [destCategory]: destTasks,
      }));
    }

    const updatedTasks = Object.values(groupedTasks).flat();

    axiosPublic
      .put("/tasks/reorder", { tasks: updatedTasks })
      .then((response) => {
        console.log("Reorder Response:", response.data);
        refetch();
      })
      .catch((err) => {
        console.error("Error updating tasks:", err);
      });
  };

  return (
    <div>
      {/* Add Task Button */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="lg:w-[340px] cursor-pointer h-[180px] rounded-md bg-white p-4 flex flex-col justify-center items-center border border-gray-200"
      >
        <CiCirclePlus className="text-2xl mb-3" />
        Add Task
      </div>

      {/* Task List */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className=" mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => (
              <Droppable droppableId={category} key={category}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="rounded-md bg-gray-100 p-2"
                  >
                    <h3 className="text-xl font-bold mb-5 text-center">
                      {category === "Done"
                        ? "✅"
                        : category === "In Progress"
                        ? "⏳"
                        : "⭕️"}{" "}
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {groupedTasks[category]?.length > 0 ? (
                        groupedTasks[category].map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-4 rounded-lg bg-white border border-gray-200"
                              >
                                <div className="flex justify-end relative">
                                  <button
                                    className="text-gray-600"
                                    onClick={() => toggleMenu(task._id)}
                                  >
                                    <FaEllipsis className="cursor-pointer" />
                                  </button>
                                  {openMenuId === task._id && (
                                    <div className="absolute top-6 right-0 w-28 bg-white border border-gray-200 shadow-md rounded-md z-10">
                                      <button
                                        onClick={() => handleTaskEdit(task)}
                                        className="flex justify-center border-b border-b-gray-200 items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100"
                                      >
                                        <FiEdit size={20} />
                                        Edit
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleTaskDelete(task._id)
                                        }
                                        className="flex justify-center items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100 "
                                      >
                                        <MdDelete size={20} />
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <h4 className="text-lg font-semibold mb-2">
                                  {task.title}
                                </h4>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <FaRegClock className="text-gray-600" />
                                    <h3 className="text-black">
                                      {task?.taskDate}
                                    </h3>
                                  </div>
                                  <p
                                    className={`${
                                      task.category === "Done"
                                        ? "text-green-500 bg-green-200"
                                        : task.category === "In Progress"
                                        ? "text-blue-500 bg-blue-200"
                                        : "text-red-500 bg-red-200"
                                    } px-2 rounded-3xl text-sm`}
                                  >
                                    {task.category}
                                  </p>
                                </div>
                                <p className="text-gray-600">
                                  {task.description}
                                </p>

                                {/* <div className="text-end">
                                  <button
                                    onClick={() => handleTaskEdit(task)}
                                    className="text-green-500 hover:text-blue-600 mr-2"
                                  >
                                    <FiEdit size={20} />
                                  </button>
                                  <button
                                    onClick={() => handleTaskDelete(task._id)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    <MdDelete size={20} />
                                  </button>
                                </div> */}
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center mt-2">
                          No tasks available
                        </p>
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>

      {/* Add Task Modal */}
      <dialog id="add-task-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>
          <div className="py-2">
            <label className="block text-sm font-medium">Task Title:</label>
            <input
              type="text"
              placeholder="Enter task title"
              className="input input-bordered w-full mt-1"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="py-2">
            <label className="block text-sm font-medium">Category:</label>
            <select
              className="select select-bordered w-full mt-1"
              value={taskData.category}
              onChange={(e) =>
                setTaskData({ ...taskData, category: e.target.value })
              }
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div className="py-2">
            <label className="block text-sm font-medium">Description:</label>
            <textarea
              placeholder="Enter task description"
              className="textarea textarea-bordered w-full mt-1"
              rows="3"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <button type="button" className="btn" onClick={onSubmit}>
              Save Task
            </button>
          </div>
        </div>
      </dialog>

      {/* Edit Task Modal */}
      <dialog id="edit-task-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Task</h3>
          <div className="py-2">
            <label className="block text-sm font-medium">Task Title:</label>
            <input
              type="text"
              placeholder="Enter task title"
              className="input input-bordered w-full mt-1"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="py-2">
            <label className="block text-sm font-medium">Category:</label>
            <select
              className="select select-bordered w-full mt-1"
              value={taskData.category}
              onChange={(e) =>
                setTaskData({ ...taskData, category: e.target.value })
              }
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div className="py-2">
            <label className="block text-sm font-medium">Description:</label>
            <textarea
              placeholder="Enter task description"
              className="textarea textarea-bordered w-full mt-1"
              rows="3"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setIsEditModalOpen(false)}
            >
              Close
            </button>
            <button type="button" className="btn" onClick={handleTaskUpdate}>
              Update Task
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Home;
