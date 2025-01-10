import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button_analisis: ReactNode;
  button_cita: ReactNode;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="whitespace-pre-line text-5xl font-bold leading-hero text-gray-900">
      {props.title}
    </h1>
    <div className="mb-16 mt-4 text-2xl">{props.description}</div>
    <div className="flex justify-center">
      <div className="content-center space-x-4">{props.button_analisis}</div>
      <div className="content-center space-x-4">{props.button_cita}</div>
    </div>
  </header>
);

export { HeroOneButton };
