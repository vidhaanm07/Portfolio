export default async function handler(req, res) {
  try {
    const user = "vidhaanm07";
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "Vidhaan-Portfolio"
    };

    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { headers }),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, { headers })
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      return res.status(502).json({
        error: "GitHub API unavailable",
        profileStatus: profileResponse.status,
        reposStatus: reposResponse.status
      });
    }

    const profile = await profileResponse.json();
    const allRepos = await reposResponse.json();
    const repos = allRepos.filter(repo => !repo.fork);

    const stars = repos.reduce(
      (total, repo) => total + Number(repo.stargazers_count || 0),
      0
    );

    const forks = repos.reduce(
      (total, repo) => total + Number(repo.forks_count || 0),
      0
    );

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({
      login: profile.login,
      public_repos: profile.public_repos,
      followers: profile.followers,
      stars,
      forks,
      repos
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to load GitHub data"
    });
  }
}
