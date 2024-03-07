
import axios from "axios"
import { IServices } from "@/type/index"



const UpdateService = async(data:IServices)=> {
 try {
  let config = {
    headers: { Authorization: `Bearer ${data.token}` },
  };
   const response = await axios.post("/api/services/update",data,config)

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

export default UpdateService


 