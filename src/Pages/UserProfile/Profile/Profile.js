import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isUser] = useUser(user?.email);
    // console.log(isUser);
    const { name, userRole, image } = isUser;
    return (
        <div className="mx-5 md:mx-10 ">
            <h1 className="text-center font-bold text-xl p-5">Profile</h1>
            <img src={image} alt="avatar" className="w-44 h-44 rounded-full" />
            <h1 className="text-3xl font-bold py-5">{name}</h1>
            <h1 className="text-3xl pb-5">User Role: {userRole}</h1>
        </div>
    );
};

export default Profile;
