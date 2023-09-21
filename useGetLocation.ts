import { useState } from "react";

const useGetLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<GeolocationCoordinates>();
  const [error, setError] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation)
      return setError("Your browser does not support location service");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setPosition(position.coords);
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };
  return { isLoading, error, position, getLocation };
};

export default useGetLocation;
