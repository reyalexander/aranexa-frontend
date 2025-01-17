'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { UserFormType } from '@/lib/validation';
import { UserFormSchema } from '@/lib/validation';

export default function WizardPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const ACADEMIC_OPTIONS = [
    'Administración, negocios y ventas',
    'Artes y humanidades',
    'Ingeniería, manufactura y construcción',
    'Ciencias exactas y naturales',
    'Ciencias sociales y derecho',
    'Ciencias de la salud',
    'Otro',
  ];

  // Inicializamos React Hook Form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      full_name: '',
      email: '',
      year_birthday: undefined,
      nationality: '',
      gender: undefined,
      level_of_study: undefined,
      academic_or_work_area: [],
      current_position: '',
    },
  });

  const onSubmit = async (data: UserFormType) => {
    try {
      setIsSubmitting(true);
      setMessage(null);

      const res = await fetch(
        'http://3.133.157.177:8002/api/v1/user/account/',
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
        throw new Error(errorData.detail || 'Error al crear el usuario');
      }

      setShowSuccessModal(true);

      // Si todo salió bien, res.json() trae el usuario creado
      const newUser = await res.json();

      localStorage.setItem('accountId', String(newUser.id));
      setMessage(`¡Usuario creado correctamente con ID: ${newUser.id}!`);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cierra el modal y redirige al menú principal
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push('/company-form'); // Redirige al formulario de empresa
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded bg-zinc-900 p-6 text-gray-100 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Registro de Usuario (Paso 1)</h1>

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
        {/* Nombres Completos */}
        <div>
          <label className="block text-sm font-medium">Nombre Completo</label>
          <input
            type="text"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('full_name')}
          />
          {errors.full_name && (
            <p className="text-sm text-red-500">{errors.full_name.message}</p>
          )}
        </div>

        {/* Correo */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Año de nacimiento */}
        <div>
          <label className="block text-sm font-medium">Año de Nacimiento</label>
          <input
            type="number"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('year_birthday', { valueAsNumber: true })}
          />
          {errors.year_birthday && (
            <p className="text-sm text-red-500">
              {errors.year_birthday.message}
            </p>
          )}
        </div>

        {/* Nacionalidad */}
        <div>
          <label className="block text-sm font-medium">Nacionalidad</label>
          <input
            type="text"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('nationality')}
          />
          {errors.nationality && (
            <p className="text-sm text-red-500">{errors.nationality.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium">Género</label>
          <select
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('gender', { valueAsNumber: true })}
          >
            <option value="">Seleccionar</option>
            <option value={1}>Femenino</option>
            <option value={2}>Masculino</option>
            <option value={3}>No Binario</option>
            <option value={4}>Otro</option>
            <option value={5}>Prefiero no decirlo</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>

        {/* Nivel de Estudio */}
        <div>
          <label className="block text-sm font-medium">Nivel de Estudio</label>
          <select
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('level_of_study', { valueAsNumber: true })}
          >
            <option value="">Seleccionar</option>
            <option value={1}>Básica primaria</option>
            <option value={2}>Básica secundaria</option>
            <option value={3}>Técnica profesional</option>
            <option value={4}>Universitaria</option>
            <option value={5}>Licenciatura</option>
            <option value={6}>Posgrado</option>
          </select>
          {errors.level_of_study && (
            <p className="text-sm text-red-500">
              {errors.level_of_study.message}
            </p>
          )}
        </div>

        {/* Área académica/laboral CHECKBOXES SELECT */}
        <div>
          <h2 className="mb-2 text-sm font-semibold">
            Selecciona tus áreas (puedes marcar varias):
          </h2>
          <div className="space-y-2">
            {ACADEMIC_OPTIONS.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register('academic_or_work_area')} // Nombre del campo
                  className="size-4 rounded border-gray-400 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          {errors.academic_or_work_area && (
            <p className="mt-1 text-xs text-red-500">
              {errors.academic_or_work_area.message}
            </p>
          )}
        </div>

        {/* Puesto actual */}
        <div>
          <label className="block text-sm font-medium">Puesto actual</label>
          <input
            type="text"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('current_position')}
          />
          {errors.current_position && (
            <p className="text-sm text-red-500">
              {errors.current_position.message}
            </p>
          )}
        </div>

        {/* Botón Enviar */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          {isSubmitting ? 'Enviando...' : 'Continuar'}
        </button>
      </form>
      {/* MODAL DE ÉXITO */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded bg-white p-6 text-gray-800 shadow-lg">
            <h3 className="mb-2 text-xl font-bold">¡Usuario Creado!</h3>
            <p className="mb-4 text-sm">
              Tu información se ha registrado exitosamente.
            </p>
            <button
              onClick={handleCloseModal}
              className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Siguiente Formulario
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
