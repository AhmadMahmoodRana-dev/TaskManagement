import * as Yup from "yup";


const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").max(200),
  description: Yup.string().max(1000),
  assignedTo: Yup.string().required("Assignee is required"),
  status: Yup.string().required("Status is required"),
  priority: Yup.string().required("Priority is required"),
  dueDate: Yup.date().min(new Date(), "Due date must be in the future"),
  estimatedHours: Yup.number().min(0, "Estimated hours cannot be negative"),
});

export default TaskSchema;