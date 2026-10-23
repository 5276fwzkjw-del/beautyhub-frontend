import { Navigate } from "react-router-dom";


const ProtectBrowser=({children, allowedRoles})=>{
    const token = localStorage.getItem("token");
    const userRole= localStorage.getItem("role");
    if(!token){
        return <Navigate to="/login" replace/>
    }
    if(userRole !== allowedRoles){
        return <Navigate to="/login" replace/>
    }
    return children;
}
export default ProtectBrowser;