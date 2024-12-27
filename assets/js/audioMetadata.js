const audioElements = document.querySelectorAll('audio');

audioElements.forEach(audio => {
    const container = audio.closest('.audio-container');
    const titleElement = container.querySelector('.audio-title');
    
    audio.addEventListener('loadedmetadata', () => {
        // Create AudioContext
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audio);
        source.connect(audioContext.destination);
        
        // Get file name from source
        const fileName = audio.querySelector('source').src.split('/').pop();
        const title = decodeURIComponent(fileName.replace(/\.[^/.]+$/, ""));
        
        // Update title
        titleElement.textContent = title;
        
        // Add visualizer if you want
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        // You can add visualization here later
    });
});