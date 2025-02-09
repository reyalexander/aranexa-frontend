export default function GuideSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image Column */}
          <div className="relative h-[500px] overflow-hidden rounded-lg">
            <img
              src={`assets/images/Image_2.png?height=500&width=600`}
              alt="Classical sculpture"
              className="size-full object-cover sepia"
            />
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight text-gray-900">
              Obtén una guía con recursos educativos y servicios según las
              necesidades reales de tu negocio
            </h2>
            <p className="text-lg text-gray-600">
              Deja de buscar sin rumbo y resuelve el siguiente test solo en 5
              pasos. ¿Empezamos?
            </p>
            <button className="rounded-md bg-green-500 px-8 py-3 text-white transition-colors hover:bg-green-600">
              Realizar test gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
