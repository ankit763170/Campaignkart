"use client"
import React, { useEffect, useState } from "react";
import BlogCard from "@/../components/BlogCard/index";
import { BiSearch } from "react-icons/bi";
import fetchBlogs from "@/helpers/fetchBlog";
import { IBlogs } from "@/type/index";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

const Blog = () => {
    const [blogs, setBlogs] = useState<IBlogs[] | null>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchAllBlogs = async () => {
        try {
            setLoading(true);
            const apiResult = await fetchBlogs({
                search,
                page,
                limit,
            });

            if (apiResult.success === true) {
                setTotalItems(apiResult.data.pagination.total);
                const allBlogs = apiResult.data?.allBlogs;

                if (allBlogs) {
                    setBlogs(allBlogs);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        } catch (error: unknown) {
            console.error("An unexpected error occurred:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllBlogs();
    }, [search, page, limit]);

    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }

    return (
        <div>
            <div className="h-[20vh] bg-brand_bggray pt-8 text-center text-3xl font-semibold">
                <div className="text-[11px] uppercase">
                </div>
                <p className="text-3xl pt-3 font-bold">Blog</p>
            </div>
            <div className="hidden md:block">
                <img className="w-full" src="/assets/images/layer2.png" />
            </div>
            <div className="md:px-20 flex flex-wrap w-full items-start px-10">
                <div className="w-full lg:w-9/12">
                    <div className="flex flex-wrap items-center justify-start">
                        {loading ? (
                            <div className="flex justify-center items-center min-h-screen w-full">
                                <div className="text-blue-500 flex justify-center items-center min-h-screen w-full">
                                    <CircularProgress color="inherit" size={20} />
                                </div>
                            </div>
                        ) : !blogs || blogs.length < 1 ? (
                            <p className="flex justify-center items-center min-h-screen w-full">No Blogs Found</p>
                        ) : (
                            blogs &&
                            blogs.map((item) => (
                                <BlogCard
                                    key={item?._id}
                                    item={item}
                                    refresh={fetchAllBlogs}
                                />
                            ))
                        )}
                    </div>
                    <div className="flex justify-center pb-20">
                        <Pagination
                            count={Math.ceil(totalItems / limit)}
                            page={page}
                            onChange={(e, newPage) => setPage(newPage)}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-3/12 ">
                    <div className="py-6">
                        <p className="text-md font-semibold">About The Blog</p>
                        <p className="pt-2 text-[13px] text-brand_text">
                            Welcome to our blog page, where we share valuable insights and
                            expertise on a range of topics. Read our blogs for the latest knowledge and expertise.
                        </p>
                    </div>
                    <div className="border-y bg-white py-6">
                        <div className="relative">
                            <input
                                className="bg-brand_lightgray text-sm py-2 pl-2 rounded-sm w-full"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                            />
                            <div className="absolute top-2 text-lg text-brand_text right-3">
                                <BiSearch />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;