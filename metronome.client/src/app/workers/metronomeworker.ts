// play.worker.ts
addEventListener('message', ({ data }) => {

    if (data.type === 'start') {

        let tickInterval = 60 / data.tempo * 1000 * 4 / data.bottom;
        let count = 0;

        // Do this immediately to get the downbeat on the button press
        postMessage({ type: 'tick', count });
        count++;

        // Then set up the interval for subsequent beats
        const interval = setInterval(() => {
            if (count < data.top) {
                postMessage({ type: 'tick', count });
            }
            
            count++;

            if (count > data.top) {
                clearInterval(interval);
                postMessage({ type: 'done' });
            }
        }, tickInterval);
    }
    if (data === 'stop') {
        // Optionally implement stop logic
    }
});