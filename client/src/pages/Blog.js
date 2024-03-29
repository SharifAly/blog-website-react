import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import SkeletonLoader from "../components/SkeletonLoader";

const Blog = () => {
  // const [filter, setFilter] = useState("All");

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
    author: "",
    date: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
      .then((res) => {
        setBlogData(res.data);
        // console.log(blogData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className=" dark:text-gray-100">
        <div className="container max-w-6xl p-10 mx-auto space-y-6 sm:space-y-12 dark:bg-gray-900 rounded-xl">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
            {/* {blogData.length < 0 && <SkeletonLoader />} */}
            {blogData.length > 0 &&
              blogData.map((post) => (
                <article className="flex flex-col dark:bg-gray-900">
                  <Link
                    key={post.id}
                    rel="noopener noreferrer"
                    href="#"
                    aria-label="Te nulla oportere reprimique his dolorum"
                  >
                    <img
                      alt={post.title}
                      className="object-cover w-full h-52 dark:bg-gray-500 rounded-xl"
                      src="https://source.unsplash.com/200x200/?fashion?1"
                    />
                  </Link>
                  <div className="flex flex-col flex-1 p-6">
                    <p
                      rel="noopener noreferrer"
                      href="#"
                      className="text-xs tracki uppercase dark:text-blue-700"
                    >
                      {post.category}
                    </p>
                    <h3 className="flex-1 py-2 text-lg font-semibold leadi hover:underline uppercase">
                      <Link to={`/details/${post.id}`} className="">
                        {post.title}
                      </Link>
                    </h3>
                    <p>{truncateText(post.body, 70)}</p>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                      <span>
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <button>
                        <Link
                          className="text-xs inline-flex items-center font-medium hover:underline dark:text-violet-400"
                          to={`/details/${post.id}`}
                        >
                          read more
                        </Link>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
