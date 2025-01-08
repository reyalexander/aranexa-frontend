'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { CompanyBrandType } from '@/lib/company-brand';
import { CompanyBrandSchema } from '@/lib/company-brand';

export default function CompanyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const SOCIAL_MEDIA_OPTIONS = [
    'Espacio físico (oficina, tienda, consultorio, etc.)',
    'Facebook',
    'Instagram',
    'Tiktok',
    'LinkedIn',
    'Whatsapp',
    'Twitter (X)',
    'Página Web',
    'Llamada telefónica',
    'Otros',
  ];

  const GOALS_OPTIONS = [
    'Establecerme como referente en mi mercado (reputación)',
    'Conectar con mi comunidad',
    'Concientizar sobre un tema social',
    'Hacer más conocido a mi producto/servicio',
    'Mayores ventas',
    'Ampliar mi alcance, llegar a nuevos sectores',
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyBrandType>({
    resolver: zodResolver(CompanyBrandSchema),
  });

  const onSubmit = async (data: CompanyBrandType) => {
    try {
      setIsSubmitting(true);
      setMessage(null);

      const res = await fetch(
        'http://localhost:8000/api/v1/company/company_brand/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
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
    router.push('/'); // Cambia esto a la siguiente ruta si tienes más pasos en el wizard
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded bg-zinc-900 p-6 text-gray-100 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Datos de mi marca</h1>

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
        {/* Datos de la empresa */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Nombre Comercial
          </label>
          <input
            type="text"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('brand_information')}
          />
          {errors.brand_information && (
            <p className="mt-1 text-xs text-red-500">
              {errors.brand_information.message}
            </p>
          )}
        </div>

        {/* El nombre de mi marca está registrada legalmente */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            El nombre de mi marca está registrada legalmente
          </label>
          <select
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('brand_name_registered', { valueAsNumber: true })}
          >
            <option value="">Seleccionar</option>
            <option value={1}>Sí</option>
            <option value={2}>No</option>
            <option value={3}>Prefiero no decirlo</option>
          </select>
          {errors.brand_name_registered && (
            <p className="text-sm text-red-500">
              {errors.brand_name_registered.message}
            </p>
          )}
        </div>

        {/* Social Media CHECKBOXES SELECT */}
        <div>
          <h2 className="mb-2 text-sm font-semibold">
            Actualmente tengo presencia en los siguientes medios:
          </h2>
          <label className="mb-1 block text-xs font-light text-gray-500">
            Escoge todas las que apliquen.
          </label>
          <div className="space-y-2">
            {SOCIAL_MEDIA_OPTIONS.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register('currently_present_media')} // Nombre del campo
                  className="size-4 rounded border-gray-400 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          {errors.currently_present_media && (
            <p className="mt-1 text-xs text-red-500">
              {errors.currently_present_media.message}
            </p>
          )}
        </div>

        {/* Principales retos CHECKBOXES SELECT */}
        <div>
          <h2 className="mb-2 text-sm font-semibold">
            Cuáles son los principales retos que enfrenta mi negocio
          </h2>
          <label className="mb-1 block text-xs font-light text-gray-500">
            Escoge los tres principales.
          </label>
          <div className="space-y-2">
            {GOALS_OPTIONS.map((option) => {
              return (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    {...register('goals_achieve')}
                    className="size-4 rounded border-gray-400 bg-zinc-800 text-indigo-600 focus:ring-indigo-500
                           disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              );
            })}
          </div>
          {errors.goals_achieve && (
            <p className="mt-1 text-xs text-red-500">
              {errors.goals_achieve.message}
            </p>
          )}
        </div>

        {/* Medios digitales/físicos en los que tengo presencia me están ayudando a conseguir mis metas */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            ¿Los medios digitales/físicos en los que tengo presencia me están
            ayudando a conseguir mis metas?
          </label>
          <input
            type="number"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('digital_media', {
              valueAsNumber: true,
            })}
          />
          {errors.digital_media && (
            <p className="mt-1 text-xs text-red-500">
              {errors.digital_media.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Continuar'}
        </button>
      </form>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded bg-white p-6 text-gray-800 shadow-lg">
            <h3 className="mb-2 text-xl font-bold">¡Datos Guardados!</h3>
            <p className="mb-4 text-sm">
              La información de la empresa se guardó correctamente.
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
