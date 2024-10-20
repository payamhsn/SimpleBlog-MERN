import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PostComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  // todo : handle submit button to send comments to db.

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-1">Leave a Comment</h3>
      <form>
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
