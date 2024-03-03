"use client";
import React, { useEffect, useState } from "react";
import fetchBlog from "./../../../helpers/fetchBlog";
import { IBlogs } from "./../../../type/index";
import BlogDetails from "./../../../../components/BlogDetails";
import CircularProgress from "@mui/material/CircularProgress";

const BlogRoute = ({
    params,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const [data, setData] = useState<IBlogs | null>(null);
    const [loading, setLoading] = useState(false); //Blog Loading spinner control
    const [commentAdded, setCommentAdded] = useState(true);

    const getData = async () => {
        setLoading(true);
        const response = await fetchBlog({ slug: params.slug });
        setData(response.data?.allBlogs[0]);
        setCommentAdded(false);
        setLoading(false);
    };

    useEffect(() => {
        if (commentAdded) getData();
    }, [commentAdded]);


    if (!data && loading)
        return (
            <div className="flex justify-center items-center min-h-screen w-full">
                <div className="text-white flex justify-center items-center min-h-screen w-full">
                    <CircularProgress color="inherit" size={20} />
                </div>
            </div>
        );

    if (data)
        return (
            <div>
                <BlogDetails data={data} setCommentAdded={setCommentAdded} refresh={getData} />
            </div>
        );
};

export default BlogRoute;
