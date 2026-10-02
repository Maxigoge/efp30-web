const fs = require('node:fs');
const html = fs.readFileSync('web/index.html', 'utf8');
const sections = [['Navigation', html.match(/<nav[\s\S]*?<\/nav>/)[0]], ['Hero', html.match(/<section id="inicio"[\s\S]*?<\/section>/)[0]], ['Courses', html.match(/<section id="oferta"[\s\S]*?<\/section>/)[0]], ['Community', html.match(/<section id="comunidad"[\s\S]*?<\/section>/)[0]], ['News', html.match(/<section id="agenda"[\s\S]*?<\/section>/)[0]], ['Footer', html.match(/<footer[\s\S]*?<\/footer>/)[0]]];
function jsx(value) {
  return value.replace(/<!--[\s\S]*?-->/g, '').replace(/\bclass=/g, 'className=').replace(/fetchpriority=/g, 'fetchPriority=').replace(/(<(?:img|br|input)\b[^>]*?)(?:\s*\/?)>/g, '$1 />').replace(/style="([^"]+)"/g, (_, css) => {
    const obj = Object.fromEntries(css.split(';').filter(x=>x.trim()).map(x=>{const i=x.indexOf(':');return [x.slice(0,i).trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),x.slice(i+1).trim()];}));
    return 'style={' + JSON.stringify(obj) + '}';
  }).replace(/onclick="([^"]+)"/g, (_, code) => {
    if (code.includes('toggleMobileMenu')) return 'onClick={() => setMenuOpen(!menuOpen)}';
    if (code.includes('showUpcoming')) return 'onClick={showUpcoming}';
    if (code.includes('filterCourses')) return `onClick={() => setCategory('${code.match(/'([^']+)'/)[1]}')}`;
    if (code.includes('showAllCourses')) return "onClick={() => {setCategory('todos'); document.getElementById('oferta')?.scrollIntoView();}}";
    if (code.includes('showNews')) return 'onClick={(event) => showNews(event.currentTarget)}';
    if (code.includes('location.hash')) return "onClick={() => {location.hash = 'contacto';}}";
    throw Error(code);
  });
}
const courses = [...html.matchAll(/<div class="course-card[\s\S]*?data-category="([^"]+)"[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[\s\S]*?<span class="text-brand-accent[^>]*>([^<]+)<\/span>\s*<h3[^>]*>([^<]+)<\/h3>\s*<p[^>]*>([^<]+)<\/p>/g)].map(m=>({category:m[1],image:m[2].replaceAll('&amp;','&'),alt:m[3],family:m[4].replaceAll('&amp;','&'),title:m[5],description:m[6]}));
if (courses.length !== 6) throw Error('Course extraction failed');
fs.writeFileSync('src/courses.json', JSON.stringify(courses, null, 2));
let output = `import {useState, useEffect, useRef} from 'react';\nimport courses from './courses.json';\ntype Information = {title:string; description:string};\ntype Props = {menuOpen:boolean; setMenuOpen:(open:boolean)=>void; category:string; setCategory:(category:string)=>void; showUpcoming:()=>void; showNews:(button:HTMLButtonElement)=>void; setInformation:(info:Information)=>void};\n`;
for (let [name, markup] of sections) {
  if (name === 'Courses') {
    const start = markup.indexOf('<div class="grid grid-cols-1');
    const end = markup.indexOf('            <!--', markup.indexOf('</button>', markup.lastIndexOf('showCourse(this)')));
    // Replace the complete grid up to the following centered footer.
    const afterGrid = markup.indexOf('<div class="mt-12 text-center', start);
    const prefix = markup.slice(0,start);
    const suffix = markup.slice(afterGrid);
    markup = prefix + '<COURSE_GRID />' + suffix;
  }
  let rendered = jsx(markup);
  if (name === 'Navigation') {
    rendered = rendered.replace('className="hidden md:hidden bg-white', 'className={`${menuOpen ? \'\' : \'hidden\'} md:hidden bg-white').replace('absolute w-full shadow-xl"', 'absolute w-full shadow-xl`}');
    rendered = rendered.replace('aria-expanded="false"', 'aria-expanded={menuOpen}').replace('aria-label="Abrir menú"', 'aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}');
    rendered = rendered.replace('className="fa-solid fa-bars text-2xl"', 'className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-2xl`}');
    rendered = rendered.replace(/<a href="#(inicio|oferta|comunidad|agenda)"/g, '<a onClick={() => setMenuOpen(false)} href="#$1"');
  }
  if (name === 'Courses') {
    rendered = rendered.replace(/className="filter-btn[^\"]+"/g, 'className="filter-btn"');
    rendered = rendered.replace(/onClick=\{\(\) => setCategory\('([^']+)'\)\}/g, 'aria-pressed={category === \'$1\'} onClick={() => setCategory(\'$1\')}');
    rendered = rendered.replace('<COURSE_GRID />', `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="courseGrid">{courses.filter(course => category === 'todos' || course.category === category).map(course => <article key={course.title} className="course-card fade-in bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition group flex flex-col"><div className="h-48 bg-gray-200 overflow-hidden"><img loading="lazy" src={course.image} alt={course.alt} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" /></div><div className="p-6 flex-1 flex flex-col"><span className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">{course.family}</span><h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3><p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p><span className="text-sm text-gray-500 mb-6">Certificación Oficial</span><button onClick={() => setInformation({title:course.title,description:course.description})} className="w-full bg-gray-50 hover:bg-brand-900 hover:text-white text-brand-900 font-semibold py-2.5 rounded-lg border border-gray-200 transition">Ver Detalles y Admisión</button></div></article>)}</div>`);
  }
  output += `\nfunction ${name}({menuOpen,setMenuOpen,category,setCategory,showUpcoming,showNews,setInformation}:Props) { return (${rendered}); }\n`;
}
output += `
function InformationDialog({information,onClose}:{information:Information|null;onClose:()=>void}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (information) {dialog?.showModal(); document.body.style.overflow='hidden';}
    else dialog?.close();
    return () => {document.body.style.overflow='';};
  },[information]);
  return <dialog ref={ref} aria-labelledby="dialog-title" onClose={onClose} onClick={event => {const r=event.currentTarget.getBoundingClientRect();if(event.target===event.currentTarget && (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom)) onClose();}}><div className="p-6 md:p-8"><div className="flex items-start justify-between gap-4 mb-5"><h2 id="dialog-title" className="text-2xl font-bold text-brand-900">{information?.title}</h2><button onClick={onClose} aria-label="Cerrar" className="bg-gray-100 rounded-full w-10 h-10 shrink-0">✕</button></div><p className="text-gray-600 leading-relaxed mb-6">{information?.description}</p><p className="text-sm text-gray-500 mb-6">Para confirmar fechas, requisitos y disponibilidad, contactate con la secretaría de la escuela.</p><a href={'mailto:efp30chaco@yahoo.com.ar?subject='+encodeURIComponent('Consulta: '+(information?.title??''))} className="inline-block bg-brand-accent text-white px-6 py-3 rounded-full font-semibold">Consultar por correo</a></div></dialog>;
}
export default function App() {
  const [menuOpen,setMenuOpen]=useState(false);
  const [category,setCategory]=useState('todos');
  const [information,setInformation]=useState<Information|null>(null);
  const showUpcoming=()=>setInformation({title:'Estamos preparando nuestros espacios digitales',description:'El campus virtual, los portales de alumnos y docentes y la biblioteca de recursos se habilitarán en una próxima etapa. Mientras tanto, podés realizar tus consultas por los canales de contacto de la escuela.'});
  const showNews=(button:HTMLButtonElement)=>setInformation({title:button.parentElement?.querySelector('h3')?.textContent??'Novedades',description:button.parentElement?.querySelector('p')?.textContent??''});
  useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setMenuOpen(false);};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close);},[]);
  const props={menuOpen,setMenuOpen,category,setCategory,showUpcoming,showNews,setInformation};
  return <><a href="#inicio" className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 bg-white p-4 z-[70]">Ir al contenido</a><Navigation {...props}/><main><Hero {...props}/><Courses {...props}/><Community {...props}/><News {...props}/></main><Footer {...props}/><InformationDialog information={information} onClose={()=>setInformation(null)}/></>;
}
`;
fs.writeFileSync('src/App.tsx', output);
fs.writeFileSync('src/styles.css', fs.readFileSync('web/assets/input.css','utf8') + '\n.filter-btn { @apply bg-gray-100 text-gray-600 px-5 py-2 rounded-full font-medium whitespace-nowrap transition; }\n.filter-btn[aria-pressed="true"] { @apply bg-brand-900 text-white; }\n');
