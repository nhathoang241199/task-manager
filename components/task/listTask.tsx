"use client";

import { EStatus, TFilter, TTask } from "@/utils/type";
import Pagination from "../pagination";
import Task from "./task";
import useTasks from "@/redux/task/selectors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "@/redux/task/slice";
import { AppDispatch } from "@/redux/store";
import { Spinner } from "flowbite-react";
import { TaskModal } from "./taskModal";

const ListTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const { list, page, filterStatus, status } = useTasks();

  useEffect(() => {
    dispatch(fetchTasks({ page: page, status: filterStatus }));
  }, [dispatch, 1]);

  const setStatus = (value: TFilter) => {
    dispatch(fetchTasks({ page: 1, status: value }));
  };

  return (
    <div className="w-full flex flex-col flex-1">
      <div className="flex w-full justify-between">
        <div className="flex gap-4 items-center">
          <p className="">Status: </p>

          <select
            value={filterStatus}
            onChange={(e) => setStatus(e.target.value as TFilter)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className=" capitalize" value={"all"}>
              All
            </option>
            <option className=" capitalize" value={EStatus.incomplete}>
              {EStatus.incomplete}
            </option>
            <option className=" capitalize" value={EStatus.complete}>
              {EStatus.complete}
            </option>
          </select>
        </div>

        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className="right-4 bg-blue-500 text-white px-4 py-2  font-semibold cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </div>
      {status === "loading" || status === "idle" ? (
        <div className="w-full flex justify-center min-h-[300px]">
          <Spinner
            className="mt-10"
            color="info"
            aria-label="Loading"
            size="xl"
          />
        </div>
      ) : (
        <div className="mt-4 grid  sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {list.map((task: TTask) => (
            <Task key={task.id} value={task} />
          ))}
        </div>
      )}

      <div className="flex-[1]" />
      <div className=" self-end sm:self-end w-fit">
        <Pagination />
      </div>

      <TaskModal isAddNew openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default ListTask;
