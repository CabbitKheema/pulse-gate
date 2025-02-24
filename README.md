# **pulse-gate**

A lightweight utility to throttle function calls to a rhythmic interval, like a metronome for your code. `pulse-gate` ensures a function is only executed once per specified time window, ignoring additional calls until the next "pulse."

## **Installation**

Install via npm:

```bash
npm install pulse-gate
```

## **Usage**

`pulseGate` takes a function and an interval (in milliseconds) and returns a wrapped version of that function. The wrapped function will only execute when the interval "pulse" allows it, based on the system clock.

### **Example**

```javascript
import pulseGate from 'pulse-gate';

// A simple greeting function
const logHello = (name) => console.log(`Hello, ${name}!`);
const gatedLog = pulseGate(logHello, 1000); // 1-second pulse
gatedLog("Alice"); // Logs: "Hello, Alice!"
gatedLog("Bob");   // Ignored (within the same 1s pulse)
setTimeout(() => gatedLog("Charlie"), 1000); // Logs: "Hello, Charlie!"
```

### **Real-world scenario**

```javascript
import pulseGate from 'pulse-gate';

// Real-world: Weather station telemetry
const sendTemperature = (temp) => fetch('/api/telemetry', {
    method: 'POST',
    body: JSON.stringify({ temperature: temp })
});
const gatedTempSend = pulseGate(sendTemperature, 5 * 60 * 1000); // 5-minute pulse

// Simulate noisy sensor readings
gatedTempSend(23.5); // Sends: 23.5°C to server
gatedTempSend(23.6); // Ignored (within same 5-min window)
setTimeout(() => gatedTempSend(24.0), 1000); // Ignored (still too soon)
setTimeout(() => gatedTempSend(24.2), 5 * 60 * 1000); // Sends: 24.2°C after 5 min
```

### **How It Works**

- The `interval` defines the length of each "pulse" window (e.g., 1000ms = 1 second).
- The first call in a pulse window executes the function immediately and locks further calls until the next window.
- Pulse windows are aligned to the system clock (e.g., for a 1000ms interval, windows might start at 0ms, 1000ms, 2000ms, etc.).
- Subsequent calls within the same window are silently ignored.

## **API**

`pulseGate(func, interval)`

- `func`: The function to gate (can take any arguments).
- `interval`: Minimum time (in milliseconds) between allowed executions.
- **Returns**: A wrapped function that respects the pulse timing.

## **Use Cases**

- Rate-limiting API calls or events (e.g., button clicks, sensor triggers).
- Synchronizing repetitive tasks to a consistent beat.
- Preventing spam or accidental rapid-fire function calls.

## **Notes**

- The gating is stateless and relies on `Date.now()` for timing.
- It’s not a debouncer or throttler in the traditional sense—it’s stricter, aligning to fixed intervals rather than trailing or leading edges.

## **Contributing**

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat(new thing): Added some AmazingFeature'`)
   > Commit message format to be followed: [semantic-release | commit-message-format](https://semantic-release.gitbook.io/semantic-release#commit-message-format)
   >
   > ```text
   >  <type>(<scope>): <short summary>
   >  │       │             │
   >  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
   >  │       │
   >  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
   >  │                          elements|forms|http|language-service|localize|platform-browser|
   >  │                          platform-browser-dynamic|platform-server|router|service-worker|
   >  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|
   >  │                          devtools
   >  │
   >  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
   >```

4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 
    > Please submit all pull requests to the `next` branch for review.

### **Top contributors:**

<a href="https://github.com/CabbitKheema/pulse-gate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=CabbitKheema/pulse-gate" alt="contrib.rocks image" />
</a>

## **License**

MIT

## **Contact**

Prajwal K - [@CabbitKheema](https://twitter.com/CabbitKheema) - <mrprajwalkrishnamurthy@gmail.com> - [HackerRank](https://www.hackerrank.com/profile/CabbitKheema)

Project Link: [https://github.com/CabbitKheema/pulse-gate](https://github.com/CabbitKheema/pulse-gate)

## **Acknowledgments**

* [My rough Roadmap Document](https://docs.google.com/document/d/1ERn65uRs3PGbHNNg1WFxXMsdbf4VdqzN3xcIO9Mj87s/edit?usp=sharing)
* [Grok-3](https://grok.com/)
* [typescript](https://www.npmjs.com/package/typescript)
* [semantic-release](https://semantic-release.gitbook.io/semantic-release)
* [How To Create And Publish Your First NPM Package | **Web Dev Simplified** | YouTube](https://youtu.be/J4b_T-qH3BY?si=Csa0tHYUMPPN2cIi)
* [Publish to NPM with GitHub Actions | **Jamie Barton** | YouTube](https://youtu.be/H3iO8sbvUQg?si=-C-OANjH4RZj3HGF)
* [typescript-crash.ts | **bradtraversy** | GitHub Gist](https://gist.github.com/bradtraversy/f80a4cd87e7034bea5264f7d8c431b4e)
* [git-cheat-sheet.md | **bradtraversy** | GitHub Gist](https://gist.github.com/bradtraversy/518b1bd6fe26c83c3a184b3a98a2fcd0)