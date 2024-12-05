// GitHub API integration
async function fetchCommitCount() {
    try {
        // Get all repos first
        const reposResponse = await fetch('https://api.github.com/users/acrecit/repos');
        const repos = await reposResponse.json();
        
        let totalCommits = 0;
        
        // Get commit count for each repo
        for (const repo of repos) {
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
        
        document.getElementById('commit-count').textContent = totalCommits;
    } catch (error) {
        console.error('Error fetching commit count:', error);
        document.getElementById('commit-count').textContent = 'Error';
    }
}

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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchCommitCount();
    setInterval(fetchCommitCount, 300000); // Refresh every 5 minutes
    updateUptime();
});
