import axios from "axios";

const DeleteBlog = async ({ _id }: { _id: string }) => {
  try {
    const response = await axios.delete("/api/blog/delete", {
      data: { _id }
    });

    // No need to check response.status, Axios will throw an error for non-2xx status codes

    // Return the response data if successful
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    // Catch the error and return an object with success: false and the error message
    return {
      success: false,
      message: error.message
    };
  }
};

export default DeleteBlog;
