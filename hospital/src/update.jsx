// src/components/Update.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Update() {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;

  const [formData, setFormData] = useState({
    name: appointment?.name,
    phone: appointment?.phone,
    city: appointment?.city,
    state: appointment?.state,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:4000/updateAppointment", {
        appointment_id: appointment.appointment_id,
        ...formData,
      })
      .then((response) => {
        alert(response.data.message);
        window.history.back();      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
        alert("Error updating appointment");
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios
        .delete("http://localhost:4000/deleteAppointment", { data: { appointment_id: appointment.appointment_id } })
        .then((response) => {
          alert(response.data.message);
          window.history.back();        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
          alert("Error deleting appointment");
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Update Appointment</h1>
      
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            id="state"
            value={formData.state}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={handleUpdate}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
