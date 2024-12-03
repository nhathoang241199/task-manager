import { TTask } from "@/utils/type";
import { useSelector } from "react-redux";

const useTasks = () => useSelector((state: any) => state.task);

export const useTaskList = () =>
  useSelector((state: any) => state.task.list as TTask[]);

export const useTaskListInitStatus = () =>
  useSelector((state: any) => state.task.initStatus);

export default useTasks;
