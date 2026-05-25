import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LOCALES, getDictionary, isLocale, type Locale } from '@/lib/i18n';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function LangLayout({ children, params }: Props) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="max-w-container mx-auto px-5 sm:px-8">{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
