import React from "react";
import { useSelector } from "react-redux";

import commentorIcon from "../../../assets/commentor.png";
import { formatDate } from "../../../utils/formatDate";
import PostComment from "./PostComment";

const CommentCard = ({ comments }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="my-6 bg-white p-3 sm:p-8">
      <div>
        {comments?.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Comments</h3>
            <div>
              {comments.map((comment, index) => (
                <div key={index} className="mt-4">
                  <div className="flex gap-4 items-center">
                    <img src={commentorIcon} alt="" className="h-14" />
                    <div>
                      <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                        {comment?.user?.username
                          ? comment?.user?.username
                          : "Deleted Account"}
                      </p>
                      <p className="text-[12px] italic">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* comments details */}
                  <div className="text-gray-600 mt-5 border p-8">
                    <p>{comment?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-lg font-medium">No comments found!</div>
        )}
      </div>

      {/* comment input here */}
      <PostComment />
    </div>
  );
};

export default CommentCard;
