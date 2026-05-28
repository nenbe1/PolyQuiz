import { useState, useEffect } from 'react';

export function useFetch(url) {
  // Jalon 1.3: Gestion des trois états internes obligatoires
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // Retourne les trois valeurs sous forme d'un objet
  return { data, loading, error };
}