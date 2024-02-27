import axios from "axios";

export const onLogin = async (user: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>, router: any) => {
    try {
        setLoading(true);
        const response = await axios.post("/api/login", user);
        console.log("Login success", response.data);
        router.push("/profile");
    } catch (error:any) {
        console.log("Login failed", error.message);
    } finally{
    setLoading(false);
    }
}
