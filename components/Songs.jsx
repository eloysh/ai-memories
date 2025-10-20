export default function Songs(){
  const songs = [
    {title: "Мамины тёплые руки", src: "/sounds/song1.mp3"},
    {title: "Светлые дни", src: "/sounds/song2.mp3"},
    {title: "Дорога домой", src: "/sounds/song3.mp3"},
  ];
  return (
    <section id="songs" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Песня на заказ и примеры</h2>
      <p className="text-center text-slate-600 mb-6">Есть готовые песни — выберите понравившуюся или закажите эксклюзив.</p>
      <ul className="grid md:grid-cols-3 gap-4">
        {songs.map((s,i)=>(
          <li key={i} className="card">
            <div className="font-medium mb-2">{s.title}</div>
            <audio controls src={s.src} className="w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
