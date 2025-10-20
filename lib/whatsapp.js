// lib/whatsapp.js

// ВПИШИТЕ СВОЙ НОМЕР — пробелы/дефисы можно, мы приведём формат сами
const RAW_PHONE = "+7 984 193-37-92";

// Нормализация для wa.me: только цифры, 8 -> 7
export const WHATSAPP_PHONE = RAW_PHONE.replace(/\D/g, "").replace(/^8/, "7");

// Ссылка wa.me с произвольным текстом (опционально)
export const whatsappURL = (message = "") => {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
