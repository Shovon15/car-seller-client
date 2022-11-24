import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const { signIn } = useContext(AuthContext);
    const { loginError, setLoginError } = useState();
    // const [loginUserEmail, setLoginUserEmail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (data) => {
        console.log(data);
        // setLoginError("");
        signIn(data.email, data.password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                // setLoginUserEmail(data.email);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error.message);
                setLoginError(error.message);
            });
    };

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="h-[800px] flex justify-center items-center ">
            <div className="w-96 p-7 rounded-xl shadow-xl">
                <h2 className="text-2xl text-center font-bold text-orange-600">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
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
                    <div className="form-control w-full max-w-xs ">
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
                <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;
