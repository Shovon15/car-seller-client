import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState("");
    const [userCheck, setUserCheck] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [signUpError, setSignUpError] = useState();

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
    // console.log(userRole);

    const handleSignUp = (data) => {
        setSignUpError("");
        createUser(data.email, data.password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                toast("User Created Successfully.");
                const userInfo = {
                    displayName: data.name,
                };
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, userRole);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((error) => {
                console.log(error);
                setSignUpError(error.message);
            });
    };

    const saveUser = (name, email, userRole) => {
        const users = { name, email, userRole };

        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(users),
        })
            .then((res) => res.json())
            .then((data) => {
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

    // -------------------show pass-----------

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    return (
        <div className="h-[800px] flex justify-center items-center">
            <div className="w-96 p-7">
                <h2 className="text-2xl text-center font-bold text-orange-600">Sign Up</h2>

                <span onClick={toggleUser} className="flex space-x-2 justify-center items-center p-2 text-orange-600">
                    <button className="btn btn-outline btn-sm">{userRole} </button>
                    <p className="font-bold">Account</p>
                </span>

                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Name is Required",
                            })}
                            className="input input-bordered w-full max-w-xs"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "email is required",
                            })}
                            className="input input-bordered w-full max-w-xs"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={passwordShown ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                        message: "Password must have uppercase, number and special characters",
                                    },
                                })}
                                className="input input-bordered w-full max-w-xs"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <span onClick={togglePassword} className="cursor-pointer">
                                    {passwordShown === true ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <input
                        className="btn bg-orange-500 hover:bg-orange-700 border-none w-full mt-4"
                        value="Sign Up"
                        type="submit"
                    />
                    {signUpError && <p className="text-red-600">{signUpError}</p>}
                </form>
                <p className="p-4">
                    Already have an account
                    <Link className="text-primary px-2 hover:underline" to="/login">
                        Please Login
                    </Link>
                </p>
                <div className="divider">OR</div>
                <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;