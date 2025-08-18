import * as Yup from "yup";

const SingleTaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  assignedTo: Yup.string().required("Assignee is required"),
  status: Yup.string().required("Status is required"),
  priority: Yup.string().required("Priority is required"),
  dueDate: Yup.date().required("Due date is required"),
  estimatedHours: Yup.number()
    .min(0, "Estimated hours must be at least 0")
    .required("Estimated hours is required"),
  task: Yup.string().required("Project ID is required"),
});

const mySubTask = Yup.object().shape({
  subtasks: Yup.array().of(SingleTaskSchema),
});

export default mySubTask;
