'use client';
import { Progress } from '@/components/ui/progress';
import React, { useEffect, useRef, useState } from 'react';
import { useLoading } from '@/app/state/loading-state';

type TLoadingBarProps = {};

const LoadingBar = ({}: TLoadingBarProps) => {
  const [progress, setProgress] = useState(60);
  const isLoading = useLoading((state) => state.isOpen);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // this is the logic to show a fake progress bar for long loading times
  useEffect(() => {
    if (isLoading) {
      // default to 10% to show some progress
      setProgress(10);

      // after 1 second, set to 40% to show some progress
      timeoutRef.current = setTimeout(async () => {
        setProgress(40);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // after 1.5 seconds, set to 80% if there is still no response
        if (progress < 80) setProgress(80);
      }, 1000);
    } else {
      // Move to 100% when loading is complete
      setProgress(100);

      // Hide the loading bar after 1 second
      timeoutRef.current = setTimeout(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProgress(0);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, [isLoading]);

  return <Progress value={progress} className="max-w-full" />;
};

export default LoadingBar;
