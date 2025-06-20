import * as Yup from "yup";


const AddMemberSchema = Yup.object({
  userId: Yup.string().required("UserId is required"),
  role: Yup.string().required("Role is required"),
});

export default AddMemberSchema;