import { useContext, useEffect, useState } from "react";
import { DataStoreContext } from "../context/dataStoreContext";
import { getCategories } from "../api/api";
import { observer } from "mobx-react-lite";

const CategoriesList = observer(() => {
  const data = useContext(DataStoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(()=>{
    try {
      setIsLoading(true);
      getCategories().
      then(json => data?.setCategories(json));
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  },[data]);

  if (isLoading) return <p>Loading images to analyze...</p>;
  if (error !== undefined) return <p>Oh no! something went wrong...</p>;
  
  return (
    <ul className="options-list">
      {
        data?.categories && 
        Array.from(data.categories.values())
        .map(
          (category) => 
          <li 
            key={category.id} 
            className={category.id === data.currentCategoryId ? "highlight" : undefined} 
            onClick={() => data.setCurrentCategoryId(category.id)}>
              {category.name}
          </li>
        )
      }
    </ul>
  )
});

export default CategoriesList;