export default function TargetSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content Column */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Dirigido a</h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                <span className="font-semibold">
                  Emprendedores y microempresarios
                </span>{' '}
                que enfrentan diferentes retos para sacar adelante sus negocios.
              </p>
              <p className="text-lg text-gray-600">Pueden ser:</p>
              <ul className="list-inside space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="size-2 rounded-full bg-gray-400"></span>
                  <span>
                    Emprendedores que ya han realizado ventas (productos o
                    servicios)
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="size-2 rounded-full bg-gray-400"></span>
                  <span>Microempresarios de diferentes industrias</span>
                </li>
              </ul>
              <button className="mt-6 rounded-md bg-green-500 px-8 py-3 text-white transition-colors hover:bg-green-600">
                Realizar test gratis
              </button>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <img
              src="assets/images/Image_3.png"
              alt="Artisan working with tools"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
