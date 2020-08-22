import { useEffect, useState } from 'react';

interface SizeProps {
  width: number;
  height: number;
}

export const useWindowHeight = (): number => {
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      console.log('checking', window.innerHeight);
      if (window.innerHeight === height) return;
      setHeight(window.innerHeight);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [height]); // Empty array ensures that effect is only run on mount

  return height;
};

export const useWindowWidth = (): number => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth === width) return;
      setWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [width]); // Empty array ensures that effect is only run on mount

  return width;
};

export default (): SizeProps => {
  const height = useWindowHeight();
  const width = useWindowWidth();
  return { width, height };
};
