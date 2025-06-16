import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ProjectSchema from "../../Schemas/Project.schema";
import axios from "axios";
import BASEURL from "../../constant/BaseUrl";

export default function ProjectModel({ open, setOpen }) {
  const token = localStorage.getItem("authToken");

  const AddProject = async (values) => {
    try {
      const response = await axios.post(`${BASEURL}/project/create`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setOpen(false);
    } catch (error) {
      console.error("Error Creating Project",error)
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
                <h2 className="text-xl font-semibold mb-4">
                  Create New Project
                </h2>
                <Formik
                  initialValues={{ name: "", description: "", deadline: "" }}
                  validationSchema={ProjectSchema}
                  onSubmit={(values, { resetForm }) => {
                    AddProject(values)
                    resetForm();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      {/* Name Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Project Name
                        </label>
                        <Field
                          name="name"
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>

                      {/* Description Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <Field
                          name="description"
                          as="textarea"
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>

                      {/* Deadline Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Deadline
                        </label>
                        <Field
                          name="deadline"
                          type="date"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="deadline"
                          component="div"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>

                      {/* Submit Button */}
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Create Project
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
