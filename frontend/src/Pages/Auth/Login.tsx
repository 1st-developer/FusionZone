import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import "../../Styles/login.scss"
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {useFormik} from "formik"
import * as yup from "yup"
import { loginFn } from "@/redux/Auth/login.slice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import LoginSpinner from "@/components/ui/LoginSpinner";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

function Login() {

  const loginState = useSelector((state: RootState) => state.loginSlice);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
        email: "",
        password: "",
    },
    onSubmit(values) {
        const data = {
            email: values.email,
            password: values.password,
        }
        dispatch(loginFn(data))
    },
    validationSchema: yup.object({
        email: yup.string().email("Please enter a valid email").required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    }),
});

useEffect(() => {
  if(loginState.error) {
      toast.error(loginState.error)
  }
  if(loginState.data.isSuccess) {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={loginState.data?.user?.profile}
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {loginState.data.user.full_name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {loginState.data.user.email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ))
      localStorage.setItem("userData", JSON.stringify(loginState.data));
      navigate("/");
  }
}, [loginState.error, loginState.data.isSuccess]);

const login = useGoogleLogin({
  onSuccess: async (response) => {
    try {

      const res = axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        }
      );

      console.log(res)

    } catch (error) {
      console.log(error)
    }
  },
});

  return (
    <div className="form">
        <div className="frame">
        <div className="intro">
        <h2>Sign In</h2>
        <p>Please enter your details.</p>
        </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="input-box">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" type="email" placeholder="Email" />
            <p className="error">{formik.touched.email && formik.errors.email}</p>
            </div>
            <div className="input-box">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" type="password" placeholder="Password" />
            <p className="error">{formik.touched.password && formik.errors.password}</p>
            </div>
            <div className="forgot">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
              <div className="login">
                <Button disabled={loginState.loading || !formik.isValid}>{loginState.loading ? <LoginSpinner />: "Log in"}</Button>
              </div>
              <div className="another">
                <label><p>Don't have an account?</p><Link to="/auth/sign-up">Sign Up</Link></label>
              </div>
              <div className="footer">
                <Button type="button"><FaApple />Log in with Apple</Button>
                <Button onClick={() => login()} className="google"><FcGoogle />Log in with google</Button>
                <Button type="button" className="facebook"><FaFacebook />Log in with Facebook</Button>
              </div>
          </form>
        </div>
    </div>
  )
}

export default Login