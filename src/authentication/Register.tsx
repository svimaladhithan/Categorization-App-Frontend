import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../components/FormikTextInput";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/authApi";
import OtpVerification from "./OtpVerification";
import { toast } from "react-toastify";
import Toast from "../components/Toast";

interface SignupValues {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const auth = useContext(AuthContext);
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState("");

  const initialValues: SignupValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(7, "Username must be at least 7 characters")
      .max(16, "Username must be at most 16 characters")
      .matches(/^\S*$/, "Username must not contain spaces")
      .matches(/^[a-z0-9_]+$/, "Username must be lowercase and contain only alphanumeric characters and underscores"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (
    values: SignupValues,
    { setSubmitting }: FormikHelpers<SignupValues>
  ) => {
    try {
      const response = await registerUser(values);
      if (response.status === 200) {
        const { userId, username } = response.data;
        auth?.login(username, userId);
        setEmail(values.email);
        setShowVerification(true);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
return (
    <>
      <Toast />
      {showVerification ? (
        <OtpVerification email={email} />
      ) : (
        <div className="min-h-screen mt-20">
          <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <div className="font-bold dark:text-white text-4xl">
                <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
                  Streamline
                </span>
                Interests!
              </div>
              <p className="text-sm mt-6">
                Create your account to Streamline your Interests!
              </p>
            </div>
            <div className="flex-1">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-4">
                    <FormikTextInput
                      label="Username"
                      type="text"
                      placeholder="Enter your Username"
                      id="username"
                      name="username"
                    />
                    <FormikTextInput
                      label="Email"
                      type="email"
                      placeholder="Enter your Email"
                      id="email"
                      name="email"
                    />
                    <FormikTextInput
                      label="Password"
                      type="password"
                      placeholder="Enter Your Password"
                      id="password"
                      name="password"
                    />
                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-blue-500"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner
                            color="info"
                            aria-label="Info spinner example"
                            size="sm"
                          />
                          <span className="pl-3">Loading...</span>
                        </>
                      ) : (
                        "CREATE ACCOUNT"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
              <div className="flex gap-2 text-sm mt-6">
                <span>Have an Account?</span>
                <Link to="/login" className="text-blue-500">
                  LOGIN
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
