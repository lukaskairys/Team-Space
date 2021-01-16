import React from "react";
import ContentLoader from "react-content-loader";
import useWindowDimensions from "utils/useWindowDimensions";

const Grid = () => {
  const { width } = useWindowDimensions();

  const desktopLayout = () => {
    return (
      <>
        <rect x="20" y="36" rx="5" ry="5" width="230" height="280" />
        <rect x="270" y="36" rx="5" ry="5" width="230" height="280" />
        <rect x="520" y="36" rx="5" ry="5" width="230" height="280" />
      </>
    );
  };

  const mobileLayout = () => {
    return (
      <>
        <rect x="20" y="36" rx="5" ry="5" width="360" height="350" />
        <rect x="420" y="36" rx="5" ry="5" width="360" height="350" />
      </>
    );
  };

  const renderLoader = () => {
    if (width > 1200) return desktopLayout();
    else return mobileLayout();
  };

  return (
    <ContentLoader
      viewBox="5 0 790 500"
      height="100%"
      width="100%"
      backgroundColor="#f6f7f8"
    >
      {renderLoader()}
    </ContentLoader>
  );
};

export default Grid;
