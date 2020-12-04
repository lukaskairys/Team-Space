const FetchNearYou = (data) => {
  return [];
};

const FetchNewPlaces = (data) => {
  return [];
};

const FetchSimilar = (data, currentId) => {
  const currentRestaurant = data.find((single) => {
    return single.id === currentId;
  });

  data = data.filter((single) => {
    return (
      single.id !== currentId &&
      single.categories.some(
        (r) => currentRestaurant.categories.indexOf(r) >= 0
      )
    );
  });
  return data;
};

export const FilterByMode = (mode, data, currentId = "120wsdlpx4") => {
  if (mode === "new") return FetchNewPlaces(data);
  else if (mode === "near") return FetchNearYou(data);
  else if (mode === "similar") return FetchSimilar(data, currentId);
  return [];
};
