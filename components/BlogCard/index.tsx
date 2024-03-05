import { IBlogs } from "../../src/type/index";
import Link from "next/link";
import React from "react";
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";
import DeleteBlog from "../../src/helpers/deleteBlog";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  item: IBlogs;
  refresh: () => void;
}

const BlogCard: React.FC<Props> = ({ item, refresh }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.general.user);

  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }
  const router = useRouter()

  const handleDelete = async (_id: string) => {
    const response = await DeleteBlog({
      _id,
      token: user,
    });
    if (response.success === true) {
      alert("blog deleted..");
      refresh()
    } else {
      console.error("Failed to delete blog");
      alert("blog deleted..");
    }
  };

  return (
    <div className="flex flex-wrap w-full md:w-6/12 p-2 lg:p-4 md:p-4 xl:p-6">
      <div className="w-full p-2">
        <div className="card border rounded-b-lg servicesCardShadow h-[55vh] xl:h-[45vh] 3xl:h-[45vh]">
          <div className="h-[60%]">
            <div className="h-full">
              <img
                className="w-full rounded-t-lg h-full object-cover"
                src={item.cover_image}
              />
            </div>
          </div>
          <div className="h-[40%] g px-2 bg-white ">
            <div className="text-[10px] xl:text-[10px] pt-2 text-brand_text flex">
              <div className="border-r-2  pr-3 border-r-brand_text"></div>
            </div>
            <div className="pt-2 ">
              <p className="text-[14px] xl:text-md">{truncateText(item.title, 40)}</p>
              <p className="text-[10px] xl:text-sm pt-2 text-brand_text">
                {item.short_description}
              </p>
            </div>
            <div className="flex justify-between">
              <Link shallow href={`/all-blogs/${item.slug}`}>
                <div className="text-[10px] xl:text-sm text-brand_headings pt-3">
                  Read more
                </div>
              </Link>
            </div>
            <div className="flex justify-center items-center pt-2">
            <div
              onClick={() => item._id && handleDelete(item._id)}
              className="text-xl cursor-pointer text-brand_secondary align"
            >
              <AiFillDelete />
            </div>
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
