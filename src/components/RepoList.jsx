import React, { useState } from "react";

const RepoList = ({ repos }) => {
  const [search, setSearch] = useState("");

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="repos">
      <input
        type="text"
        placeholder="Search repositories"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredRepos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            {repo.description && <p>{repo.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
