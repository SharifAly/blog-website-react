import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import picture from "../pictures/blog-images/computer-4484282_1280.jpg";
import SkeletonLoader from "../components/SkeletonLoader";

const Blog = () => {
  // State to hold the loading status
  const [loading, setLoading] = useState(false);

  // State to hold all blog data
  const [blogData, setBlogData] = useState([]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // http://localhost:5000/blog/blog api from backend
  // https://jsonplaceholder.typicode.com/posts dummy data

  // Fetch blog data from the server when the component mounts
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/blog/blog")
      .then((res) => {
        setBlogData(res.data);
        console.log(res.data);
        
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Logic to paginate posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <section className="dark:text-gray-100">
        <div className="container max-w-6xl p-10 mx-auto space-y-6 sm:space-y-12 dark:bg-gray-900 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="dark:text-gray-100">
        <div className="container max-w-6xl p-10 mx-auto space-y-6 sm:space-y-12 dark:bg-gray-900 rounded-xl shadow-2xl">
          {/* Blog Posts */}
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <article key={post.id} className="flex flex-col dark:bg-gray-900">
                <Link to={`/details/${post.id}`} aria-label={post.title}>
                  <img
                    alt={post.title}
                    className="object-cover w-full h-52 dark:bg-gray-500 rounded-xl"
                    src={picture}
                  />
                </Link>
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-xs uppercase dark:text-blue-700">
                    {post.category}
                  </p>
                  <h3 className="flex-1 py-2 text-lg font-semibold uppercase hover:underline">
                    <Link to={`/details/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>{post.content ? post.content.substring(0, 70) + "..." : ""}</p>
                  <div className="flex justify-between pt-3 text-xs dark:text-gray-400">
                    <span>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <Link
                      to={`/details/${post.id}`}
                      className="hover:underline dark:text-violet-400"
                    >
                      read more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(blogData.length / postsPerPage) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
