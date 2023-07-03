import { useEffect, useState } from "react";

const useUser = (email) => {
  const [isUser, setIsUser] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`https://y-shovon15.vercel.app/users/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsUser(data);
          setIsUserLoading(false);
        });
    }
  }, [email]);

  return [isUser, isUserLoading];
};

export default useUser;
