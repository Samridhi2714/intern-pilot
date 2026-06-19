const StatusBadge = ({ status }) => {
  const statusColors = {
    Applied: "bg-yellow-300 text-yellow-800",
    "Online Assessment": "bg-purple-300 text-purple-800",
    Interview: "bg-blue-300 text-blue-800",
    Rejected: "bg-red-300 text-red-800",
    Selected: "bg-green-300 text-green-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm ${
        statusColors[status] || "bg-gray-300 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;