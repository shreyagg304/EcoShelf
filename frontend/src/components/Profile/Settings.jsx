import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [Value, setValue] = useState({ address: "", username: "" });
  const [ProfileData, setProfileData] = useState();
  const [loading, setLoading] = useState(false);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:1000/api/v1/getUserInfo", { headers });
        setProfileData(response.data);
        setValue({ address: response.data.address, username: response.data.username });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/updateAddUn",
        { username: Value.username, address: Value.address },
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("There was an error updating the data.");
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        ProfileData && (
          <div className="p-8">
            <h1 className="text-4xl font-semibold text-yellow-800 text-center mb-6">Settings</h1>
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="username" className="font-semibold text-lg">Username</label>
                <input
                  type="text"
                  name="username"
                  value={Value.username}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 rounded-lg bg-yellow-100 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-semibold text-lg">Email</label>
                <p className="p-3 mt-2 rounded bg-yellow-100 font-semibold text-gray-700">{ProfileData.email}</p>
              </div>
              <div>
                <label htmlFor="address" className="font-semibold text-lg">Address</label>
                <textarea
                  name="address"
                  value={Value.address}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 rounded-lg bg-yellow-100 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  rows="5"
                  placeholder="Address"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-800 text-yellow-50 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-900 transition-all duration-300"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Settings;
