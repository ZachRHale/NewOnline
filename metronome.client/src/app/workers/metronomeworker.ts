// play.worker.ts
addEventListener('message', ({ data }) => {
  let intervalId: NodeJS.Timeout = setInterval(() => {}, 1000); // Placeholder initialization

  if (data.type === 'start') {
    let tickInterval = ((60 / data.tempo) * 1000 * 4) / data.bottom;
    let count = 0;

    // Do this immediately to get the downbeat on the button press
    postMessage({ type: 'tick', count });
    count++;

    // Then set up the interval for subsequent beats
    intervalId = setInterval(() => {
      if (count < data.top) {
        postMessage({ type: 'tick', count });
      }

      count++;

      if (count > data.top) {
        clearInterval(intervalId);
        postMessage({ type: 'done' });
      }
    }, tickInterval);
  }
  if (data === 'stop') {
    console.log('stopping worker ', intervalId);
    clearInterval(intervalId);
    postMessage({ type: 'done' });
  }
});
