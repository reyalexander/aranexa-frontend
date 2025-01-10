'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type SummaryData = {
  id: number;
  full_name: string;
  year_birthday: number;
  gender: number;
  level_of_study: number;
  companyinformation_set: any[] | undefined;
  companybrand_set: any[] | undefined;
  client_set: any[] | undefined;
  product_set: any[] | undefined;
};

const genderLabels: Record<number, string> = {
  1: 'Femenino',
  2: 'Masculino',
  3: 'No Binario',
  4: 'Otro',
  5: 'Prefiero no decirlo',
};

const levelOfStudyLabels: Record<number, string> = {
  1: 'Básica primaria',
  2: 'Básica secundaria',
  3: 'Técnica profesional',
  4: 'Universitaria',
  5: 'Licenciatura',
  6: 'Posgrado',
};

export default function SummaryPage() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrapingResults, setScrapingResults] = useState<any[] | null>(null);
  const [scrapingError, setScrapingError] = useState<string | null>(null);
  const [isScraping, setIsScraping] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const accountId = searchParams.get('account_id');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:8000/api/v1/user/summary/?account_id=${accountId}`,
        );
        if (!res.ok) {
          throw new Error('Error al obtener los datos.');
        }
        const data: SummaryData = await res.json();
        setSummary(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (accountId) {
      fetchSummary();
    } else {
      setError('No se encontró el ID del usuario.');
      setIsLoading(false);
    }
  }, [accountId]);

  const handleScraping = async () => {
    if (!summary) return;
    try {
      setIsScraping(true);
      setScrapingError(null);

      // Combinar palabras clave relevantes
      const keywords = [
        ...(summary.companyinformation_set?.[0]?.market || []),
        ...(summary.companyinformation_set?.[0]?.main_challenges || []),
      ];

      const res = await fetch(
        `http://localhost:8000/api/v1/web-scraping/?${keywords
          .map((keyword) => `keywords=${encodeURIComponent(keyword)}`)
          .join('&')}`,
      );

      if (!res.ok) {
        throw new Error('Error al obtener resultados del scraping.');
      }

      const data = await res.json();
      setScrapingResults(data);
    } catch (err: any) {
      setScrapingError(err.message);
    } finally {
      setIsScraping(false);
    }
  };

  const handleDownloadPDF = () => {
    window.open(
      `http://localhost:8000/api/v1/user/summary/pdf/?account_id=${accountId}`,
      '_blank',
    );
  };

  if (isLoading) {
    return <p className="mt-10 text-center">Cargando datos...</p>;
  }

  if (error) {
    return <p className="mt-10 text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Resumen del Usuario</h1>
      {summary && (
        <>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Información Personal</h2>
            <p>
              <strong>Nombre:</strong> {summary.full_name}
            </p>
            <p>
              <strong>Año de Nacimiento:</strong> {summary.year_birthday}
            </p>
            <p>
              <strong>Género:</strong> {genderLabels[summary.gender]}
            </p>
            <p>
              <strong>Nivel de Estudio:</strong>{' '}
              {levelOfStudyLabels[summary.level_of_study]}
            </p>
          </section>

          {summary.companyinformation_set?.length ? (
            <section className="mb-6">
              <h2 className="text-xl font-semibold">
                Información de la Empresa
              </h2>
              {summary.companyinformation_set.map((company, index) => (
                <div
                  key={index}
                  className="mb-4 rounded border bg-gray-100 p-4"
                >
                  <p>
                    <strong>Año de Fundación:</strong> {company.year_foundation}
                  </p>
                  <p>
                    <strong>Mercado:</strong>
                  </p>
                  <ul className="ml-6 list-disc">
                    {company.market.map((meta: any, metaIndex: any) => (
                      <li key={metaIndex}>{meta}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Retos Principales:</strong>
                  </p>
                  <ul className="ml-6 list-disc">
                    {company.main_challenges.map(
                      (meta: any, metaIndex: any) => (
                        <li key={metaIndex}>{meta}</li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </section>
          ) : null}

          {summary.companybrand_set?.length ? (
            <section className="mb-6">
              <h2 className="text-xl font-semibold">Información de la Marca</h2>
              {summary.companybrand_set.map((brand, index) => (
                <div
                  key={index}
                  className="mb-4 rounded border bg-gray-100 p-4"
                >
                  <p>
                    <strong>Marca:</strong> {brand.brand_information}
                  </p>
                  <p>
                    <strong>Presencia:</strong>
                  </p>
                  <ul className="ml-6 list-disc">
                    {brand.currently_present_media.map(
                      (meta: any, metaIndex: any) => (
                        <li key={metaIndex}>{meta}</li>
                      ),
                    )}
                  </ul>
                  <p>
                    <strong>Metas:</strong>
                  </p>
                  <ul className="ml-6 list-disc">
                    {brand.goals_achieve.map((meta: any, metaIndex: any) => (
                      <li key={metaIndex}>
                        <strong>{metaIndex + 1}</strong> :{meta}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ) : null}

          {summary.client_set?.length ? (
            <section className="mb-6">
              <h2 className="text-xl font-semibold">Clientes</h2>
              {summary.client_set.map((client, index) => (
                <div
                  key={index}
                  className="mb-4 rounded border bg-gray-100 p-4"
                >
                  <p>
                    <strong>Tipo de Cliente:</strong>{' '}
                    {client.client_type_display}
                  </p>
                  <p>
                    <strong>Público Objetivo:</strong>{' '}
                    {client.target_audience_display}
                  </p>
                  <p>
                    <strong>Recomendaciones:</strong>{' '}
                    {client.recommendations.join(', ')}
                  </p>
                  <ul className="ml-6 list-disc">
                    {client.recommendations.map((meta: any, metaIndex: any) => (
                      <li key={metaIndex}>{meta}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ) : null}

          {summary.product_set?.length ? (
            <section className="mb-6">
              <h2 className="text-xl font-semibold">Productos o Servicios</h2>
              {summary.product_set.map((product, index) => (
                <div
                  key={index}
                  className="mb-4 rounded border bg-gray-100 p-4"
                >
                  <p>
                    <strong>Producto:</strong> {product.product_name_display}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {product.product_description}
                  </p>
                  <p>
                    <strong>Inversión:</strong>
                  </p>
                  <ul className="ml-6 list-disc">
                    {product.product_invest.map((meta: any, metaIndex: any) => (
                      <li key={metaIndex}>{meta}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ) : null}

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleDownloadPDF}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Descargar PDF
            </button>
            <button
              onClick={handleScraping}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              disabled={isScraping}
            >
              {isScraping ? 'Buscando...' : 'Buscar Información'}
            </button>
          </div>

          {scrapingError && (
            <p className="mt-4 text-red-500">Error: {scrapingError}</p>
          )}

          {scrapingResults && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold">Resultados del Scraping</h2>
              <div className="mt-4 space-y-6">
                {Object.entries(scrapingResults).map(
                  ([keyword, results]: any) => (
                    <div key={keyword}>
                      <h3 className="mb-2 text-lg font-bold text-gray-800">
                        {keyword}
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {results.map((result: any, index: number) => (
                          <div
                            key={index}
                            className="rounded border bg-gray-100 p-4 shadow"
                          >
                            <h4 className="mb-2 text-base font-semibold text-gray-900">
                              {result.title}
                            </h4>
                            <a
                              href={result.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline hover:text-blue-700"
                            >
                              {result.link}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
