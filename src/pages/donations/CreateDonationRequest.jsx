import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import LoadingSpinner from '../../components/LoadingSpinner'

const CreateDonationRequest = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true)
    try {
        const res = await axiosInstance.get('/user/me');
        if(res.status == 200){
            setUserData(res.data);
        }
    } catch (error) {
        toast.error(error.data?.message);
    }finally{
        setLoading(false);
    }
  }

  useEffect(()=>{
    fetchUserData();
  },[])

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.description.trim()) errs.description = "Description is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email format";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) errs.phone = "Must be 10 digits";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setSuccess("");
      return;
    }

    try {
      await axiosInstance.post(`/donations/create/${userData?.id}`, formData);
      setSuccess("Donation request submitted successfully!");
      setErrors({});
      setFormData({ title: "", description: "", email: "", phone: "" });
    } catch (err) {
      console.error("Error submitting donation request:", err);
      setSuccess("");
      setErrors({ form: "Something went wrong. Try again later." });
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if(loading) return <LoadingSpinner />
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
        Create Donation Request
      </h2>
      {errors.form && <p className="text-red-500 mb-4 text-center">{errors.form}</p>}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
