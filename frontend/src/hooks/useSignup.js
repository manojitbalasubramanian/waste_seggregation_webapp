import { useState } from "react";
import toast from "react-hot-toast";
import useAuthContext from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const {AuthUser,setAuthUser}= useAuthContext();

		const signup = async ({username, email, password, confirmpassword, isAdmin, isVendor, isUser}) => {
			setLoading(true);
			try {
				const res = await fetch("http://localhost:1234/auth/signup", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({username, email, password, confirmpassword, isAdmin, isVendor, isUser}),
				});

				const data = await res.json();
				if (data.error) {
					toast.error(data.error);
					return;
				}

				const userData = {
					_id: data.user._id,
					username: data.user.username,
					email: data.user.email,
					token: data.token,
					admin: data.user.isAdmin,
					cardNumber: data.user.cardNumber
				};

                // Store user data in localStorage
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("userId", userData._id); // Store userId separately for easy access
                localStorage.setItem("token", userData.token); // Store token separately for easy access
                
                setAuthUser(userData);
	            toast.success("Signup successful");
                navigate('/');
			} catch (error) {
				toast.error("An error occurred while signing up. Please try again.");
			} finally {
				setLoading(false);
			}
		};

	return { loading, signup };
};
export default useSignup;
