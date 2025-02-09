export default function Hero() {
  return (
    <section className="min-h-screen bg-black bg-[url('/assets/images/Banner_background.png')] bg-cover bg-center pt-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 py-20 lg:grid-cols-2">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
              Descubre lo que necesitas para ser un negocio más rentable
            </h1>
            <p className="text-lg text-gray-300">
              Con <span className="font-semibold text-white">Aranexa</span>,
              identifica áreas de mejora en tu empresa o emprendimiento y
              encuentra{' '}
              <span className="font-semibold text-white">
                soluciones a tu medida
              </span>
              .
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-md bg-green-500 px-8 py-3 text-white transition-colors hover:bg-green-600">
                Realizar test gratis
              </button>
              <button className="rounded-md border border-white px-8 py-3 text-white transition-colors hover:bg-white hover:text-black">
                Quiero más información
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="assets/images/Image_banner_1.png"
                alt="Hands crafting"
                className="h-[300px] w-full rounded-lg object-cover"
              />
              <img
                src="assets/images/Image_banner_2.png"
                alt="Classical sculpture"
                className="mt-12 h-[400px] w-full rounded-lg object-cover"
              />
              <img
                src="assets/images/Image_banner_3.png"
                alt="Detailed work"
                className="col-span-2 -mt-12 h-[250px] w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
