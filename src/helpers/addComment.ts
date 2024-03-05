import axios from "axios";

interface Iform {
  blog:string
  name: string;
  message: string;
  parent?: string;
}

const AddComment = async (data: Iform) => {
  try {
  
    const response = await axios.post(
      "/api/comments/add",
      data,
     
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

export default AddComment;
