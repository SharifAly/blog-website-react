import React, { useState } from "react";
import logo from "../pictures/blog-images/computer-4484282_1280.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Post = () => {
  const [postData, setPostData] = useState({
    title: "",
    category: "Choose a category",
    body: "",
    image: "null",
  });

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
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
      axios
        .post("http://localhost:5000/post", postData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          toast("Posted Successfully");
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
        {" "}
        <>
          <div className="flex items-center justify-center h-screen">
            {/* <img src={logo} alt="" className="w-40" /> */}
            <div className="flex flex-row gap-32 justify-center w-3/4 p-6 rounded-xl sm:p-10 dark:bg-gray-900 dark:text-gray-100">
              <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Post a new Story</h1>
                <img src={logo} alt="" className="w-96 rounded-xl opacity-80" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-4">
                  <div>
                    <label for="title" className="block mb-2 text-sm">
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
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 mt-7 cursor-pointer opacity-60"
                      onChange={(e) =>
                        setPostData({ ...postData, category: e.target.value })
                      }
                      value={postData.category}
                      name="category"
                    >
                      <option disabled="disabled">Choose a category</option>
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
                    <div className="flex justify-between mb-2">
                      <label for="post" className="text-sm">
                        Your Post
                      </label>
                    </div>
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
                <div className="space-y-2">
                  <div>
                    <button
                      type="submit"
                      className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 hover:dark:bg-violet-600 dark:text-gray-900"
                    >
                      Publish Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Post;
