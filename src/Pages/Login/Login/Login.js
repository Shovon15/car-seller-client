import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { redirect } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import img from "../../../assets/sticker/log-in.png";
import googleicon from "../../../assets/images/google.png";
import { showSuccessToast } from "../../Shared/Toast/toaster";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    // isLoading,
  } = useForm();

  const { user, signIn, googleSignIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  let userRole = "buyer";

  const from = location.state?.from?.pathname || "/";
  // console.log(from, "login from");
  // if (user) {
  //   navigate("/");
  // }
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleLogin = (data) => {
    setIsloading(true);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setIsloading(false);
        showSuccessToast("Login Successfully.");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // console.log(error.message);
        setIsloading(false);
        setLoginError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    // console.log(data);
    setLoginError(""); //for previous error reset
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        saveUser(user.displayName, user.email, userRole, user.photoURL);
      })
      .catch((error) => {
        // console.log(error.message);
        setLoginError(error.message);
      });
  };

  const saveUser = (name, email, userRole, image) => {
    const users = { name, email, userRole, image };

    fetch("https://y-shovon15.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        // setCreatedUserEmail(email);
        getUserToken(email);
        showSuccessToast("Login Successfully.");
      });
  };

  const getUserToken = (email) => {
    fetch(`https://y-shovon15.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          // setToken(data.accessToken);
          navigate(from, { replace: true });
        }
      });
  };

  let value = "Login";
  if (isLoading === true) {
    value = <Spinner color="green" className="mx-auto " />;
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="flex justify-center py-5">
      <Card color="transparent" shadow={false}>
        <div className="mx-auto flex flex-col gap-3">
          <Typography variant="h3" className="text-primary font-bold">
            Login
          </Typography>
          <img src={img} alt="..." className="w-24 h-24" />
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6 text-start">
            <div>
              <Input
                size="lg"
                label="email"
                type="text"
                {...register("email", {
                  required: "Email is Required",
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <Input
                size="lg"
                label="password"
                type={passwordShown ? "text" : "password"}
                {...register("password", {
                  required: "password is Required",
                })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center h-12">
                <span
                  onClick={togglePassword}
                  className="cursor-pointer text-xl"
                >
                  {passwordShown === true ? <VscEye /> : <VscEyeClosed />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button
            value={value}
            type="submit"
            className="mt-6 bg-primary"
            fullWidth
          >
            {value}
          </Button>
          {loginError && <p className="text-red-600">{loginError.slice(10)}</p>}
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account? {""}
            <Link
              to="/signup"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          className="mt-6 flex justify-center items-center gap-2 focus:ring-0"
          fullWidth
        >
          <img src={googleicon} alt="..." className="w-5 h-5 " />
          <p>Google sign in</p>
        </Button>
      </Card>
    </div>
  );
};

export default Login;
