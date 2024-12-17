import React, { useState, useRef } from "react";
import logo from "../pictures/blog-images/work-4997565_1280.png";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  // State to hold form data
  const [emailData, setEmailData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  // Reference to the form element
  const form = useRef();

  // Handle input changes and update state
  const handleInputChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send form data using emailjs
    emailjs
      .sendForm("service_1zg6p5s", "template_o3bkkuk", form.current, {
        publicKey: "tTRUGTPu9VXMH1cbC",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          // Reset form data
          setEmailData({
            user_name: "",
            user_email: "",
            message: "",
          });
          // Navigate to home page
          navigate("/");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {/* Container for the form and image */}
        <div className="flex flex-row gap-32 justify-center w-3/4 p-6 rounded-xl sm:p-10 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-8 text-center">
            {/* Header and image */}
            <h1 className="my-3 text-4xl font-bold">Let's talk</h1>
            <p className="opacity-55">
              If you have a problem send us a message
            </p>
            <img src={logo} alt="" className="w-96 rounded-xl opacity-75" />
          </div>
          {/* Form element */}
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
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 hover:dark:bg-violet-600 dark:text-gray-900"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
