import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        const response = await axios.get(
          `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setUser(response.data);
          console.log("user here: ", response.data);
        }
      }
    };
    fetchData();
  }, [isAuthenticated, token]);

  return user;
};
