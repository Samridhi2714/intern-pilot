import { useState } from "react";

const ApplicationForm = ({ onAddApplication }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [platform, setPlatform] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newApplication = {
      company,
      role,
      platform,
      appliedDate,
      status,
    };
    onAddApplication(newApplication);
    // Reset form
    setCompany("");
    setRole("");
    setPlatform("");
    setAppliedDate("");
    setStatus("Applied");
  };

  return (
    <form className="mb-6 p-4 bg-[#FFF] shadow rounded" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-4">Add New Application</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-1">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Platform</option>
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
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="Applied">Applied</option>
            <option value="Online Assessment">Online Assessment</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-[#8B6F47] text-white rounded"
      >
        Add Application
      </button>
    </form>
  );
};

export default ApplicationForm;
