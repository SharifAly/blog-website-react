import React, { useState } from "react";
import logo from "../pictures/blog-images/computer-4484282_1280.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Post = () => {
  // State to manage post data
  const [postData, setPostData] = useState({
    title: "",
    category: "Choose a category",
    body: "",
    image: "null",
  });

  // Retrieve token from local storage
  const token = localStorage.getItem("token");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    if (postData.title === "") {
      toast("Please enter a title");
      return;
    } else if (postData.category === "Choose a category") {
      toast("Please choose a category");
      return;
    } else if (postData.body === "") {
      toast("Please enter a text");
      return;
    } else {
      // Send post data to server
      axios
        .post(
          "http://localhost:5000/blog/post",
          postData,
          { withCredentials: true },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(() => {
          toast("Posted Successfully");
          // Reset form fields
          setPostData({
            title: "",
            category: "Choose a category",
            body: "",
            image: "null",
          });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast("Login to post a new story");
          } else {
            toast("Create post failed");
          }
        });
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
    console.log(postData);
  };

  return (
    <>
      <ToastContainer />
      <div className="text-white">
        <div className="flex items-center justify-center min-h-screen p-4">
          {/* Main container */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center w-full max-w-6xl p-6 rounded-xl sm:p-10 dark:bg-gray-900 dark:text-gray-100">
            {/* Left section (Image and title) */}
            <div className="mb-8 text-center mx-auto lg:text-left lg:w-1/2">
              <h1 className="my-3 text-3xl md:text-4xl font-bold">
                Post a new Story
              </h1>
              <img
                src={logo}
                alt=""
                className="w-full max-w-sm lg:max-w-md rounded-xl opacity-80"
              />
            </div>

            {/* Right section (Form) */}
            <form
              onSubmit={handleSubmit}
              className="space-y-8 w-full lg:w-1/2"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block mb-2 text-sm">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="News from the world"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleInputChange}
                    value={postData.title}
                  />
                  <select
                    id="pet-select"
                    className="w-full px-3 py-2 border rounded-md mt-5 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 cursor-pointer"
                    onChange={(e) =>
                      setPostData({ ...postData, category: e.target.value })
                    }
                    value={postData.category}
                    name="category"
                  >
                    <option disabled>Choose a category</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="health/fitness">Health and Fitness</option>
                    <option value="creativity/art">Creativity and Art</option>
                    <option value="technologie">Technologie</option>
                    <option value="travel/advanture">
                      Travel and Adventure
                    </option>
                    <option value="culinary/recipes">
                      Culinary and Recipes
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="post" className="block mb-2 text-sm">
                    Your Post
                  </label>
                  <textarea
                    type="text"
                    name="body"
                    id="post"
                    placeholder=""
                    className="w-full h-40 px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleInputChange}
                    value={postData.body}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 hover:dark:bg-violet-600 dark:text-gray-900"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
