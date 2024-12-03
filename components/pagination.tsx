import { AppDispatch } from "@/redux/store";
import useTasks from "@/redux/task/selectors";
import { fetchTasks } from "@/redux/task/slice";
import { FC } from "react";
import { useDispatch } from "react-redux";

type TProps = {};

const Pagination: FC<TProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filterStatus, page, totalTasks } = useTasks();

  const setPage = (page: number) => {
    dispatch(fetchTasks({ page: page, status: filterStatus }));
  };

  return (
    <div className="mt-4 flex gap-2 items-center">
      <button
        onClick={() => {
          setPage(1);
        }}
        disabled={page < 2}
        className="bg-blue-500 text-white px-2 py-1 w-[32px] h-[32px] cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {"<<"}
      </button>
      <button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page < 2}
        className="bg-blue-500 text-white px-2 py-1 w-[32px] h-[32px] cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {"<"}
      </button>{" "}
      <span>
        page{" "}
        <strong>
          {page} of {totalTasks ? totalTasks : 0}
        </strong>{" "}
      </span>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={page >= totalTasks}
        className="bg-blue-500 text-white px-2 py-1 w-[32px] h-[32px] cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {">"}
      </button>{" "}
      <button
        onClick={() => {
          setPage(totalTasks);
        }}
        disabled={page >= totalTasks}
        className="bg-blue-500 text-white px-2 py-1 w-[32px] h-[32px] cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {">>"}
      </button>{" "}
    </div>
  );
};

export default Pagination;
