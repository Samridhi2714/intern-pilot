import { useState } from "react";
import API from "../services/api";
import {
  FaFilePdf,
  FaBullseye,
  FaCloudUploadAlt,
  FaUserTie,
  FaMedal,
} from "react-icons/fa";
import {
  HiCheckBadge,
  HiExclamationTriangle,
  HiLightBulb,
} from "react-icons/hi2";
const AnalyzerPage = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resume || !jobDescription) {
      alert("Please upload a resume and paste a job description.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);

      const res = await API.post("/analyzer/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor =
    result?.matchScore >= 75
      ? "text-green-600"
      : result?.matchScore >= 50
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#2D2A26]">
          AI Resume Analyzer
        </h1>

        <p className="text-gray-600 mt-2 text-lg">
          Compare your resume against any job description and get ATS insights,
          missing skills, recruiter feedback and a personalized learning
          roadmap.
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Upload Resume</h3>

            <div className="border-2 border-dashed border-[#D6C2A1] rounded-2xl p-10 text-center bg-[#FDFBF8] hover:border-[#8B6F47] transition">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="resumeUpload"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <label htmlFor="resumeUpload" className="cursor-pointer">
                <div>
                  {" "}
                  <FaCloudUploadAlt
                    className="
                      text-6xl
                      text-[#8B6F47]
                      mx-auto
                      mb-4
                    "
                  />
                </div>

                <h4 className="font-semibold text-lg">
                  Click to Upload Resume
                </h4>

                <p className="text-gray-500 text-sm mt-2">PDF format only</p>

                {resume && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-medium">
                    <FaFilePdf />
                    {resume.name}
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* JD */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Job Description</h3>

            <textarea
              rows="12"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              className="
                w-full
                rounded-2xl
                border
                border-[#D6C2A1]
                bg-[#FDFBF8]
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-[#8B6F47]
              "
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="
            mt-8
            bg-[#8B6F47]
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            shadow-md
            hover:opacity-90
            transition
          "
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-8">
          {/* Score + Summary */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* ATS Score */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <FaBullseye className="text-[#8B6F47]" />
                ATS Match Score
              </h3>
              <div className="flex justify-center">
                <div className="w-44 h-44 rounded-full border-10 border-green-500 bg-green-50 flex items-center justify-center">
                  <span className={`text-5xl font-bold ${scoreColor}`}>
                    {result.matchScore || 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-2">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FaUserTie className="text-[#8B6F47]" />
                Recruiter Summary
              </h3>

              <p className="text-gray-700 leading-relaxed">{result.summary}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="font-semibold text-green-600 text-lg mb-4 flex items-center gap-2">
                <HiCheckBadge />
                Matching Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {result.matchingSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="
                        bg-green-100
                        text-green-700
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                      "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="font-semibold text-red-600 text-lg mb-4 flex items-center gap-2">
                <HiExclamationTriangle />
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {result.missingSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="
                        bg-red-100
                        text-red-700
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                      "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaMedal className="text-yellow-500" />
              Resume Strengths
            </h3>
            <ul className="space-y-3">
              {result.strengths?.map((item, index) => (
                <li key={index} className="bg-blue-100 p-4 rounded-xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <HiLightBulb className="text-yellow-500" />
              AI Resume Suggestions
            </h3>

            <ul className="space-y-3">
              {result.suggestions?.map((item, index) => (
                <li key={index} className="bg-[#ffd7f9] p-4 rounded-xl">
                  {typeof item === "string" ? item : JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </div>

          {/* Roadmap */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-6">
              Personalized Learning Roadmap
            </h3>

            <div className="space-y-5">
              {result.roadmap?.map((item, index) => (
                <div
                  key={index}
                  className="
                      border
                      border-[#E5D8C3]
                      rounded-2xl
                      p-5
                      bg-[#FDFBF8]
                    "
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-lg">
                      Step {index + 1}: {item.skill}
                    </h4>

                    <span className="bg-[#8B6F47] text-white px-3 py-1 rounded-full text-sm">
                      {item.timeline}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">{item.whyImportant}</p>

                  <div>
                    <p className="font-semibold mb-2">Resources:</p>

                    <ul className="list-disc ml-5 text-gray-700">
                      {item.resources?.map((resource, i) => (
                        <li key={i}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzerPage;
