import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Mobile com React Native",
      url: "git.com.br",
      techs: ["Node.js", "Node", "JavaScript"]
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(() => {
      setRepositories(repositories.filter(repository => repository.id !== id));
    });  
  }  

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => 
        <li key={repository.id}>
          <ul>
            <li><a href={repository.url}>{repository.title}</a></li>
            <li><p>{repository.techs}</p></li>
            <li>Likes: {repository.likes}</li>
          </ul>
          <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
