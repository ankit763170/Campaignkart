import { IComments } from "@/type";
import React, { useState } from "react";
import CommentForm from "../CommentForm/index";
import AddComment from "@/helpers/addComment";
import { useDispatch } from "react-redux";

import { FaUserCircle } from "react-icons/fa";

interface CommentCardProps {
  name: string;
  message: string;
  replies?: IComments[];
  parent: string;
  blog: string;
  fetchBlogComments: ()=>void
}

const CommentCard: React.FC<CommentCardProps> = ({
  name,
  message,
  replies,
  parent,
  blog,
  fetchBlogComments
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(false);


  const [nameForm, setNameForm] = useState("");
  const [messageForm, setMessageForm] = useState("");
  const handleSubmit = async () => {
    setLoading(true);
    if (parent) {
      const response = await AddComment({
        blog: blog,
        parent,
        name: nameForm,
        message: messageForm,
      });
      console.log(response, "response");
      if (response.success === true) {
       
      alert('comment added succesfully')
        setLoading(false);
        setForm(false);
        fetchBlogComments()
      } else {
       alert('sry unable to add')
      }
    }
  };

  return (
    <div>
      <div className="p-2">
      <div className="flex items-center space-x-2">
  <FaUserCircle className="text-brand_text" />
  <div>{name}</div>
</div>

        <div className="text-sm pt-1 pl-6 text-brand_text">{message}</div>

        <div className="pt-1 flex space-x-5 cursor-pointer">
        <div>
                <p
                  onClick={() => setForm(!form)}
                  className="pl-6 text-brand_secondary text-sm"
                >
                  {form ? "Cancel" : ""} Reply
                </p>
              </div>
          {replies && replies.length > 0 && (
            <div className="flex space-x-5">
              
              <div>
                <p
                  className="text-brand_secondary text-sm"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"} Replies
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {form && (
        <CommentForm
          name={nameForm}
          message={messageForm}
          setMessage={setMessageForm}
          setName={setNameForm}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
      <div className="pl-4">
        {replies &&
          show &&
          replies.length > 0 &&
          replies.map((item) => (
            <CommentCard
              key={item._id}
              name={item.name}
              message={item.message}
              replies={item.replies}
              parent={item?._id || ""}
              blog={item.blog._id || ""}
              fetchBlogComments={fetchBlogComments}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentCard;
