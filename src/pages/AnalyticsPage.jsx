import { useEffect, useState } from "react";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  Applied: "#F59E0B",
  "Online Assessment": "#9333EA",
  Interview: "#2563EB",
  Rejected: "#DC2626",
  Selected: "#16A34A",
};

const AnalyticsPage = () => {
  const [applications, setApplications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetchApplications();
  }, []);
  const fetchApplications = async () => {
    try {
      const res = await API.get(`/applications/user/${user.userId}`);

      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalApplications = applications.length;
  const interviews = applications.filter(
    (app) => app.status === "Interview",
  ).length;

  const rejections = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  const selected = applications.filter(
    (app) => app.status === "Selected",
  ).length;
  const applied = applications.filter((app) => app.status === "Applied").length;

  const onlineAssessment = applications.filter(
    (app) => app.status === "Online Assessment",
  ).length;
  const successRate =
    totalApplications > 0
      ? ((selected / totalApplications) * 100).toFixed(1)
      : 0;
  const pieData = [
    {
      name: "Applied",
      value: applications.filter((a) => a.status === "Applied").length,
    },
    {
      name: "Online Assessment",
      value: applications.filter((a) => a.status === "Online Assessment")
        .length,
    },
    {
      name: "Interview",
      value: applications.filter((a) => a.status === "Interview").length,
    },
    {
      name: "Rejected",
      value: applications.filter((a) => a.status === "Rejected").length,
    },
    {
      name: "Selected",
      value: applications.filter((a) => a.status === "Selected").length,
    },
  ];

  const platformCounts = {};
  applications.forEach((app) => {
    platformCounts[app.platform] = (platformCounts[app.platform] || 0) + 1;
  });

  const platformData = Object.entries(platformCounts).map(
    ([platform, count]) => ({
      platform,
      count,
    }),
  );

  const monthlyCounts = {};
  applications.forEach((app) => {
    const month = new Date(app.appliedDate).toLocaleString("default", {
      month: "short",
    });

    monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
  });

  const timelineData = Object.entries(monthlyCounts).map(([month, count]) => ({
    month,
    count,
  }));

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Analytics Dashboard</h2>
      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded p-4">
          <h3>Total Applications</h3>
          <p className="text-3xl font-bold">{totalApplications}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3>Interviews</h3>
          <p className="text-3xl font-bold text-blue-600">{interviews}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3>Applied</h3>
          <p className="text-3xl font-bold text-yellow-600">{applied}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3>Online Assessments</h3>
          <p className="text-3xl font-bold text-purple-600">
            {onlineAssessment}
          </p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3>Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{rejections}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3>Selected</h3>
          <p className="text-3xl font-bold text-green-600">{selected}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3>Success Rate</h3>
          <p className="text-3xl font-bold text-green-800">{successRate}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pie Chart */}

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-4">Status Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-4">Applications by Platform</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count">
                {platformData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      ["#2563EB", "#16A34A", "#F59E0B", "#9333EA", "#DC2626"][
                        index % 5
                      ]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline */}

      <div className="bg-white shadow rounded p-4 mt-8">
        <h3 className="font-semibold mb-4">Application Timeline</h3>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
