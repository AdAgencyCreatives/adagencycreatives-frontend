import { useContext } from "react";
import { Context } from "../context/AuthContext";

const useToken = () => {
   const {state:{token}} = useContext(Context);
   return token;
}
 
export default useToken;