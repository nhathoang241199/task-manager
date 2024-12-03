"use client";

import { EStatus, TTask } from "@/utils/type";
import { FC, useState } from "react";
import { TaskModal } from "./taskModal";
import ConfirmDeleteModal from "./confirmDeleteModal";

type TProps = {
  value: TTask;
};

const Task: FC<TProps> = ({ value }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="relative gap-2 w-full bg-white rounded-lg shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center p-4"
      >
        <p className="font-semibold">{value.name}</p>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 bg-${
              value.status === EStatus.incomplete ? "red" : "green"
            }-500 rounded-full`}
          />
          <p
            className={`text-[14px] text-${
              value.status === EStatus.incomplete ? "red" : "green"
            }-500 font-medium`}
          >
            {value.status}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenDeleteModal(true);
          }}
          className="bg-red-500 text-white absolute top-2 right-2 w-[24px] h-[24px] cursor-pointer rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          x
        </button>
      </div>
      <ConfirmDeleteModal
        task={value}
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
      <TaskModal
        task={value}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default Task;
