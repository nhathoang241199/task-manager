"use client";

import useTask from "@/hooks/useTask";
import { callAddTask, callUpdateTask } from "@/services/task";
import { EStatus, TTask } from "@/utils/type";
import { Button, Modal } from "flowbite-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

type TProps = {
  isAddNew?: boolean;
  task?: TTask;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

export const TaskModal: FC<TProps> = ({
  openModal,
  setOpenModal,
  task,
  isAddNew,
}) => {
  const [submiting, setSubmiting] = useState(false);
  const { handleRefresh } = useTask();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTask>({
    defaultValues: {
      id: task?.id,
      name: task?.name || "",
      description: task?.description || "",
      status: task?.status || EStatus.incomplete,
    },
  });

  const onSubmit = async (data: TTask) => {
    setSubmiting(true);
    try {
      if (isAddNew) {
        await callAddTask(data);
      } else {
        await callUpdateTask(data);
      }
      reset();
      setOpenModal(false);
      handleRefresh();
    } catch (error) {
      console.log({ error });
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Task detail</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-normal">Name</p>
              <input
                {...register("name", {
                  required: "Name is required!",
                })}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500">
                  {errors.name?.message?.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-normal">Description</p>
              <textarea
                {...register("description")}
                className="border min-h-[150px] border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-normal">Status</p>
              <select
                {...register("status")}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option className=" capitalize" value={EStatus.incomplete}>
                  {EStatus.incomplete}
                </option>
                <option className=" capitalize" value={EStatus.complete}>
                  {EStatus.complete}
                </option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-2 w-full justify-end">
            <Button
              type="submit"
              onClick={() => {
                handleSubmit(onSubmit);
              }}
              isProcessing={submiting}
            >
              Save
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
