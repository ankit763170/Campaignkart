
import axios from "axios"




const DeleteUser = async({_id, token}:{_id:string, token : string})=> {
 try {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
   const response = await axios.post("/api/user/delete",{_id},config)
   if(response.status == 200){
   return {
    success:true,
    data:response.data
   }
   }else{
    return {success:false, message:"data deletion failed"}
   }
 } catch (error:any) {
    return {success:false, message:error.message}
 }
}

export default DeleteUser


 