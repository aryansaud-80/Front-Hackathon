import React, { useState } from "react";
import axios from "axios";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      // Simulating API call (Replace with real backend endpoint)
      await axios.post("https://your-backend.com/subscribe", { email });

      setMessage("Thank you for subscribing! 🎉");
      setEmail(""); // Clear input field
    } catch (error) {
      setMessage("Subscription failed. Try again!");
    }
  };

  return (
    <div className=" bg-gray-900 text-center text-white py-5 h-84 flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold">Stay Connected</h2>
      <p className="mt-4 text-lg ">Subscribe to our newsletter for the latest updates.</p>
      <div className="mt-6 flex justify-center ">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 rounded-l bg-gray-700 text-white border border-gray-500 focus:outline-none w-96"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-r text-white"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
      {message && <p className="mt-4 text-purple-400">{message}</p>}
    </div>
  );
};

export default NewsletterSubscription;
