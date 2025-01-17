'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ClientType } from '@/lib/client-validation';
import { ClientSchema } from '@/lib/client-validation';

export default function ClientForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const RECOMMENDATION_OPTIONS = [
    'Encuestas de satisfacción',
    'Entrevistas',
    'Conversaciones casuales',
    'Observar sin interferir',
    'Reviso comentarios en redes sociales',
    'Otros',
    'No es necesario',
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientType>({
    resolver: zodResolver(ClientSchema),
  });

  const onSubmit = async (data: ClientType) => {
    try {
      setIsSubmitting(true);
      setMessage(null);

      const accountId = localStorage.getItem('accountId');

      const finalData = {
        ...data,
        account_id: accountId ? parseInt(accountId, 10) : null,
      };

      const res = await fetch(
        'http://3.133.157.177:8002/api/v1/client/clients/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalData),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al guardar la información');
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    const accountId = localStorage.getItem('accountId');
    router.push(`/summary/?account_id=${accountId}`); // Cambia esto a la siguiente ruta si tienes más pasos en el wizard
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded bg-zinc-900 p-6 text-gray-100 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Datos de mis clientes</h1>

      {message && (
        <p
          className={`mb-4 text-sm ${
            message.startsWith('Error') ? 'text-red-500' : 'text-green-600'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mi tipo de cliente es  */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Mi tipo de cliente es
          </label>
          <select
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('client_type', { valueAsNumber: true })}
          >
            <option value="">Seleccionar</option>
            <option value={1}>B2B (Vendo a otras empresas)</option>
            <option value={2}>B2C (Vendo a otras personas)</option>
            <option value={3}>
              B2B2C (Mi cliente final es a través de otro negocio)
            </option>
            <option value={4}>B2G (Le vendo al gobierno)</option>
          </select>
          {errors.client_type && (
            <p className="text-sm text-red-500">{errors.client_type.message}</p>
          )}
        </div>

        {/* ¿Conozco quién es mi público objetivo más importante?  */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            ¿Conozco quién es mi público objetivo más importante?
          </label>
          <select
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('target_audience', { valueAsNumber: true })}
          >
            <option value="">Seleccionar</option>
            <option value={1}>Sí</option>
            <option value={2}>No</option>
            <option value={3}>No estoy seguro(a)</option>
          </select>
          {errors.target_audience && (
            <p className="text-sm text-red-500">
              {errors.target_audience.message}
            </p>
          )}
        </div>

        {/* Busco recomendaciones o sugerencias CHECKBOXES SELECT */}
        <div>
          <h2 className="mb-2 text-sm font-semibold">
            Busco recomendaciones o sugerencias mediante:
          </h2>
          <label className="mb-1 block text-xs font-light text-gray-500">
            Selecciona todas las que correspondan.
          </label>
          <div className="space-y-2">
            {RECOMMENDATION_OPTIONS.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register('recommendations')} // Nombre del campo
                  className="size-4 rounded border-gray-400 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          {errors.recommendations && (
            <p className="mt-1 text-xs text-red-500">
              {errors.recommendations.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Finalizar'}
        </button>
      </form>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded bg-white p-6 text-gray-800 shadow-lg">
            <h3 className="mb-2 text-xl font-bold">¡Datos Guardados!</h3>
            <p className="mb-4 text-sm">
              La información del cliente se guardó correctamente.
            </p>
            <button
              onClick={handleCloseModal}
              className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Finalizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
