import React from "react";
import ContentLoader from "react-content-loader";
import useWindowDimensions from "utils/useWindowDimensions";

const Grid = () => {
  const { width } = useWindowDimensions();

  const desktopLayout = () => {
    return (
      <>
        <rect x="10" y="10" rx="5" ry="5" width="250" height="130" />
        <rect x="280" y="10" rx="5" ry="5" width="250" height="270" />
        <rect x="550" y="10" rx="5" ry="5" width="250" height="130" />
        <rect x="10" y="160" rx="5" ry="5" width="250" height="270" />
        <rect x="280" y="300" rx="5" ry="5" width="250" height="130" />
        <rect x="550" y="160" rx="5" ry="5" width="250" height="270" />
      </>
    );
  };

  const tabletLayout = () => {
    return (
      <>
        <rect x="10" y="10" rx="5" ry="5" width="380" height="130" />
        <rect x="10" y="160" rx="5" ry="5" width="380" height="270" />
        <rect x="420" y="10" rx="5" ry="5" width="380" height="270" />
        <rect x="420" y="300" rx="5" ry="5" width="380" height="130" />
      </>
    );
  };

  const mobileLayout = () => {
    return (
      <>
        <rect x="100" y="10" rx="5" ry="5" width="600" height="130" />
        <rect x="100" y="160" rx="5" ry="5" width="600" height="270" />
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
      viewBox="0 0 810 420"
      height="100%"
      width="100%"
      backgroundColor="#f6f7f8"
    >
      {renderLoader()}
    </ContentLoader>
  );
};

export default Grid;
