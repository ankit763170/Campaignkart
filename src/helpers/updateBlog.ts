
import axios from "axios"
import { IBlogs, ICases, IUpdateBlogs } from "@/types"



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
   }else{
    return {success:false, message:"data update failed"}
   }
 } catch (error:any) {
    return {success:false, message:error.message}
 }
}

export default UpdateBlog


 