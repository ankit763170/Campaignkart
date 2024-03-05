import { IComments } from "@/type";
import React from "react";
import CommentCard from "./CommentCard";

interface ITComments {
  comments: IComments[];
  fetchBlogComments: ()=>void
}

const Comment: React.FC<ITComments> = ({ comments ,fetchBlogComments}) => {
  return (
    <div>
      <div className="pt-4">
        {comments?.map((item: IComments) => (
          <CommentCard
            key={item._id}
            name={item.name}
            message={item.message}
            replies={item.replies}
            parent={item?._id||""}
            blog = {item.blog._id||""}
            fetchBlogComments = {fetchBlogComments}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
