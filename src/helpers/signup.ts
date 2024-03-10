import axios from "axios";
import toast from "react-hot-toast";


export const signup = async (user: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>, router: any) => {
  try {
    setLoading(true);
    const response = await axios.post("/api/signup", user);
    console.log("Signup success", response.data);
    toast.success("Account created successfully!");
    router.push("/login");
  } catch (error:any) {
    console.error("Signup failed", error.message);
  } finally {
    setLoading(false);
  }
};

