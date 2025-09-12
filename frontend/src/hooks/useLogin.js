import { useState } from 'react'
import useAuthContext  from '../context/useAuthContext'
import toast from 'react-hot-toast'

const useLogin = () => {
    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()

    const login=async(identifier,password)=>{
        setLoading(true)
        try {
            const res = await fetch("http://localhost:1234/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({username: identifier, password})
            })

            const data = await res.json()
            if(data.error){
                if(data.error === "Please provide username and password"){
                    toast.error(data.error);
                    setLoading(false);
                    return;
                }
                throw new Error(data.error)
            }

            // Store specific user data separately
            localStorage.setItem('userId', data._id);
            localStorage.setItem('token', data.token);

            const userData = {
                _id: data.user._id,
                username: data.user.username,
                email: data.user.email,
                token: data.token,
                isAdmin: data.user.isAdmin,
                isVendor: data.user.isVendor,
                isUser: data.user.isUser
            };

            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("userId", data._id); // Store userId separately for easy access
            localStorage.setItem("token", data.token); // Store token separately for easy access
            
            setAuthUser(userData);
            toast.success("Login successful");
            return userData; 
        } catch (error) {
            toast.error(error.message)
            return false;
        } finally {
            setLoading(false)
        }
    }
    return {loading,login}
}
export default useLogin;
