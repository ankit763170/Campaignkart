
import axios from "axios"
import { IBlogs, ICases, IUpdateBlogs } from "@/type/index"
import toast from "react-hot-toast";



const UpdateBlog = async(data:IUpdateBlogs)=> {
 try {
  let config = {
    headers: { Authorization: `Bearer ${data.token}` },
  };
   const response = await axios.post("/api/blog/update",data,config)

   if(response.status == 200){
   return {
    success:true,
    data:response.data
   }
   toast.success("Successfully Updated Blog");
   }else{
    toast.error("Something went wrong!");
    return {success:false, message:"data update failed"}
   }
 } catch (error:any) {
  toast.error(`${error?.message}`)
    return {success:false, message:error.message}
 }
}

export default UpdateBlog


 