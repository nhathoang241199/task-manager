"use client";

import useTask from "@/hooks/useTask";
import { callDeleteTask } from "@/services/task";
import { TTask } from "@/utils/type";
import { Button, Modal } from "flowbite-react";
import { FC, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type TProps = {
  task: TTask;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

const ConfirmDeleteModal: FC<TProps> = ({ openModal, setOpenModal, task }) => {
  const [submiting, setSubmiting] = useState(false);
  const { handleRefresh } = useTask();

  const onDelete = async () => {
    setSubmiting(true);
    try {
      await callDeleteTask(task.id.toString());
      setOpenModal(false);
      handleRefresh();
    } catch (error) {
      console.log({ error });
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                isProcessing={submiting}
                color="failure"
                onClick={onDelete}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmDeleteModal;
