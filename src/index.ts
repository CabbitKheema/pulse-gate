function pulseGate<T extends any[]>(func: (...args: T) => any, interval: number): (...args: T) => any {
    let lastPulse: number = 0;
    let gated: boolean = false;
  
    return (...args: T): any => {
      const now: number = Date.now();
      const nextPulse: number = lastPulse + interval;
  
      if (now >= nextPulse) {
        lastPulse = Math.floor(now / interval) * interval;
        gated = false;
      }
  
      if (!gated) {
        gated = true;
        return func(...args);
      }
    };
  }
  
  export default pulseGate;