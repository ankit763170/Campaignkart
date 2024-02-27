import axios from "axios";


export const signup = async (user: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>, router: any) => {
  try {
    setLoading(true);
    const response = await axios.post("/api/signup", user);
    console.log("Signup success", response.data);
    router.push("/login");
  } catch (error:any) {
    console.error("Signup failed", error.message);
  } finally {
    setLoading(false);
  }
};

