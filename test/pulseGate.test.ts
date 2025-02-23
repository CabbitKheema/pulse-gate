import pulseGate from '../src/index.js';
import assert from 'assert';

// Define the callback type for pulseGate
type Callback = () => void;

console.log('Testing pulse-gate...');
let calls: number = 0;
const gated: ReturnType<typeof pulseGate<[]>> = pulseGate(() => {
  calls++;
  return undefined;
}, 1000);

calls = 0;
gated();
assert.strictEqual(calls, 1, 'First call should run');
gated();
assert.strictEqual(calls, 1, 'Second call in same pulse should be ignored');

// Use top-level await with setTimeout for async/await
await new Promise(resolve => setTimeout(resolve, 1000));
gated();
assert.strictEqual(calls, 2, 'Call after pulse should run');
console.log('Tests passed!');