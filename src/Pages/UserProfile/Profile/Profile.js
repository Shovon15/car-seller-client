import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isUser] = useUser(user?.email);
    // console.log(isUser);
    const { name, userRole, image } = isUser;
    return (
        <div>
            <h1>user profile</h1>
            <h1 className="text-3xl">{name}</h1>
            <h1 className="text-3xl">{userRole}</h1>
            <img src={image} alt="avatar" className="w-44 h-44" />
        </div>
    );
};

export default Profile;
