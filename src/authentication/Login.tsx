import { Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../components/FormikTextInput";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authApi";
import { toast } from 'react-toastify';
import Toast from "../components/Toast";

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    setLoading(true);
    try {
      const response = await loginUser(values);

      if (response.status === 200) {
        localStorage.setItem("Token", response.data.token);
        const { userId, username } = response.data;
        auth?.login(username, userId);
        navigate('/categories');
      } else {
        toast.error("Login failed. Please try again."); 
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Invalid Credentials.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <Toast />
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <div className="font-bold dark:text-white text-3xl">
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
              Streamline
            </span>
             Interests!
          </div>
          <p className="text-sm mt-6">
            Welcome back to ECOMMERCE
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
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <>
                      <Spinner
                        color="info"
                        aria-label="Info spinner example"
                        size="sm"
                      />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "LOGIN"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
          <div className="flex gap-2 text-sm mt-6">
            <span>Don't have an Account?</span>
            <Link to="/register" className="text-blue-500">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;