import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Blog = () => {
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
      <div className="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:text-gray-100">
        <Link
          rel="noopener noreferrer"
          href="#"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b dark:border-gray-400 dark:text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>All</span>
        </Link>
        <Link
          rel="noopener noreferrer"
          href="#"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg dark:border-gray-400 dark:text-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>Tech</span>
        </Link>
        <Link
          rel="noopener noreferrer"
          href="#"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b dark:border-gray-400 dark:text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>Beauty</span>
        </Link>
        <Link
          rel="noopener noreferrer"
          href="#"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b dark:border-gray-400 dark:text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          <span>Consectetur</span>
        </Link>
      </div>
      {/* <section className="py-6 sm:py-12 dark:text-gray-100">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Partem reprimique an pro</h2>
            <p className="font-serif text-sm dark:text-gray-400">
              Qualisque erroribus usu at, duo te agam soluta mucius.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
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
                      className="object-cover w-full h-52 dark:bg-gray-500"
                      src={post.image}
                    />
                  </Link>
                  <div className="flex flex-col flex-1 p-6">
                    <Link
                      rel="noopener noreferrer"
                      href="#"
                      aria-label="Te nulla oportere reprimique his dolorum"
                    ></Link>
                    <Link
                      rel="noopener noreferrer"
                      href="#"
                      className="text-xs tracki uppercase hover:underline dark:text-violet-400"
                    >
                      {post.category}
                    </Link>
                    <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                      <span>{post.created_at}</span>
                      <button>read more</button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section> */}
      <section className=" dark:text-gray-100">
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
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
                      className="object-cover w-full h-52 dark:bg-gray-500"
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
                    <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                      <Link className="hover:underline">{post.title}</Link>
                    </h3>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                      <span>
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <button className="hover:underline dark:text-violet-400">
                        read more
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
