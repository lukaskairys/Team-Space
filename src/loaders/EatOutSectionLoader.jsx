import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
import useWindowDimensions from "utils/useWindowDimensions";

const Grid = () => {
  const { width } = useWindowDimensions();
  const [viewBoxHeight, setViewBoxHeight] = useState(220);

  useEffect(() => {
    if (width > 1439) setViewBoxHeight(220);
    else if (width < 1440 && width > 1090) setViewBoxHeight(380);
    else setViewBoxHeight(800);
  }, [width]);

  const desktopLayout = () => {
    return (
      <>
        <rect x="10" y="10" rx="5" ry="5" width="240" height="160" />
        <rect x="280" y="10" rx="5" ry="5" width="240" height="160" />
        <rect x="550" y="10" rx="5" ry="5" width="240" height="160" />
      </>
    );
  };

  const tabletLayout = () => {
    return (
      <>
        <rect x="210" y="10" rx="5" ry="5" width="380" height="150" />
        <rect x="10" y="200" rx="5" ry="5" width="380" height="150" />
        <rect x="410" y="200" rx="5" ry="5" width="380" height="150" />
      </>
    );
  };

  const mobileLayout = () => {
    return (
      <>
        <rect x="90" y="10" rx="5" ry="5" width="620" height="130" />
        <rect x="90" y="180" rx="5" ry="5" width="620" height="270" />
        <rect x="90" y="500" rx="5" ry="5" width="620" height="270" />
      </>
    );
  };

  const renderLoader = () => {
    if (width > 1439) return desktopLayout();
    else if (width < 1440 && width > 1090) return tabletLayout();
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
