import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  // const [isLoaded, setIsLoaded] = useState(false)
  const [postData, setPostData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
    author: "",
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blog/details/${id}`)
      .then((res) => {
        setPostData(res.data);
        console.log(postData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, postData]);

  return (
<div>
  {postData.length > 0 &&
    postData.map((post) => (
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-evenly">
            <h1
              rel="noopener noreferrer"
              href="#"
              className="text-xl mb-5 tracki uppercase dark:text-blue-700"
            >
              {post.category}
            </h1>
            <h1 className="text-3xl lg:text-4xl uppercase font-bold leading-9 text-gray-300 pb-4">
              {post.title}
            </h1>
            <span className="text-white mt-10">
              {" "}
              {new Date(post.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="w-full lg:w-8/12 ">
            <img
              className="w-full object-cover"
              src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
              alt={post.title}
            />
          </div>
        </div>
        <div className="mt-8">
          <p className="font-normal text-base leading-6 text-gray-300 ">
            {post.body}
          </p>
        </div>
      </div>
    ))}
</div>
  );
};

export default Details;
