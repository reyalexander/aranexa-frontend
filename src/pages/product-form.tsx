'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ProductType } from '@/lib/product-validation';
import { ProductSchema } from '@/lib/product-validation';

export default function ProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const INVEST_OPTIONS = [
    'Materia prima (insumos)',
    'Mano de obra',
    'Software / tecnología',
    'Maquinaria o herramientas',
    'Espacio físico (Ej. Oficinas)',
    'Espacio virtual (Ej. Ecommerce)',
    'Publicidad',
    'Distribución o delivery',
  ];

  const TRACK_OPTIONS = [
    'Apuntes personales de gastos o ingresos',
    'Libros contables',
    'No llevo registro de cuentas',
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit = async (data: ProductType) => {
    try {
      setIsSubmitting(true);
      setMessage(null);

      const res = await fetch(
        'http://localhost:8000/api/v1/product/products/',
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
      <h1 className="mb-4 text-2xl font-bold">Datos de mi producto/servicio</h1>

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
        {/* Datos de mi producto/servicio  */}
        <div>
          <label className="mb-1 block text-sm font-medium">Ofrezco:</label>
          <select
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('product_name', { valueAsNumber: true })}
          >
            <option value="">Seleccionar</option>
            <option value={1}>Producto</option>
            <option value={2}>Servicio</option>
            <option value={3}>Producto y servicio</option>
          </select>
          {errors.product_name && (
            <p className="text-sm text-red-500">
              {errors.product_name.message}
            </p>
          )}
        </div>

        {/* El producto/servicio que ofrezco */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            El producto/servicio que ofrezco es el siguiente:
          </label>
          <input
            type="text"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('product_description')}
          />
        </div>

        {/* Mi producto/servicio lo creé a partir de:  */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Mi producto/servicio lo creé a partir de:
          </label>
          <select
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('created_product_from', { valueAsNumber: true })}
          >
            <option value="">Seleccionar</option>
            <option value={1}>Alta demanda</option>
            <option value={2}>Ofrecer nuevas alternativas</option>
            <option value={3}>Rubro con poca competencia</option>
            <option value={4}>Legado familiar</option>
            <option value={5}>Aún no lo sé</option>
          </select>
          {errors.created_product_from && (
            <p className="text-sm text-red-500">
              {errors.created_product_from.message}
            </p>
          )}
        </div>

        {/* Invertir en mi producto CHECKBOXES SELECT */}
        <div>
          <h2 className="mb-2 text-sm font-semibold">
            Para producir mi producto, invierto más en:
          </h2>
          <label className="mb-1 block text-xs font-light text-gray-500">
            Selecciona todas las que correspondan.
          </label>
          <div className="space-y-2">
            {INVEST_OPTIONS.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register('product_invest')} // Nombre del campo
                  className="size-4 rounded border-gray-400 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          {errors.product_invest && (
            <p className="mt-1 text-xs text-red-500">
              {errors.product_invest.message}
            </p>
          )}
        </div>

        {/* Registro de cuentas de mi producto/servicio CHECKBOXES SELECT */}
        <div>
          <h2 className="mb-2 text-sm font-semibold">
            Llevo un registro de cuentas de mi producto/servicio:
          </h2>
          <div className="space-y-2">
            {TRACK_OPTIONS.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register('product_invest')} // Nombre del campo
                  className="size-4 rounded border-gray-400 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          {errors.product_invest && (
            <p className="mt-1 text-xs text-red-500">
              {errors.product_invest.message}
            </p>
          )}
        </div>

        {/* Precio de mi producto/servicio es el apropiado  */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Considero que el precio de mi producto/servicio es el apropiado
          </label>
          <select
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('price_appropiate', { valueAsNumber: true })}
          >
            <option value="">Seleccionar</option>
            <option value={1}>Sí, es el precio correcto</option>
            <option value={2}>No, tengo que actualizarlo</option>
            <option value={3}>No lo sé, no tengo referentes</option>
          </select>
          {errors.price_appropiate && (
            <p className="text-sm text-red-500">
              {errors.price_appropiate.message}
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
              La información del producto se guardó correctamente.
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
