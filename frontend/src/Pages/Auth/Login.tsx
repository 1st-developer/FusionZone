import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import "../../Styles/login.scss"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {useFormik} from "formik"
import * as yup from "yup"
import { loginFn } from "@/redux/Auth/login.slice";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
      toast.success("Successfully login in");
      localStorage.setItem("userData", JSON.stringify(loginState.data));
      navigate("/");
  }
}, [loginState.error, loginState.data.isSuccess]);

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
                <Button disabled={loginState.loading || !formik.isValid}>Log in</Button>
              </div>
              <div className="another">
                <label><p>Don't have an account?</p><Link to="/auth/sign-up">Sign Up</Link></label>
              </div>
              <div className="footer">
                <Button type="button"><FaApple />Log in with Apple</Button>
                <Button type="button" className="google"><FcGoogle />Log in with Google</Button>
                <Button type="button" className="facebook"><FaFacebook />Log in with Facebook</Button>
              </div>
          </form>
        </div>
    </div>
  )
}

export default Login