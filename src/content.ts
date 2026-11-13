// All copy, links and image paths come from silentspring.org.
// Images are loaded from the live site so the redesign always shows current assets.

const SITE = 'https://silentspring.org'
const FILES = `${SITE}/sites/default/files/styles`

export const site = {
  name: 'Silent Spring Institute',
  url: SITE,
  logo: `${SITE}/themes/custom/ssi2019/logo.svg`,
}

export const nav = [
  { label: 'About Us', href: `${SITE}/about-us` },
  { label: 'Our Science', href: `${SITE}/our-science` },
  { label: 'Our Impact', href: `${SITE}/our-impact` },
  { label: 'Resources', href: `${SITE}/resources` },
  { label: 'The Latest', href: `${SITE}/the-latest` },
  { label: 'Support Our Work', href: `${SITE}/support-our-work` },
]

// TODO: swap for the live donation form URL.
export const donate = { label: 'Donate', href: `${SITE}/support-our-work` }

export const hero = {
  headline:
    'Silent Spring Institute is a mission-driven scientific research organization dedicated to uncovering the environmental causes of breast cancer.',
  body: 'Our independent research is empowering a revolution in environmental health to prevent cancers by reducing people’s exposure to harmful chemicals where they live, work, and play.',
  image: {
    src: `${FILES}/homepage_hero_541x577/public/homepage/2016-11-07_Silent_Spring_Institute-2971-Edit_2.jpg?h=890cae8b&itok=Saj32XNq`,
    alt: 'Silent Spring Institute scientist',
  },
  primary: { label: 'Support our work', href: `${SITE}/support-our-work` },
  secondary: { label: 'Our Science', href: `${SITE}/our-science` },
  founded: 'Newton, Massachusetts. Founded 1994.',
}

export const belief = {
  text: 'We believe everyone has a right to clean air, clean water, and safer products and that no one should get sick from toxic chemicals.',
  link: { label: 'Core Values', href: `${SITE}/core-values` },
}

export const science = {
  title: 'Our Science',
  lead: 'We are creating new knowledge about cancer-causing chemicals: how we are exposed and how they affect our health.',
  link: { label: 'Explore our science', href: `${SITE}/our-science` },
  questions: [
    {
      title: 'How do we identify chemicals that cause breast cancer?',
      line: 'We are developing new methods to find which of the thousands of chemicals in use raise breast cancer risk.',
      href: `${SITE}/our-science/how-do-we-identify-chemicals-cause-breast-cancer`,
      src: `${FILES}/landing_page_image/public/research-area/2019-04/BC%20cells.png?itok=D5e4nGuN`,
      alt: '',
    },
    {
      title: 'How are we exposed to toxic chemicals?',
      line: 'Identifying where exposures come from is the first step toward limiting them in everyday life.',
      href: `${SITE}/our-science/how-are-we-exposed-toxic-chemicals`,
      src: `${FILES}/landing_page_image/public/research-area/2019-03/Silent%20Spring-007%20flipped.jpg?h=81e28402&itok=g3IC5bIB`,
      alt: '',
    },
    {
      title: 'How do chemical exposures affect our health?',
      line: 'Linking early warning signs of disease risk with chemical exposures can open up new prevention strategies.',
      href: `${SITE}/our-science/how-do-chemical-exposures-affect-our-health`,
      src: `${FILES}/landing_page_image/public/research-area/2019-04/iStock-1026851886_1500.jpg?h=fab75235&itok=zkk8NPIA`,
      alt: '',
    },
    {
      title: 'How can we limit our chemical exposures?',
      line: 'There are steps individuals and communities can take to reduce their exposure to harmful chemicals.',
      href: `${SITE}/our-science/how-can-we-limit-our-chemical-exposures`,
      src: `${FILES}/landing_page_image/public/research-area/2019-04/iStock-905177198_edited_1500.jpg?h=c382cd76&itok=fKsklxcR`,
      alt: '',
    },
    {
      title: 'How do we engage communities in our research?',
      line: 'We work with study participants and the public to build solutions that meet their needs.',
      href: `${SITE}/our-science/how-do-we-engage-communities-our-research`,
      src: `${FILES}/landing_page_image/public/research-area/2019-04/iStock-951541912.jpg?h=c51a64bd&itok=N5SOy0Oz`,
      alt: '',
    },
  ],
}

export const impact = {
  title: 'Our Impact',
  lead: 'Our work is strengthening policies to protect consumers from toxics while making prevention a national research priority.',
  link: { label: 'See all of our impact', href: `${SITE}/our-impact` },
  stats: [
    { before: 'Nearly', value: '200', after: '', label: 'scientific papers published in top journals' },
    { before: '', value: '900', after: '+', label: 'chemicals shown to have breast-cancer-causing traits' },
    { before: '', value: '216', after: '', label: 'mammary carcinogens identified in our landmark 2007 study' },
    { before: '', value: '11', after: '', label: 'toxic flame retardants banned under Massachusetts law' },
  ],
  milestones: [
    {
      year: '2007',
      title: 'Landmark publication on mammary carcinogens shapes national research agenda',
      text: 'A study in the journal Cancer identified 216 chemicals that cause mammary tumors in animals and helped make breast cancer prevention a national research priority.',
      href: `${SITE}/project/mammary-carcinogens-list`,
      src: `${FILES}/project_on_impact/public/project/2018-12/cancer_cell_color-02.jpg?h=4d5be9b9&itok=R7BqTKfz`,
    },
    {
      year: '2014',
      title: 'Consumers can purchase furniture free of toxic flame retardants',
      text: 'Our research on flame retardant exposure led California to revise its furniture flammability standard. A 2021 federal law now holds upholstered furniture sold in the U.S. to it.',
      href: `${SITE}/project/household-exposure-study-california`,
      src: `${FILES}/project_on_impact/public/project/2019-04/iStock-947844940.jpg?h=952e94b7&itok=RzPmSuIc`,
    },
    {
      year: '2016',
      title: 'Crowdsourced study empowers people to reduce their exposures',
      text: 'The Detox Me Action Kit became the first crowdsourced biomonitoring study of common household toxics, helping people learn which chemicals are in their bodies.',
      href: `${SITE}/project/detox-me-action-kit`,
      src: `${FILES}/project_on_impact/public/project/2019-01/Detox%20Me%20Action%20Kit%20with%20photo.png?h=10eea7ff&itok=PZ7k1Bi3`,
    },
    {
      year: '2017',
      title: 'Research supports national movement toward safer food packaging',
      text: 'Our study found PFAS in U.S. fast food packaging. Washington became the first state to ban PFAS in paper food packaging, and six more states followed.',
      href: `${SITE}/project/food-packaging`,
      src: `${FILES}/project_on_impact/public/project/2021-09/pfas-takeout-unsplash.jpg?h=87232860&itok=8c4PFT9_`,
    },
    {
      year: '2018',
      title: 'Safer Chemicals Program reveals how chemicals can cause breast cancer',
      text: 'The program gives regulators and manufacturers tools to identify chemicals that raise breast cancer risk. More than 900 show breast-cancer-causing traits.',
      href: `${SITE}/project/predicting-chemical-hazards`,
      src: `${FILES}/project_on_impact/public/project/2025-04/24111_042.jpg?h=d910bed7&itok=Iw7F9kxj`,
    },
    {
      year: '2021',
      title: 'Massachusetts protects consumers from toxic flame retardants',
      text: 'A state law bans 11 toxic flame retardants in children’s products, mattresses, furniture, carpeting, and window coverings.',
      href: `${SITE}/project/healthy-green-campus`,
      src: `${FILES}/project_on_impact/public/project/2019-01/iStock_000039911942XXXLarge.jpg?h=f5a32ce4&itok=npUohA26`,
    },
    {
      year: '2024',
      title: 'First federal limits on PFAS in drinking water protect people nationwide',
      text: 'EPA set drinking water standards for six PFAS chemicals, its first enforceable limit on a new drinking water contaminant in more than 20 years.',
      href: `${SITE}/project/cdcatsdr-multi-site-health-study-pfas`,
      src: `${FILES}/project_on_impact/public/project/2020-02/iStock-639454176.jpg?h=38dcc6cc&itok=B5iCh-os`,
    },
  ],
}

export const latest = {
  title: 'The Latest',
  link: { label: 'All news', href: `${SITE}/the-latest` },
  featured: {
    date: 'September 23, 2026',
    title: 'Hundreds of chemicals used in pesticides linked to increased breast cancer risk',
    text: 'Majority of chemicals considered “inert” or inactive ingredients that evade safety testing, highlighting a major regulatory blind spot around ingredients used in pesticide formulations.',
    href: `${SITE}/news/hundreds-chemicals-used-pesticides-linked-increased-breast-cancer-risk`,
    src: `${FILES}/teaser_featured_news_landing/public/news/iStock-1323195374.jpg?h=1fed6f0f&itok=s5IYRyhh`,
    alt: 'Tractor spraying pesticides on crops',
  },
  more: [
    {
      date: 'September 22, 2026',
      title: '5 pesticide myths, debunked',
      href: `${SITE}/news/5-pesticide-myths-debunked`,
      src: `${FILES}/teaser_354x199/public/news/2026-09/iStock-1634695964.jpg?h=9fc5c908&itok=3AjJUo_h`,
      alt: '',
    },
    {
      date: 'July 20, 2026',
      title: 'Use of home water filters linked with lower levels of PFAS in the body',
      href: `${SITE}/news/use-home-water-filters-linked-lower-levels-pfas-body`,
      src: `${FILES}/teaser_354x199/public/news/2026-07/iStock-1479884467.jpg?h=4efadeb9&itok=417ZIOB9`,
      alt: 'Tap water filter for PFAS',
    },
    {
      date: 'June 26, 2026',
      title: 'High schooler organizes bike relay for cancer prevention',
      href: `${SITE}/news/high-schooler-organizes-bike-relay-cancer-prevention`,
      src: `${FILES}/teaser_354x199/public/news/2026-06/Deren%20with%20bike_edited.jpg?h=34078b92&itok=6AmpiIdE`,
      alt: '',
    },
  ],
}

export const resources = {
  title: 'Resources',
  items: [
    {
      title: 'Tips for Healthier Living',
      href: `${SITE}/resources/tips-healthier-living`,
      src: `${FILES}/cta_homepage/public/cta/detox_me_homepage.jpg?itok=AYtk4qN2`,
      alt: 'Detox Me app',
    },
    {
      title: 'Breast Cancer and the Environment',
      href: `${SITE}/resources/breast-cancer-and-environment`,
      src: `${FILES}/cta_homepage/public/cta/breast_cancer_homepage.jpg?itok=1d8Cpw14`,
      alt: 'Breast cancer and the environment',
    },
  ],
  more: { label: 'Publications', href: `${SITE}/resources` },
}

export const support = {
  title: 'Support Our Work',
  text: 'Our innovative research is made possible thanks to philanthropic partners, foundations, and dedicated supporters like you.',
  primary: { label: 'Support our work', href: `${SITE}/support-our-work` },
  gala: {
    title: 'Gala Celebration 2026',
    text: 'From all of us at Silent Spring Institute, we would like to extend our deepest gratitude to all our friends and supporters for making our 2026 Gala Celebration a tremendous success!',
    href: `${SITE}/support-our-work/gala-celebration-2026`,
    src: `${FILES}/teaser_354x199/public/teaser/2026-06/web%20teaser%204x3_colorful%20leaves.png?h=3a0c34ca&itok=em7mX5ln`,
    alt: 'Gala Celebration 2026',
  },
}

export const footer = {
  newsletter: {
    title: 'Stay Connected',
    text: 'Get the latest news and tips for prevention.',
    cta: { label: 'Subscribe', href: `${SITE}/sign-up` },
  },
  address: ['320 Nevada Street, Suite 302', 'Newton, MA 02460'],
  phone: '617.332.4288',
  fax: '617.332.4284',
  email: 'info@silentspring.org',
  social: [
    { label: 'Facebook', href: `${SITE}/facebook` },
    { label: 'YouTube', href: `${SITE}/youtube` },
    { label: 'Instagram', href: 'https://instagram.com/silentspringinstitute' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/silent-spring-institute' },
  ],
  legal: '© 2026 Silent Spring Institute. All Rights Reserved.',
  nonprofit: 'Silent Spring Institute is a 501(c)3 nonprofit organization. EIN 04-3237106.',
  privacy: { label: 'Privacy Policy', href: `${SITE}/node/17` },
}
