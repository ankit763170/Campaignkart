import axios from "axios";
import { login } from "@/stores/features/auth-slice";
import { setUser } from "@/stores/features/general-reducer";


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
        router.push("/");
        dispatch(login());
        dispatch(setUser(response.data.token));
    } catch (error) {
        console.log("Login failed", error.message);
    } finally {
        setLoading(false);
    }
};
