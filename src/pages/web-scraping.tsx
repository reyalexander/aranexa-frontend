import { useState } from 'react';

export default function WebScraping() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setMessage] = useState<string | null>(null);

  const fetchResults = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/web-scraping/?keyword=${encodeURIComponent(keyword)}`,
      );
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setMessage(`Error fetching results: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Buscar Información</h1>
      <input
        type="text"
        placeholder="Palabras clave"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={fetchResults}
        className="bg-blue-500 px-4 py-2 text-white"
      >
        Buscar
      </button>

      {loading && <p>Cargando...</p>}

      <ul>
        {results.map((result: any, index: any) => (
          <li key={index}>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
