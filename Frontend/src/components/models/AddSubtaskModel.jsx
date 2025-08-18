import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import axios from "axios";
import mySubTask from "../../Schemas/mySubTask.schema";
import BASEURL from "../../constant/BaseUrl";

export default function AddSubtaskModel({
  open,
  setOpen,
  projectId,
  teamMembers,
  setTaskId,
  taskId
}) {

  console.log("TASK ID",taskId)
    
    const AddSubTasks = async (data) => {
    try {
      const token = await localStorage.getItem("authToken");
      const response = await axios.post(
        `${BASEURL}/addSubtask`,data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTaskId("")
      setOpen(!open)
      console.log("SUBTASK RESPONSE", response);
    } catch (error) {
      console.error(error);
    }
  };

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
            className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-4xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95"
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
                <h2 className="text-xl font-semibold mb-4">
                  Add Multiple SubTasks
                </h2>

                <Formik
                  enableReinitialize
                  initialValues={{
                    subtasks: [
                      {
                        title: "",
                        description: "",
                        task: taskId,
                        assignedTo: "",
                        status: "todo",
                        priority: "medium",
                        dueDate: "",
                        estimatedHours: 0,
                      },
                    ],
                  }}
                  validationSchema={mySubTask}
                  onSubmit={async (values, { resetForm }) => {
                    console.log(values?.subtasks,"values?.subtasks")
                  AddSubTasks(values?.subtasks)
                  }}
                >
                  {({ values, isSubmitting }) => (
                    <Form className="space-y-6">
                      <FieldArray name="subtasks">
                        {({ push, remove }) => (
                          <div className="space-y-6">
                            {values.subtasks.map((_, index) => (
                              <div
                                key={index}
                                className="border border-gray-300 rounded-lg p-4 space-y-4 relative"
                              >
                                {values.subtasks.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                                  >
                                    Remove
                                  </button>
                                )}

                                {/* Title */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Title
                                  </label>
                                  <Field
                                    type="text"
                                    name={`subtasks.${index}.title`}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Task title"
                                  />
                                  <ErrorMessage
                                    name={`subtasks.${index}.title`}
                                    component="div"
                                    className="text-sm text-red-500 mt-1"
                                  />
                                </div>

                                {/* Description */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Description
                                  </label>
                                  <Field
                                    as="textarea"
                                    name={`subtasks.${index}.description`}
                                    rows={2}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Task description"
                                  />
                                  <ErrorMessage
                                    name={`subtasks.${index}.description`}
                                    component="div"
                                    className="text-sm text-red-500 mt-1"
                                  />
                                </div>

                                {/* Assign To */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Assign To
                                  </label>
                                  <Field
                                    as="select"
                                    name={`subtasks.${index}.assignedTo`}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                  >
                                    <option value="">Select a member</option>
                                    {teamMembers?.map((team) => (
                                      <option
                                        key={team.user._id}
                                        value={team.user._id}
                                      >
                                        {team.user.name}
                                      </option>
                                    ))}
                                  </Field>
                                </div>

                                {/* Status + Priority */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Status
                                    </label>
                                    <Field
                                      as="select"
                                      name={`subtasks.${index}.status`}
                                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    >
                                      <option value="todo">To Do</option>
                                      <option value="inProgress">
                                        In Progress
                                      </option>
                                      <option value="review">Review</option>
                                      <option value="completed">
                                        Completed
                                      </option>
                                      <option value="archived">Archived</option>
                                      <option value="pending">Pending</option>
                                    </Field>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Priority
                                    </label>
                                    <Field
                                      as="select"
                                      name={`subtasks.${index}.priority`}
                                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    >
                                      <option value="low">Low</option>
                                      <option value="medium">Medium</option>
                                      <option value="high">High</option>
                                      <option value="critical">Critical</option>
                                    </Field>
                                  </div>
                                </div>

                                {/* Due Date + Estimated Hours */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Due Date
                                    </label>
                                    <Field
                                      type="date"
                                      name={`subtasks.${index}.dueDate`}
                                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Estimated Hours
                                    </label>
                                    <Field
                                      type="number"
                                      name={`subtasks.${index}.estimatedHours`}
                                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                      min={0}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  title: "",
                                  description: "",
                                  project: projectId,
                                  assignedTo: "",
                                  status: "todo",
                                  priority: "medium",
                                  dueDate: "",
                                  estimatedHours: 0,
                                })
                              }
                              className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-200"
                            >
                              + Add Another Subtask
                            </button>
                          </div>
                        )}
                      </FieldArray>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Create SubTasks
                        </button>
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
