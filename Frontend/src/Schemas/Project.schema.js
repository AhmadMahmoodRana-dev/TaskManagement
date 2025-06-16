import * as Yup from "yup";


const ProjectSchema = Yup.object().shape({
  name: Yup.string().required("Project name is required"),
  description: Yup.string().required("Description is required"),
  deadline: Yup.date()
    .required("Deadline is required")
    .min(new Date(), "Deadline must be in the future"),
});

export default ProjectSchema;