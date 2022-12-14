import React, { useContext, useState, useEffect, useCallback } from "react";

//////////////

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktaiks] = useState([]);
  /////////////////////////fetching data//////////////////
  const fetchDrinks = useCallback(async () => {
    //useCallback is liye taki infinite loop pe na jae
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();

      const { drinks } = data;
      if (drinks) {
        const drinksData = drinks.map((drink) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            drink;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktaiks(drinksData);
      } else {
        setCocktaiks([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [searchTerm]);
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm]);

  ////////////////////////////////////

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
