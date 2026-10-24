import React from 'react';

const SOCIAL_LINKS = [
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@royal_raymi',
    hover: 'hover:bg-black',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M19.6 7.2a6.9 6.9 0 0 1-4.1-1.3v8.3a6.2 6.2 0 1 1-6.2-6.2c.4 0 .8 0 1.2.1v3.4a3 3 0 1 0 1.8 2.7V2.5h3.2c.2 2.1 1.9 3.8 4.1 4v.7Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/royalraymi/',
    hover: 'hover:bg-[#E1306C]',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/royalraymisac/?locale=es_LA',
    hover: 'hover:bg-[#1877F2]',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V13h2.8v8h3.4Z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@royalraymi8517',
    hover: 'hover:bg-[#FF0000]',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    ),
  },
];

export const SocialSidebar: React.FC = () => {
  return (
    <aside
      aria-label="Redes sociales de Royal Raymi"
      className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-1 rounded-l-xl border-y border-l border-stone-200/70 bg-white/95 p-1.5 shadow-lg backdrop-blur-sm"
    >
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visitar Royal Raymi en ${social.name}`}
          title={social.name}
          className={`flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 transition-colors duration-200 hover:text-white ${social.hover}`}
        >
          {social.icon}
        </a>
      ))}
    </aside>
  );
};

export default SocialSidebar;
