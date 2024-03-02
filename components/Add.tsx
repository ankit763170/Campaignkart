import Link from "next/link";
import React from "react";

const AddContent = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="pt-4">
        <div className="text-2xl  font-semibold ">
          <p>Add Content</p>
        </div>
        <div className="pt-4">
          <Link shallow href="/add-services">
            <button className="buttonShadow py-4 bg-blue-500 text-white w-full ">
              Add Services
            </button>
          </Link>
        </div>
        <div className="pt-3">
          <Link shallow href="/add-blogs">
            <button className="buttonShadow py-4 bg-blue-500 text-white w-full ">
              Add Blogs
            </button>
          </Link>
        </div>
        <div className="pt-3">
          <Link shallow href="/add-cases">
            <button className=" buttonShadow py-4 bg-blue-500 text-white w-full ">
              Add Cases
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
