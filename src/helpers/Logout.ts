import { logout } from "@/stores/features/auth-slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const handleLogout = () => {
    const dispatch= useDispatch();

  axios.get('/api/logout')
    .then(res => {
      if (res.data.status === 'success') {
        dispatch(logout())
        window.location.href = "/login";
      }
    })
    .catch(error => {
      console.error("Error logging out:", error);
      // Handle error if necessary
    });
};
