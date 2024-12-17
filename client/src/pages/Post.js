import React, { useState } from "react"; // Import React and useState hook
import logo from "../pictures/blog-images/computer-4484282_1280.jpg"; // Import logo image
import axios from "axios"; // Import axios for making HTTP requests
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast for notifications

const Post = () => {
  const [postData, setPostData] = useState({
    title: "",
    category: "Choose a category",
    body: "",
    image: "null",
  }); // Initialize state for post data

  const token = localStorage.getItem("token"); // Get token from localStorage

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (postData.title === "") {
      toast("Please enter a title"); // Show error if title is empty
      return;
    } else if (postData.category === "Choose a category") {
      toast("Please choose a category"); // Show error if category is not chosen
      return;
    } else if (postData.body === "") {
      toast("Please enter a text"); // Show error if body is empty
      return;
    } else {
      axios
        .post("http://localhost:5000/blog/post", postData, {withCredentials: true}, {
          headers: {
            Authorization: "Bearer " + token,
          },
        }) // Make POST request to create a new post
        .then(() => {
          toast("Posted Successfully"); // Show success message
          setPostData({
            title: "",
            category: "Choose a category",
            body: "",
            image: "null",
          }); // Reset post data
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast("Login to post a new story"); // Show error if user is not logged in
          } else {
            toast("Create post failed"); // Show error if post creation failed
          }
        });
    }
  }; // Handle form submission

  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    }); // Handle input changes and update state
    console.log(postData); // Log post data for debugging
  };

  return (
    <>
      <ToastContainer /> {/* Container for toast notifications */}
      <div className="text-white">
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-row gap-32 justify-center w-3/4 p-6 rounded-xl sm:p-10 dark:bg-gray-900 dark:text-gray-100">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Post a new Story</h1>
              <img src={logo} alt="" className="w-96 rounded-xl opacity-80" /> {/* Display logo image */}
            </div>
            <form onSubmit={handleSubmit} className="space-y-12">
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
                  /> {/* Input for title */}
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
                  </select> {/* Dropdown for category selection */}
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="post" className="text-sm">
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
                  /> {/* Textarea for post body */}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 hover:dark:bg-violet-600 dark:text-gray-900"
                  >
                    Publish Post
                  </button> {/* Submit button */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post; // Export Post component
