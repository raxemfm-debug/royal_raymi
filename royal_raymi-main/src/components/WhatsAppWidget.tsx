import React from "react";

export const WhatsAppWidget: React.FC = () => {
  const phoneNumber = "967179747"; // Reemplaza con el WhatsApp oficial de Royal Raymi
  const message = encodeURIComponent("Hola Royal Raymi, deseo consultar disponibilidad y reservar productos de su catálogo.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside aria-label="Contacto rápido" className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.045-1.014-.078-.242-.079-.557-.183-1.026-.388-1.996-.874-3.3-2.887-3.4-3.022-.1-.135-.807-1.074-.807-2.048 0-.974.51-1.453.69-1.653.18-.2.392-.25.522-.25.13 0 .261.002.373.007.119.006.278-.045.435.333.16.387.545 1.332.593 1.431.048.099.08.216.015.345-.065.13-.098.212-.194.325-.098.113-.205.253-.293.34-.1.099-.204.207-.087.408.116.2.518.854 1.111 1.381.765.681 1.41.892 1.61 1 .2.109.317.091.435-.045.118-.135.506-.59.641-.793.136-.203.272-.17.458-.102.186.068 1.177.555 1.38.656.203.102.338.153.388.237.05.084.05.49-.094.895z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.178L2 22l4.981-1.309A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.611 0-3.11-.476-4.373-1.294l-.313-.202-2.946.773.787-2.871-.205-.327A8.136 8.136 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-out text-sm font-medium pr-1">
          Consultas WhatsApp
        </span>
      </a>
    </aside>
  );
};
