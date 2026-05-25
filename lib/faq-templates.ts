import type { Country } from '@/lib/data/countries';
import type { City } from '@/lib/data/cities';
import type { Visa } from '@/lib/data/visas';
import type { Locale } from '@/lib/i18n';

export type Faq = { q: string; a: string };

function costEstimateMonthlyUsd(costIndex: number): number {
  return Math.round((400 + costIndex * 22) / 50) * 50;
}

function safetyVerdict(score: number, locale: Locale): string {
  const high = {
    en: 'Generally very safe, comparable to Western Europe.',
    fr: 'Très sûr dans l\'ensemble, comparable à l\'Europe de l\'Ouest.',
    es: 'Generalmente muy seguro, comparable a Europa Occidental.',
    pt: 'Geralmente muito seguro, comparável à Europa Ocidental.',
    it: 'Generalmente molto sicuro, paragonabile all\'Europa occidentale.',
    de: 'Im Allgemeinen sehr sicher, vergleichbar mit Westeuropa.',
    pl: 'Generalnie bardzo bezpieczny, porównywalny z Europą Zachodnią.',
  };
  const mid = {
    en: 'Workable with normal urban caution. Keep an eye on neighborhood-level advice.',
    fr: 'Praticable avec une vigilance urbaine normale. Vérifier les conseils par quartier.',
    es: 'Aceptable con precaución urbana normal. Revisa consejos por barrio.',
    pt: 'Aceitável com cautela urbana normal. Verifica conselhos por bairro.',
    it: 'Accettabile con normale prudenza urbana. Controlla i consigli per quartiere.',
    de: 'Mit normaler urbaner Vorsicht machbar. Stadtteil-spezifische Hinweise beachten.',
    pl: 'Akceptowalne przy normalnej miejskiej ostrożności. Sprawdzaj porady dzielnicowe.',
  };
  const low = {
    en: 'Stay aware. Pick safer neighborhoods and avoid showing valuables.',
    fr: 'Soyez vigilant. Privilégiez les quartiers sûrs et évitez d\'exhiber des objets de valeur.',
    es: 'Mantente alerta. Elige barrios seguros y evita mostrar objetos de valor.',
    pt: 'Mantém-te atento. Escolhe bairros seguros e evita exibir objetos de valor.',
    it: 'Restate attenti. Scegliete quartieri sicuri ed evitate di esibire oggetti di valore.',
    de: 'Wachsam bleiben. Sicherere Stadtteile wählen und Wertsachen verbergen.',
    pl: 'Zachowaj czujność. Wybieraj bezpieczne dzielnice i nie pokazuj wartościowych przedmiotów.',
  };
  if (score >= 75) return high[locale] || high.en;
  if (score >= 55) return mid[locale] || mid.en;
  return low[locale] || low.en;
}

function internetVerdict(mbps: number, locale: Locale): string {
  const great = {
    en: 'More than enough for video calls, large file uploads and 4K streaming.',
    fr: 'Plus que suffisant pour les visioconférences, gros uploads et streaming 4K.',
    es: 'Más que suficiente para videollamadas, subidas grandes y streaming 4K.',
    pt: 'Mais que suficiente para videochamadas, uploads grandes e streaming 4K.',
    it: 'Più che sufficiente per videochiamate, upload pesanti e streaming 4K.',
    de: 'Mehr als ausreichend für Videoanrufe, große Uploads und 4K-Streaming.',
    pl: 'Więcej niż wystarcza do wideokonferencji, dużych przesyłów i streamingu 4K.',
  };
  const ok = {
    en: 'Solid for daily remote work. Get an Airalo eSIM as a backup for travel days.',
    fr: 'Bon pour le télétravail quotidien. Une eSIM Airalo en backup pour les jours de déplacement.',
    es: 'Sólido para teletrabajo diario. Lleva una eSIM Airalo de respaldo en días de viaje.',
    pt: 'Sólido para teletrabalho diário. Leva uma eSIM Airalo como backup nos dias de viagem.',
    it: 'Solido per il telelavoro quotidiano. Tieni una eSIM Airalo come backup nei giorni di viaggio.',
    de: 'Solide für tägliche Remote-Arbeit. Eine Airalo-eSIM als Backup für Reisetage.',
    pl: 'Solidne do codziennej pracy zdalnej. Miej Airalo eSIM jako backup w dni podróży.',
  };
  const weak = {
    en: 'Patchy outside cafés and coworking spaces. eSIM tethering recommended.',
    fr: 'Inégal hors cafés et espaces de coworking. Partage de connexion eSIM recommandé.',
    es: 'Inconsistente fuera de cafés y coworking. Recomendado tethering vía eSIM.',
    pt: 'Inconsistente fora de cafés e coworking. Tethering via eSIM recomendado.',
    it: 'Discontinuo fuori da bar e coworking. Tethering via eSIM consigliato.',
    de: 'Außerhalb von Cafés und Coworking unzuverlässig. eSIM-Tethering empfohlen.',
    pl: 'Niestabilne poza kawiarniami i coworkingiem. Polecane tetheringowanie przez eSIM.',
  };
  if (mbps >= 100) return great[locale] || great.en;
  if (mbps >= 50) return ok[locale] || ok.en;
  return weak[locale] || weak.en;
}

const L = {
  costQ: { en: 'How much does it cost to live in', fr: 'Combien coûte la vie à', es: 'Cuánto cuesta vivir en', pt: 'Quanto custa viver em', it: 'Quanto costa vivere a', de: 'Wie viel kostet das Leben in', pl: 'Ile kosztuje życie w' },
  costA: { en: 'has a cost of living index of', fr: 'a un indice de coût de la vie de', es: 'tiene un índice de coste de vida de', pt: 'tem um índice de custo de vida de', it: 'ha un indice del costo della vita di', de: 'hat einen Lebenshaltungskosten-Index von', pl: 'ma indeks kosztów życia' },
  costSolo: { en: 'Expect around $', fr: 'Prévoyez environ', es: 'Cuenta con unos', pt: 'Conta com cerca de', it: 'Prevedete circa', de: 'Rechnen Sie mit etwa', pl: 'Spodziewaj się około' },
  costSoloEnd: { en: '/month as a solo nomad.', fr: '$/mois pour un nomade solo.', es: 'USD/mes para un nómada solo.', pt: 'USD/mês para um nómada solo.', it: '$/mese per un nomade solo.', de: '$/Monat als Solo-Nomad.', pl: '$/mies. dla samotnego nomada.' },
  internetQ: { en: 'Is the internet good in', fr: 'L\'internet est-il bon à', es: '¿Es bueno el internet en', pt: 'A internet é boa em', it: 'Internet è buono a', de: 'Ist das Internet gut in', pl: 'Czy internet jest dobry w' },
  internetA: { en: 'Average internet speed is', fr: 'La vitesse moyenne est de', es: 'La velocidad media es de', pt: 'A velocidade média é de', it: 'La velocità media è di', de: 'Die Durchschnittsgeschwindigkeit beträgt', pl: 'Średnia prędkość to' },
  visaQ: { en: 'What digital nomad visa does', fr: 'Quel visa nomade digital propose', es: '¿Qué visado de nómada digital ofrece', pt: 'Que visto de nómada digital oferece', it: 'Che visto per nomadi digitali offre', de: 'Welches Digital-Nomad-Visum bietet', pl: 'Jaką wizę nomady cyfrowego oferuje' },
  visaQEnd: { en: 'offer?', fr: '?', es: '?', pt: '?', it: '?', de: 'an?', pl: '?' },
  visaA: { en: 'offers the', fr: 'propose le', es: 'ofrece el', pt: 'oferece o', it: 'offre il', de: 'bietet das', pl: 'oferuje' },
  bestTimeQ: { en: 'When is the best time to visit', fr: 'Quand est le meilleur moment pour visiter', es: '¿Cuándo es la mejor época para visitar', pt: 'Quando é a melhor altura para visitar', it: 'Qual è il momento migliore per visitare', de: 'Wann ist die beste Zeit für', pl: 'Kiedy najlepiej odwiedzić' },
  bestTimeA: { en: 'The best months are', fr: 'Les meilleurs mois sont', es: 'Los mejores meses son', pt: 'Os melhores meses são', it: 'I mesi migliori sono', de: 'Die besten Monate sind', pl: 'Najlepsze miesiące to' },
  bestTimeEnd: { en: 'with temperatures', fr: 'avec des températures', es: 'con temperaturas', pt: 'com temperaturas', it: 'con temperature', de: 'mit Temperaturen', pl: 'z temperaturami' },
  safetyQ: { en: 'Is', fr: '', es: '¿Es', pt: 'É', it: '', de: 'Ist', pl: 'Czy' },
  safetyQEnd: { en: 'safe for digital nomads?', fr: 'sûr pour les nomades digitaux ?', es: 'seguro para nómadas digitales?', pt: 'seguro para nómadas digitais?', it: 'sicuro per i nomadi digitali?', de: 'sicher für digitale Nomaden?', pl: 'bezpieczne dla cyfrowych nomadów?' },
  safetyA: { en: 'scores', fr: 'obtient', es: 'obtiene', pt: 'obtém', it: 'ottiene', de: 'erreicht', pl: 'ma' },
  safetyAEnd: { en: 'on the safety index.', fr: 'sur l\'indice de sécurité.', es: 'en el índice de seguridad.', pt: 'no índice de segurança.', it: 'sull\'indice di sicurezza.', de: 'auf dem Sicherheitsindex.', pl: 'na indeksie bezpieczeństwa.' },
};

function t(key: keyof typeof L, locale: Locale): string {
  return L[key][locale] || L[key].en;
}

export function countryFaqs(c: Country, name: string, locale: Locale): Faq[] {
  const cost = costEstimateMonthlyUsd(c.costIndex);
  return [
    {
      q: `${t('costQ', locale)} ${name}?`,
      a: `${name} ${t('costA', locale)} ${c.costIndex}/100. ${t('costSolo', locale)} ${cost}${t('costSoloEnd', locale)}`,
    },
    {
      q: `${t('internetQ', locale)} ${name}?`,
      a: `${t('internetA', locale)} ${c.internetMbps} Mbps. ${internetVerdict(c.internetMbps, locale)}`,
    },
    {
      q: `${t('visaQ', locale)} ${name} ${t('visaQEnd', locale)}`,
      a: `${name} ${t('visaA', locale)} ${c.visa.digitalNomad}.`,
    },
    {
      q: `${t('bestTimeQ', locale)} ${name}?`,
      a: `${t('bestTimeA', locale)} ${c.weather.bestMonths.join(', ')} ${t('bestTimeEnd', locale)} ${c.weather.tempMinC}° – ${c.weather.tempMaxC}°C.`,
    },
    {
      q: `${t('safetyQ', locale)} ${name} ${t('safetyQEnd', locale)}`,
      a: `${name} ${t('safetyA', locale)} ${c.safetyIndex}/100 ${t('safetyAEnd', locale)} ${safetyVerdict(c.safetyIndex, locale)}`,
    },
  ];
}

export function cityFaqs(c: City, name: string, locale: Locale): Faq[] {
  const cost = costEstimateMonthlyUsd(c.costIndex);
  return [
    {
      q: `${t('costQ', locale)} ${name}?`,
      a: `${name} ${t('costA', locale)} ${c.costIndex}/100. ${t('costSolo', locale)} ${cost}${t('costSoloEnd', locale)}`,
    },
    {
      q: `${t('internetQ', locale)} ${name}?`,
      a: `${t('internetA', locale)} ${c.internetMbps} Mbps. ${internetVerdict(c.internetMbps, locale)}`,
    },
    {
      q: `${t('safetyQ', locale)} ${name} ${t('safetyQEnd', locale)}`,
      a: `${name} ${t('safetyA', locale)} ${c.safetyIndex}/100 ${t('safetyAEnd', locale)} ${safetyVerdict(c.safetyIndex, locale)}`,
    },
    {
      q: `${t('bestTimeQ', locale)} ${name}?`,
      a: `${t('bestTimeA', locale)} ${c.bestMonths.join(', ')} ${t('bestTimeEnd', locale)} ${c.tempMinC}° – ${c.tempMaxC}°C.`,
    },
  ];
}

export function visaFaqs(v: Visa, locale: Locale): Faq[] {
  const incomeQ = {
    en: `What is the income requirement for the ${v.name}?`,
    fr: `Quel est le revenu minimum requis pour le ${v.name} ?`,
    es: `¿Cuál es el ingreso mínimo para el ${v.name}?`,
    pt: `Qual é o rendimento mínimo para o ${v.name}?`,
    it: `Qual è il reddito minimo per il ${v.name}?`,
    de: `Welches Einkommen erfordert das ${v.name}?`,
    pl: `Jaki dochód jest wymagany dla ${v.name}?`,
  };
  const incomeA = v.minIncomeMonthlyEur
    ? {
        en: `${v.minIncomeMonthlyEur.toLocaleString()} euros per month, with adjustments for dependents.`,
        fr: `${v.minIncomeMonthlyEur.toLocaleString()} euros par mois, avec ajustements pour personnes à charge.`,
        es: `${v.minIncomeMonthlyEur.toLocaleString()} euros al mes, con ajustes por dependientes.`,
        pt: `${v.minIncomeMonthlyEur.toLocaleString()} euros por mês, com ajustes por dependentes.`,
        it: `${v.minIncomeMonthlyEur.toLocaleString()} euro al mese, con aggiustamenti per familiari a carico.`,
        de: `${v.minIncomeMonthlyEur.toLocaleString()} Euro pro Monat, mit Anpassungen für Angehörige.`,
        pl: `${v.minIncomeMonthlyEur.toLocaleString()} euro miesięcznie, z dostosowaniami dla osób na utrzymaniu.`,
      }
    : {
        en: 'No income threshold disclosed. Bank statements typically required.',
        fr: 'Aucun seuil de revenu communiqué. Relevés bancaires généralement requis.',
        es: 'No hay umbral de ingresos publicado. Suelen pedirse extractos bancarios.',
        pt: 'Sem limite de rendimento divulgado. Geralmente pedem extratos bancários.',
        it: 'Nessuna soglia di reddito comunicata. Solitamente richiesti estratti bancari.',
        de: 'Keine Einkommensschwelle veröffentlicht. Kontoauszüge meist erforderlich.',
        pl: 'Brak ujawnionego progu dochodowego. Zwykle wymagane wyciągi bankowe.',
      };
  const durQ = {
    en: `How long is the ${v.name} valid?`,
    fr: `Quelle est la durée du ${v.name} ?`,
    es: `¿Cuánto dura el ${v.name}?`,
    pt: `Qual é a duração do ${v.name}?`,
    it: `Quanto dura il ${v.name}?`,
    de: `Wie lange ist das ${v.name} gültig?`,
    pl: `Jak długo ważna jest ${v.name}?`,
  };
  const durA = {
    en: `${v.durationMonths} months on first issue${v.renewable ? ', renewable.' : ', non-renewable.'}`,
    fr: `${v.durationMonths} mois à la première délivrance${v.renewable ? ', renouvelable.' : ', non renouvelable.'}`,
    es: `${v.durationMonths} meses en la primera emisión${v.renewable ? ', renovable.' : ', no renovable.'}`,
    pt: `${v.durationMonths} meses na primeira emissão${v.renewable ? ', renovável.' : ', não renovável.'}`,
    it: `${v.durationMonths} mesi al primo rilascio${v.renewable ? ', rinnovabile.' : ', non rinnovabile.'}`,
    de: `${v.durationMonths} Monate bei Erstausstellung${v.renewable ? ', verlängerbar.' : ', nicht verlängerbar.'}`,
    pl: `${v.durationMonths} miesięcy przy pierwszym wydaniu${v.renewable ? ', odnawialna.' : ', nieodnawialna.'}`,
  };
  const famQ = {
    en: `Can family members come on the ${v.name}?`,
    fr: `La famille peut-elle accompagner sur le ${v.name} ?`,
    es: `¿Puede acompañar la familia con el ${v.name}?`,
    pt: `A família pode acompanhar no ${v.name}?`,
    it: `La famiglia può accompagnare con il ${v.name}?`,
    de: `Kann Familie auf dem ${v.name} mitkommen?`,
    pl: `Czy rodzina może wjechać na ${v.name}?`,
  };
  const famA = v.familyEligible
    ? { en: 'Yes, spouse and dependent children are eligible.', fr: 'Oui, conjoint et enfants à charge sont éligibles.', es: 'Sí, cónyuge e hijos dependientes son elegibles.', pt: 'Sim, cônjuge e filhos dependentes são elegíveis.', it: 'Sì, coniuge e figli a carico sono ammissibili.', de: 'Ja, Ehepartner und unterhaltsberechtigte Kinder sind berechtigt.', pl: 'Tak, małżonek i dzieci na utrzymaniu są uprawnione.' }
    : { en: 'No, this visa is for the primary applicant only.', fr: 'Non, ce visa est pour le demandeur principal uniquement.', es: 'No, este visado es solo para el solicitante principal.', pt: 'Não, este visto é apenas para o requerente principal.', it: 'No, questo visto è solo per il richiedente principale.', de: 'Nein, dieses Visum gilt nur für den Hauptantragsteller.', pl: 'Nie, ta wiza jest tylko dla głównego wnioskodawcy.' };
  return [
    { q: incomeQ[locale] || incomeQ.en, a: incomeA[locale] || incomeA.en },
    { q: durQ[locale] || durQ.en, a: durA[locale] || durA.en },
    { q: famQ[locale] || famQ.en, a: famA[locale] || famA.en },
  ];
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
