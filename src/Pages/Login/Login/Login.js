import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import Loader from "../../Shared/Loader/Loader";

const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        isLoading,
    } = useForm();

    const { signIn, googleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState();
    // const [loginUserEmail, setLoginUserEmail] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    let userRole = "buyer";

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (data) => {
        console.log(data);
        setLoginError("");
        signIn(data.email, data.password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error.message);
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

    if (isLoading) {
        return <Loader></Loader>;
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="h-[800px] flex justify-center items-center ">
            <div className="w-96 p-7 shadow-xl  bg-slate-300 dark:bg-slate-600 rounded-xl">
                <h2 className="text-2xl text-center font-bold text-orange-600">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs dark:text-slate-800">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            {...register("email", {
                                required: "Email Address is required",
                            })}
                            className="input input-bordered w-full max-w-xs"
                        />
                        {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs dark:text-slate-800">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={passwordShown ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters or longer" },
                                })}
                                className="input input-bordered w-full max-w-xs"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <span onClick={togglePassword} className="cursor-pointer">
                                    {passwordShown === true ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                    </div>
                    <input
                        className="btn bg-orange-500 hover:bg-orange-700 border-none w-full"
                        value="Login"
                        type="submit"
                    />
                    <div>{loginError && <p className="text-red-600">{loginError}</p>}</div>
                </form>
                <p className="p-4">
                    New to Car Seller
                    <Link className="text-primary px-2 hover:underline" to="/signup">
                        Create new Account
                    </Link>
                </p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
                    CONTINUE WITH GOOGLE
                </button>
            </div>
        </div>
    );
};

export default Login;
