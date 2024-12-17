import React, { useState, useRef } from "react"; // Import necessary hooks from React
import logo from "../pictures/blog-images/work-4997565_1280.png"; // Import the logo image
import emailjs from "@emailjs/browser"; // Import emailjs for sending emails
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Contact = () => {
  // Initialize state for form data
  const [emailData, setEmailData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const form = useRef(); // Create a ref for the form
  const navigate = useNavigate(); // Initialize navigate function

  // Handle input changes and update state
  const handleInputChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send email using emailjs
    emailjs
      .sendForm("service_1zg6p5s", "template_o3bkkuk", form.current, {
        publicKey: "tTRUGTPu9VXMH1cbC",
      })
      .then(
        () => {
          console.log("SUCCESS!"); // Log success message
          // Reset form data
          setEmailData({
            user_name: "",
            user_email: "",
            message: "",
          });
          navigate("/"); // Navigate to home page
        },
        (error) => {
          console.log("FAILED...", error.text); // Log error message
        }
      );
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 text-white">
        {/* Main container */}
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl p-6 rounded-xl sm:p-10 dark:bg-gray-800 dark:text-gray-100">
          {/* Left section: Title, description, image */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Let's talk</h1>
            <p className="text-gray-400 mb-6">
              If you have a problem, send us a message.
            </p>
            <img
              src={logo}
              alt="Contact"
              className="w-full max-w-xs mx-auto lg:mx-0 rounded-xl opacity-75"
            />
          </div>

          {/* Right section: Form */}
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="space-y-6 w-full lg:w-1/2"
          >
            <div>
              <label htmlFor="user_name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder="John Doe"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                onChange={handleInputChange}
                value={emailData.user_name}
              />
            </div>

            <div>
              <label htmlFor="user_email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                placeholder="john.doe@example.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                onChange={handleInputChange}
                value={emailData.user_email}
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm">
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Your message"
                className="w-full h-32 px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                onChange={handleInputChange}
                value={emailData.message}
              />
            </div>

            <div>
              <input
                type="submit"
                value="Send"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
