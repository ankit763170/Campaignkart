import axios from "axios";

interface ISLug {
  blog?:string;
  limit?: number;
  parent?:string
}

const fetchComments = async (props: ISLug) => {
  try {
    const response = await axios.get("/api/comments", {
      params: {
        blog:props.blog,
        _limit: props.limit,
      },
    });

    if (response.status == 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return { success: false, message: "data not available" };
    }
    console.log(response.data, "response");
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export default fetchComments;
