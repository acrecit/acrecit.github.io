// Status updater using Telegram
const BOT_TOKEN = '8189545081:AAFghXa68k50ThXBYGWKBQVBeDD4jQb18lU';
const CHAT_ID = '7105201941';
const STATUS_CHECK_INTERVAL = 10000; // 10 seconds

async function updateStatus() {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?chat_id=${CHAT_ID}&limit=1`);
        const data = await response.json();
        
        if (data.ok && data.result.length > 0) {
            const latestMessage = data.result[data.result.length - 1].message.text;
            
            // Only process messages that match our format
            if (latestMessage.includes('MOOD:') && latestMessage.includes('ACTIVITY:')) {
                const [mood, activity] = latestMessage.split('|').map(s => s.trim());
                
                document.getElementById('current-mood').textContent = 
                    mood.replace('MOOD:', '').trim();
                document.getElementById('current-activity').textContent = 
                    activity.replace('ACTIVITY:', '').trim();
            }
        }
    } catch (error) {
        console.error('Status update error:', error);
    }
}

// Start checking for updates
setInterval(updateStatus, STATUS_CHECK_INTERVAL);
updateStatus(); // Initial check