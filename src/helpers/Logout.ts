import { logout } from "@/stores/features/auth-slice";
import axios from "axios";
import { Router } from "next/router";

export const handleLogout = (router: any) => {
  axios.get('/api/logout')
    .then(res => {
      if (res.data.status === 'success') {
        console.log('logged out');

      }
      router.refresh();

    })
    .catch(error => {
      console.error("Error logging out:", error);
      // Handle error if necessary
    });
};
