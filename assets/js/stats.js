// GitHub API integration
async function updateCommitCount() {
    try {
        console.log('Fetching repos...');
        const reposResponse = await fetch('https://api.github.com/users/acrecit/repos');
        console.log('Repos response:', reposResponse);
        
        if (!reposResponse.ok) {
            throw new Error(`GitHub API returned ${reposResponse.status}`);
        }
        
        const repos = await reposResponse.json();
        console.log('Found repos:', repos);
        
        let totalCommits = 0;
        
        // Get commit count for each repo
        for (const repo of repos) {
            console.log(`Fetching commits for ${repo.name}...`);
            const commitsResponse = await fetch(`https://api.github.com/repos/acrecit/${repo.name}/commits?per_page=1`);
            const linkHeader = commitsResponse.headers.get('Link');
            
            if (linkHeader) {
                // Extract last page number from Link header
                const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
                if (matches) {
                    totalCommits += parseInt(matches[1]);
                }
            } else {
                // If no Link header, count commits in response
                const commits = await commitsResponse.json();
                totalCommits += commits.length;
            }
        }
        
        document.getElementById('commit-count-text').textContent = `${totalCommits} commits to GitHub`;
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        document.getElementById('commit-count-text').textContent = 'GitHub stats unavailable';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCommitCount();
    setInterval(updateCommitCount, 300000); // Refresh every 5 minutes
});

// Uptime tracker
function updateUptime() {
    const startTime = localStorage.getItem('pageLoadTime') || Date.now().toString();
    if (!localStorage.getItem('pageLoadTime')) {
        localStorage.setItem('pageLoadTime', startTime);
    }

    function formatUptime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    }

    setInterval(() => {
        const currentTime = Date.now();
        const uptime = currentTime - parseInt(startTime);
        document.getElementById('uptime').textContent = formatUptime(uptime);
    }, 1000);
}
