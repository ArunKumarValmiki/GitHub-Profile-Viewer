import React, { useState } from "react";
import Profile from "./components/Profile";
import RepoList from "./components/RepoList";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchGitHubData = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    setUserData(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");
      const user = await userRes.json();
      setUserData(user);

      const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!repoRes.ok) throw new Error("Could not fetch repositories");
      const reposData = await repoRes.json();
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="toggle">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Dark Mode
        </label>
      </div>
      <h1>GitHub Profile Viewer</h1>
      <div className="search">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={fetchGitHubData} disabled={loading}>
          {loading ? <span className="spinner" /> : "Search"}
        </button>
      </div>
      {error && <div className="message error-message">{error}</div>}
      {loading && <div className="message loading-message">Loading...</div>}
      {userData && <Profile user={userData} />}
      {repos.length > 0 ? (
        <RepoList repos={repos} />
      ) : (
        userData && <div className="message empty-message">User has no public repositories or they are all private.</div>
      )}
    </div>
  );
};

export default App;
