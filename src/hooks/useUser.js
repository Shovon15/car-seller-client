import { useEffect, useState } from "react";

const useUser = (email) => {
  const [isUser, setIsUser] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  // console.log(isUser, email);

  useEffect(() => {
    if (email) {
      fetch(`https://y-shovon15.vercel.app/users/${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setIsUser(data);
          setIsUserLoading(false);
        });
    }
  }, [email]);
  // console.log(isUser);
  return [isUser, isUserLoading];

  // const isUser = "shovon";
  // return isUser;
};

export default useUser;
