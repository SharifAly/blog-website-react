import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// get specific post with useEffect, params and all is working
// to fix: just render the details after safing in the postData state

const Details = () => {
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
      .get(`http://localhost:5000/details/${id}`)
      .then((res) => {
        setPostData(res);
        console.log(postData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      {postData.length > 0 &&
        postData.map((post) => (
          <div key={post.id} class="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              class="w-full"
              src="/img/card-top.jpg"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Details;
