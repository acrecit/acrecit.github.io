// GitHub API integration
async function updateCommitCount() {
    try {
        // Add user agent header to avoid GitHub API rejection
        const headers = {
            'User-Agent': 'acrecit-website'
        };

        console.log('Fetching repos...');
        const reposResponse = await fetch('https://api.github.com/users/acrecit/repos', { headers });
        
        // Log rate limit info
        console.log('Rate limit remaining:', reposResponse.headers.get('X-RateLimit-Remaining'));
        
        if (!reposResponse.ok) {
            throw new Error(`GitHub API returned ${reposResponse.status}: ${await reposResponse.text()}`);
        }
        
        const repos = await reposResponse.json();
        console.log(`Found ${repos.length} repos`);
        
        let totalCommits = 0;
        
        for (const repo of repos) {
            console.log(`Fetching commits for ${repo.name}...`);
            const commitsResponse = await fetch(
                `https://api.github.com/repos/acrecit/${repo.name}/commits?per_page=1`,
                { headers }
            );
            
            if (!commitsResponse.ok) {
                console.error(`Failed to fetch commits for ${repo.name}:`, await commitsResponse.text());
                continue;
            }

            const linkHeader = commitsResponse.headers.get('Link');
            if (linkHeader) {
                const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
                if (matches) {
                    totalCommits += parseInt(matches[1]);
                }
            } else {
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
