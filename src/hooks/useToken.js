import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  console.log(email, "email from useToken");
  useEffect(() => {
    if (email) {
      fetch(`https://y-shovon15.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  //   console.log(token, "token");
  return [token];
};

export default useToken;
