import React, { useState, useEffect, useRef } from 'react';

function useInterval<T>(callback: () => T, delay: number | null) {
  const savedCallback = useRef<() => T>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if(!savedCallback.current) {
        return;
      }

      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;