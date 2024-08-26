import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import * as Yup from "yup";
import AuthTextInput from "../../components/CustomFormInputs/AuthTextInput";
import registerImg from "/images/thumbs-up.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { registerUser, registerLoading, user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const initialData = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <main className="min-h-screen w-full  grid md:grid-cols-2">
      <div className="hidden md:flex items-center  justify-center bg-slate-900">
        <img src={registerImg} alt="register image" />
      </div>
      <div className="flex items-center h-full justify-center ">
        <div className=" w-full sm:w-[80%]  py-4 px-3 rounded-md shadow-xl">
          <h2 className="font-montserrat text-gray-700 text-3xl font-bold py-3 text-center">
            Sign Up
          </h2>
          <p className="text-gray-700 font-montserrat text-sm text-center ">
            <span className="font-bold text-red-400">
              {" "}
              Start earning now!!!{" "}
            </span>
            Register with us
          </p>
          <Formik
            initialValues={initialData}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(3, "Must be greaternthan 3 characters")
                .required("Required"),
              email: Yup.string().required("Required"),
              phoneNumber: Yup.string().required("Required"),
              password: Yup.string()
                .min(6, "Password must be greater than 6 characters")
                .required("Required"),
              confirmPassword: Yup.string()
                .min(6, "Must be greater than 6 characters")
                .required(),
            })}
            onSubmit={(values) => {
              registerUser(values);
            }}
          >
            <Form>
              <AuthTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
              />
              <AuthTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <AuthTextInput
                label="Phone Number"
                name="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
              />
              <AuthTextInput
                label="Referral Code(Optional)"
                name="referralCode"
                type="text"
                placeholder="ABCD123"
              />
              <AuthTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <AuthTextInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
              <p className="text-xs text-gray-700 font-montserrat">
                Already have an account?{" "}
                <Link to="/login" className="text-red-400">
                  Sign in
                </Link>
              </p>
              <div className="my-2">
                <button
                  type="submit"
                  className={`${
                    registerLoading ? "bg-gray-500" : "bg-red-400"
                  }  text-white px-2 py-3 rounded-r-md rounded-tl-md w-full cursor-pointer`}
                  disabled={registerLoading}
                >
                  {registerLoading ? (
                    <LuLoader2 className="animate-spin" />
                  ) : (
                    " Sign Up"
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
}

export default Register;
