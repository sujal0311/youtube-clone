import React, { useContext } from "react";
import { BiLike } from "react-icons/bi";
import { SlDislike } from "react-icons/sl";
import { Context } from "../context/contextApi";
function CommentBox({ comment }) {
  const { enabled } = useContext(Context);
  return (
    <div>
      <div className={`flex my-4 ${enabled ? "text-black" : "text-black"}`}>
        <div className="w-16 h-10 md:w-10 md:h-10 rounded-full">
          <img src={comment?.author?.avatar[0]?.url} />
        </div>
        <div className="">
          <div className="flex ">
            <h1
              className={`font-bold text-[13px] mx-4 ${
                !enabled ? "text-black" : "text-white"
              }`}
            >
              {comment?.author?.title}
            </h1>
            <h1 className={`${!enabled ? "text-black" : "text-white"}`}>
              {comment?.publishedTimeText}
            </h1>
          </div>
          <p
            className={`text-[14px] mx-4 ${
              !enabled ? "text-black" : "text-white"
            }`}
          >
            {comment?.content}
          </p>
          <div
            className={`flex gap-4 items-center mt-2 mx-4 ${
              !enabled ? "text-black" : "text-white"
            }`}
          >
            <div
              className={`flex items-center gap-1 ${
                !enabled ? "text-black" : "text-white"
              }`}
            >
              <BiLike /> {comment?.stats?.votes}
            </div>
            <SlDislike />
            <span>Reply {comment?.stats?.replies}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
