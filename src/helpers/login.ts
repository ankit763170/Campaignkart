import axios from "axios";
import { login } from "@/stores/features/auth-slice";
import { setUser } from "@/stores/features/general-reducer";
import toast from "react-hot-toast";


export const onLogin = async (
    user: any,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    router: any,
    dispatch: any,

) => {
    try {
        setLoading(true);
        const response = await axios.post("/api/login", user);

        console.log("Login success", response.data.message);
        dispatch(login());
        console.log(response.data.email, "Email");
        dispatch(setUser(response.data));
        toast.success("Logged in successfully!");

        router.push("/");
router.refresh()
    } catch (error) {
        console.log("Login failed", error);
    } finally {
        setLoading(false);
    }
};
