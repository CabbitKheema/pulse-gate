import pulseGate from '../src/index.js';
import assert from 'assert';

console.log('Testing pulse-gate...');

// Track the number of calls
let calls = 0;

// Create a rate-limited function using pulseGate
const gated = pulseGate<[]>(() => {
  calls++;
}, 1000);

// Run initial tests
calls = 0;
gated();
assert.strictEqual(calls, 1, 'First call should run');
gated();
assert.strictEqual(calls, 1, 'Second call in same pulse should be ignored');

// Use an async IIFE to handle top-level await
(async () => {
  // Wait for 1000 ms before testing the next pulse
  await new Promise((resolve) => setTimeout(resolve, 1000));
  gated();
  assert.strictEqual(calls, 2, 'Call after pulse should run');

  console.log('Tests passed!');
})();
