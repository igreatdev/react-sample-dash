import React from 'react';

function App() {
  const [repos, setRepos] = React.useState([]);
  const [githubUser, setGithubUser] = React.useState('');
  const loadRepos = () => {
    if (githubUser && githubUser !== '') {
      fetch('https://api.github.com/users/'+githubUser+'/repos')
        .then(response => response.json())
        .then(data => {
          setRepos(data);
        })
    }
  }

  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h3 className="display-5">Welcome to your dashboard!</h3>
        <p className="lead">Provide me with your github username and I may list your repositories for you.</p>
        <hr className="my-4" />
        
        <div className="form-group">
          <label htmlFor="githubUsername">Github Username</label>
          <input type="text" name="github_user" className="form-control" id="githubUsername" placeholder="Github Username" onChange={(e) => {
            setGithubUser(e.target.value)
          }} />
        </div>
        
        <button className="btn btn-primary" onClick={loadRepos}>Get em!</button>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-10">
          {repos.map(repo => (
            <div className="card mb-3" key={repo.id}>
              <div className="row no-gutters">
                <div className="col-2 col-md-2">
                  <img className="card-img" src={repo.owner.avatar_url} alt="Owner Avatar" />
                </div>

                <div className="col-10">
                  <div className="card-body">
                    <h5 className="card-title"> {repo.name} </h5>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
