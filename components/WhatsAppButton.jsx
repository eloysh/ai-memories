"use client";
import { whatsappURL } from "../lib/whatsapp";

export default function WhatsAppButton({
  message = "Здравствуйте! Хочу оживить фото.",
  children = "Написать в WhatsApp",
  className = "btn-primary",
}) {
  return (
    <a
      className={className}
      href={whatsappURL(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
