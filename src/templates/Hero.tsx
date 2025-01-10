import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="/">Sign in</Link>
        </li>
        <li>
          <Link href="/">Sobre Nosotros</Link>
        </li>
        <li>
          <Link href="/">Home</Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'The modern landing page for\n'}
            <span className="text-primary-500">ARANEXA</span>
          </>
        }
        description="The easiest way to build a React landing page in seconds."
        button_analisis={
          <Link href="/wizard">
            <Button xl>
              Recursos Personalizado <br />
              <span>(Prueba gratuita)</span>
            </Button>
          </Link>
        }
        button_cita={
          /* Puedes dejar tu link original o ajustarlo */
          <Link href="/contact" className="mx-3">
            <Button variant="secondary" xl>
              Agenda tu cita
            </Button>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
