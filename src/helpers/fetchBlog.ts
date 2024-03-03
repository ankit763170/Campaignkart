
import axios from "axios"

interface ISLug{
  slug?:string,
  search?:string,
  page?: number,
  limit?: number,
  category? :string
}

const fetchBlogs = async(props:ISLug)=> {

 try {
   const response = await axios.get("/api/blog",{params:{
    slug: props.slug,
    search:props.search,
    _start: ((props.limit||6)*(props.page||1)-(props.limit||6)),
    _limit: props.limit,
    category :props.category
   }})

   if(response.status == 200){
   return {
    success:true,
    data:response.data
   }
   }else{
    return {success:false, message:"data not available"}
   }
   console.log(response.data,'response')
 } catch (error:any) {
    return {success:false, message:error.message}
 }
}

export default fetchBlogs


 