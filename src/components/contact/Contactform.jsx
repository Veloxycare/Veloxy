import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postMessage } from "../../utils/contactform";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.firstName)) {
      toast.error("First name should contain alphabets.");
      return false;
    }
    if (!nameRegex.test(formData.lastName)) {
      toast.error("Last name should contain alphabets.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (formData.subject.trim() === "") {
      toast.error("Subject cannot be empty.");
      return false;
    }
    if (formData.comments.trim() === "") {
      toast.error("Comments cannot be empty.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
      const res = await postMessage(formData);
      console.log(res);
      if (res.status === 200) {
        toast.success("Message sent.");
        setFormData({    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    comments: "",})
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send the message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
    <div className="p-8 " >
      <form className=" space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block font-medium text-primary mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-white h-14 rounded-lg"
              placeholder="First name here"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block font-medium text-primary mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-white h-14 rounded-lg"
              placeholder="Last name here"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block font-medium text-primary mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-white h-14 rounded-lg"
            placeholder="Add email"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block font-medium text-primary mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-white h-14 rounded-lg"
            placeholder="How can we help you?"
            required
          />
        </div>
        <div>
          <label htmlFor="comments" className="block font-medium text-primary mb-2">
            Comments / Questions *
          </label>
          <textarea
            id="comments"
            name="comments"
            rows={5}
            value={formData.comments}
            onChange={handleChange}
            className="w-full p-2 border border-white h-14 rounded-lg"
            placeholder="Comments"
            required
          ></textarea>
        </div>

      </form>
      <button
          type="submit"
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-2 mt-4 rounded-lg"
          disabled={isLoading}
        >
         Send Message
        </button>
        </div>
      {isLoading && (
        <div className="loader-container">
          <ClipLoader color="#3C3E83" loading={isLoading} size={100} />
        </div>
      )}
        <ToastContainer />
    </div>
  );
};

export default ContactForm;
