import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import logo from "../pictures/blog-images/work-4997565_1280.png";
import picture from "../pictures/blog-images/computer-4484282_1280.jpg";
import axios from "axios";


const Home = () => {
  // State to store the latest posts
  const [latestPosts, setLatestPosts] = useState({
    title: "",
    category: "",
    image: null,
    author: "",
  });

  // Fetch the latest posts from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/blog/latest")
      .then((res) => {
        setLatestPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Calculate the time difference between current time and login time
  const currentTime = new Date().getTime();
  const loginTime = localStorage.getItem("setCurrentTime");

  const diffMs = currentTime - loginTime;

  const diffHours = Math.abs(diffMs / 1000 / 60 / 60);
  const diffHoursRound = Math.round(diffHours);

  // Clear local storage if the time difference is greater than 12 hours
  useEffect(() => {
    if (diffHoursRound > 12) {
      localStorage.clear();
    }
  }, [diffHoursRound, diffHours]);

  // Function to truncate text to a specified limit
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  // State to store email data
  const [emailData, setEmailData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const form = useRef();

  // Handle input change for email form
  const handleInputChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  // Handle form submission for sending email
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_1zg6p5s", "template_o3bkkuk", form.current, {
        publicKey: "tTRUGTPu9VXMH1cbC",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setEmailData({
            user_name: "",
            user_email: "",
            message: "",
          });
          navigate("/");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <>
      <div className="flex justify-center flex-col items-center">
        {/* Header section */}
        <div className="grid items-center justify-center gap-4 px-4 text-center md:gap-8 md:px-6 lg:gap-12">
          <div className="space-y-4 lg:space-y-5 xl:space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Latest Posts
              </h2>
            </div>
            <div className="space-y-2">
              <p className="text-white mx-auto max-w-[800px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A place for all your thoughts. Share your news with the world.
              </p>
            </div>
          </div>
        </div>
        {/* Latest posts section */}
        <div className="container grid items-center justify-center gap-8 py-10 px-4 text-center md:py-16 md:px-6 lg:gap-12">
          <div className="rounded-lg dark:bg-gray-900 px-20 shadow-2xl">
            <div className="grid grid-cols-1 gap-24 items-stretch justify-center md:grid-cols-2">
              {latestPosts.length > 0 &&
                latestPosts.map((post) => (
<article className="flex flex-col items-center dark:bg-gray-900">
  <div className="flex justify-center w-full">
    <Link
      key={post.id}
      rel="noopener noreferrer"
      href="#"
      aria-label="Te nulla oportere reprimique his dolorum"
    >
      <img
        alt={post.title}
        className="object-cover mt-3 dark:bg-gray-500 rounded-xl"
        src={picture}
      />
    </Link>
  </div>
  <div className="flex flex-col flex-1 p-6 items-center text-center">
    <p
      rel="noopener noreferrer"
      href="#"
      className="text-xs tracki uppercase dark:text-blue-700"
    >
      {post.category}
    </p>
    <h3 className="flex-1 py-2 text-lg font-semibold leadi hover:underline uppercase">
      <Link to={`/details/${post.id}`} className="dark:text-gray-300">
        {post.title}
      </Link>
    </h3>
    <p className="text-white">{truncateText(post.body, 70)}</p>
    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-300">
      <span>
        {new Date(post.created_at).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    </div>
  </div>
</article>
                ))}
            </div>
          </div>
        </div>
        {/* About the blog section */}
        <div className="border-t border-gray-200">
          <div className="container grid items-center justify-center gap-8 py-10 px-4 text-center md:py-16 md:px-6 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About the Blog
              </h2>
              <p className="text-white mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We are open for new ideas and wishes, please send us a message.
              </p>
            </div>
          </div>
        </div>
        {/* Contact form section */}
        <div className="flex items-center justify-center h-screen">
          {/* <img src={logo} alt="" className="w-40" /> */}
          <div className="flex flex-row gap-32 justify-center w-3/4 p-6 rounded-xl sm:p-10 dark:bg-gray-900 dark:text-gray-100">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Let's talk</h1>
              <p className="opacity-55">
                If you have a problem send us a message
              </p>
              <img src={logo} alt="" className="w-96 rounded-xl opacity-75" />
            </div>
            <form ref={form} onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-4">
                <div>
                  <label for="user_name" className="block mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleInputChange}
                    // onChange={handleInputChange}
                    value={emailData.user_name}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label for="user_email" className="text-sm">
                      Email
                    </label>
                  </div>
                  <input
                    type="email"
                    name="user_email"
                    id="user_email"
                    placeholder="john.doe@example.com"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleInputChange}
                    // onChange={}
                    value={emailData.user_email}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label for="message" className="text-sm">
                      Your Message
                    </label>
                  </div>
                  <textarea
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Your message"
                    className="w-full h-40 px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleInputChange}
                    // onChange={}
                    value={emailData.message}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <input
                    type="submit"
                    value="Send"
                    className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 hover:dark:bg-violet-600 dark:text-gray-900 cursor-pointer"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <h1 className="text-white text-center font-bold text-3xl italic shadow-md underline">
        Latest Posts
      </h1> */}
      {/* <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold leading-9 text-center text-white">
              This Week Blogs
            </h1>
            <p className="text-base leading-normal text-center text-white mt-4 lg:w-1/2 md:w-10/12 w-11/12">
              If you're looking for random paragraphs, you've come to the right
              place. When a random word or a random sentence isn't quite enough
            </p>
          </div>
          <div className="lg:flex items-stretch md:mt-12 mt-8">
            <div className="lg:w-1/2">
              <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
                <div className="sm:w-1/2 relative">
                  <div>
                    <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-xl font-semibold 5 text-white">
                        The Decorated Ways
                      </h2>
                      <p className="text-base leading-4 text-white mt-2">
                        Dive into minimalism
                      </p>
                      <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                        <p className="pr-2 text-sm font-medium leading-none">
                          Read More
                        </p>
                        <svg
                          className="fill-stroke"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.75 12.5L10.25 8L5.75 3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <img
                    src="https://i.ibb.co/DYxtCJq/img-1.png"
                    className="w-full"
                    alt="chair"
                  />
                </div>
                <div className="sm:w-1/2 sm:mt-0 mt-4 relative">
                  <div>
                    <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-xl font-semibold 5 text-white">
                        The Decorated Ways
                      </h2>
                      <p className="text-base leading-4 text-white mt-2">
                        Dive into minimalism
                      </p>
                      <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                        <p className="pr-2 text-sm font-medium leading-none">
                          Read More
                        </p>
                        <svg
                          className="fill-stroke"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.75 12.5L10.25 8L5.75 3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <img
                    src="https://i.ibb.co/3C5HvxC/img-2.png"
                    className="w-full"
                    alt="wall design"
                  />
                </div>
              </div>
              <div className="relative">
                <div>
                  <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                    12 April 2021
                  </p>
                  <div className="absolute bottom-0 left-0 md:p-10 p-6">
                    <h2 className="text-xl font-semibold 5 text-white">
                      The Decorated Ways
                    </h2>
                    <p className="text-base leading-4 text-white mt-2">
                      Dive into minimalism
                    </p>
                    <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                      <p className="pr-2 text-sm font-medium leading-none">
                        Read More
                      </p>
                      <svg
                        className="fill-stroke"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.75 12.5L10.25 8L5.75 3.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <img
                  src="https://i.ibb.co/Ms4qyXp/img-3.png"
                  alt="sitting place"
                  className="w-full mt-8 md:mt-6 hidden sm:block"
                />
                <img
                  className="w-full mt-4 sm:hidden"
                  src="https://i.ibb.co/6XYbN7f/Rectangle-29.png"
                  alt="sitting place"
                />
              </div>
            </div>
            <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
              <div className="relative">
                <div>
                  <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                    12 April 2021
                  </p>
                  <div className="absolute bottom-0 left-0 md:p-10 p-6">
                    <h2 className="text-xl font-semibold 5 text-white">
                      The Decorated Ways
                    </h2>
                    <p className="text-base leading-4 text-white mt-2">
                      Dive into minimalism
                    </p>
                    <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                      <p className="pr-2 text-sm font-medium leading-none">
                        Read More
                      </p>
                      <svg
                        className="fill-stroke"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.75 12.5L10.25 8L5.75 3.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <img
                  src="https://i.ibb.co/6Wfjf2w/img-4.png"
                  alt="sitting place"
                  className="w-full sm:block hidden"
                />
                <img
                  className="w-full sm:hidden"
                  src="https://i.ibb.co/dpXStJk/Rectangle-29.png"
                  alt="sitting place"
                />
              </div>
              <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4">
                <div className="relative w-full">
                  <div>
                    <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-xl font-semibold 5 text-white">
                        The Decorated Ways
                      </h2>
                      <p className="text-base leading-4 text-white mt-2">
                        Dive into minimalism
                      </p>
                      <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                        <p className="pr-2 text-sm font-medium leading-none">
                          Read More
                        </p>
                        <svg
                          className="fill-stroke"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.75 12.5L10.25 8L5.75 3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <img
                    src="https://i.ibb.co/3yvZBpm/img-5.png"
                    className="w-full"
                    alt="chair"
                  />
                </div>
                <div className="relative w-full sm:mt-0 mt-4">
                  <div>
                    <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-xl font-semibold 5 text-white">
                        The Decorated Ways
                      </h2>
                      <p className="text-base leading-4 text-white mt-2">
                        Dive into minimalism
                      </p>
                      <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                        <p className="pr-2 text-sm font-medium leading-none">
                          Read More
                        </p>
                        <svg
                          className="fill-stroke"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.75 12.5L10.25 8L5.75 3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <img
                    src="https://i.ibb.co/gDdnJb5/img-6.png"
                    className="w-full"
                    alt="wall design"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;

// import Link from "next/link"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"

// export default function Component() {
//   return (
//     <>
//
//     </>
//   )
// }

/* <div class="bg-gray-50 dark:bg-gray-950">
  <div class="container px-4 py-6 space-y-2 text-center md:space-y-0 md:flex md:items-center md:justify-between lg:space-y-0">
    <div class="flex items-center space-2">
      <a class="flex items-center space-2" href="#">
        <div class="h-6 w-6 rounded-lg bg-gray-900 dark:bg-gray-50"></div>
        <span class="font-semibold text-lg text-gray-900 dark:text-gray-50">Blog</span>
      </a>
    </div>
    <nav class="flex items-center justify-center space-x-4 text-sm md:space-x-6 lg:space-x-8">
      <a class="font-medium text-gray-900 dark:text-gray-50 hover:underline" href="#">
        Home
      </a>
      <a class="font-medium text-gray-900 dark:text-gray-50 hover:underline" href="#">
        Posts
      </a>
      <a class="font-medium text-gray-900 dark:text-gray-50 hover:underline" href="#">
        About
      </a>
      <a class="font-medium text-gray-900 dark:text-gray-50 hover:underline" href="#">
        Contact
      </a>
    </nav>
    <div class="flex items-center space-x-4">
      <a class="font-medium text-gray-900 dark:text-gray-50 hover:underline" href="#">
        Sign in
      </a>
    </div>
  </div>
</div>
<div class="container grid max-w-6xl items-center justify-center gap-4 px-4 text-center md:gap-8 md:px-6 lg:gap-12">
  <div class="space-y-4 lg:space-y-5 xl:space-y-6">
    <div class="space-y-2">
      <a class="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl" href="#">
        Welcome to the Blog
      </a>
      <p class="mx-auto max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
        A place for all your thoughts. Share your ideas with the world.
      </p>
    </div>
  </div>
</div>
<div class="container grid max-w-6xl items-center justify-center gap-8 py-10 px-4 text-center md:py-16 md:px-6 lg:gap-12">
  <div class="space-y-4">
    <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Posts</h2>
  </div>
  <div class="divide-y rounded-lg border">
    <div class="grid grid-cols-1 items-stretch justify-center divide-y md:grid-cols-2">
      <div class="flex flex-col gap-1 p-4">
        <a class="font-semibold" href="#">
          The First Post on the Blog
        </a>
        <p class="text-sm text-gray-500 dark:text-gray-400">February 1st, 2023</p>
        <img
          src="/placeholder.svg"
          width="400"
          height="300"
          alt="First Post Image"
          class="object-cover w-full h-60"
          style="aspect-ratio: 400 / 300; object-fit: cover;"
        />
      </div>
      <div class="flex flex-col gap-1 p-4">
        <a class="font-semibold" href="#">
          Introducing the Blog
        </a>
        <p class="text-sm text-gray-500 dark:text-gray-400">January 23rd, 2023</p>
        <img
          src="/placeholder.svg"
          width="400"
          height="300"
          alt="Introducing the Blog Image"
          class="object-cover w-full h-60"
          style="aspect-ratio: 400 / 300; object-fit: cover;"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 items-stretch justify-center divide-y md:grid-cols-2">
      <div class="flex flex-col gap-1 p-4">
        <a class="font-semibold" href="#">
          How to Start Writing
        </a>
        <p class="text-sm text-gray-500 dark:text-gray-400">February 10th, 2023</p>
        <img
          src="/placeholder.svg"
          width="400"
          height="300"
          alt="How to Start Writing Image"
          class="object-cover w-full h-60"
          style="aspect-ratio: 400 / 300; object-fit: cover;"
        />
      </div>
      <div class="flex flex-col gap-1 p-4">
        <a class="font-semibold" href="#">
          The Joys of Journaling
        </a>
        <p class="text-sm text-gray-500 dark:text-gray-400">January 30th, 2023</p>
        <img
          src="/placeholder.svg"
          width="400"
          height="300"
          alt="The Joys of Journaling Image"
          class="object-cover w-full h-60"
          style="aspect-ratio: 400 / 300; object-fit: cover;"
        />
      </div>
    </div>
  </div>
</div>
<div class="border-t border-gray-200 border-gray-200 bg-gray-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950">
  <div class="container grid max-w-6xl items-center justify-center gap-8 py-10 px-4 text-center md:py-16 md:px-6 lg:gap-12">
    <div class="space-y-4">
      <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About the Blog</h2>
      <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
        Welcome to the Blog. This is a place for all your thoughts. Share your ideas with the world.
      </p>
    </div>
  </div>
</div>
<div class="bg-gray-50 dark:bg-gray-950">
  <div class="container grid max-w-6xl items-center justify-center gap-8 py-10 px-4 text-center md:py-16 md:px-6 lg:gap-12">
    <div class="space-y-4">
      <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h2>
      <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
        Ready to get started? Contact us now.
      </p>
    </div>
    <form class="mx-auto max-w-sm space-y-4">
      <div class="grid grid-cols-1 items-stretch justify-center">
        <div class="flex flex-col gap-1">
          <label for="name" class="text-sm font-medium">
            Name
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="name"
            placeholder="Enter your name"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium">
            Email
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="message" class="text-sm font-medium">
            Message
          </label>
          <textarea
            class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] resize-none"
            id="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
<div class="bg-gray-50 dark:bg-gray-950">
  <div class="container px-4 py-6 space-y-2 text-center md:space-y-0 md:flex md:items-center md:justify-between lg:space-y-0">
    <nav class="flex items-center justify-center space-x-4 text-sm md:space-x-6 lg:space-x-8">
      <a class="font-medium text-gray-900 dark:text-gray-50 hover:underline" href="#">
        Terms
      </a>
      <a class="font-medium text-gray-900 dark:text-gray-50 hover:underline" href="#">
        Privacy
      </a>
      <a class="font-medium text-gray-900 dark:text-gray-50 hover:underline" href="#">
        Support
      </a>
    </nav>
    <p class="text-sm text-gray-500 dark:text-gray-400"></p>
  </div>
</div> */
