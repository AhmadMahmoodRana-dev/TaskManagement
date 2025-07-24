import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import RegisterValidationSchema from "../../Schemas/Register.schema";
import axios from "axios";
import BASEURL from "../../constant/BaseUrl";
import { TiTick } from "react-icons/ti";
import { IoShieldCheckmarkOutline, IoPersonOutline } from "react-icons/io5";
import {FaRegEyeSlash,FaEye,FaGithub,FaFacebook,FaGoogle,FaCriticalRole} from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";


const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[@$!%*?&#]/.test(password),
  };

  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;
  const strengthColors = {
    0: "bg-gray-200",
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-green-400",
    5: "bg-green-500",
  };

  const strengthLabels = {
    0: "Very Weak",
    1: "Weak",
    2: "Fair",
    3: "Good",
    4: "Strong",
    5: "Very Strong",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(`${BASEURL}/auth/register`, values);
      navigate("/login");
      resetForm();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <BsPersonCircle size={30} />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10 border border-gray-100">
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IoPersonOutline color="gray" size={20} />
                    </div>
                    <Field
                      name="name"
                      type="text"
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.name && touched.name
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="John Doe"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1.5 flex items-center"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 mt-1 flex items-center pointer-events-none">
                      <MdOutlineMailOutline size={20} color="gray" />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.email && touched.email
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="you@example.com"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1.5 flex items-center"
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Role
                  </label>

                  <div className="relative mt-1">
                    {/* Left icon */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCriticalRole
                        size={20}
color="gray"
                      />
                    </div>

                    {/* Formik Select Field */}
                    <Field
                      as="select"
                      name="role"
                      className={`block w-full appearance-none pl-10 pr-10 py-3 rounded-lg border shadow-sm text-sm bg-white ${
                        errors.role && touched.role
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      }`}
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                      <option value="user">User</option>
                    </Field>

                    {/* Right custom arrow icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z" />
                      </svg>
                    </div>
                  </div>

                  {/* Formik Error Message */}
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-500 text-sm mt-1.5 flex items-center"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CiLock color="gray" size={22} />
                    </div>
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`block w-full pl-10 pr-10 py-2.5 border ${
                        errors.password && touched.password
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        handleChange(e);
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? (
                          <FaRegEyeSlash color="gray" size={20} />
                        ) : (
                          <FaEye color="gray" size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1.5 flex items-center"
                  />

                  {/* Password Strength Meter */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Password strength
                      </span>
                      <span
                        className={`text-sm font-semibold italic px-3 py-1 rounded-2xl ${strengthColors[passwordStrength]}`}
                      >
                        {strengthLabels[passwordStrength]}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${strengthColors[passwordStrength]}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>

                    {/* Password Requirements */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            passwordChecks.length
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        >
                          {passwordChecks.length && (
                            <TiTick size={22} color="#fff" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordChecks.length
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          8+ characters
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            passwordChecks.lowercase
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        >
                          {passwordChecks.lowercase && (
                            <TiTick size={22} color="#fff" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordChecks.lowercase
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          Lowercase
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            passwordChecks.uppercase
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        >
                          {passwordChecks.uppercase && (
                            <TiTick size={22} color="#fff" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordChecks.uppercase
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          Uppercase
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            passwordChecks.number
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        >
                          {passwordChecks.number && (
                            <TiTick size={22} color="#fff" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordChecks.number
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          Number
                        </span>
                      </div>

                      <div className="flex items-center col-span-2">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            passwordChecks.specialChar
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        >
                          {passwordChecks.specialChar && (
                            <TiTick size={22} color="#fff" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordChecks.specialChar
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          Special character (@$!%*?&#)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IoShieldCheckmarkOutline color="gray" size={20} />
                    </div>
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`block w-full pl-10 pr-10 py-2.5 border ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <FaRegEyeSlash color="gray" size={20} />
                        ) : (
                          <FaEye color="gray" size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1.5 flex items-center"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <FaGithub size={22} color="gray" />
                </button>
              </div>

              <div>
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <FaFacebook size={22} color="gray" />
                </button>
              </div>

              <div>
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <FaGoogle size={22} color="gray" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
