"use client";
import React from "react";
// import { useSelector } from "react-redux";

const Header = () => {
  // const user = useSelector((state) => state.auth.isLoggedIn);
  const user = true;

  return (
    <div>
      <div className="flex border-b py-4 px-10 lg:px-20 justify-between items-center contact-details">
        <div>
          <img
            className="w-[120px] lg:w-[65%] xl:w-full"
            src="/assets/images/logo.png"
          />
        </div>
        {user ? (
          <div>
            <button className="px-3 py-2 lg:px-4 text-white lg:py-2 buttonShadow bg-brand_secondary text-[10px] lg:text-sm">
              Log out
            </button>
          </div>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default Header;
