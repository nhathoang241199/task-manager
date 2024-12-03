"use client";

import { AppDispatch } from "@/redux/store";
import useTasks from "@/redux/task/selectors";
import { fetchTasks } from "@/redux/task/slice";
import { useDispatch } from "react-redux";

const useTask = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { page, filterStatus } = useTasks();

  const handleRefresh = () => {
    dispatch(fetchTasks({ page: page, status: filterStatus }));
  };

  return {
    handleRefresh,
  };
};

export default useTask;
