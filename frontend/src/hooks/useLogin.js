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

            const userData = {
                _id: data._id,
                username: data.username,
                fullname: data.fullname,
                email: data.email,
                token: data.token,
                admin: data.admin
            };

            console.log('Admin status after login:', userData.admin);
            localStorage.setItem("user", JSON.stringify(userData));
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
