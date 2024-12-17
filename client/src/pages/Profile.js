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
      .get(`http://localhost:5000/profile/${id}`)
      .then((res) => {
        // Update state with the fetched data
        setProfileData(res.data);
        console.log(profileData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="text-white">
      <table class="table-auto text-center">
        {profileData.length > 0 &&
          profileData.map((data) => (
            <>
              <thead>
                <tr>
                  <th>First-Name</th>
                  <th className="text-center">Last-Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.first_name}</td>
                  <td>{data.last_name}</td>
                  <td>{data.email}</td>
                </tr>
              </tbody>
            </>
          ))}
      </table>
    </div>
  );
};

export default Profile;
