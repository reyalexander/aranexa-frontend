export default function AllySection() {
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-4xl font-bold text-white">
            ¿Quieres ser un aliado Aranexa?
          </h2>
          <p className="text-lg text-gray-300">
            Convocatoria abierta a emprendimientos, empresas, startups e
            independientes que ofrezcan{' '}
            <span className="font-semibold text-white">
              soluciones a otros negocios
            </span>
            .
          </p>
          <button className="rounded-md bg-pink-500 px-8 py-3 text-white transition-colors hover:bg-pink-600">
            Quiero ser aliado
          </button>
        </div>
      </div>
    </section>
  );
}
