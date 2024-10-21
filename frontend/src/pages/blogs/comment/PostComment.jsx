import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { usePostCommentMutation } from "../../../redux/features/comments/commentsApi";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";

const PostComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // console.log(user?._id)
  // console.log(id)
  const [postComment] = usePostCommentMutation();

  // refetching after comments
  const { refetch } = useFetchBlogByIdQuery(id, {
    skip: !id, // Skip fetching if id is not available
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to post a comment");
      navigate("/login");
      return;
    }

    const newComment = {
      comment: comment,
      user: user?._id,
      postId: id,
    };

    // console.log(newComment)
    try {
      const response = await postComment(newComment).unwrap();
      alert("Comment posted successfully!");
      setComment("");
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-1">Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          cols={30}
          rows={10}
          placeholder="Share your opinion about this post ..."
          className="w-full bg-bgPrimary focus:outline-none p-5"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-36 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md mt-5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;
