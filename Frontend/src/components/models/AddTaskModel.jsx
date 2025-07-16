import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TaskSchema from "../../Schemas/TaskSchema";
import axios from "axios";
import BASEURL from "../../constant/BaseUrl";
import { useEffect, useState } from "react";

export default function AddTaskModal({
  open,
  setOpen,
  projectId,
  teamMembers,
  fetchTasks,
  taskId,
  setTaskId
}) {
  const token = localStorage.getItem("authToken");
  const [singleTaskData, setSingleTaskData] = useState({});

  console.log(singleTaskData, "singleTaskDatasingleTaskData");

  // ADD TASK

  const addTask = async (formdata) => {
    try {
      const response = await axios.post(`${BASEURL}/task`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };
  // UPDATE TASK

  const UpdateTask = async (formdata) => {
    try {
      const response = await axios.put(
        `${BASEURL}/task/update/${taskId}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      fetchTasks();
      setOpen(!open);
    } catch (error) {
      console.error(error);
    }
  };

  // SINGLE TASK DATA

  const getSingleTaskData = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSingleTaskData(data);
      console.log(data, "singleTASK DATA");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!taskId) {
      setSingleTaskData({});
      setTaskId(null)
    } else {
      getSingleTaskData();
    }
  }, [taskId]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
              >
                <span className="sr-only">Close</span>
                <HiOutlineXMark aria-hidden="true" className="size-6" />
              </button>

              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
                <Formik
                  enableReinitialize
                  initialValues={{
                    title: singleTaskData?.title || "",
                    description: singleTaskData?.description || "",
                    project: projectId,
                    assignedTo: singleTaskData?.assignedTo || "",
                    status: singleTaskData?.status || "todo",
                    priority: singleTaskData?.priority || "medium",
                    dueDate: singleTaskData?.dueDate?.split("T")[0] || "",
                    estimatedHours: singleTaskData?.estimatedHours || 0,
                  }}
                  validationSchema={TaskSchema}
                  onSubmit={(values, { resetForm }) => {
                    taskId ? UpdateTask(values) : addTask(values);
                    resetForm();
                    setSingleTaskData({});
                    setTaskId(null)
                    setOpen(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <Field
                          type="text"
                          name="title"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          placeholder="Task title"
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <Field
                          as="textarea"
                          name="description"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          placeholder="Task description"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Assign To
                        </label>
                        <Field
                          as="select"
                          name="assignedTo"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                          <option value="">Select a member</option>
                          {teamMembers?.map((team) => (
                            <option key={team.user._id} value={team.user._id}>
                              {team.user.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="assignedTo"
                          component="div"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <Field
                            as="select"
                            name="status"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          >
                            <option value="todo">To Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                            <option value="pending">Pending</option>
                          </Field>
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="text-sm text-red-500 mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Priority
                          </label>
                          <Field
                            as="select"
                            name="priority"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                          </Field>
                          <ErrorMessage
                            name="priority"
                            component="div"
                            className="text-sm text-red-500 mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Due Date
                          </label>
                          <Field
                            type="date"
                            name="dueDate"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          />
                          <ErrorMessage
                            name="dueDate"
                            component="div"
                            className="text-sm text-red-500 mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Estimated Hours
                          </label>
                          <Field
                            type="number"
                            name="estimatedHours"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            min={0}
                          />
                          <ErrorMessage
                            name="estimatedHours"
                            component="div"
                            className="text-sm text-red-500 mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        {!taskId ? (
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                          >
                            Create Task
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                          >
                            Update Task
                          </button>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
