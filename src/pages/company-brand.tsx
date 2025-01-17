'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { SortableGoals } from '@/components/SortableGoals';
import type { CompanyBrandType } from '@/lib/company-brand';
import { CompanyBrandSchema } from '@/lib/company-brand';

export default function CompanyBrand() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  // Opciones de checkbox y metas
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

  // 1. useForm con "defaultValues"
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CompanyBrandType>({
    resolver: zodResolver(CompanyBrandSchema),
    defaultValues: {
      brand_information: '',
      brand_name_registered: undefined,
      currently_present_media: [],
      goals_achieve: GOALS_OPTIONS,
    },
  });

  // 2. Asegurarnos de que sea un array
  const goalsValue = watch('goals_achieve') ?? [];

  // Actualiza "goals_achieve" cuando se reordena
  const handleGoalsChange = (newArray: string[]) => {
    setValue('goals_achieve', newArray, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: CompanyBrandType) => {
    try {
      setIsSubmitting(true);
      setMessage(null);

      const accountId = localStorage.getItem('accountId');

      const finalData = {
        ...data,
        account_id: accountId ? parseInt(accountId, 10) : null,
      };

      const res = await fetch(
        'http://3.133.157.177:8002/api/v1/company/company_brand/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
    router.push('/product-form'); // Redirige a otra ruta si es necesario
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
        {/* 1. Nombre Comercial */}
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

        {/* 2. Marca registrada */}
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

        {/* 3. Redes / medios */}
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
                  {...register('currently_present_media')}
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

        {/* 4. Metas a conseguir (ordenable) */}
        <div>
          <label className="text-lg font-bold">Mis metas a conseguir son</label>
          <p className="text-sm text-gray-400">
            Ordena las siguientes opciones según prioridad (1 = más importante)
          </p>
          <SortableGoals items={goalsValue} onChange={handleGoalsChange} />
          {errors.goals_achieve && (
            <p className="mt-1 text-sm text-red-500">
              {errors.goals_achieve.message}
            </p>
          )}
        </div>

        {/* 5. Valoración (1..5) */}
        <div>
          <label className="text-lg font-bold">
            ¿Los medios digitales/físicos en los que tengo presencia me están
            ayudando a conseguir mis metas?
          </label>
          <p className="text-sm text-gray-400">
            Selecciona 1 si no lo estoy consiguiendo, 5 si lo estoy logrando.
          </p>
          <div className="mt-2 flex space-x-4">
            {[1, 2, 3, 4, 5].map((val) => (
              <label
                key={val}
                className="flex cursor-pointer flex-col items-center"
              >
                <input
                  type="radio"
                  value={val}
                  {...register('digital_media', { valueAsNumber: true })}
                  className="mb-1 size-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">{val}</span>
              </label>
            ))}
          </div>
          {errors.digital_media && (
            <p className="mt-1 text-sm text-red-500">
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
              La información de la marca de tu empresa se guardó correctamente.
            </p>
            <button
              onClick={handleCloseModal}
              className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
