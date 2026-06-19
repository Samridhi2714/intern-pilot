import { useEffect, useState } from "react";

import API from "../services/api";

import ApplicationForm from "../components/tracker/ApplicationForm";
import ApplicationTable from "../components/tracker/ApplicationTable";
import EmptyTracker from "../components/tracker/EmptyTracker";

const TrackerPage = () => {
  const [applications, setApplications] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchApplications = async () => {
    try {
      const res = await API.get(
        `/applications/user/${user.userId}`
      );

      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, []);

  const addApplication = async (appData) => {
    try {
      await API.post("/applications", {
        ...appData,
        userId: user.userId,
      });

      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Internship Tracker
      </h2>

      <ApplicationForm
        onAddApplication={addApplication}
      />

      {applications.length === 0 ? (
        <EmptyTracker />
      ) : (
        <ApplicationTable
          applications={applications}
          setApplications={setApplications}
          refreshApplications={fetchApplications}
        />
      )}
    </div>
  );
};

export default TrackerPage;