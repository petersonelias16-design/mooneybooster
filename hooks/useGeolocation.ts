
import { useState, useEffect } from 'react';
import type { LatLng } from '../types';

const useGeolocation = () => {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada pelo seu navegador.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(`Erro ao obter localização: ${err.message}`);
        setLoading(false);
      }
    );
  };

  return { location, loading, error, getLocation };
};

export default useGeolocation;
