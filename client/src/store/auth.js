import { createContext, useContext, useEffect, useState } from "react";
import IdleMonitor from "./IdleMonitor";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user,setUser]=useState("");
  const [isLoading,setIsLoading]=useState(true);
  const [places,setPlaces]=useState("");
  const authorizationToken=`Bearer ${token}`;
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
    
  };

  const userAuthentication=async()=>{
    try {
      const response=await fetch('http://localhost:5000/api/auth/user',{
        method:"GET",
        headers:{
          Authorization: authorizationToken,
        },
      });

      if(response.ok){
        const data=await response.json();
        console.log('user data',data.userData);
        setUser(data.userData);
        setIsLoading(false);
      }else{
        console.error("Error fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  }

  const getPlaces=async()=>{
    try {
      const response=await fetch("http://localhost:5000/api/places/getdata",{
        method:"GET",
      });
      if(response.ok){
        const data=await response.json();
        console.log(data.msg);
        setPlaces(data)
      }
    } catch (error) {
      console.log(`Places frontend error:${error}`);
    }
  }

  useEffect(()=>{
    getPlaces();
    userAuthentication();
  },[]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser,user,places,authorizationToken,isLoading, }}>
      {token && <IdleMonitor />} 
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};