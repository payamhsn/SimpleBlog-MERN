import React from "react";
import { Link, useParams } from "react-router-dom";

import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/blogsApi";

const RelatedBlogs = () => {
  const { id } = useParams();
  const { data: blogs = [], error, isLoading } = useFetchRelatedBlogsQuery(id);

  return (
    <div>
      <h3 className="text-2xl font-medium pt-8 px-3 sm:px-8 pb-5">
        Related Blogs
      </h3>
      <hr />
      {blogs.length > 0 ? (
        <div className="space-y-4 mt-5">
          {blogs.map((blog, index) => (
            <Link
              to={`/blogs/${blog?._id}`}
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm px-8 py-4"
            >
              <div className="size-14">
                <img
                  src={blog.coverImg}
                  alt=""
                  className="h-full w-full rounded-full ring-2 ring-blue-700"
                />
              </div>

              <div className="flex-1 sm:flex-grow">
                <h4 className="text-xl font-medium text-[#1E73BE]">
                  {blog?.title.substring(0, 50)}
                </h4>
                <p className="text-gray-600 text-sm">
                  {blog?.description.substring(0, 50)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8">No related blogs found!</div>
      )}
    </div>
  );
};

export default RelatedBlogs;
