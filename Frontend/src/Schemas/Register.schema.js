import * as Yup from "yup";


const RegisterValidationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "At least one lowercase letter required")
    .matches(/[A-Z]/, "At least one uppercase letter required")
    .matches(/\d/, "At least one number required")
    .matches(/[@$!%*?&#]/, "At least one special character required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default RegisterValidationSchema;