import {useState, useEffect, useRef} from 'react';
import courses from './courses.json';
type Information = {title:string; description:string};
type Props = {menuOpen:boolean; setMenuOpen:(open:boolean)=>void; category:string; setCategory:(category:string)=>void; showUpcoming:()=>void; showNews:(button:HTMLButtonElement)=>void; setInformation:(info:Information)=>void};

function Navigation({menuOpen,setMenuOpen,category,setCategory,showUpcoming,showNews,setInformation}:Props) { return (<nav className="bg-white shadow-md fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
                <div className="flex items-center">
                    <a href="#" className="flex items-center gap-2 md:gap-3">
                        <div className="bg-brand-900 text-white p-2 rounded-lg flex-shrink-0">
                            <i className="fa-solid fa-graduation-cap text-xl md:text-2xl"></i>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-bold text-xl md:text-2xl text-brand-900 tracking-tight leading-none mb-1">EFP N°30</span>
                            <span className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-tight">Escuela de Formación Profesional N°30 <br className="sm:hidden" />- Villa Ángela</span>
                        </div>
                    </a>
                </div>
                
                
                <div className="hidden md:flex items-center space-x-8">
                    <a onClick={() => setMenuOpen(false)} href="#inicio" className="text-gray-600 hover:text-brand-900 font-medium transition">Inicio</a>
                    <a onClick={() => setMenuOpen(false)} href="#oferta" className="text-gray-600 hover:text-brand-900 font-medium transition">Oferta Formativa</a>
                    <a onClick={() => setMenuOpen(false)} href="#comunidad" className="text-gray-600 hover:text-brand-900 font-medium transition">Comunidad</a>
                    <a onClick={() => setMenuOpen(false)} href="#agenda" className="text-gray-600 hover:text-brand-900 font-medium transition">Agenda</a>
                    <button onClick={showUpcoming} className="bg-brand-accent hover:bg-brand-accentHover text-white px-6 py-2.5 rounded-full font-semibold transition shadow-lg shadow-orange-500/30 flex items-center gap-2">
                        <i className="fa-solid fa-laptop-code"></i> Campus Virtual
                    </button>
                </div>

                
                <div className="flex items-center md:hidden">
                    <button id="menu-toggle" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 hover:text-brand-900 focus:outline-none p-2">
                        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-2xl`} id="mobile-icon" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>

        
        <div id="mobile-menu" className={`${menuOpen ? '' : 'hidden'} md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl`}>
            <div className="px-4 pt-2 pb-6 space-y-1">
                <a onClick={() => setMenuOpen(false)} href="#inicio" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Inicio</a>
                <a onClick={() => setMenuOpen(false)} href="#oferta" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Oferta Formativa</a>
                <a onClick={() => setMenuOpen(false)} href="#comunidad" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Comunidad</a>
                <a onClick={() => setMenuOpen(false)} href="#agenda" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Agenda</a>
                <button onClick={showUpcoming} className="mt-4 w-full bg-brand-accent text-white px-3 py-3 rounded-lg font-semibold flex justify-center items-center gap-2">
                    <i className="fa-solid fa-laptop-code"></i> Ingresar al Campus
                </button>
            </div>
        </div>
    </nav>); }

function Hero({menuOpen,setMenuOpen,category,setCategory,showUpcoming,showNews,setInformation}:Props) { return (<section id="inicio" className="pt-28 pb-16 md:pt-36 md:pb-20 bg-brand-900 relative overflow-hidden">
        
        <div className="absolute inset-0 opacity-10" style={{"backgroundImage":"radial-gradient(#ffffff 1px, transparent 1px)","backgroundSize":"24px 24px"}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 mb-12">
            
            <div className="md:w-1/2 text-center md:text-left">
                <span className="text-brand-accent font-bold tracking-wider uppercase text-sm mb-4 block">Formación para el trabajo</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    Impulsa tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-400">Futuro Profesional</span>
                </h1>
                <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0">
                    Capacítate con nuestros Trayectos y Propuestas Formativas orientadas a la rápida inserción laboral. Tu carrera empieza hoy.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a href="#oferta" className="bg-brand-accent hover:bg-brand-accentHover text-white px-6 py-3.5 rounded-full font-bold text-base transition text-center shadow-lg shadow-orange-500/40">
                        Ver Oferta Formativa
                    </a>
                    <a href="#comunidad" className="bg-brand-800 hover:bg-brand-700 text-white border border-brand-700 px-5 py-3.5 rounded-full font-bold text-base transition text-center flex items-center justify-center gap-2">
                        <i className="fa-solid fa-user-graduate"></i> Soy Alumno
                    </a>
                    <a href="#comunidad" className="bg-brand-800 hover:bg-brand-700 text-white border border-brand-700 px-5 py-3.5 rounded-full font-bold text-base transition text-center flex items-center justify-center gap-2">
                        <i className="fa-solid fa-chalkboard-user"></i> Soy Docente
                    </a>
                </div>
            </div>
            
            
            <div className="md:w-1/2 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-800 aspect-video md:aspect-[4/3] bg-gray-800 flex items-center justify-center group">
                    <img fetchPriority="high" src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200" 
                         alt="Imagen ilustrativa de un espacio educativo" 
                         className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 shadow-lg border border-white/50">
                        <div className="bg-blue-100 text-blue-700 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                            <i className="fa-solid fa-award text-2xl"></i>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 leading-tight">Certificación Oficial (MECCyT)</p>
                            <p className="text-xs md:text-sm text-gray-700 font-medium mt-0.5">Acredita idoneidad en la Formación elegida.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center mt-8">
            <div className="border-t border-brand-700/50 pt-8">
                <i className="fa-solid fa-quote-left text-brand-accent/50 text-3xl mb-4"></i>
                <blockquote className="text-xl md:text-2xl text-gray-300 font-light italic leading-relaxed">
                    "Lo que escucho, lo olvido; lo que veo, lo recuerdo; lo que hago con mis propias manos, lo aprendo."
                </blockquote>
            </div>
        </div>
    </section>); }

function Courses({menuOpen,setMenuOpen,category,setCategory,showUpcoming,showNews,setInformation}:Props) { return (<section id="oferta" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-900 mb-4">Nuestra Oferta Formativa</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Explora nuestras Propuestas Formativas (Perfiles Profesionales y Capacitaciones Laborales) Diseñadas para asegurar tu empleabilidad en Villa Ángela y la región.</p>
            </div>

            
            <div className="flex overflow-x-auto no-scrollbar gap-2 mb-10 pb-2 justify-start md:justify-center">
                <button aria-pressed={category === 'todos'} onClick={() => setCategory('todos')} className="filter-btn">Todos</button>
                <button aria-pressed={category === 'informatica_admin'} onClick={() => setCategory('informatica_admin')} className="filter-btn">Informática & Administración</button>
                <button aria-pressed={category === 'oficios_tecnicos'} onClick={() => setCategory('oficios_tecnicos')} className="filter-btn">Oficios Técnicos</button>
                <button aria-pressed={category === 'estetica_indumentaria'} onClick={() => setCategory('estetica_indumentaria')} className="filter-btn">Estética e Indumentaria</button>
                <button aria-pressed={category === 'servicios_cuidados'} onClick={() => setCategory('servicios_cuidados')} className="filter-btn">Servicios y Cuidados</button>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="courseGrid">{courses.filter(course => category === 'todos' || course.category === category).map(course => <article key={course.title} className="course-card fade-in bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition group flex flex-col"><div className="h-48 bg-gray-200 overflow-hidden"><img loading="lazy" src={course.image} alt={course.alt} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" /></div><div className="p-6 flex-1 flex flex-col"><span className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">{course.family}</span><h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3><p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p><span className="text-sm text-gray-500 mb-6">Certificación Oficial</span><button onClick={() => setInformation({title:course.title,description:course.description})} className="w-full bg-gray-50 hover:bg-brand-900 hover:text-white text-brand-900 font-semibold py-2.5 rounded-lg border border-gray-200 transition">Ver Detalles y Admisión</button></div></article>)}</div><div className="mt-12 text-center">
                <button onClick={() => {setCategory('todos'); document.getElementById('oferta')?.scrollIntoView();}} className="bg-white border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white px-8 py-3 rounded-full font-bold transition shadow-sm hover:shadow-md">
                    Ver todas las propuestas
                </button>
            </div>

        </div>
    </section>); }

function Community({menuOpen,setMenuOpen,category,setCategory,showUpcoming,showNews,setInformation}:Props) { return (<section id="comunidad" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-900 mb-4">Plataformas y Accesos</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Estamos preparando nuevos espacios digitales para nuestra comunidad educativa.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6">
                        <i className="fa-solid fa-user-graduate"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Portal Estudiantes</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-1">Próximamente: un espacio para acceder a tus cursos y a la información de tu formación.</p>
                    <button onClick={showUpcoming} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition">
                        Ingresar <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                </div>

                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-6">
                        <i className="fa-solid fa-chalkboard-user"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Portal Docentes</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-1">Próximamente: herramientas para compartir materiales y acompañar el aprendizaje de tus alumnos.</p>
                    <div className="w-full flex gap-2">
                         <button onClick={showUpcoming} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition text-sm">
                            Gestión
                        </button>
                        <button onClick={showUpcoming} className="flex-1 border border-purple-200 text-purple-700 hover:bg-purple-50 font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2 text-sm">
                            <i className="fa-brands fa-google-drive"></i> Materiales
                        </button>
                    </div>
                </div>

                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center text-2xl mb-6">
                        <i className="fa-solid fa-photo-film"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Materiales y Recursos</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-1">Próximamente: guías, materiales de estudio y recursos para seguir aprendiendo.</p>
                    <button onClick={showUpcoming} className="w-full border border-teal-600 text-teal-700 hover:bg-teal-50 font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2">
                        <i className="fa-solid fa-magnifying-glass"></i> Explorar Recursos
                    </button>
                </div>

            </div>
        </div>
    </section>); }

function News({menuOpen,setMenuOpen,category,setCategory,showUpcoming,showNews,setInformation}:Props) { return (<section id="agenda" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12">
                
                
                <div className="md:w-2/3">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-8 bg-brand-accent rounded-full"></div>
                        <h2 className="text-3xl font-bold text-brand-900">Cartelera Digital</h2>
                    </div>
                    
                    <div className="space-y-6">
                        
                        <div className="flex flex-col sm:flex-row gap-6 bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition group border border-gray-100">
                            <div className="sm:w-48 h-48 sm:h-auto bg-gray-200 overflow-hidden relative">
                                <img loading="lazy" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80" alt="Feria" className="object-cover w-full h-full group-hover:scale-110 transition duration-500" />
                                <span className="absolute top-2 left-2 bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded">Destacado</span>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-center">
                                <span className="text-gray-500 text-sm font-medium mb-1"><i className="fa-regular fa-calendar"></i> Próximamente</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-accent transition">Exposición Anual de Talleres</h3>
                                <p className="text-gray-600 text-sm mb-4">Un espacio para compartir los trabajos de nuestros talleres con la comunidad. La fecha y los detalles se comunicarán por los canales de la escuela.</p>
                                <button type="button" onClick={(event) => showNews(event.currentTarget)} className="text-brand-900 font-semibold text-sm flex items-center gap-1 hover:text-brand-accent transition">Leer más <i className="fa-solid fa-chevron-right text-xs"></i></button>
                            </div>
                        </div>

                        
                        <div className="flex flex-col sm:flex-row gap-6 bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition group border border-gray-100">
                            <div className="sm:w-48 h-48 sm:h-auto bg-gray-200 overflow-hidden">
                                <img loading="lazy" src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" alt="Charla" className="object-cover w-full h-full group-hover:scale-110 transition duration-500" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-center">
                                <span className="text-gray-500 text-sm font-medium mb-1"><i className="fa-regular fa-calendar"></i> Inscripciones</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-accent transition">Apertura de Pre-inscripciones</h3>
                                <p className="text-gray-600 text-sm mb-4">Consultá en secretaría las fechas de inscripción, la documentación y la disponibilidad de cada propuesta formativa.</p>
                                <button type="button" onClick={(event) => showNews(event.currentTarget)} className="text-brand-900 font-semibold text-sm flex items-center gap-1 hover:text-brand-accent transition">Ver requisitos <i className="fa-solid fa-chevron-right text-xs"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="md:w-1/3">
                    <div className="bg-brand-900 rounded-2xl p-6 text-white shadow-lg sticky top-28">
                        <div className="flex items-center justify-between mb-6 border-b border-brand-700 pb-4">
                            <h3 className="text-xl font-bold">Agenda Escolar</h3>
                            <i className="fa-solid fa-calendar-days text-brand-accent text-2xl"></i>
                        </div>
                        
                        <ul className="space-y-6">
                            
                            <li className="flex gap-4">
                                <div className="bg-brand-800 rounded-lg p-2 text-center w-14 h-14 flex-shrink-0 border border-brand-700 flex flex-col justify-center">
                                    <i className="fa-solid fa-users text-brand-accent text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Muestra Anual</h4>
                                    <p className="text-gray-400 text-xs"><i className="fa-solid fa-location-dot"></i> Instalaciones EFP N°30</p>
                                </div>
                            </li>
                            
                            <li className="flex gap-4">
                                <div className="bg-brand-800 rounded-lg p-2 text-center w-14 h-14 flex-shrink-0 border border-brand-700 flex flex-col justify-center">
                                    <i className="fa-solid fa-file-signature text-brand-accent text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Periodo de Matriculación</h4>
                                    <p className="text-gray-400 text-xs"><i className="fa-solid fa-building"></i> Secretaría Administrativa</p>
                                </div>
                            </li>
                            
                            <li className="flex gap-4">
                                <div className="bg-brand-800 rounded-lg p-2 text-center w-14 h-14 flex-shrink-0 border border-brand-700 flex flex-col justify-center">
                                    <i className="fa-solid fa-chalkboard text-brand-accent text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Inicio de Clases</h4>
                                    <p className="text-gray-400 text-xs"><i className="fa-solid fa-clock"></i> Consultar Horarios</p>
                                </div>
                            </li>
                        </ul>
                        <button onClick={() => {location.hash = 'contacto';}} className="w-full mt-8 bg-brand-800 hover:bg-brand-700 text-white font-medium py-2 rounded border border-brand-700 transition text-sm">
                            Consultar fechas en secretaría
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </section>); }

function Footer({menuOpen,setMenuOpen,category,setCategory,showUpcoming,showNews,setInformation}:Props) { return (<footer id="contacto" className="bg-brand-900 text-gray-300 py-12 border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
                <a href="#" className="flex items-center gap-3 mb-5">
                    <div className="bg-white text-brand-900 p-2 rounded-lg flex-shrink-0">
                        <i className="fa-solid fa-graduation-cap text-xl"></i>
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="font-bold text-xl text-white tracking-tight leading-none mb-1">EFP N°30</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-tight">Escuela de Formación Profesional N°30 <br />- Villa Ángela</span>
                    </div>
                </a>
                <p className="text-sm text-gray-400 mb-4">Formando profesionales con excelencia e innovación para el futuro del trabajo.</p>
                <div className="flex gap-4">
                    
                    
                    
                </div>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Accesos Rápidos</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#oferta" className="hover:text-brand-accent transition">Oferta Formativa</a></li>
                    <li><a href="#oferta" className="hover:text-brand-accent transition">Requisitos de Admisión</a></li>
                    <li><a href="#agenda" className="hover:text-brand-accent transition">Calendario Académico</a></li>
                    <li><a href="#contacto" className="hover:text-brand-accent transition">Contacto</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Plataformas</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#comunidad" className="hover:text-brand-accent transition">Campus Virtual</a></li>
                    <li><a href="#comunidad" className="hover:text-brand-accent transition">Portal Estudiantes</a></li>
                    <li><a href="#comunidad" className="hover:text-brand-accent transition">Portal Docentes</a></li>
                    <li><a href="#comunidad" className="hover:text-brand-accent transition">Repositorio de Recursos</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contacto</h4>
                <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                        <i className="fa-solid fa-location-dot mt-1 text-brand-accent"></i>
                        <span>Calle Rivadavia y Andrés Maturin.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <i className="fa-solid fa-phone mt-1 text-brand-accent"></i>
                        <div className="flex flex-col gap-1.5">
                            <a href="tel:+543735402517" className="hover:text-brand-accent transition">+54 3735 (402517)</a>
                            <a href="tel:+543735521359" className="hover:text-brand-accent transition">+54 3735 (521359)</a>
                            <a href="tel:+543735500896" className="hover:text-brand-accent transition">+54 3735 (500896)</a>
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <i className="fa-solid fa-envelope text-brand-accent"></i>
                        <a href="mailto:efp30chaco@yahoo.com.ar" className="hover:text-brand-accent transition">efp30chaco@yahoo.com.ar</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-800 text-sm text-center text-gray-500">
            &copy; 2026 EFP N°30 - Villa Ángela. Todos los derechos reservados.
        </div>
    </footer>); }

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
