import { useState } from "react";

export const useSideFilter = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const clearAll = () => {
    setCheckedItems({});
  };

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  return { checkedItems, handleChange, clearAll };
};
