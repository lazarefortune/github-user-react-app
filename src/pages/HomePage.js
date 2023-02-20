import {useState} from "react";

const HomePage = () => {

    const [username, setUsername] = useState("");

    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `https://api.github.com/users/${username}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    setError("Utilisateur introuvable");
                    setUser(null);
                    setRepos(null);
                    return;
                }
                setError(null);
                setUser(data);
                loadUserRepos(data.repos_url);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const loadUserRepos = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setRepos(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <main className="main">
            <div className="main-container">
                <div className="main-header">
                    <h1 className="">Trouvez un profil <span>GitHub</span> </h1>
                    <form>
                        <div className="main-header-form">
                            <input type="text" className="form-control" onChange={handleChange} placeholder="Entrez le nom d'utilisateur" />
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}
                            >
                                Rechercher
                            </button>
                        </div>
                    </form>
                </div>
                <div className="main-body">

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    {user && (
                    <div className="card">
                        <div className="card-header">
                            <div className="card-header-image">
                                <img src={user.avatar_url} alt={user.name} />
                            </div>
                            <div className="card-header-text">
                                <h2>
                                    {user.name}
                                </h2>
                                <a href={user.html_url} target="_blank" rel="noreferrer">
                                    @{user.login}
                                </a>
                                <p>
                                    {user.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                    )}

                    {repos && (
                        <div className="card">
                            <div className="card-header">
                                <h2>
                                    Tous les dépôts
                                </h2>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {repos.map((repo) => (
                                        <li className="list-group-item" key={repo.id}>
                                            <a href={repo.html_url} target="_blank" rel="noreferrer">
                                                {repo.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default HomePage;