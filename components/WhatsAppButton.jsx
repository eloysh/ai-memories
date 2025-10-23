"use client";
import { whatsappURL } from "../lib/whatsapp";

export default function WhatsAppButton({
  text = "Написать в WhatsApp",
  message = "Здравствуйте! Хочу оживить фото/видео-историю.",
  className = "",
}) {
  const url = whatsappURL(message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                  text-white font-semibold shadow-lg transition
                  bg-gradient-to-r from-emerald-500 to-sky-500
                  hover:from-emerald-400 hover:to-sky-400
                  ring-4 ring-emerald-400/20 hover:ring-emerald-400/30
                  before:absolute before:-inset-1 before:rounded-3xl before:blur
                  before:bg-gradient-to-r before:from-emerald-500/30 before:to-sky-500/30
                  ${className}`}
    >
      {/* иконка */}
      <svg className="h-5 w-5 drop-shadow" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.74 11.74 0 0 0 12 0 11.94 11.94 0 0 0 0 12a11.68 11.68 0 0 0 1.62 6L0 24l6.27-1.64A11.86 11.86 0 0 0 12 24 12 12 0 0 0 24 12a11.7 11.7 0 0 0-3.48-8.52ZM12 22a9.93 9.93 0 0 1-5.06-1.38l-.36-.21-3.6.94.96-3.5-.23-.37A9.92 9.92 0 1 1 12 22Zm5.65-7.13c-.31-.16-1.83-.9-2.11-1.01-.28-.1-.49-.16-.71.16-.22.31-.82 1.01-1 1.22-.19.21-.37.23-.68.08-.31-.16-1.33-.49-2.54-1.56-.94-.84-1.57-1.87-1.76-2.18-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.19.21-.31.31-.52.1-.21.05-.4-.02-.56-.08-.16-.71-1.72-.98-2.35-.26-.63-.52-.55-.71-.55h-.61c-.2 0-.52.07-.79.37-.26.31-1.03 1-.99 2.45.05 1.45 1.05 2.86 1.2 3.06.16.21 2.07 3.17 5.02 4.44.7.3 1.25.48 1.68.61.71.23 1.35.2 1.86.12.57-.08 1.83-.74 2.09-1.46.26-.71.26-1.32.18-1.45-.09-.12-.32-.2-.63-.36Z" />
      </svg>
      <span className="relative">{text}</span>
    </a>
  );
}
