"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import addServices from "@/helpers/addServices";

const Services = () => {
 
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.general.user);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [icon, setIcon] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
console.log(user);
  useEffect(() => {

    // Generate slug from title
    const generatedSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/[^a-z0-9-]+/g, ""); // remove non-alphanumeric characters excluding hyphens
    setSlug(generatedSlug);
  }, [title]);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await addServices({
      title: title,
      short_description: shortDescription,
      long_description: longDescription,
      cover_image: coverImage,
      icon: icon,
      slug: slug,
      token: user,
      
    });
    if (response.success === true) {
      alert('Service added successfully');
      setLoading(false);
      setTitle("");
      setShortDescription("");
      setLongDescription("");
      setCoverImage("");
      setIcon("");
      setSlug("");
    } else {
   alert("error in Adding  Service");
      setLoading(false);
    }
  };

  return (
    <div id="add-services" className="space-y-4 py-10 px-10 lg:px-20">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-lg font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="short_description" className="text-lg font-semibold">
          Short Description
        </label>
        <textarea
          id="short_description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="p-2 border rounded"
          required
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label htmlFor="long_description" className="text-lg font-semibold">
          Long Description
        </label>
        <textarea
          id="long_description"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          className="p-2 border rounded"
          required
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label htmlFor="cover_image" className="text-lg font-semibold">
          Cover Image URL
        </label>
        <input
          type="text"
          id="cover_image"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="p-2 border rounded"
          required
          placeholder="https://xyz.com"
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
          className="p-2 border rounded"
          required
          placeholder="https://xyz.com"
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
          className="p-2 border rounded bg-gray-100"
          required
        />
      </div>

      <div>
        <button
          onClick={handleSubmit}
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
  );
};

export default Services;
