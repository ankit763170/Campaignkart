"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { logout } from "@/stores/features/general-reducer";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../src/helpers/Logout";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const Header = () => {
  const router = useRouter();
  const user = Cookies.get("user");
  function logoutHandler() {
    try {
      handleLogout(router);
      Cookies.remove("user");
      toast.success("logged Out");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to Log out!");
    }
  }

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
              height={157}
            />
          </div>
        </Link>
        <div className="ml-auto display: inline-flex flex-wrap gap-3 bg-blue">
          {user ? (
            <button
              onClick={logoutHandler}
              className="px-13 py-2 lg:mx-12 lg:px-4 text-white lg:py-2 buttonShadow bg-primary text-[8px] lg:text-sm justify-between items-center ml-auto"
            >
              Log out
            </button>
          ) : (
            <button className="px-5 py-2 lg:px-4 text-white lg:py-2 buttonShadow bg-primary text-[8px] lg:text-sm justify-between items-center ml-auto">
              <Link href="/signup">Sign Up</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
