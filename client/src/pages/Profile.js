import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  // State to hold profile data
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  
  // Get the user ID from the URL parameters
  const { id } = useParams();

  // Fetch profile data when the component mounts or the ID changes
  useEffect(() => {
    axios
      .get(`http://localhost:5000/profile/profile/${id}`)
      .then((res) => {
        // Update state with the fetched data
        setProfileData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <table className="table-auto w-full text-center border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2">First-Name</th>
            <th className="border border-gray-600 px-4 py-2">Last-Name</th>
            <th className="border border-gray-600 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {profileData.length > 0 &&
            profileData.map((data) => (
              <tr key={data.id} className="bg-gray-800">
                <td className="border border-gray-600 px-4 py-2">{data.first_name}</td>
                <td className="border border-gray-600 px-4 py-2">{data.last_name}</td>
                <td className="border border-gray-600 px-4 py-2">{data.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex flex-col cols-1 justify-center items-center mt-4 gap-4">
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Change Email</button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Change Name</button> */}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
