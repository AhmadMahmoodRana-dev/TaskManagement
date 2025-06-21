import { useContext, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Context } from "../../context/Context";
import axios from "axios";
import BASEURL from "../../constant/BaseUrl";

const statuses = [
  "todo",
  "inProgress",
  "pending",
  "review",
  "completed",
  "archived",
];
const statusColors = {
  todo: "bg-purple-100 border-purple-200",
  inProgress: "bg-blue-50 border-blue-100",
  pending: "bg-amber-50 border-amber-100",
  review: "bg-red-100 border-red-200",
  completed: "bg-emerald-50 border-emerald-100",
  archived: "bg-pink-100 border-pink-200",
};
const statusTitles = {
  todo: "Todo",
  inProgress: "In Progress",
  pending: "Pending",
  review: "Review",
  completed: "Completed",
  archived: "Archived",
};

function SortableTask({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 mb-3 rounded-lg shadow-sm cursor-grab border-l-4 ${
        isDragging
          ? "opacity-60 bg-gray-100 border-gray-400 shadow-md"
          : "bg-white hover:bg-gray-50"
      } ${
        task.status === "pending"
          ? "border-l-amber-500"
          : task.status === "inProgress"
          ? "border-l-blue-500"
          : task.status === "todo"
          ? "border-l-purple-500"
          : task.status === "review"
          ? "border-l-red-500"
          : task.status === "archived"
          ? "border-l-pink-500"
          : "border-l-emerald-500"
      }`}
    >
      <div className="font-medium text-gray-800">{task.title}</div>
      <div className="text-xs text-gray-500 mt-1">
        {task.status === "pending"
          ? "Not started"
          : task.status === "inProgress"
          ? "Working on it"
          : "Done"}
      </div>
    </div>
  );
}

function Column({ status, tasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${status}`,
    data: {
      accepts: ["task"],
      status: status,
    },
  });

  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <div
      ref={setNodeRef}
      className={`w-full md:w-72 flex-shrink-0 rounded-xl border ${
        statusColors[status]
      } p-4 transition-all ${
        isOver ? "ring-2 ring-inset ring-blue-400 bg-opacity-80" : ""
      }`}
    >
      <div className="flex items-center mb-4">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${
            status === "pending"
              ? "bg-amber-500"
              : status === "inProgress"
              ? "bg-blue-500"
              : status === "todo"
              ? "bg-purple-500"
              : status === "review"
              ? "bg-red-500"
              : status === "archived"
              ? "bg-pink-500"
              : "bg-emerald-500"
          }`}
        ></div>
        <h2 className="text-lg font-bold text-gray-700">
          {statusTitles[status]}
        </h2>
        <span className="ml-2 bg-white rounded-full px-2 py-0.5 text-xs font-semibold text-gray-600">
          {columnTasks.length}
        </span>
      </div>
      <SortableContext
        items={columnTasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="min-h-[100px]">
          {columnTasks.length > 0 ? (
            columnTasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))
          ) : (
            <div
              className={`text-center py-6 text-gray-400 border-2 border-dashed rounded-lg transition-all ${
                isOver
                  ? "border-blue-400 bg-blue-50 text-blue-500"
                  : "border-gray-300"
              }`}
            >
              {isOver ? "Drop task here" : "No tasks - drop tasks here"}
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default function TaskBoard() {
  const { tasks, allTasks } = useContext(Context);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    const token = localStorage.getItem("authToken");
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    console.log(activeTask, "ACTIVE TASK");

    if (over.data.current?.accepts?.includes("task")) {
      const newStatus = over.data.current.status;
      console.log("NEW STATUS", newStatus);
      if (activeTask.status !== newStatus) {
        try {
          // Update backend
          const response = await axios.put(
            `${BASEURL}/task/${activeTask._id}`,
            {
              status: newStatus,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          allTasks(token);

          console.log("RESPONSE", response);
        } catch (err) {
          console.error("Failed to update task status:", err);
        }
      }
      return;
    }

    const overTask = tasks.find((t) => t.id === over.id);

    if (activeTask.status !== overTask.status) {
      try {
        await axios.put(
          `${BASEURL}/task/${active.id}`,
          {
            status: overTask.status,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        allTasks(token);
      } catch (err) {
        console.error("Failed to update status:", err);
      }
    } else {
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
          <p className="text-gray-600">Drag and drop tasks between columns</p>
        </div>

        <div className="flex flex-wrap gap-5">
          {statuses.map((status) => {
            const columnTasks = tasks.filter((task) => task.status === status);
            return <Column key={status} status={status} tasks={columnTasks} />;
          })}
        </div>
      </div>
    </DndContext>
  );
}
