import React from "react";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((resp) => setRepositories(resp.data));
  }, []);

  async function handleAddRepository() {
    const resp = await api.post("repositories", {
      title: "brunorafael",
      url: "https://github.com/brunorafaeI/desafio-nodejs",
      techs: ["Nodejs", "React Native", "ReactJS"],
    });

    if (resp.status === 201) {
      setRepositories([...repositories, resp.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const resp = await api.delete(`repositories/${id}`);

    if (resp.status === 204) {
      setRepositories([...repositories.filter((repo) => repo.id !== id)]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button
              type="button"
              onClick={() => handleRemoveRepository(repo.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
