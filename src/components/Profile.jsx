import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <img
        src={user.avatar_url}
        alt={`${user.name || user.login}'s avatar`}
        width="120"
        height="120"
      />
      <h2>{user.name || user.login}</h2>
      {user.bio && <p className="bio">{user.bio}</p>}
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repositories: {user.public_repos}</p>
      {user.location && <p>Location: {user.location}</p>}
      <a href={user.html_url} target="_blank" rel="noreferrer">
        View GitHub Profile
      </a>
    </div>
  );
};

export default Profile;
