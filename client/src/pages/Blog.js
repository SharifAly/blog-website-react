import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import picture from "../pictures/blog-images/computer-4484282_1280.jpg";
import SkeletonLoader from "../components/SkeletonLoader";

const Blog = () => {
  // State to hold the loading status
const [loading, setLoading] = useState(false);
  // Function to truncate text to a specified limit
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  // State to hold the blog data fetched from the server
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
    author: "",
    date: "",
  });

  // http://localhost:5000/blog/blog api from backend
  // https://jsonplaceholder.typicode.com/posts dummy data

  // Fetch blog data from the server when the component mounts
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setBlogData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <section className="dark:text-gray-100">
        <div className="container max-w-6xl p-10 mx-auto space-y-6 sm:space-y-12 dark:bg-gray-900 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <article className="flex flex-col dark:bg-gray-900">
              <SkeletonLoader key={index} />
              </article>
            ))}
          </div>
        </div>
      </section>
    )
    ;
  }

  return (
    <>
      <section className=" dark:text-gray-100">
        <div className="container max-w-6xl p-10 mx-auto space-y-6 sm:space-y-12 dark:bg-gray-900 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
            {/* Render SkeletonLoader if blogData is empty */}
            {/* {blogData.length < 0 && <SkeletonLoader />} */}
            {/* Map through the blogData and render each post */}
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
                      src={picture}
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
