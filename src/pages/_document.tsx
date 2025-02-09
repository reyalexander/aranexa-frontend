import Document, { Head, Html, Main, NextScript } from 'next/document';

import AllySection from '@/components/ally-section';
import Footer from '@/components/footer';
import GuideSection from '@/components/guide-section';
import Header from '@/components/header';
import Hero from '@/components/hero';
import SolutionsSection from '@/components/solutions-section';
import Sponsors from '@/components/sponsors';
import TargetSection from '@/components/target-section';

import { AppConfig } from '../utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head />
        <body>
          <Main />
          <Header />
          <Hero />
          <Sponsors />
          <GuideSection />
          <SolutionsSection />
          <TargetSection />
          <AllySection />
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
