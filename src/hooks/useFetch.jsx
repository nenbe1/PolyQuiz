import { useState, useEffect } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // 1. Récupération dynamique du token JWT dans le localStorage (Jalon 5.2)
    const token = localStorage.getItem("polyquiz_token");

    // 2. Cloner et préparer les headers de la requête
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // 3. Si le token existe, on injecte l'intercepteur de sécurité (Jalon 5.2)
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // 4. Exécution de la requête réseau configurée
    fetch(url, { ...options, headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : statut ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setData(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;