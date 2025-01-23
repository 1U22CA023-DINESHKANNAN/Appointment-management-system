import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Workspace() {
  const [data, setData] = useState([]); // Initialize as an array
  const param = new URLSearchParams(window.location.search);
  const id = param.get("id");
  const name = param.get("name");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:4000/getAllData", { params: { id } })
        .then((res) => {
          setData(res.data); // Update state with response data
        })
        .catch((err) => {
          console.error("Error fetching data:", err); // Log errors if any
        });
    }
  }, [id]);

  // Handle delete appointment
  const handleDelete = (appointment_id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios
        .delete("http://localhost:4000/deleteAppointment", { data: { appointment_id } })
        .then((response) => {
          alert(response.data.message);
          setData(data.filter(item => item.appointment_id !== appointment_id)); // Remove deleted appointment from UI
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
          alert("Error deleting appointment");
        });
    }
  };

  const handleUpdate = (appointment) => {
    navigate("/update", { state: { appointment } }); // Use navigate instead of history.push
  };

  const totalRecords = data.length > 0 ? data[0].total_records : 0;

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome, Doctor {name} </h1>
      </div>

      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-green-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Appointments</h3>
          <p className="text-3xl">{totalRecords}</p> {/* Display total_records */}
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-3">{item.name}</td>
              <td className="px-6 py-3">{item.appointment_id}</td>
              <td className="px-6 py-3">{item.phone}</td>
              <td className="px-6 py-3">{item.city}</td>
              <td className="px-6 py-3">{item.state}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                  onClick={() => handleUpdate(item)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  onClick={() => handleDelete(item.appointment_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
