'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';

import type { CompanyFormType } from '@/lib/company-info';
import { CompanyFormSchema } from '@/lib/company-info';

type CompanyFormFields = {
  political: number | null;
  social: number | null;
  economic: number | null;
  technological: number | null;
  environmental: number | null;
};

// Creamos un type que extraiga las "keys" de CompanyFormFields
type ContextField = keyof CompanyFormFields;

const CONTEXTS: { field: ContextField; label: string }[] = [
  { field: 'political', label: 'Político' },
  { field: 'social', label: 'Social' },
  { field: 'economic', label: 'Económico' },
  { field: 'technological', label: 'Tecnológico' },
  { field: 'environmental', label: 'Ambiental' },
];

// knowledgeOptions: los valores de 1 a 5 y “No Aplica”.
const KNOWLEDGE_OPTIONS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: 'No Aplica' },
];

// Opciones para los campos select
export const MARKET_CHOICES = [
  { value: 'Tecnología y software', label: 'Tecnología y software' },
  { value: 'Alimentos y bebidas', label: 'Alimentos y bebidas' },
  { value: 'Salud y bienestar', label: 'Salud y bienestar' },
  { value: 'Mascotas y otros animales', label: 'Mascotas y otros animales' },
  {
    value: 'Educación, consultorías o asesorías',
    label: 'Educación, consultorías o asesorías',
  },
  {
    value: 'Gestión, marketing y diseño',
    label: 'Gestión, marketing y diseño',
  },
  { value: 'Arte, diseño y artesanía', label: 'Arte, diseño y artesanía' },
  { value: 'Entretenimiento y ocio', label: 'Entretenimiento y ocio' },
  { value: 'Moda y estilo de vida', label: 'Moda y estilo de vida' },
  { value: 'Finanzas y seguros', label: 'Finanzas y seguros' },
  {
    value: 'Sostenibilidad y medio ambiente',
    label: 'Sostenibilidad y medio ambiente',
  },
  {
    value: 'Transporte, logística y exportación',
    label: 'Transporte, logística y exportación',
  },
  { value: 'Vivienda, hogar y familia', label: 'Vivienda, hogar y familia' },
  { value: 'Deporte y estilo de vida', label: 'Deporte y estilo de vida' },
  { value: 'Turismo y cultura', label: 'Turismo y cultura' },
];

export default function CompanyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const PAYMENTS_OPTIONS = [
    'Facturas',
    'Boletas de venta',
    'Tickets',
    'No sé cuál emitir',
    'No necesito',
    'Otros',
  ];

  const CHALLENGE_OPTIONS = [
    'Acceso a financiamiento',
    'Normas fiscales y legales complejas',
    'Saturación de mercado (mucha competencia',
    'Dificultad para adaptarse a nuevos entornos e integrar herramientas digitales',
    'Falta de capital humano capacitado',
    'Falta de estructura y organización interna',
    'Delincuencia',
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyFormType>({
    resolver: zodResolver(CompanyFormSchema),
  });

  // Obtenemos el valor del checkbox
  const watchPeruFounded = watch('peru_was_founded');

  // Observa las casillas seleccionadas
  const selectedChallenges = watch('main_challenges') || [];

  const onSubmit = async (data: CompanyFormType) => {
    try {
      setIsSubmitting(true);
      setMessage(null);

      const res = await fetch(
        'http://localhost:8000/api/v1/company/company_information/',
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

  // Maneja el cambio del <ReactSelect> y sincroniza con React Hook Form
  const handleMarketChange = (selected: any) => {
    // selected será un array de objetos {value, label}
    // Extraemos sólo el value (string) en un array
    const values = selected ? selected.map((option: any) => option.value) : [];
    setValue('market', values, { shouldValidate: true });
  };

  // Recuerda: watch("market") es un array de strings
  const currentMarketValues = watch('market') || [];
  // Convertimos a un array de { value, label } para que ReactSelect lo muestre
  const selectedMarketOptions = currentMarketValues.map((val) => ({
    value: val,
    label: val,
  }));

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push('/'); // Cambia esto a la siguiente ruta si tienes más pasos en el wizard
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded bg-zinc-900 p-6 text-gray-100 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Información de la Empresa</h1>

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
            Año de Fundación
          </label>
          <input
            type="number"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('year_foundation', { valueAsNumber: true })}
          />
          {errors.year_foundation && (
            <p className="mt-1 text-xs text-red-500">
              {errors.year_foundation.message}
            </p>
          )}
        </div>

        {/* Mercado */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Mi mercado es:
          </label>
          <label className="mb-1 block text-xs font-light text-gray-500">
            Puedes escoger más de uno.
          </label>
          <ReactSelect
            options={MARKET_CHOICES}
            isMulti
            value={selectedMarketOptions}
            onChange={handleMarketChange}
            styles={{
              /* El contenedor donde escribes: */
              control: (base) => ({
                ...base,
                backgroundColor: '#1F2937', // Tailwind bg-zinc-900
                borderColor: '#4B5563', // Tailwind border-zinc-600
                /* Opcional: si deseas cambiar texto o altura: */
                color: '#fff',
                minHeight: '2.5rem',
              }),

              /* El menú desplegable */
              menu: (base) => ({
                ...base,
                backgroundColor: '#1F2937', // Tailwind bg-zinc-900
              }),

              /* Cada opción (elemento de la lista) */
              option: (base) => ({
                ...base,
                backgroundColor: '#374151',
                color: '#fff',
                cursor: 'pointer',
              }),

              /* El 'tag' (chip) que aparece para cada selección */
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#4B5563', // algo como bg-zinc-600
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: '#fff',
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: '#fff',
                ':hover': {
                  backgroundColor: '#374151', // hover un poco más claro
                  color: '#fff',
                },
              }),
            }}
          />
          {errors.market && (
            <p className="mt-1 text-xs text-red-400">{errors.market.message}</p>
          )}
        </div>

        {/* Se fundó en Perú */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            ¿Se fundó en Perú?
          </label>
          <label className="mb-1 block text-xs font-light text-gray-500">
            Este es el país donde tienes (o podrías tener) responsabilidades
            tributarias como impuestos.
          </label>
          <input
            type="checkbox"
            {...register('peru_was_founded')}
            className="mr-2"
          />
          <span className="text-sm">Sí</span>
        </div>

        {/* País de fundación - se muestra solo si NO está seleccionado el checkbox */}
        {!watchPeruFounded && (
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold">
              Si tu empresa/emprendimiento no es peruano, escribe el nombre del
              país que corresponda
            </label>
            <input
              type="text"
              className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
              {...register('country_was_founded')}
            />
          </div>
        )}

        {/* Número de personas asociadas */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Qué número de personas se asociaron para su creación
          </label>
          <input
            type="number"
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('people_joined', { valueAsNumber: true })}
          />
        </div>

        {/* Necesito contratar personal adicional para que mi empresa/emprendimiento  */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            ¿Actualmente necesito contratar personal adicional para que mi
            empresa/emprendimiento pueda funcionar?
          </label>
          <select
            className="w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"
            {...register('need_hire_staff', { valueAsNumber: true })}
          >
            <option value="">Seleccionar</option>
            <option value={1}>Sí, es necesario</option>
            <option value={2}>No, puedo manejarlo internamente</option>
            <option value={3}>No, pero lo haré</option>
          </select>
          {errors.need_hire_staff && (
            <p className="text-sm text-red-500">
              {errors.need_hire_staff.message}
            </p>
          )}
        </div>

        {/* Comprobantes de pago CHECKBOXES SELECT */}
        <div>
          <h2 className="mb-2 text-sm font-semibold">
            Emito comprobantes de pago
          </h2>
          <label className="mb-1 block text-xs font-light text-gray-500">
            Escoge todas las que apliquen.
          </label>
          <div className="space-y-2">
            {PAYMENTS_OPTIONS.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register('payment_vouchers')} // Nombre del campo
                  className="size-4 rounded border-gray-400 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          {errors.payment_vouchers && (
            <p className="mt-1 text-xs text-red-500">
              {errors.payment_vouchers.message}
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
            {CHALLENGE_OPTIONS.map((option) => {
              // Determina si esta casilla está marcada
              const isChecked = selectedChallenges.includes(option);

              // Para limitar a 3, si YA hay 3 checkboxes marcadas
              // y ésta no está marcada, la deshabilitamos:
              const isDisabled = !isChecked && selectedChallenges.length >= 3;

              return (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    {...register('main_challenges')}
                    disabled={isDisabled}
                    className="size-4 rounded border-gray-400 bg-zinc-800 text-indigo-600 focus:ring-indigo-500
                           disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              );
            })}
          </div>
          {errors.main_challenges && (
            <p className="mt-1 text-xs text-red-500">
              {errors.main_challenges.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            ¿Conozco sobre cómo los siguientes contextos afectan a mi negocio?
          </label>
          <label className="mb-1 block text-xs font-light text-gray-500">
            Selecciona <strong>1</strong> si consideras que no tienes suficiente
            información, y <strong>5</strong> si estás bien informado. ´No
            Aplica´ si consideras que ese contexto no te afecta.
          </label>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="py-2 text-left"></th>
                {/* Renderiza cabeceras: 1,2,3,4,5, No Aplica */}
                {KNOWLEDGE_OPTIONS.map((opt) => (
                  <th key={opt.value} className="p-2 font-semibold">
                    {opt.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Renderiza una fila por cada contexto */}
              {CONTEXTS.map((ctx) => (
                <tr key={ctx.field} className="border-t border-zinc-700">
                  {/* Primera celda: nombre del contexto */}
                  <td className="p-2 font-medium">{ctx.label}</td>

                  {/* Celdas con radio buttons */}
                  {KNOWLEDGE_OPTIONS.map((opt) => (
                    <td key={opt.value} className="text-center">
                      <input
                        type="radio"
                        value={opt.value}
                        {...register(ctx.field, {
                          valueAsNumber: true,
                        })}
                        className="size-4 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {errors.political && (
            <p className="mt-1 text-xs text-red-500">
              {errors.political.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
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
