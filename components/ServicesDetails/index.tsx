"use client";
import UpdateService from "@/helpers/updateService";
import { IServices } from "@/type/index";
import { Box, CircularProgress, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const ServicesDetails = ({ data,refresh }: { data: IServices ,refresh: ()=>void }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [shortDescription, setShortDescription] = useState(
    data.short_description
  );
  const user = useSelector((state: any) => state.general.user);
  const [longDescription, setLongDescription] = useState(data.long_description);
  const [coverImage, setCoverImage] = useState(data.cover_image);
  const [icon, setIcon] = useState(data.icon);
  const [slug, setSlug] = useState(data.slug);



  const handleSubmit = async (_id: string) => {
    setLoading(true);
    const response = await UpdateService({
      _id,
      title: title,
      short_description: shortDescription,
      long_description: longDescription,
      cover_image: coverImage,
      icon: icon,
      slug: slug,
      token: user,
    });
    if (response.success === true) {
    alert(  "Services updated successfully")
        
      setLoading(false);
      setTitle("");
      setShortDescription("");
      setLongDescription("");
      setCoverImage("");
      setIcon("");
      
      setSlug("");
      refresh()
    } else {
       alert(  " error in updating Services ")

      setLoading(false);
    }
  };
  const paragraphs = data.long_description.split('\n');

  const style = {
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "2px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
    "&": {
      scrollbarWidth: "thin",
      scrollbarColor: "#888 #555",
    },
    position: "absolute" as "absolute",
    // top: 0,
    // bottom: 0,
    maxHeight: "100vh",
    left: 0,
    right: 0,
    margin: "auto",
    // width: 700,
    bgcolor: "#d9d3d2",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    color: "white",
    overflow: "auto",
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="h-[20vh] bg-brand_bggray pt-16 text-center text-3xl font-semibold">
      <div className="text-[11px] uppercase">
        </div>
        <p>{data.title}</p>
      </div>
      <div className=" hidden md:block">
        <img className="w-full" src="/assets/images/layer2.png" />
      </div>
      
      <div className="md:px-20 px-10 flex flex-wrap-reverse justify-center lg:space-x-8 py-10">
        
        <div className="w-full md:w-5/12">
        <div className="w-full pb-4   lg:pb-0 flex   lg:justify-center md:w-5/12">
          <div className="">
{data.short_description}
          </div>
        </div>
          <div className="text-brand_text text-sm">
            {/* Map each paragraph to a <p> tag */}
            {paragraphs.map((paragraph, index) => (
              <p className="py-1" key={index}>{paragraph}</p>
            ))}
          </div>
         
          <div onClick={() => setOpenModal(true)} className="pt-6">
            <button className="px-4 py-2 bg-brand_secondary text-green">
              Update
            </button>
          </div>
        </div>
        <div className="w-full pb-4   lg:pb-0 flex   lg:justify-center md:w-5/12">
          <div className="">
            <img src={data.cover_image} />
          </div>
        </div>
      </div>

      <div className="relative ">
        <Modal
          className="flex items-center justify-center"
          open={openModal}
          onClose={handleCloseModal}
        >
          <Box sx={style} className="w-[300px] md:w-[500px] lg:w-[700px]">
            <div className="w-full  overflow-auto">
              <div className="z-10 absolute cursor-pointer top-5 text-2xl green text-brand_secondary right-5">
                <RiCloseFill onClick={handleCloseModal} />
              </div>

              <div>
                <div className="flex flex-col">
                  <label htmlFor="title" className="text-lg font-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="short_description"
                    className="text-lg font-semibold"
                  >
                    Short Description
                  </label>
                  <textarea
                    id="short_description"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="long_description"
                    className="text-lg font-semibold"
                  >
                    Long Description
                  </label>
                  <textarea
                    id="long_description"
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                    rows={3}
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="cover_image"
                    className="text-lg font-semibold"
                  >
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    id="cover_image"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="icon" className="text-lg font-semibold">
                    Icon URL
                  </label>
                  <input
                    type="text"
                    id="icon"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="slug" className="text-lg font-semibold">
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={slug}
                    readOnly
                    className="p-2 border rounded text-black bg-gray-100"
                    required
                  />
                </div>

                <div className="">
                  <button
                    onClick={() => data._id && handleSubmit(data._id)}
                    className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {loading ? (
                      <div className="text-white ">
                        <CircularProgress color="inherit" size={20} />
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ServicesDetails;
