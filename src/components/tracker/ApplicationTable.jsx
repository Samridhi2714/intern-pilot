import { useState } from "react";
import StatusBadge from "./StatusBadge";
import API from "../../services/api";

const ApplicationTable = ({ applications, refreshApplications }) => {
  const [editApplication, setEditApplication] = useState(null);

  const [editForm, setEditForm] = useState({
    company: "",
    role: "",
    platform: "",
    appliedDate: "",
    status: "",
  });

  const handleDelete = async (id) => {
    try {
      await API.delete(`/applications/${id}`);

      refreshApplications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (app) => {
    setEditApplication(app);

    setEditForm({
      company: app.company,
      role: app.role,
      platform: app.platform,
      appliedDate: app.appliedDate ? app.appliedDate.split("T")[0] : "",
      status: app.status,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/applications/${editApplication._id}`, editForm);

      refreshApplications();

      setEditApplication(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="w-full border-b border-[#D6C2A1]">
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Platform</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="border-b border-[#D6C2A1]">
              <td className="p-3">{app.company}</td>

              <td className="p-3">{app.role}</td>

              <td className="p-3">{app.platform}</td>

              <td className="p-3">
                {app.appliedDate
                  ? new Date(app.appliedDate).toLocaleDateString()
                  : ""}
              </td>

              <td className="p-3">
                <StatusBadge status={app.status} />
              </td>

              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEditClick(app)}
                  className="text-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(app._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editApplication && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Application</h3>

            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block mb-1">Company</label>

                  <input
                    name="company"
                    type="text"
                    value={editForm.company}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Role</label>

                  <input
                    name="role"
                    type="text"
                    value={editForm.role}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Platform</label>

                  <select
                    name="platform"
                    value={editForm.platform}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Internshala">Internshala</option>
                    <option value="Indeed">Indeed</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Career Page">Career Page</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Applied Date</label>

                  <input
                    name="appliedDate"
                    type="date"
                    value={editForm.appliedDate}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Status</label>

                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="Applied">Applied</option>
                    <option value="Online Assessment">Online Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditApplication(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8B6F47] text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTable;
