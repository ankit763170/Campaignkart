"use client";
// src/app/add-blogs/page.tsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import AddBlog from "@/helpers/addBlog";
import toast from "react-hot-toast";

export default function Page() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [long_description, setLongDescription] = useState("");
  const [cover_image, setCoverImage] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const response = await AddBlog({
      title: title,
      short_description: short_description,
      long_description: long_description,
      cover_image: cover_image,
      slug: slug,

    });
    if (response.success === true) {
      toast.success("Blog added successfully!");
      setLoading(false);
      setTitle("");
      setSlug("");
      setBlogCategory("");
      setCoverImage("");
      setLongDescription("");
      setShortDescription("");
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlogCategory(event.target.value);
  };

  useEffect(() => {
    const generatedSlug = title
    .toLowerCase()
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/[^a-z0-9-]+/g, ""); // remove non-alphanumeric characters excluding hyphens
  setSlug(generatedSlug);
  }, [title]);

  return (
    <div className="lg:px-20 px-10">
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
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
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
          value={short_description}
          onChange={(e) => setShortDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        ></textarea>
      </div>

      <div className="pt-4">
        <label
          htmlFor="long_description"
          className="block text-sm font-medium text-gray-700"
        >
          Long Description
        </label>
        <textarea
          id="long_description"
          value={long_description}
          onChange={(e) => setLongDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        ></textarea>
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
          value={cover_image}
          onChange={(e) => setCoverImage(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>

      <button
        onClick={() => handleSubmit()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
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
  );
}
