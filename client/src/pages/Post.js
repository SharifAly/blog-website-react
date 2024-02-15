import React from "react";
import logo from "../pictures/blog-images/computer-4484282_1280.jpg";

const Post = () => {
  const handleSubmit = () => {
    alert("Post uploaded successfully!");
  };
  return (
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
                    // onChange={handleInputChange}
                    // value={loginData.email}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label for="post" className="text-sm">
                      Your Post
                    </label>
                  </div>
                  <textarea
                    type="text"
                    name="post"
                    id="post"
                    placeholder=""
                    className="w-full h-40 px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    // onChange={}
                    // value={}
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
  );
};

export default Post;
