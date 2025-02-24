/**
 * pulseGate - A rate limiter for function calls based on fixed time intervals.
 * 
 * Limits the execution of a function to one call per specified time interval.
 * Any calls made during the interval between pulses are intentionally dropped.
 *
 * @template T - A tuple type representing the argument types for the function.
 * @param {(...args: T) => any} func - The function to be rate-limited.
 * @param {number} interval - Time interval (in milliseconds) between allowed calls.
 * @returns {(...args: T) => any} - A new function that enforces the pulse gate behavior.
 *
 * @example
 * // Create a rate-limited function that logs messages only once per second
 * const gatedLog = pulseGate(console.log, 1000);
 *
 * setInterval(() => {
 *   gatedLog("This will only log once per second, even if called more frequently.");
 * }, 300); // Calls are made every 300ms, but only one logs per second.
 *
 * @author
 * cabbit-kheema
 * NPM: https://www.npmjs.com/~cabbit-kheema
 * GitHub: https://github.com/CabbitKheema
 * @license MIT
 */
function pulseGate<T extends any[]>(
  func: (...args: T) => any,
  interval: number
): (...args: T) => any {
  // Tracks the timestamp of the last successful function execution
  let lastPulse: number = 0;

  return (...args: T): any => {
    const now: number = Date.now(); // Get the current timestamp in milliseconds
    const nextPulse: number = lastPulse + interval; // Calculate the next allowed execution time

    /**
     * Check if the current time has reached or surpassed the next allowed pulse.
     * If so, execute the function and update the lastPulse timestamp.
     * Aligns the pulse to a consistent time grid (e.g., exact multiples of the interval).
     */
    if (now >= nextPulse) {
      lastPulse = Math.floor(now / interval) * interval; // Align to nearest pulse
      return func(...args); // Execute the provided function
    }

    // If the function call happens before the allowed interval, it will be dropped.
  };
}

export default pulseGate;
