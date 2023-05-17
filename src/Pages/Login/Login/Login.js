import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import img from "../../../assets/sticker/log-in.png";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    // isLoading,
  } = useForm();

  const { signIn, googleSignIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState();
  // const [loginUserEmail, setLoginUserEmail] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let userRole = "buyer";

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    setIsloading(true);
    console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setIsloading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
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
        console.log(user);
        saveUser(user.displayName, user.email, userRole, user.photoURL);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  const saveUser = (name, email, userRole, image) => {
    const users = { name, email, userRole, image };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(from, { replace: true });
        // console.log("userSaveDb", data);
        // getUserToken(email);
        // if (data.acknowledged) {
        //     setTreatment(null);
        //     toast.success("Booking confirmed");
        //     refetch();
        // } else {
        //     toast.error(data.message);
        // }
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
          <Typography variant="h4" color="blue-gray">
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

          <Button value={value} type="submit" className="mt-6" fullWidth>
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
      </Card>
    </div>
  );
};

export default Login;
