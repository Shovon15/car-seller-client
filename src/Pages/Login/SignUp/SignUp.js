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
import googleicon from "../../../assets/images/google.png";
import { toast } from "react-toastify";
import { showSuccessToast } from "../../Shared/Toast/toaster";
import useToken from "../../../hooks/useToken";

const SignUp = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  // const [createdUserEmail, setCreatedUserEmail] = useState("");
  // const [userCheck, setUserCheck] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [signUpError, setSignUpError] = useState();
  const [userCheck, setUserCheck] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [createdUserEmail, setCreatedUserEmail] = useState("");
  // ---------------------------------⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️-lots of problem here-------
  // const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("isLoading", isLoading);
  // console.log(createdUserEmail, "createdUserEmail from signup");

  const from = location.state?.from?.pathname || "/";

  const imageHostKey = process.env.REACT_APP_img_KEY;

  // if (token) {
  //   navigate(from, { replace: true });
  // }
  const {
    register,
    handleSubmit,
    // isLoading,
    formState: { errors },
  } = useForm();

  // -------------------check buyer/seller-------------
  let userRole = "buyer";
  const toggleUser = () => {
    setUserCheck(!userCheck);
  };
  if (userCheck === true) {
    userRole = "buyer";
  } else {
    userRole = "seller";
  }

  // -----------------------------------

  const handleSignUp = (data) => {
    setIsLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        // console.log(imgData);
        if (imgData.success) {
          let image = imgData.data.url;
          setSignUpError("");
          createUser(data.email, data.password)
            .then((result) => {
              // const user = result.user;
              // console.log(user);
              setIsLoading(false);
              showSuccessToast("Signup Successfully.");
              const userInfo = {
                displayName: data.name,
                image: image,
              };
              updateUser(userInfo)
                .then(() => {
                  saveUser(data.name, data.email, userRole, image);

                  // navigate(from, { replace: true });
                })
                .catch((err) => console.log(err));
            })
            .catch((error) => {
              // console.log(error);
              setIsLoading(false);
              setSignUpError(error.message);
            });
        }
      });
  };

  const handleGoogleSignIn = () => {
    // console.log(data);
    setSignUpError(""); //for previous error reset
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        saveUser(user.displayName, user.email, user.photoURL, userRole);
      })
      .catch((error) => {
        // console.log(error.message);
        setSignUpError(error.message);
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
        // console.log(email, "email from data");
        // setCreatedUserEmail(email);
        getUserToken(email);
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
  let value = "signUp";
  if (isLoading === true) {
    value = <Spinner color="green" className="mx-auto " />;
  }

  // -------------------show pass-----------

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="flex justify-center py-5">
      <Card color="transparent" shadow={false}>
        <div className="mx-auto flex flex-col gap-3">
          <Typography variant="h3" color="blue-gray">
            Sign Up
          </Typography>
          <img src={img} alt="..." className="w-24 h-24" />
        </div>

        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6 text-start">
            {/* <Input size="lg" label="Name" /> */}
            <div>
              <Input
                size="lg"
                label="Name"
                type="text"
                {...register("name", {
                  required: "Name is Required",
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
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
            <div>
              <input
                type="file"
                {...register("image", {
                  required: "Photo is Required",
                })}
                className="input input-bordered w-full  py-2 border border-gray-500 rounded-md"
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
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
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <span onClick={togglePassword} className="cursor-pointer">
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
          {signUpError && (
            <p className="text-red-600">{signUpError.slice(10)}</p>
          )}
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Login
            </Link>
          </Typography>
        </form>
        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          className="mt-6 flex justify-center gap-2 items-center focus:ring-0"
          fullWidth
        >
          <img src={googleicon} alt="..." className="w-5 h-5 " />
          <p>Google sign in</p>
        </Button>
      </Card>
    </div>
  );
};

export default SignUp;
