
import axios from "axios"

interface ISLug {
    slug?: string
}

const fetchCategory = async (props: ISLug) => {
    try {
        const response = await axios.get("/api/category", {
            params: {
                slug: props.slug
            }
        })



        if (response.status == 200) {
            return {
                success: true,
                data: response.data
            }
        } else {
            return { success: false, message: "data not available" }
        }
        console.log(response.data, 'response')
    } catch (error: any) {
        return { success: false, message: error.message }
    }
}

export default fetchCategory


