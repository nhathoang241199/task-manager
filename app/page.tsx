"use client";

import ListTask from "@/components/task/listTask";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col w-screen bg-gray-300 lg:p-10 p-4 items-center gap-4">
      <h1 className="text-[32px] sm:mb-4">Task manager</h1>

      <ListTask />
    </div>
  );
}
