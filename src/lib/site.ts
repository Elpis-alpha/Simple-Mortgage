/**
 * Brand and contact details in one place.
 *
 * Master Your Mortgage is a concept project, so the phone number sits in
 * Ofcom's range reserved for drama and the email uses the reserved
 * `.example` domain. Neither reaches a real person.
 */
export const site = {
  name: 'Master Your Mortgage',
  shortName: 'MYM',
  tagline: 'Own more of your home, sooner.',
  phone: '020 7946 0321',
  phoneHref: 'tel:+442079460321',
  email: 'hello@masteryourmortgage.example',
  address: ['30 Churchill Place', 'Canary Wharf', 'London E14 5EU'],
  hours: [
    ['Monday to Friday', '8am – 8pm'],
    ['Saturday', '9am – 4pm'],
    ['Sunday', 'Closed'],
  ],
  author: { name: 'elpis.cc', url: 'https://elpis.cc' },
  repo: 'https://github.com/Elpis-alpha/Simple-Mortgage',
} as const

export const nav = [
  { to: '/calculator', label: 'Calculators' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const
