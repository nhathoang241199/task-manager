import { EStatus, TFilter, TTask } from "@/utils/type";
import API from "../api";
import { TASK_PER_PAGE } from "@/utils/constant";
var qs = require("qs");

export type TGetTaskParams = {
  status: TFilter;
  page: number;
};

export const callGetTasks = async (params: TGetTaskParams) => {
  const data = {
    status: params.status === "all" ? undefined : params.status,
    _page: params.page,
    _per_page: TASK_PER_PAGE,
  };

  const queryString = qs.stringify(data, { encode: true });
  return await API.get(`/tasks?${queryString}`);
};

export const callAddTask = async (data: TTask) => {
  return await API.post(`/tasks`, data);
};

export const callUpdateTask = async (data: TTask) => {
  return await API.put(`/tasks/${data.id}`, data);
};

export const callDeleteTask = async (id: string) => {
  return await API.delete(`/tasks/${id}`);
};
