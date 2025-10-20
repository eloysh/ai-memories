export default function FAQ(){
  const items=[
    {q:"Сколько занимает создание ролика?", a:"Обычно 2–4 дня. Срочно за 24 часа — с доплатой."},
    {q:"Можно ли выбрать свою музыку?", a:"Да. Могу предложить варианты или сделать эксклюзивную песню."},
    {q:"В каком формате получите ролик?", a:"MP4 (или другой по желанию)."},
  ];
  return (
    <section id="faq" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Ответы на вопросы</h2>
      <div className="space-y-3">
        {items.map((it,i)=>(
          <details className="card" key={i}>
            <summary className="cursor-pointer font-medium">{it.q}</summary>
            <p className="text-white/70 mt-2">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
