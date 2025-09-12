import { useState } from "react";
import toast from "react-hot-toast";
import useAuthContext from "../context/useAuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);

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
				localStorage.setItem("user", JSON.stringify(data));
				setAuthUser(data);
	            toast.success("Signup successful");
			} catch (error) {
				toast.error("An error occurred while signing up. Please try again.");
			} finally {
				setLoading(false);
			}
		};

	return { loading, signup };
};
export default useSignup;
