/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { DataStoreContext } from "../context/dataStoreContext";
import { observer } from "mobx-react-lite";

interface Coordinate {
  x: number;
  y: number;
}

const ImageAnalyzer = observer(() => {
  const data = useContext(DataStoreContext);
  const [initialPoint, setInitialPoint] = useState<Coordinate | undefined>();
  const [currentPoint, setCurrentPoint] = useState<Coordinate | undefined>();
  const [isDragging, setIsDragging] = useState(false);

  const calculatePointDelta = 
  (previousPoint: Coordinate, newPoint: Coordinate) : Coordinate => {
    return {
      x: newPoint.x - previousPoint.x,
      y: newPoint.y - previousPoint.y
    }
  }

  const extractPositionDelta = (event: any, initial?: boolean) => {
    const point: Coordinate = {
      x: event.pageX,
      y: event.pageY
    };

    const offset: Coordinate = {
      x: event.target.offsetLeft,
      y: event.target.offsetTop
    }
    
    const delta = calculatePointDelta(offset, point);
    if (initial) {
      setInitialPoint(delta);
    }
    
    return delta;
  };

  const onPointerDown = (event: any) => {
    if (data?.currentImageId === undefined) return;
    setIsDragging(true);
    event.target.setPointerCapture(event.pointerId);

    setInitialPoint(undefined);
    setCurrentPoint(undefined);

    extractPositionDelta(event, true);
  };

  const onPointerMove = (event: any) => {
    if (!isDragging) return;

    const delta = extractPositionDelta(event);
    setCurrentPoint(delta);
  }

  const onPointerUp = (event: any) => {
    if (data?.currentImageId === undefined) return;
    setIsDragging(false);
    const delta = extractPositionDelta(event);
    setCurrentPoint(delta);
    data?.setCurrentBoundingBox({
      topLeftX: initialPoint!.x,
      topLeftY: initialPoint!.y,
      width: Math.abs(currentPoint!.x - initialPoint!.x),
      height: Math.abs(currentPoint!.y - initialPoint!.y),
    });
  }
  
  return (
    <div 
      className="image-container"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
        <img 
          src={data?.currentImageId ? data.getImageById(data.currentImageId) : "https://dummyimage.com/280/c4c4c4/ffffff&text=frame"} 
          alt="Placeholder for uploaded image"
          style={{pointerEvents: 'none'}}
        />
        {initialPoint !== undefined && 
          currentPoint !== undefined &&
          data?.currentImageId !== undefined &&
          <div 
            className="annotation" 
            style={{
              top: initialPoint.y,
              left: initialPoint.x,
              height: Math.abs(currentPoint.y - initialPoint.y),
              width: Math.abs(currentPoint.x - initialPoint.x),
            }}
          />
        }
    </div>
  );
})

export default ImageAnalyzer;