import { useContext, useEffect, useState } from "react";
import { DataStoreContext } from "../context/dataStoreContext";
import { observer } from "mobx-react-lite";
import { getUnannotadedImages } from "../api/api";

const ImageQueue = observer(() => {
  const data = useContext(DataStoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(()=>{
    try {
      setIsLoading(true);
      getUnannotadedImages().
      then(json => data?.setImages(json));
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  },[data]);

  if (isLoading) return <p>Loading images to analyze...</p>;
  if (error !== undefined) return <p>Oh no! something went wrong...</p>;
  
  return (
    <div className="image-queue">
        <h2>Next images in queue:</h2>
        <ul className="queue-list">
          {data?.unannalizedImages && 
          Array.from(data?.unannalizedImages.values())
          .map(
            (image) => 
            <li className="queue-item" key={image.id} onClick={() => data.setCurrentImageId(image.id)}>
              <img width='100px' height='100px' src={image.url} />
            </li>
          )}
        </ul>
    </div>
  );
});

export default ImageQueue;