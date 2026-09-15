/**
 * Los textos del home, en el orden en que aparecen.
 *
 * Salen del diseño aprobado ("Producciones D10.dc.html", pantallas 1a, 1d y
 * 1e). Viven acá y no en los componentes por la regla 3 del repo.
 */
export const home = {
  hero: {
    kicker: 'Productora · Uruguay · desde 2010',
    /* El diseño usa dos claims: éste en desktop y "Producción que sale al aire."
       en celular. Un h1 por página: queda el de desktop en los dos. */
    titular: ['Si sale al aire,', 'lo producimos.'],
    bajada:
      'Eventos, programas de radio y TV, podcasts y contenido audiovisual. Hace 16 años, todas las semanas.',
    ctaPrincipal: { texto: 'Pedir presupuesto', href: '/contacto' },
    /* El diseño dice "Ver el reel", pero el reel todavía no existe: el botón
       lleva al portfolio hasta que el cliente lo pase. */
    ctaSecundario: { texto: 'Ver trabajos', href: '/trabajos' },
    // TODO: material pendiente del cliente. El poster y el video son provisorios.
    avisoPendiente: 'Poster del reel pendiente · es el LCP',
  },
  pilares: {
    titulo: 'Cuatro líneas, un solo equipo',
    ayuda: 'Abrí cada una',
  },
  destacados: {
    titulo: 'Trabajos destacados',
    enlace: { texto: 'Ver todo el portfolio', href: '/trabajos' },
  },
  clientes: {
    // TODO: los +1.800 son de Luis Betarte según la prensa. Confirmar la atribución.
    claim: '+1.800 producciones para marcas, organismos y artistas.',
    rotulo: 'Clientes',
    avisoPendiente:
      'Celdas provisorias: faltan los logos reales. Van en blanco sobre negro, con el alto normalizado.',
  },
  casoDestacado: {
    kicker: 'Caso destacado · producción propia',
    titulo: '16 años sosteniendo un programa semanal',
    texto:
      'Noche D10 es un magazine de entrevistas, música en vivo y humor. Por CX30 Radio Nacional AM 1130, VIVO TV, los cables del interior y YouTube. Lo que hacemos para nosotros es lo que hacemos para un cliente.',
    enlace: 'Ver la ficha del caso',
  },
  contacto: {
    titulo: 'Contanos qué necesitás producir',
    directo: 'O escribinos directo',
  },
} as const;
