"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CircularProgress, Modal, Box } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import moment from "moment";
import Link from "next/link";
import ReactQuill from "react-quill";
import { IBlogs, ICategories, IComments } from "@/type";
import AddComment from "@/helpers/addComment";
import fetchComments from "@/helpers/fetchComments";
import UpdateBlog from "@/helpers/updateBlog";
import Comment from "../Comment";

const BlogDetails = ({
  data,
  setCommentAdded,
  refresh
}: {
  data: IBlogs;
  setCommentAdded: (value: boolean) => void;
  refresh: () => void;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [recentPost, setRecentPost] = useState<IBlogs[] | null>(null);
  const [recentComments, setRecentComments] = useState<IComments[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [blogComments, setBlogComments] = useState<IComments[] | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [shortDescription, setShortDescription] = useState(
    data.short_description
  );
  const [longDescription, setLongDescription] = useState(
    data.long_description
  );
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(data.cover_image);
  const [openModal, setOpenModal] = useState(false);
  const [slug, setSlug] = useState(data.slug);

  const handleSubmit = async () => {
    if (data._id) {
      setSubmitLoading(true);
      const response = await AddComment({
        blog: data?._id,
        name: name,
        message: message,
      });
      console.log(response, "response");
      if (response.success === true) {
        setSubmitLoading(false);
        setCommentAdded(true);
        setName("");
        setMessage("");
        fetchBlogComments();
      } else {
        console.log("Comment submission failed");
      }
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      // Fetch recent blogs
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const fetchRecentComments = async () => {
    try {
      // Fetch recent comments
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const fetchBlogComments = async () => {
    try {
      // Fetch blog comments
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const handleUpdate = async (_id: string) => {
    setLoading(true);
    const response = await UpdateBlog({
      _id,
      title: title,
      shortDescription: shortDescription,
      longDescription: longDescription,
      coverImage: coverImage,
      slug: slug
    });
    if (response.success === true) {
      setLoading(false);
      router.push("/all-blogs");
      setTitle("");
      setCoverImage("");
      setLongDescription("");
      setShortDescription("");
      setSlug("");

    } else {
      console.log("Form submission failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogComments();
    fetchRecentBlogs();
    fetchRecentComments();
  }, []);

  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
    maxHeight: "100vh",
    left: 0,
    right: 0,
    margin: "auto",
    bgcolor: "#d9d3d2",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    color: "white",
    overflow: "auto",
  };

  return (
    <div className=" ">
      <p className="px-10 pb-4 lg:text-3xl bg-brand_bggray pt-3 font-semibold">
        {data.title}
      </p>
      <div className="h-auto bg-brand_bggray pb-16 pt-16 text-center "></div>
      <img src={data.cover_image} />
      <div className="pt-5 hidden md:block md:pt-0">
        <img className="w-full" src="/assets/images/layer2.png" />
      </div>
      <div className="flex flex-wrap py-10 lg:px-20 px-10 justify-start">
        <div
          className="pt-6 text-sm text-brand_text"
          dangerouslySetInnerHTML={{ __html: data.long_description }}
        ></div>
        <div> </div>
        <div>
          <div className="pt-6">
            <button
              onClick={() => setOpenModal(true)}
              className="px-4 py-2 bg-brand_secondary text-white text-sm"
            >
              Update
            </button>
          </div>
        </div>
        <div className="relative ">
          <Modal
            className="flex items-center justify-center"
            open={openModal}
            onClose={handleCloseModal}
          >
            <Box sx={style} className="w-[300px] md:w-[500px] lg:w-[700px]">
              <div className="w-full overflow-auto">
                <div className="z-10 absolute cursor-pointer top-5 text-2xl text-brand_secondary right-5">
                  <RiCloseFill onClick={handleCloseModal} />
                </div>

                <div className="text-black">
                  <div className="pt-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>

                  <div className="pt-4">
                    <label
                      htmlFor="short_description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Short Description
                    </label>
                    <textarea
                      id="short_description"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <label
                      htmlFor="long_description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Long Description
                    </label>
                    <ReactQuill
                      theme="snow"
                      className="text-black"
                      value={longDescription}
                      onChange={setLongDescription}
                    />
                  </div>

                  <div className="pt-4">
                    <label
                      htmlFor="cover_image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      id="cover_image"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => data._id && handleUpdate(data._id)}
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
    </div>
  );
};

export default BlogDetails;
