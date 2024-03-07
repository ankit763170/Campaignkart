"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";

const Header = () => {
  const user = useSelector((state) => state.general.user);
  return (
    <div>
      <div className="flex border-b py-4 px-10 lg:px-20 justify-between items-center contact-details">
        <Link shallow href="/">
          <div>
            <Image
              className="w-[120px] lg:w-[65%] xl:w-full"
              src="/assets/images/logo.png"
              alt="Logo"
              width={128}
              height={57}
            />
          </div>
        </Link>
        {user ? (
          <Link shallow href="/logout">
            <button className="px-3 py-2 lg:px-4 text-white lg:py-2 buttonShadow bg-brand_secondary text-[10px] lg:text-sm">
              Log out
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
