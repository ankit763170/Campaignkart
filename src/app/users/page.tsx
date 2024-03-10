"use client";
import fetchUsers from "@/helpers/fetchUser";
import { IUser } from "@/type/index";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import DeleteUser from "@/helpers/deleteUser";
import toast from "react-hot-toast";

const User = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser[] | null>(null);
  const currentUser = useSelector((state: any) => state.general.user);

  const fetchAllUser = async () => {
    try {
      const apiResult = await fetchUsers({});
      if (apiResult.success === true) {
        const response = apiResult.data?.allUsers;
        
        if (response && response.length > 0) {
          setUser(response);

        } else {
            toast.error("No user found");
       
          
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("An unexpected error occurred:", error.message);
       toast.error( "Failed to fetch data")
        
        
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    const response = await DeleteUser({
      _id,
      token: currentUser.token,
    });
    if (response.success === true) {
     
    toast.success( `Deleted User Successfully` );

      fetchAllUser();
    } else {
    toast.error(`Error deleting the user.`);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className="lg:px-20 px-10">
      <div className="text-2xl font-semibold p-4">
        <p>All Users</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <div className = "text-white "><CircularProgress  color="inherit" size={20} /></div>
        </div>
      ) : !user || user.length < 1 ? (
        <p>No User Found</p>
      ) : (
        <div className="flex flex-wrap  justify-center">
          {user.map((item) => (
            <div
              key={item._id}
              className="m-4 relative p-6 border text-center rounded shadow-lg max-w-sm w-full"
            >
              <div className="w-full flex justify-center py-4 text-4xl">
                <FaUserCircle />
              </div>
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600">{item.email}</p>
              <div
                onClick={() => item._id && handleDelete(item._id)}
                className="text-xl absolute bottom-5 right-5 flex justify-end pt-3 cursor-pointer text-brand_secondary"
              >
                <AiFillDelete />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
