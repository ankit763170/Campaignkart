
import axios from "axios"

interface Iform {
    title: string,
    short_description: string,
    long_description: string,
    cover_image: string,
    category: string | null,
    slug: string |  'slug' ,
    token: string | null
}

const AddBlog = async (data: Iform) => {
    try {
        let config = {
            headers: { Authorization: `Bearer ${data.token}` },
        };
        const response = await axios.post("/api/blog/add", data)

        if (response.status == 200) {
            return {
                success: true,
                data: response.data
            }
        } else {
            return { success: false, message: "data submission failed" }
        }
    } catch (error: any) {
        return { success: false, message: error.message }
    }
}

export default AddBlog


