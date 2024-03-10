import axios from "axios";

interface User {
  name: string;
  email: string;
  password: string;
  token?: string;
}

export default async function AddUser(data: User) {
  try {
    if (!data.name || !data.email || !data.password) {
      throw Error("Missing Fields");
    }
    let config = {
      headers: { Authorization: `Bearer ${data.token}` },
    };
    const response = await axios.post("/api/user/add", data,config);

    if (response.status == 200) {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error?.message || error,
    };
  }
}
