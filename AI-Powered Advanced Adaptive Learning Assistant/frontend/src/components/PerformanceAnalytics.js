import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import './common.css';

function PerformanceAnalytics() {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/performance"); // Backend API
                const data = await response.json();
                
                console.log("Fetched Data:", data); // Debugging log

                if (response.ok && Array.isArray(data) && data.length > 0) {
                    // Convert date strings to readable format (if needed)
                    const formattedData = data.map(item => ({
                        ...item,
                        date: new Date(item.date).toLocaleDateString()
                    }));

                    setAnalyticsData(formattedData);
                    generateFeedback(formattedData);
                } else {
                    console.error("Invalid Data Format:", data);
                }
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);

    const generateFeedback = (data) => {
        let avgScore = data.reduce((sum, item) => sum + (item.score || 0), 0) / data.length;
        let avgAttendance = data.reduce((sum, item) => sum + (item.attendance || 0), 0) / data.length;
        let avgMood = data.reduce((sum, item) => sum + (item.emotionScore || 0), 0) / data.length;

        let feedbackMsg = "Performance Summary: ";
        if (avgScore > 80) {
            feedbackMsg += "Great job! Keep up the good work. ";
        } else if (avgScore > 50) {
            feedbackMsg += "You're doing well, but there's room for improvement. ";
        } else {
            feedbackMsg += "Consider revising difficult topics and seeking extra help. ";
        }

        feedbackMsg += avgAttendance > 75 ? "Your attendance is excellent. " : "Try to attend more classes to stay on track. ";
        feedbackMsg += avgMood > 0.5 ? "Your engagement levels look good! 😊" : "Try to stay motivated and take breaks when needed. 😔";

        setFeedback(feedbackMsg);
    };

    if (loading) return <p>Loading performance data...</p>;
    if (analyticsData.length === 0) return <p>No data available.</p>;

    return (
        <div className="performance-analytics-container">
            <h1 className="performance-analytics-title">Performance Analytics</h1>

            {/* Score Chart */}
            <div className="chart-container">
                <h2 className="chart-title">Scores Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Attendance Chart */}
            <div className="chart-container">
                <h2 className="chart-title">Attendance</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#ccc" />
                        <Bar dataKey="attendance" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Feedback Section */}
            <div className="feedback-section">
                <h2 className="feedback-title">AI Feedback</h2>
                <p className="feedback-text">{feedback}</p>
            </div>
        </div>
    );
}

export default PerformanceAnalytics;
