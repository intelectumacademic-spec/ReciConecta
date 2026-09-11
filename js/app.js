const demoFeedback = [
  {
    name: "Laura M.",
    price: "$8.000 COP",
    currentSolution: "Separo cartón y plástico en casa y espero a que pase un reciclador por el sector.",
    liked: "Poder programar la recolección sin tener que salir de casa.",
    change: "Agregar una confirmación clara de la hora aproximada de llegada."
  },
  {
    name: "Andrés R.",
    price: "$10.000 COP",
    currentSolution: "Llevo los materiales a un punto de reciclaje cuando tengo tiempo.",
    liked: "La comodidad y el ahorro de tiempo.",
    change: "Mostrar qué materiales reciben antes de enviar la solicitud."
  },
  {
    name: "Camila P.",
    price: "$8.000 COP",
    currentSolution: "Guardo los reciclables y se los entrego a una persona que pasa por el barrio.",
    liked: "Que el proceso esté organizado y sea fácil de solicitar.",
    change: "Incluir recordatorios de la fecha de recolección."
  },
  {
    name: "Julián C.",
    price: "$6.000 COP",
    currentSolution: "Normalmente mezclo algunos materiales porque no siempre sé cómo separarlos.",
    liked: "La guía para separar mejor los residuos.",
    change: "Tener una opción más económica para recolecciones frecuentes."
  },
  {
    name: "Natalia G.",
    price: "$8.000 COP",
    currentSolution: "Uso el punto de reciclaje del conjunto residencial cuando está disponible.",
    liked: "Solicitar el servicio desde el celular.",
    change: "Añadir información sobre el reciclador que realizará la visita."
  },
  {
    name: "Felipe S.",
    price: "$8.000 COP",
    currentSolution: "Acumulo papel y botellas y luego los llevo en carro a un centro de acopio.",
    liked: "Evitar el desplazamiento y coordinar desde una sola página.",
    change: "Permitir seleccionar una franja horaria más específica."
  },
  {
    name: "Mariana T.",
    price: "$5.000 COP",
    currentSolution: "A veces entrego los materiales a recicladores informales del sector.",
    liked: "Tener un contacto más confiable para la recolección.",
    change: "Ofrecer planes por varias recolecciones al mes."
  },
  {
    name: "Santiago V.",
    price: "$8.000 COP",
    currentSolution: "Separo los residuos, pero con frecuencia termino desechando algunos por falta de tiempo.",
    liked: "La rapidez del proceso y la opción de programarlo.",
    change: "Añadir una estimación del volumen mínimo que pueden recoger."
  },
  {
    name: "Paula D.",
    price: "$10.000 COP",
    currentSolution: "Llevo cartón y vidrio a un punto cercano una vez al mes.",
    liked: "El sistema de puntos y la recolección desde la ubicación.",
    change: "Explicar mejor para qué se pueden usar los puntos."
  },
  {
    name: "Daniel H.",
    price: "$7.000 COP",
    currentSolution: "Coordino por mensajes con un reciclador cuando logro contactarlo.",
    liked: "Centralizar la solicitud y no depender de buscar contactos cada vez.",
    change: "Agregar seguimiento del estado de la solicitud."
  }
];

const feedbackList = document.querySelector('#feedback-list');
const metricsGrid = document.querySelector('#metrics-grid');
const requestForm = document.querySelector('#request-form');
const requestMessage = document.querySelector('#request-message');
const feedbackForm = document.querySelector('#feedback-form');
const feedbackMessage = document.querySelector('#feedback-message');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

function getRealFeedback() {
  try {
    return JSON.parse(localStorage.getItem('reciconectaRealFeedback')) || [];
  } catch (_) {
    return [];
  }
}

function setRealFeedback(items) {
  localStorage.setItem('reciconectaRealFeedback', JSON.stringify(items));
}

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderFeedback() {
  const realFeedback = getRealFeedback();
  const merged = [
    ...realFeedback.map(item => ({...item, source: 'Respuesta local'})),
    ...demoFeedback.map(item => ({...item, source: 'Ejemplo ficticio'}))
  ];

  feedbackList.innerHTML = merged.map((item, index) => `
    <article class="feedback-card">
      <div class="feedback-card-head">
        <strong>${esc(item.name)}</strong>
        <span>${esc(item.source)}</span>
      </div>
      <div class="qa"><b>¿Cuánto pagarías?</b><p>${esc(item.price)}</p></div>
      <div class="qa"><b>¿Cómo resuelves el problema hoy?</b><p>${esc(item.currentSolution)}</p></div>
      <div class="qa"><b>¿Qué es lo que más te gusta?</b><p>${esc(item.liked)}</p></div>
      <div class="qa"><b>¿Qué cambiarías?</b><p>${esc(item.change)}</p></div>
    </article>
  `).join('');

  const exactOrMore = demoFeedback.filter(item => {
    const numeric = Number(item.price.replace(/\D/g, ''));
    return numeric >= 8000;
  }).length;

  const metrics = [
    ['Participantes de ejemplo', '10'],
    ['Aceptarían $8.000 o más', `${exactOrMore}/10`],
    ['Respuestas locales agregadas', String(realFeedback.length)],
    ['Preguntas por participante', '4']
  ];

  metricsGrid.innerHTML = metrics.map(([label, value]) => `
    <article class="metric-card"><span>${esc(label)}</span><strong>${esc(value)}</strong></article>
  `).join('');
}

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!requestForm.checkValidity()) {
    requestForm.reportValidity();
    return;
  }
  const data = Object.fromEntries(new FormData(requestForm).entries());
  const stored = JSON.parse(localStorage.getItem('reciconectaRequests') || '[]');
  stored.push({...data, createdAt: new Date().toISOString()});
  localStorage.setItem('reciconectaRequests', JSON.stringify(stored));
  requestMessage.textContent = 'Solicitud registrada en este navegador. Para una prueba real, conecta el formulario a un servicio externo o reemplázalo por un formulario institucional.';
  requestMessage.classList.add('show');
  requestForm.reset();
});

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!feedbackForm.checkValidity()) {
    feedbackForm.reportValidity();
    return;
  }
  const data = Object.fromEntries(new FormData(feedbackForm).entries());
  const current = getRealFeedback();
  current.unshift({
    name: data.participant,
    price: data.price,
    currentSolution: data.currentSolution,
    liked: data.liked,
    change: data.change
  });
  setRealFeedback(current);
  feedbackForm.reset();
  feedbackMessage.textContent = 'Respuesta agregada localmente. Esta información solo se guarda en este navegador.';
  feedbackMessage.classList.add('show');
  renderFeedback();
});

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

renderFeedback();
