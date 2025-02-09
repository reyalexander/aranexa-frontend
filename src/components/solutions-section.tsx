import React from 'react';

interface SolutionCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

function SolutionCard({ imageSrc, title, description }: SolutionCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-pink-100">
        <img src={imageSrc} alt={title} className="size-16 object-contain" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="max-w-sm text-gray-600">{description}</p>
    </div>
  );
}

export default function SolutionsSection() {
  const solutions = [
    {
      imageSrc: '/assets/images/Icon_1.png', // Ajusta la ruta de la imagen según tu estructura de proyecto
      title: 'Análisis rápido',
      description: 'Recibirás una calificación y consejos clave por sección.',
    },
    {
      imageSrc: '/assets/images/Icon_2.png',
      title: 'Recursos educativos',
      description:
        'Recomendación de recursos educativos de internet como cursos, talleres, blogs, libros etc. seleccionados según tus necesidades.',
    },
    {
      imageSrc: '/assets/images/Icon_3.png',
      title: 'Sugerencias de partners',
      description:
        'De emprendedores para emprendedores. Sugerencias de especialistas o potenciales partners con los que podrías trabajar.',
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-16 space-y-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Soluciones a tu medida
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Después de realizar el test, se generará una guía personalizada
            separada en 5 secciones con la siguiente información:
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              imageSrc={solution.imageSrc}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
