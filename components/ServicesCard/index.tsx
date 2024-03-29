import { IServices } from "@/type/index";
import Link from "next/link";
import React, { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import DeleteService from "@/helpers/deleteServices";

export const ServiceCard = ({ item, refresh }: { item: IServices; refresh: () => void }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.general.user);
  const [loading, setLoading] = useState(false);

  function truncateText(text: string | undefined, maxLength: number) {
    if (!text || text.length <= maxLength) {
      return text || '';
    }
    return text.slice(0, maxLength) + '...';
  }

  async function handleDelete(_id: string) {
    try {
      const response = await DeleteService({
        _id,
        token: user,
      });
      if (response.success === true) {
        alert("Service deleted successfully");
        refresh();
      } else {
        alert("Error in deleting service");
      }
    } catch (error) {
      console.error("Delete service error:", error);
      alert("Failed to delete service");
    }
  }

  return (
    <div className="w-full md:w-6/12 lg:w-4/12 py-10 px-4">
      <div className="p-2" key={item.slug}>
        <div className="rounded-md card border servicesCardShadow h-[40vh] relative">
          <Link href={`/all-services/${item.slug}`}>
            <div className="rounded-t-md h-full">
              <img className="w-full rounded-t-md h-full object-cover" src={item.cover_image} alt={item.title} />
            </div>
            <div className="w-full rounded-md h-full top-0 bottom-0 left-0 right-0 flex items-end pb-4 text-white font-semibold bg-black bg-opacity-20 absolute pl-3">
              <p>{item.title}</p>
            </div>
          </Link>
          <div className="h-[30%] rounded-b-md px-2 bg-white">
            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-[12px] text-brand_text">{truncateText(item.short_description, 50)}</p>
              </div>
              <Link shallow href={`/all-services/${item.slug}`}>
                <div className="text-3xl text-brand_headings">
                  <BiRightArrowAlt />
                </div>
              </Link>
            </div>
            <div
              onClick={() => handleDelete(item._id)}
              className="absolute right-2 bottom-2 cursor-pointer z-50"
            >
              <AiFillDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
