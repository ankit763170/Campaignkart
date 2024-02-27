"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [user, setUser] = useState(false); 

  return (
    <div>
      <div className="flex border-b py-4 px-10 lg:px-20 justify-between items-center contact-details">
        <Link shallow href="/">
          <div className="">
            <img
              className="w-[120px] lg:w-[65%] xl:w-full"
              src="/assets/images/logo.png"
            />
          </div>
        </Link>
        {user ? (
          <Link shallow href={"/logout"}>
            <div>
              <button className="px-3 py-2 lg:px-4 text-white lg:py-2 buttonShadow bg-brand_secondary text-[10px] lg:text-sm">
                Log out
              </button>
            </div>
          </Link>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default Header;
