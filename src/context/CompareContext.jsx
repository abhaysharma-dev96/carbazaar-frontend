import { createContext, useState, useContext } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (car) => {
    if (compareList.length >= 3) return;
    if (compareList.find((c) => (c._id || c.id) === (car._id || car.id))) return;
    setCompareList((prev) => [...prev, car]);
  };

  const removeFromCompare = (carId) => {
    setCompareList((prev) =>
      prev.filter((c) => (c._id || c.id) !== carId)
    );
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (carId) =>
    !!compareList.find((c) => (c._id || c.id) === carId);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}