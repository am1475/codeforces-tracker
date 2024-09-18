import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  PieController,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { LeetCode } from "leetcode-query";
import CFLogo from "../assets/cf.svg"; // Adjust the path as per your folder structure

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  PieController,
  ArcElement
);

function Dashboard() {
  const { username } = useParams();
  const [metrics, setMetrics] = useState({});
  const [problemNames, setProblemNames] = useState([]);
  const [verdicts, setVerdicts] = useState({});
  const [leetcodeMetrics, setLeetcodeMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(20);
  const [userInfo, setUserInfo] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (username) {
      // Fetch Codeforces user submissions
      axios
        .get(`https://codeforces.com/api/user.status?handle=${username}`)
        .then((response) => {
          const submissions = response.data.result;
          const problemsSolvedSet = new Set();
          const problemNamesList = [];
          let submissionCount = 0;
          const verdictsCount = {};

          // Process each submission
          submissions.forEach((submission) => {
            if (submission.verdict === "OK") {
              const problemId =
                submission.problem.contestId + submission.problem.index;
              if (!problemsSolvedSet.has(problemId)) {
                problemsSolvedSet.add(problemId);
                problemNamesList.push({
                  contestId: submission.problem.contestId,
                  index: submission.problem.index,
                  name: submission.problem.name,
                  solvedDate: new Date(
                    submission.creationTimeSeconds * 1000
                  ).toLocaleDateString(),
                });
              }
            }
            if (verdictsCount[submission.verdict]) {
              verdictsCount[submission.verdict]++;
            } else {
              verdictsCount[submission.verdict] = 1;
            }
            submissionCount++;
          });

          // Fetch Codeforces user info for ratings and designation
          axios
            .get(`https://codeforces.com/api/user.info?handles=${username}`)
            .then((userResponse) => {
              const userData = userResponse.data.result[0];
              setMetrics({
                averageRating: userData.rating,
                maxRating: userData.maxRating,
                totalProblemsSolved: problemsSolvedSet.size,
                totalSubmissionCount: submissionCount,
              });
              setProblemNames(problemNamesList);
              setVerdicts(verdictsCount);
              setUserInfo({
                username: userData.handle,
                designation: userData.rank,
                country: userData.country,
                organization: userData.organization,
                registrationTime: new Date(
                  userData.registrationTimeSeconds * 1000
                ).toLocaleDateString(),
              });
              setAvatarUrl(userData.titlePhoto); // Set avatar URL
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });

      // Fetch LeetCode user submissions
      const leetcodeClient = new LeetCode();
      leetcodeClient
        .user(username)
        .then((leetcodeData) => {
          const leetcodeStats = leetcodeData.matchedUser.submitStats.acSubmissionNum;
          setLeetcodeMetrics({
            totalSolved: leetcodeStats.reduce((acc, curr) => acc + curr.count, 0),
            easySolved: leetcodeStats.find((item) => item.difficulty === 'Easy').count,
            mediumSolved: leetcodeStats.find((item) => item.difficulty === 'Medium').count,
            hardSolved: leetcodeStats.find((item) => item.difficulty === 'Hard').count,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching LeetCode data:", error);
          setLoading(false);
        });
    }
  }, [username]);

  const handleReadMore = () => {
    setItemsToShow((prev) => prev + 20);
  };

  // Prepare data for the bar chart
  const barData = {
    labels: [
      "Average Rating",
      "Total Problems Solved",
      "Total Submission Count",
    ],
    datasets: [
      {
        label: "Codeforces Metrics",
        data: [
          metrics.averageRating || 0,
          metrics.totalProblemsSolved || 0,
          metrics.totalSubmissionCount || 0,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue color
        borderColor: "rgba(54, 162, 235, 1)", // Blue color
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options with a suggested Y-axis scale
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax:
          Math.max(
            metrics.averageRating || 0,
            metrics.totalProblemsSolved || 0,
            metrics.totalSubmissionCount || 0
          ) + 10,
        stepSize: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Prepare data for the pie chart
  const pieData = {
    labels: Object.keys(verdicts),
    datasets: [
      {
        data: Object.values(verdicts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
        ],
      },
    ],
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src={CFLogo} alt="Codeforces Logo" className="h-20 w-20" />
              <span className="font-bold text-xl text-white">Codeforces Dashboard</span>
            </div>
            <div>
              <a href="/" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="/profile" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Profile
              </a>
              <a href="/settings" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Settings
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-6 bg-gray-200 text-gray-800 shadow-md">
          <div className="flex flex-col items-center">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
              />
            )}
            <h1 className="text-3xl font-bold mb-2 text-center">
              {userInfo.username && (
                <a
                  href={`https://codeforces.com/profile/${userInfo.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {userInfo.username}
                </a>
              )}
            </h1>
            <p className="text-xl text-center">{userInfo.designation}</p>
            <p className="text-base mt-2 text-center">
              {userInfo.organization && (
                <>
                  <strong>Organization:</strong> {userInfo.organization}
                </>
              )}
            </p>
            <p className="text-base text-center">
              {userInfo.country && (
                <>
                  <strong>Country:</strong> {userInfo.country}
                </>
              )}
            </p>
            <p className="text-base text-center">
              {userInfo.registrationTime && (
                <>
                  <strong>Member Since:</strong> {userInfo.registrationTime}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 shadow rounded text-center">
                  <h2 className="text-xl font-bold text-gray-700">Average Rating</h2>
                  <p className="text-4xl text-gray-900">{metrics.averageRating || "N/A"}</p>
                </div>
                <div className="bg-white p-6 shadow rounded text-center">
                  <h2 className="text-xl font-bold text-gray-700">Total Problems Solved</h2>
                  <p className="text-4xl text-gray-900">{metrics.totalProblemsSolved || "N/A"}</p>
                </div>
                <div className="bg-white p-6 shadow rounded text-center">
                  <h2 className="text-xl font-bold text-gray-700">Total Submission Count</h2>
                  <p className="text-4xl text-gray-900">{metrics.totalSubmissionCount || "N/A"}</p>
                </div>
              </div>
              <div className="bg-white p-8 shadow rounded mb-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Metrics Overview</h2>
                <div style={{ height: "400px" }}>
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
              <div className="bg-white p-8 shadow rounded mb-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Submission Verdicts</h2>
                <div style={{ height: "400px" }}>
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </div>
              <div className="bg-white p-8 shadow rounded mb-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">LeetCode Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 shadow rounded text-center">
                    <h2 className="text-xl font-bold text-gray-700">Total Solved</h2>
                    <p className="text-4xl text-gray-900">{leetcodeMetrics.totalSolved || "N/A"}</p>
                  </div>
                  <div className="bg-white p-6 shadow rounded text-center">
                    <h2 className="text-xl font-bold text-gray-700">Easy Problems Solved</h2>
                    <p className="text-4xl text-gray-900">{leetcodeMetrics.easySolved || "N/A"}</p>
                  </div>
                  <div className="bg-white p-6 shadow rounded text-center">
                    <h2 className="text-xl font-bold text-gray-700">Medium Problems Solved</h2>
                    <p className="text-4xl text-gray-900">{leetcodeMetrics.mediumSolved || "N/A"}</p>
                  </div>
                  <div className="bg-white p-6 shadow rounded text-center">
                    <h2 className="text-xl font-bold text-gray-700">Hard Problems Solved</h2>
                    <p className="text-4xl text-gray-900">{leetcodeMetrics.hardSolved || "N/A"}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 shadow rounded">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Problems Solved</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {problemNames.slice(0, itemsToShow).map((problem, index) => (
                    <a
                      key={index}
                      href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-50 p-4 shadow rounded flex flex-col items-center justify-center hover:bg-gray-100"
                    >
                      <p className="text-lg font-semibold text-gray-800">{problem.name}</p>
                      <p className="text-sm text-gray-600">Solved on: {problem.solvedDate}</p>
                    </a>
                  ))}
                </div>
                {itemsToShow < problemNames.length && (
                  <button
                    onClick={handleReadMore}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
                  >
                    Read More
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center py-4">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
