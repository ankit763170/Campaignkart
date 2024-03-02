import Link from "next/link";
import React from "react";

const ViewContent = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="pt-4">
        <div className="text-2xl  font-semibold ">
          <p>View Content</p>
        </div>
        <div className="pt-4">
          <Link shallow href="/all-services">
            <button className="buttonShadow py-4 bg-blue-500 text-white w-full ">
              View Services
            </button>
          </Link>
        </div>
        <div className="pt-3">
          <Link shallow href="/all-blogs">
            <button className="buttonShadow py-4 bg-blue-500 text-white w-full ">
              View Blogs
            </button>
          </Link>
        </div>
        <div className="pt-3">
          <Link shallow href="/all-cases">
            <button className=" buttonShadow py-4 bg-blue-500 text-white w-full ">
              View Cases
            </button>
          </Link>
        </div>
        <div className="pt-3">
          <Link shallow href="/users">
            <button className=" buttonShadow py-4 bg-blue-500 text-white w-full ">
              View Users
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;
