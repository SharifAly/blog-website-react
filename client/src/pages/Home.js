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
  // const [emailData, setEmailData] = useState({
  //   user_name: "",
  //   user_email: "",
  //   message: "",
  // });

  // const form = useRef();

  // Handle input change for email form
  // const handleInputChange = (e) => {
  //   setEmailData({
  //     ...emailData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const navigate = useNavigate();

  // Handle form submission for sending email
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm("service_1zg6p5s", "template_o3bkkuk", form.current, {
  //       publicKey: "tTRUGTPu9VXMH1cbC",
  //     })
  //     .then(
  //       () => {
  //         console.log("SUCCESS!");
  //         setEmailData({
  //           user_name: "",
  //           user_email: "",
  //           message: "",
  //         });
  //         navigate("/");
  //       },
  //       (error) => {
  //         console.log("FAILED...", error.text);
  //       }
  //     );
  // };
  return (
    <>
      <div className="flex justify-center flex-col items-center">
        {/* Header section */}
         {/* About the blog section */}
         <div className="border-b border-gray-200 mb-10">
          <div className="container grid items-center justify-center gap-8 py-10 px-4 text-center md:py-16 md:px-6 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Welcome to Your Daily Dose of Inspiration
              </h2>
              <p className="text-gray-200 mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover thought-provoking articles, captivating stories, and expert insights on topics that matter. Whether you're seeking knowledge, inspiration, or just a great read, our blog has something for everyone. Explore, learn, and get inspired—one post at a time.

Start reading now!
              </p>
            </div>
          </div>
        </div>
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
       
        {/* Contact form section */}
        {/* <div className="flex items-center justify-center h-screen">
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
        </div> */}
      </div>
     
    </>
  );
};

export default Home;

