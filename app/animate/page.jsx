"use client";
import { useEffect, useRef, useState } from "react";

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="70" viewBox="0 0 200 70">
  <defs>
    <filter id="g"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <path d="M35 62 C 5 42, 8 12, 35 26 C 62 12, 65 42, 35 62 Z" fill="none" stroke="#38bdf8" stroke-width="4"/>
  <text x="95" y="44" font-size="28" text-anchor="middle" fill="#0ea5e9">Memories</text>
</svg>`;

export default function AnimatePage(){
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [duration, setDuration] = useState(15);
  const [provider, setProvider] = useState("local"); // 'local' | 'heygen' | 'sora'
  const canvasRef = useRef(null);

  useEffect(()=>{
    if(!file) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return ()=>URL.revokeObjectURL(u);
  },[file]);

  const drawSvgLogo = async () => {
    const svgBlob = new Blob([LOGO_SVG], {type: 'image/svg+xml'});
    const svgUrl = URL.createObjectURL(svgBlob);
    const img = new Image();
    await new Promise(res=>{ img.onload=res; img.src = svgUrl; });
    URL.revokeObjectURL(svgUrl);
    return img;
  };

  async function exportCanvasFrames(drawFrame, seconds=15, fps=30){
    const canvas = canvasRef.current;
    const stream = canvas.captureStream(fps);
    const rec = new MediaRecorder(stream, {mimeType: 'video/webm;codecs=vp9'});
    const chunks=[]; rec.ondataavailable=(e)=>{ if(e.data.size>0) chunks.push(e.data); };
    const done = new Promise(r=>rec.onstop=r);
    rec.start();
    const totalFrames = seconds * fps;
    for(let f=0; f<totalFrames; f++){
      const t = f/totalFrames;
      await drawFrame(t);
      await new Promise(r=>requestAnimationFrame(r));
    }
    rec.stop(); await done;
    return new Blob(chunks, {type: 'video/webm'});
  }

  const handleLocal = async () => {
    if(!url) return;
    setProcessing(true);
    const img = new Image();
    await new Promise(r=>{ img.onload=r; img.src=url; });
    const logo = await drawSvgLogo();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1280; canvas.height = 720;
    const ratio = img.height/img.width;
    await exportCanvasFrames(async (t)=>{
      const scale = 1 + 0.05*Math.sin(t*Math.PI*2);
      const iw = canvas.width*scale;
      const ih = iw*ratio;
      const panX = Math.sin(t*Math.PI*2)*30;
      const panY = Math.cos(t*Math.PI*2)*18;
      ctx.fillStyle = "#f6fbff"; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img, (canvas.width-iw)/2+panX, (canvas.height-ih)/2+panY, iw, ih);
      // SVG watermark (vector-rendered per frame)
      const lw = 200, lh = 70;
      ctx.globalAlpha = 0.9;
      ctx.drawImage(logo, canvas.width - lw - 16, canvas.height - lh - 12, lw, lh);
      ctx.globalAlpha = 1;
    }, duration, 30).then(blob=>{
      const u = URL.createObjectURL(blob);
      setVideoUrl(u);
      setProcessing(false);
    });
  };

  const handleHeygen = async () => {
    if(!file) return;
    setProcessing(true);
    const fd = new FormData();
    fd.append('file', file, file.name);
    const r = await fetch('/api/heygen-photo', { method: 'POST', body: fd });
    const js = await r.json();
    if(!r.ok){ alert('HeyGen error: ' + (js?.error||'unknown')); setProcessing(false); return; }
    // fetch via proxy to avoid CORS tainting canvas
    const proxied = '/api/proxy?url=' + encodeURIComponent(js.videoUrl);
    // draw remote mp4 into canvas and watermark with SVG, then allow download
    const video = document.createElement('video');
    video.src = proxied; video.crossOrigin='anonymous';
    await new Promise(res=>{ video.onloadeddata=res; });
    const logo = await drawSvgLogo();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 1280; canvas.height = 720;
    await exportCanvasFrames(async ()=>{
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const lw = 200, lh = 70;
      ctx.globalAlpha = 0.9;
      ctx.drawImage(logo, canvas.width - lw - 16, canvas.height - lh - 12, lw, lh);
      ctx.globalAlpha = 1;
    }, Math.min(duration, 60), 30).then(blob=>{
      const u = URL.createObjectURL(blob);
      setVideoUrl(u);
      setProcessing(false);
    });
  };

  return (
    <div className="container py-16 space-y-6">\n      <div className="sticky top-0 z-40 -mt-6 mb-2 pt-4 pb-2 bg-gradient-to-b from-white/90 to-transparent backdrop-blur">\n        <a href="/" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300/60 hover:bg-white"><span>←</span><span>Назад</span></a>\n      </div>
      <h1 className="text-3xl md:text-4xl font-semibold text-center">Оживить фото</h1>
      <p className="text-center text-slate-600">Выберите способ. Скачивание доступно только с водяным знаком (логотип SVG).</p>

      <div className="flex justify-center gap-3">
        <label className={"btn-ghost " + (provider==='local'?'ring-2 ring-sky-300':'')}><input type="radio" name="prov" className="hidden" checked={provider==='local'} onChange={()=>setProvider('local')} /> Быстрый предпросмотр (браузер)</label>
        <label className={"btn-ghost " + (provider==='heygen'?'ring-2 ring-sky-300':'')}><input type="radio" name="prov" className="hidden" checked={provider==='heygen'} onChange={()=>setProvider('heygen')} /> HeyGen (API)</label>
        <label className={"btn-ghost " + (provider==='sora'?'ring-2 ring-sky-300':'')}><input type="radio" name="prov" className="hidden" checked={provider==='sora'} onChange={()=>setProvider('sora')} /> Sora</label>
      </div>

      <div className="card">
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="border rounded-2xl p-2 bg-white">
            <div className="text-sm mb-2">Превью</div>
            {url ? <img src={url} alt="preview" className="w-full h-auto rounded-lg"/> : <div className="text-slate-500">Нет файла</div>}
          </div>
          <div className="border rounded-2xl p-2 bg-white">
            <div className="text-sm mb-2">Холст</div>
            <canvas ref={canvasRef} className="w-full h-auto bg-white rounded" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <label className="text-sm text-slate-600">Длительность предпросмотра:</label>
          <select value={duration} onChange={e=>setDuration(parseInt(e.target.value)||15)} className="border rounded px-2 py-1">
            <option value={10}>10 сек</option>
            <option value={15}>15 сек</option>
            <option value={30}>30 сек</option>
            <option value={60}>60 сек</option>
          </select>
          {provider==='local' && <button onClick={handleLocal} disabled={!url || processing} className="btn-primary">{processing? 'Обработка...' : 'Оживить (браузер)'}</button>}
          {provider==='heygen' && <button onClick={handleHeygen} disabled={!file || processing} className="btn-primary">{processing? 'Запрос в HeyGen...' : 'Оживить через HeyGen'}</button>}
          {videoUrl && <a className="btn-ghost" href={videoUrl} download="ai-memories-watermarked.webm">Скачать (с SVG‑логотипом)</a>}
        </div>

        {provider==='sora' && (
          <div className="mt-4 text-sm text-slate-600">
            <p>Интеграция Sora как API пока недоступна — используем приложение Sora для генерации, затем автоматически накладываем ваш SVG‑логотип при скачивании.</p>
            <ol className="list-decimal ml-5 mt-2">
              <li>Сгенерируйте клип в приложении Sora (или загрузите фото в редактор Sora).</li>
              <li>Сохраните mp4 и перетащите его сюда — мы добавим водяной знак SVG и экспортируем.</li>
            </ol>
          </div>
        )}

        <p className="text-xs text-slate-500 mt-3">Для 5‑минутного ролика: генерируем несколько отрезков и склеиваем сервером (FFmpeg), затем накладываем SVG‑логотип.</p>
      </div>
    </div>
  );
}
