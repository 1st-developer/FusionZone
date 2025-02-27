import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import "../../Styles/login.scss"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {useFormik} from "formik"
import * as yup from "yup"
import { useEffect } from "react";
import toast from "react-hot-toast";
import LoginSpinner from "@/components/ui/goldenSpinner";
import { RegisterFn } from "@/redux/Auth/register.slice";

function Register() {

  const registerState = useSelector((state: RootState) => state.registerSlice);
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
        full_name: "",
        email: "",
        password: "",
        confirm_password: ""
    },
    onSubmit(values) {
        const data = {
            full_name: values.full_name,
            email: values.email,
            password: values.password,
            confirm_password: values.confirm_password
        }
        dispatch(RegisterFn(data))
    },
    validationSchema: yup.object({
        full_name: yup.string().min(8, "Full name must be at least 8 characters").required("full_name is required"),
        email: yup.string().email("Please enter a valid email").required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        confirm_password: yup.string().min(8, "Confirm password must be at least 8 characters").required("Confirm password is required")
    }),
});

useEffect(() => {
  if(registerState.error) {
      toast.error(registerState.error)
  }
  if(registerState.data.isSuccess) {
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
                src={registerState.data?.user?.profile}
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {registerState.data?.user?.full_name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {registerState.data?.user?.email}
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
    ))}
}, [registerState.error, registerState.data.isSuccess]);


  return (
    <div className="form">
        <div className="frame">
        <div className="intro">
        <h2>Sign In</h2>
        <p>Please enter your details.</p>
        </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="input-box">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.full_name} name="full_name" type="text" placeholder="Full name" />
            <p className="error">{formik.touched.full_name && formik.errors.full_name}</p>
            </div>
            <div className="input-box">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" type="email" placeholder="Email" />
            <p className="error">{formik.touched.email && formik.errors.email}</p>
            </div>
            <div className="input-box">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" type="password" placeholder="Password" />
            <p className="error">{formik.touched.password && formik.errors.password}</p>
            </div>
            <div className="input-box">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirm_password} name="confirm_password" type="password" placeholder="Confirm password" />
            <p className="error">{formik.touched.confirm_password && formik.errors.confirm_password}</p>
            </div>
            <div className="forgot">
              <label><input type="checkbox" />Accept terms and conditions?</label>
            </div>
              <div className="login">
                <Button type="submit" disabled={registerState.loading || !formik.isValid}>{registerState.loading ? <LoginSpinner />: "Sign Up"}</Button>
              </div>
              <div className="another">
                <label><p>Already have an account?</p><Link to="/auth/sign-in">Sign In</Link></label>
              </div>
          </form>
        </div>
    </div>
  )
}

export default Register