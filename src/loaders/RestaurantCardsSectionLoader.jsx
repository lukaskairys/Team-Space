import React from "react";
import ContentLoader from "react-content-loader";
import useWindowDimensions from "utils/useWindowDimensions";

const RestaurantCardsSectionLoader = () => {
  const { width } = useWindowDimensions();

  const desktopLayout = () => {
    return (
      <>
        <rect x="20" y="36" rx="5" ry="5" width="240" height="250" />
        <rect x="280" y="36" rx="5" ry="5" width="240" height="250" />
        <rect x="540" y="36" rx="5" ry="5" width="240" height="250" />
      </>
    );
  };

  const tabletLayout = () => {
    return (
      <>
        <rect x="20" y="36" rx="5" ry="5" width="360" height="350" />
        <rect x="420" y="36" rx="5" ry="5" width="360" height="350" />
      </>
    );
  };

  const mobileLayout = () => {
    return (
      <>
        <rect x="20" y="36" rx="5" ry="5" width="750" height="350" />
      </>
    );
  };

  const renderLoader = () => {
    if (width > 1300) return desktopLayout();
    else if (width > 857) return tabletLayout();
    else return mobileLayout();
  };

  return (
    <ContentLoader
      viewBox="5 0 790 400"
      height="100%"
      width="100%"
      backgroundColor="#f6f7f8"
    >
      {renderLoader()}
    </ContentLoader>
  );
};

export default RestaurantCardsSectionLoader;
