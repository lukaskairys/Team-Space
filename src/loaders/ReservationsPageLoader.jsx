import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
import useWindowDimensions from "utils/useWindowDimensions";

const Grid = () => {
  const { width } = useWindowDimensions();
  const [viewBoxHeight, setViewBoxHeight] = useState(100);

  useEffect(() => {
    if (width > 1200) setViewBoxHeight(650);
    else setViewBoxHeight(800);
  }, [width]);

  const desktopLayout = () => {
    return (
      <>
        <rect x="20" y="36" rx="5" ry="5" width="150" height="180" />
        <rect x="20" y="230" rx="5" ry="5" width="150" height="170" />
        <rect x="200" y="36" rx="5" ry="5" width="580" height="110" />
        <rect x="200" y="166" rx="5" ry="5" width="580" height="110" />
        <rect x="200" y="296" rx="5" ry="5" width="580" height="110" />
      </>
    );
  };

  const mobileLayout = () => {
    return (
      <>
        <rect x="30" y="36" rx="5" ry="5" width="720" height="130" />
        <rect x="30" y="186" rx="5" ry="5" width="720" height="130" />
        <rect x="30" y="336" rx="5" ry="5" width="720" height="130" />
      </>
    );
  };

  const renderLoader = () => {
    if (width > 1200) return desktopLayout();
    else return mobileLayout();
  };

  return (
    <ContentLoader
      viewBox={`5 0 790 ${viewBoxHeight}`}
      height="100%"
      width="100%"
      backgroundColor="#f6f7f8"
    >
      {renderLoader()}
    </ContentLoader>
  );
};

export default Grid;
