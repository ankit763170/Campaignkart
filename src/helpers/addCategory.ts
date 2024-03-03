import axios from "axios";

interface Iform {
    name: string;
    token: string;
}

const AddCategory = async (data: Iform) => {
    try {
        let config = {
            headers: { Authorization: `Bearer ${data.token}` },
        };
        const response = await axios.post(
            "/api/category/add",
            data,
            config
        );

        if (response.status == 200) {
            return {
                success: true,
                data: response.data,
            };
        } else {
            return { success: false, message: "data submission failed" };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export default AddCategory;