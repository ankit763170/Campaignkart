import axios from "axios"

interface Iform {
    title:string,
    short_description:string,
    long_description:string,
    cover_image:string,
    icon:string,
    slug:string,
    token:string
}

const addServices = async(data:Iform)=> {
 try {
  let config = {
    headers: { Authorization: `Bearer ${data.token}` },
  };
   const response = await axios.post("/api/services/add",data,config)

   if(response.status == 200){
   return {
    success:true,
    data:response.data
   }
   }else{
    return {success:false, message:"data submission failed"}
   }
 } catch (error:any) {
    return {success:false, message:error.message}
 }
}

export default addServices


 