/* Lumen × Crayola. HTML, CSS y JavaScript sin dependencias. */
'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const money = value => new Intl.NumberFormat('es-MX', {style:'currency', currency:'MXN'}).format(value);
const image = (name, alt = '', className = '', attrs = '') => `<img src="assets/${name}" alt="${escapeHTML(alt)}" class="${className}" ${attrs}>`;
const icon = (name, className = '') => image(`${name}.svg`, '', `icon ${className}`, 'aria-hidden="true"');
const storage = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(`lumen:${key}`)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(`lumen:${key}`, JSON.stringify(value)); } catch { /* El prototipo también funciona sin almacenamiento. */ } }
};

const products = [
  {id:'crayons', title:'Crayones Crayola', detail:'con 8 piezas', price:50, image:'detail-crayons.png', addButton:true},
  {id:'markers', title:'Plumones Crayola', detail:'con 12 piezas', price:109, image:'markers.png'},
  {id:'pencils', title:'Lápices de Colores', detail:'con 8 piezas', price:120, image:'pencils.png'},
  {id:'fine', title:'Plumones Punta Fina', detail:'con 12 piezas', price:73, image:'fine.png'}
];
// Detalles editoriales de los cuatro Favoritos de Temporada.
const seasonProductDetails = {
  crayons:{name:'Crayones Crayola',model:'Crayones',unit:'Caja con 8 piezas',color:'Surtido',image:'detail-crayons.png',description:'Ocho colores para dibujar, rellenar figuras y dar vida a tus ideas. Una presentación para acompañar tus actividades creativas y escolares.'},
  markers:{name:'Plumones Crayola SuperTips de Punta Delgada',model:'SuperTips',unit:'Caja con 12 piezas',color:'Surtido',barcode:'29384028',description:'Doce colores para combinar trazos, colorear ilustraciones y personalizar tus apuntes. Una selección para tus proyectos de regreso a clases.'},
  pencils:{name:'Lápices de Colores Crayola',model:'Lápices de colores',unit:'Caja con 8 piezas',color:'Surtido',description:'Ocho colores para bocetar, colorear y añadir detalles a tus dibujos. Combínalos para explorar nuevas ideas en tus trabajos escolares.'},
  fine:{name:'Plumones Crayola de Punta Fina',model:'Punta fina',unit:'Caja con 12 piezas',color:'Surtido',description:'Doce colores para crear líneas finas, lettering y pequeños detalles. Dale color a tus notas, títulos e ilustraciones.'}
};
// Precios y presentaciones de la pantalla PRODUCTOS CRAYOLA de Figma.
const catalogProducts = [
  {id:'crayola-pencils-12', title:'Lápices de Colores', detail:'con 12 piezas', price:98, image:'catalog-pencils.png', catalog:true, nodeId:'149:1723'},
  {id:'crayola-jumbo-24', title:'Crayones Jumbo', detail:'con 24 piezas', price:50, image:'catalog-crayons.png', catalog:true, nodeId:'149:886'},
  {id:'crayola-paints-18', title:'Pinturitas', detail:'con 18 piezas', price:174, image:'catalog-paints.png', catalog:true, nodeId:'149:1753'},
  {id:'crayola-school-brush', title:'Brocha Escolar', detail:'Mango Plástico', price:65, image:'catalog-brush.png', catalog:true, nodeId:'149:1738'},
  {id:'crayola-acrylic-10', title:'Plumones Acrílicos', detail:'con 10 piezas', price:279, image:'catalog-acrylic.png', catalog:true, nodeId:'149:1778'},
  {id:'crayola-chalk-24', title:'Gises Gigantes', detail:'con 24 piezas', price:167, image:'catalog-chalk.png', catalog:true, nodeId:'149:1768'}
];
const allProducts = [...products, ...catalogProducts];
const crayolaPromotions = {
  colors: {
    title:'Colores sin límites',
    description:'Aprovecha los paquetes especiales en plumones y crayones Crayola.',
    products:[
      {id:'promo-washable-markers-8',title:'Plumones Crayola Gruesos Lavables',detail:'con 8 piezas',price:89,originalPrice:99,image:'washable-markers.png',artClass:'washable'},
      {id:'promo-jumbo-crayons-28',title:'Crayones Crayola Triangulares Jumbo',detail:'con 28 piezas',price:169,originalPrice:189,image:'crayon-jar.png',artClass:'jar'}
    ]
  },
  paint: {
    title:'Pinceles de creatividad',
    description:'Dale vida a tus proyectos con pinceles escolares y pinturas témpera lavables Crayola. Mezcla, pinta y crea a tu manera.',
    products:[
      {id:'promo-school-brushes-4',title:'Pinceles Escolares Crayola',detail:'con 4 piezas',price:49,originalPrice:59,image:'brushes.png',artClass:'brushes'},
      {id:'promo-tempera-green',title:'Pintura Témpera Lavable Crayola',detail:'Verde · 59 mL',price:29,originalPrice:35,image:'paint-green.png',artClass:'paint-green'},
      {id:'promo-tempera-pink',title:'Pintura Témpera Lavable Crayola',detail:'Rosa · 59 mL',price:29,originalPrice:35,image:'paint-pink.png',artClass:'paint-pink'},
      {id:'promo-tempera-yellow',title:'Pintura Témpera Lavable Crayola',detail:'Amarilla · 59 mL',price:29,originalPrice:35,image:'paint-yellow.png',artClass:'paint-yellow'}
    ]
  }
};

function promotionArtwork(type) {
  return crayolaPromotions[type].products.map(product => `<button type="button" class="promo-product-trigger ${product.artClass}" data-action="promotion" data-type="${type}" aria-haspopup="dialog" aria-label="Ver promoción: ${escapeHTML(product.title)} ${escapeHTML(product.detail)}">${image(product.image,product.title+' '+product.detail,'','loading="lazy"')}</button>`).join('');
}

const pastProducts = [
  {id:'past-markers', title:'Plumones Crayola', detail:'con 8 piezas', price:50, image:'pastMarkers.png'},
  products[0]
];
const pastOrders = [
  {id:'LM-260812-001',date:'12 de agosto de 2026',product:pastProducts[0]},
  {id:'LM-260805-002',date:'5 de agosto de 2026',product:pastProducts[1]}
];
const initialCart = [
  {id:'cart-colors', title:'Lápices de colores', detail:'Crayola', price:121, image:'cart-crayons.png', quantity:1, selected:true},
  {id:'cart-markers', title:'Plumones Super Tips', detail:'Crayola', price:101, image:'cart-markers.png', quantity:1, selected:true}
];
let cart = storage.get('cart', initialCart);
if (!Array.isArray(cart)) cart = initialCart;
cart = cart.filter(item => item && typeof item.id === 'string' && Number.isFinite(item.price) && Number.isInteger(item.quantity) && item.quantity > 0);
const initialFavorites = ['crayons', ...catalogProducts.map(product => product.id)];
let favorites = storage.get('favorites', initialFavorites);
if (!Array.isArray(favorites)) favorites = initialFavorites;
let profile = storage.get('profile', {name:'María Magdalena', email:''});
if (!profile || typeof profile.name !== 'string') profile = {name:'María Magdalena', email:''};
if (profile.name === 'Maria Magdalena') profile.name = 'María Magdalena';
let addresses = storage.get('addresses', []);
if (!Array.isArray(addresses)) addresses = [];
let signedIn = storage.get('signedIn', true);
const clubMember = {type:'Estudiante', cardNumber:'2583 5863 0324 2479', barcodeNumber:'3586303242479', points:279.67};
const main = $('#contenido');
const dialog = $('#dialogo');
let returnFocus = null;
let toastTimer;
const addButtonTimers = new WeakMap();

const routes = {
  home:{href:'index.html', label:'Inicio', icon:'home'},
  cart:{href:'carrito.html', label:'Carrito', icon:'cart'},
  locations:{href:'ubicaciones.html', label:'Ubicaciones', icon:'location'},
  profile:{href:'perfil.html', label:'Mi perfil', icon:'person'}
};
const desktopRoutes = {
  home:routes.home,
  products:{href:'productos.html', label:'Productos'},
  cart:routes.cart,
  locations:routes.locations,
  profile:routes.profile
};
const file = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
let page = ({'productos.html':'products','carrito.html':'cart','ubicaciones.html':'locations','perfil.html':'profile','configuracion.html':'settings','mis-compras.html':'orders'})[file.endsWith('.html') ? file : `${file}.html`] || 'home';
const activePage = ['settings','orders'].includes(page) ? 'profile' : page === 'products' ? 'home' : page;
const desktopActivePage = page === 'products' ? 'products' : activePage;
const titles = {home:'Regreso a clases', products:'Productos Crayola', cart:'Carrito', locations:'Ubicaciones', profile:'Mi perfil', settings:'Configuración', orders:'Mis Compras'};
document.title = `${titles[page]} · Lumen × Crayola`;
document.body.dataset.page = page;

function renderShell() {
  $('#encabezado').innerHTML = `<div class="header-inner container">
    <a class="brand" href="index.html" aria-label="Lumen, ir al inicio">${image('lumen.svg', 'Lumen, expertos en papel', '', 'width="178" height="62"')}</a>
    <nav class="desktop-nav" aria-label="Navegación principal">${Object.entries(desktopRoutes).map(([key, item]) => `<a href="${item.href}" ${key === desktopActivePage ? 'aria-current="page"' : ''}>${item.label}${key === 'cart' ? '<span class="cart-count" aria-label="productos en el carrito"></span>' : ''}</a>`).join('')}</nav>
    <button class="search-trigger icon-button" data-action="search" aria-label="Abrir búsqueda" aria-haspopup="dialog">${icon('search')}<span class="desktop-only">Buscar en Lumen</span></button>
  </div>`;
  $('#navegacion').innerHTML = Object.entries(routes).map(([key, item]) => `<a href="${item.href}" aria-label="${item.label}" ${key === activePage ? 'aria-current="page"' : ''}>${icon(key === activePage ? `${item.icon}Active` : item.icon)}<span class="nav-label">${item.label}</span></a>`).join('');
  updateCartCount();
}

const footerSocials = [
  {name:'TikTok', icon:'tiktok', href:'https://www.tiktok.com/@papelerialumen'},
  {name:'Instagram', icon:'instagram', href:'https://www.instagram.com/papeleria_lumen/'},
  {name:'Facebook', icon:'facebook', href:'https://www.facebook.com/PapeleriaLumen/'},
  {name:'Pinterest', icon:'pinterest', href:'https://www.pinterest.com/papelerialumen/'},
  {name:'X', icon:'x', href:'https://x.com/papelerialumen'},
  {name:'YouTube', icon:'youtube', href:'https://www.youtube.com/@papelerialumen_'}
];

function renderFooter() {
  $('#pie-pagina').innerHTML = `<div class="footer-inner container">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-brand-line">
          <a href="index.html" aria-label="Lumen, ir al inicio">${image('lumen.svg','Lumen, expertos en papel','footer-lumen','width="178" height="62"')}</a>
          <span class="footer-brand-cross" aria-hidden="true">×</span>
          ${image('crayola.svg','Crayola','footer-crayola')}
        </div>
        <p class="footer-tagline">Un regreso a clases lleno de color.</p>
        <nav class="footer-socials" aria-label="Redes sociales de Lumen">${footerSocials.map(social => `<a class="footer-social" href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="Lumen en ${social.name}, abre otra pestaña" title="${social.name}">${image(`social-${social.icon}.svg`,'','', 'width="22" height="22" aria-hidden="true"')}</a>`).join('')}</nav>
      </div>
      <div class="footer-sections">
        <details class="footer-group" data-footer-group="contact" open>
          <summary>Contacto<span class="footer-chevron" aria-hidden="true"></span></summary>
          <div class="footer-group-content footer-contact">
            <div><span class="footer-contact-label">Atención en línea</span><a href="mailto:enlinea@lumen.com.mx">enlinea@lumen.com.mx</a></div>
            <div><span class="footer-contact-label">Ventas por teléfono</span><a href="tel:+525544455000">55 4445 5000</a></div>
          </div>
        </details>
        <details class="footer-group" data-footer-group="help">
          <summary>Ayuda<span class="footer-chevron" aria-hidden="true"></span></summary>
          <nav class="footer-group-content" aria-label="Ayuda de Lumen">
            <a href="ubicaciones.html">Encuentra tu tienda</a>
            <a href="https://lumen.com.mx/preguntas" target="_blank" rel="noopener noreferrer">Preguntas frecuentes</a>
            <a href="perfil.html#club-lumen">Club Lumen</a>
          </nav>
        </details>
        <details class="footer-group" data-footer-group="legal">
          <summary>Legales<span class="footer-chevron" aria-hidden="true"></span></summary>
          <nav class="footer-group-content" aria-label="Información legal de Lumen">
            <a href="https://lumen.com.mx/aviso" target="_blank" rel="noopener noreferrer">Aviso de privacidad</a>
            <a href="https://lumen.com.mx/usos" target="_blank" rel="noopener noreferrer">Términos y condiciones</a>
            <a href="https://lumen.com.mx/metodos-de-pago" target="_blank" rel="noopener noreferrer">Métodos de pago</a>
          </nav>
        </details>
      </div>
    </div>
    <div class="footer-bottom"><p>© 2026 Lumen. Todos los derechos reservados.</p><p>Precios en MXN. Productos y promociones sujetos a disponibilidad y restricciones. Marcas registradas de sus respectivos titulares.</p></div>
  </div>`;
  const desktopFooter = matchMedia('(min-width:768px)');
  const setFooterLayout = () => {
    $$('details.footer-group').forEach(group => { group.open = desktopFooter.matches || group.dataset.footerGroup === 'contact'; });
  };
  setFooterLayout();
  desktopFooter.addEventListener?.('change', setFooterLayout);
}

function productCard(product) {
  const saved = favorites.includes(product.id);
  const heart = product.account ? 'heartProfile' : product.catalog ? 'heartGreen' : 'heart';
  return `<article class="product-card${product.catalog ? ' catalog-card' : ''}${product.addButton ? ' season-card-with-add' : ''}" data-product="${product.id}"${product.nodeId ? ` data-node-id="${product.nodeId}"` : ''}>
    <button class="favorite-button ${saved ? 'is-favorite' : ''}" data-action="favorite" data-id="${product.id}" data-heart="${heart}" aria-label="${saved ? 'Quitar de' : 'Añadir a'} favoritos: ${product.title}" aria-pressed="${saved}">${icon(saved ? heart : 'heartOutline')}</button>
    <div class="product-image">${image(product.image, `${product.title} ${product.detail}`, '', 'loading="lazy"')}</div>
    <h3><strong>${product.title}</strong> <span>${product.detail}</span></h3>
    <p class="product-price">${money(product.price)}</p>
    ${seasonProductDetails[product.id] ? `<button class="product-detail-trigger" data-action="product-detail" data-id="${product.id}" aria-haspopup="dialog"><span class="sr-only">Ver detalles de ${escapeHTML(product.title)}</span></button>` : ''}
    ${product.catalog || product.addButton ? `<button type="button" class="button catalog-add" data-action="add-product" data-id="${product.id}" aria-label="Agregar ${product.title} ${product.detail} al carrito">Agregar</button>` : ''}
  </article>`;
}

function renderProducts() {
  main.innerHTML = `<div class="catalog-page" data-node-id="149:858">
    <section class="catalog-intro container" aria-labelledby="catalog-title">
      <div class="catalog-hero-art" aria-hidden="true">
        ${image('catalog-green-stroke.png','','catalog-green-stroke', 'width="178" height="171"')}
        ${image('catalog-rocket.png','','catalog-rocket', 'width="148" height="99"')}
      </div>
      <h1 id="catalog-title">Productos<br class="mobile-only"> Crayola</h1>
      <p>Explora la <strong><em>colección Crayola en Lumen</em></strong> y encuentra tus favoritos para llenar de color cada idea y dar vida a tu creatividad.</p>
    </section>
    <section class="catalog-list container" aria-label="Colección de productos Crayola">
      <div class="catalog-grid">${catalogProducts.map(productCard).join('')}</div>
    </section>
    <section class="catalog-outro container" aria-labelledby="catalog-outro-title">
      <div class="catalog-outro-art" aria-hidden="true">
        ${image('stroke-blue.png','','catalog-blue-stroke', 'width="324" height="108" loading="lazy"')}
        ${image('catalog-rainbow.png','','catalog-rainbow', 'width="115" height="65" loading="lazy"')}
      </div>
      <div class="catalog-outro-copy"><h2 id="catalog-outro-title">¡Que nunca<br>falte el color!</h2><p>Sigue imaginando, creando y <strong>dando vida a cada idea</strong> con el universo Crayola.</p></div>
    </section>
  </div>`;
}

function renderHome() {
  main.innerHTML = `<div class="home-page">
    <section class="hero container" aria-labelledby="hero-title" data-node-id="149:594">
      <div class="hero-art-outer"><div class="hero-art">
        <div class="hero-crayola">${image('crayola.svg','Crayola')}</div>
        <h1 id="hero-title">¡Un regreso<br>a clases</h1>
        ${image('hero-combo.png','Cuadernos, lápices, colores y plumones Crayola para el regreso a clases','hero-products','width="1290" height="1219" fetchpriority="high"')}
        <div class="hero-ribbon" aria-hidden="true"><svg class="hero-ribbon-mobile" width="430" height="253" viewBox="0 0 430 253"><path d="M-1800 139H-7.585C47.313 151.194 189.382 151.349 318.471 54.662C447.56-42.026 549.506 20.218 584.343 63.427H1800V108.518H472.058C416.824 94.16 386.324 121.66 238.324 198.16C136.908 250.581 14.325 246.16-27.676 230.66H-1800Z"/></svg><svg class="hero-ribbon-desktop" width="908" height="400" viewBox="0 0 908 400"><defs><mask id="hero-ribbon-reveal" maskUnits="userSpaceOnUse" x="-1800" y="-400" width="4500" height="1200"><path class="hero-ribbon-reveal-path" d="M-1800 257.5H-160C45 293 195 290 350 275C550 250 700 170 850 106C960 60 1070 60 1200 92.5H2700" pathLength="1000" fill="none" stroke="white" stroke-width="260"/></mask></defs><g mask="url(#hero-ribbon-reveal)"><path d="M-1800 190H-160C45 260 195 240 350 210C550 171 700 90 830 38C940-8 1050-20 1200 20H2700V165H1200C1050 125 960 135 870 174C705 242 565 355 350 340C150 326 0 320-160 325H-1800Z"/></g></svg></div>
        <svg class="hero-lettering hero-lettering-mobile" width="430" height="180" viewBox="0 0 430 180" role="img" aria-label="lleno de color!">
          <defs><path id="color-curve" d="M 12,106 C 122,110 226,88 329,22"/></defs>
          <text><textPath href="#color-curve">lleno de color!</textPath></text>
        </svg>
        <svg class="hero-lettering hero-lettering-desktop" width="908" height="400" viewBox="0 0 908 400" role="img" aria-label="lleno de color!"><defs><path id="desktop-color-curve" d="M 330,277 C 460,292 590,228 735,143"/><mask id="hero-lettering-reveal" maskUnits="userSpaceOnUse" x="-1800" y="-400" width="4500" height="1200"><path class="hero-ribbon-reveal-path" d="M-1800 257.5H-160C45 293 195 290 350 275C550 250 700 170 850 106C960 60 1070 60 1200 92.5H2700" pathLength="1000" fill="none" stroke="white" stroke-width="260" transform="translate(0 -30)"/></mask></defs><g mask="url(#hero-lettering-reveal)"><text><textPath href="#desktop-color-curve">lleno de color!</textPath></text></g></svg>
      </div></div>
      <div class="hero-copy">
        <p>Descubre todo lo que <em>Crayola</em> tiene para ti en Lumen y prepárate para un <strong>ciclo escolar creativo</strong>, organizado y lleno de color.</p>
        <a href="productos.html" class="button green hero-cta">Explorar productos</a>
      </div>
      <svg class="hero-pencil-animation" width="640" height="552" viewBox="0 0 640 552" aria-hidden="true" focusable="false">
        <defs>
          <path id="pencil-route" d="M115 374C176 381 248 378 300 390C377 408 282 419 224 434C149 453 54 469 39 492C16 527 220 488 472 510"/>
          <clipPath id="pencil-cutout">
            <path d="M0 0H1187V211L455 859Q434 888 404 900L183 1016Q163 1027 157 1014L138 987V0Z"/>
          </clipPath>
          <pattern id="pencil-grain" width="347" height="39" patternUnits="userSpaceOnUse">
            <image href="assets/pencil-grain.png" width="347" height="39"/>
          </pattern>
          <linearGradient id="pencil-shadow-tone">
            <stop stop-color="#123a6c" stop-opacity=".8"/>
            <stop offset=".68" stop-color="#153762" stop-opacity=".58"/>
            <stop offset="1" stop-color="#234c79" stop-opacity="0"/>
          </linearGradient>
          <filter id="pencil-shadow-soften" x="-15%" y="-30%" width="130%" height="160%">
            <feGaussianBlur stdDeviation="8"/>
          </filter>
        </defs>
        <rect class="pencil-paper" x="0" y="350" width="510" height="202" fill="transparent"/>
        <path class="pencil-trace" fill="url(#pencil-grain)"/>
        <g class="pencil-position" transform="translate(115 374)">
          <path class="pencil-shadow" d="M0 0C64-18 247-63 422-85L450-10C326-5 98 5 0 0Z"
            fill="url(#pencil-shadow-tone)" filter="url(#pencil-shadow-soften)"/>
          <g class="pencil-tilt">
            <image href="assets/blue-pencil.png" width="1187" height="1325"
              transform="scale(.66) translate(-166 -1015)" clip-path="url(#pencil-cutout)"/>
          </g>
        </g>
      </svg>
    </section>

    <section class="favorites-section container reveal" id="favoritos" aria-labelledby="favorites-title">
      <div class="section-intro"><div><h2 id="favorites-title">Favoritos de la Temporada</h2><p>Los productos de Crayola más buscados para este regreso.</p></div>
      <div class="carousel-controls"><button class="round-control" data-action="slide" data-direction="-1" aria-label="Ver productos anteriores">←</button><button class="round-control" data-action="slide" data-direction="1" aria-label="Ver más favoritos">→</button></div></div>
      <div class="product-carousel" id="carrusel" aria-label="Productos favoritos de temporada">${products.map(productCard).join('')}</div>
    </section>

    <section class="promotions-section container reveal" id="promociones" aria-labelledby="promotions-title">
      <h2 id="promotions-title">¡Promociones<br class="mobile-only"> que valen la pena!</h2>
      <div class="promotions-grid">
        <article class="promo-card"><div class="promo-background">${image('promoBase.svg','')}${image('promoPattern.svg','','promo-pattern')}</div><button class="promo-card-trigger" data-action="promotion" data-type="colors" aria-haspopup="dialog" aria-label="Ver promoción Colores sin límites"></button><div class="promo-copy"><h3>Colores sin límites</h3><p>Plumones y crayones para cada idea.</p><button class="button white" data-action="promotion" data-type="colors" aria-haspopup="dialog" aria-label="Ver promoción Colores sin límites">Ver promoción</button></div><div class="promo-products colors">${promotionArtwork('colors')}</div></article>
        <article class="promo-card"><div class="promo-background">${image('promoBase.svg','')}${image('promoPattern.svg','','promo-pattern')}</div><button class="promo-card-trigger" data-action="promotion" data-type="paint" aria-haspopup="dialog" aria-label="Ver promoción Pinceles de creatividad"></button><div class="promo-copy"><h3>Pinceles<br>de creatividad</h3><p>Pinceles y pinturas para tus proyectos.</p><button class="button white" data-action="promotion" data-type="paint" aria-haspopup="dialog" aria-label="Ver promoción Pinceles de creatividad">Ver promoción</button></div><div class="promo-products paint">${promotionArtwork('paint')}</div></article>
      </div>
    </section>

    <div class="brand-ribbon" aria-hidden="true"><div class="ribbon-bottom"><svg width="430" height="152" viewBox="0 0 430 152" preserveAspectRatio="none"><defs><mask id="brand-ribbon-reveal" maskUnits="userSpaceOnUse" x="-2000" y="-200" width="4500" height="600"><path class="brand-ribbon-reveal-path" d="M-30 55C85 51 190 129 307 91C373 80 419 61 465 45" pathLength="1000" fill="none" stroke="white" stroke-width="190"/></mask></defs><g mask="url(#brand-ribbon-reveal)"><path d="M-1800 22H-168C-144.814-29.414-59.685-35.173 93.916 22.041C247.516 79.254 388.749 39.238 440.166 12.079H1800V72.664H473.5C441.442 104.838 314.5 147.664 211.066 138.225C41.523 122.752 6.423 87.81-44.754 117.184H-1800Z"/></g></svg></div><div class="ribbon-crayola">${image('crayola.svg','')}</div></div>

    <section class="benefits-section container reveal" aria-labelledby="benefits-title"><h2 id="benefits-title">¿Por qué elegir Lumen?</h2>
      <div class="benefits-grid">
        <article class="benefit"><h3>Hasta<br>12 meses</h3>${icon('credit')}<p>Pagando con tarjeta</p></article>
        <article class="benefit"><h3>Compras<br>Seguras</h3>${icon('secure')}<p>Tus datos siempre están protegidos.</p></article>
        <article class="benefit"><h3>Entregas<br>Seguras</h3>${icon('truck')}<p><strong>CDMX</strong> e Interior de la <strong>República</strong></p></article>
        <article class="benefit"><h3>Envíos<br>Gratis</h3>${icon('shipping')}<p>Compras <strong>mínimas de $499.00 MXN.</strong></p></article>
      </div>
    </section>
  </div>`;
}

function renderCart() {
  main.innerHTML = `<section class="cart-page container" data-node-id="149:924"><h1 class="desktop-page-title">Tu carrito</h1><div class="cart-layout"><div><div class="cart-items" id="cart-items"></div><a href="productos.html" class="button lime continue-shopping">Seguir comprando</a></div><aside class="cart-summary" aria-label="Resumen del carrito"><label class="select-all"><input type="checkbox" id="select-all" data-action="select-all"><span class="custom-check">${icon('check')}</span><span>Todos</span></label><div class="summary-bottom"><div class="summary-details"><button class="subtotal-toggle" data-action="summary" aria-expanded="true" aria-controls="shipping-row"><span>Subtotal</span><span id="subtotal"></span><span class="chevron" aria-hidden="true">⌃</span></button><div class="summary-row shipping-row" id="shipping-row"><span>Costo de envío</span><span class="shipping-price">*Por calcular</span></div><div class="summary-row total-row"><strong>Total (IVA incluido)</strong><strong id="cart-total"></strong></div></div><button class="button lime pay-button" data-action="checkout">Pagar</button></div></aside></div></section>`;
  renderCartItems();
}

function renderCartItems() {
  $('#cart-items').innerHTML = cart.length ? cart.map(item => `<article class="cart-item ${item.selected ? 'is-selected' : ''}" data-cart-id="${escapeHTML(item.id)}"><div class="cart-product-image">${image(item.image, item.title)}</div><div class="cart-item-content"><h2>${escapeHTML(item.title)}</h2><p class="cart-brand">${escapeHTML(item.detail)}</p><div class="cart-item-bottom"><strong>${money(item.price).replace('.00','')}</strong><div class="cart-quantity"><span class="cart-quantity-label">Cantidad</span><div class="quantity-control" role="group" aria-label="Cantidad de ${escapeHTML(item.title)}"><button data-action="quantity" data-id="${escapeHTML(item.id)}" data-delta="-1" aria-label="${item.quantity === 1 ? 'Quitar' : 'Restar uno de'} ${escapeHTML(item.title)}">−</button><output aria-label="Cantidad">${item.quantity}</output><button data-action="quantity" data-id="${escapeHTML(item.id)}" data-delta="1" aria-label="Añadir uno de ${escapeHTML(item.title)}" ${item.quantity >= 99 ? 'disabled' : ''}>+</button></div></div></div></div><label class="cart-selection"><input type="checkbox" data-action="select-item" data-id="${escapeHTML(item.id)}" ${item.selected ? 'checked' : ''} aria-label="Seleccionar ${escapeHTML(item.title)}"><span class="custom-check">${icon('check')}</span></label></article>`).join('') : `<div class="empty-state"><h2>Tu próximo proyecto empieza aquí</h2><p>Tu carrito está vacío. Vuelve al inicio para encontrar tus favoritos.</p></div>`;
  updateSummary();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  $$('.cart-count').forEach(el => { el.textContent = count; el.hidden = count === 0; });
}
function persistCart() { storage.set('cart', cart); updateCartCount(); }
function updateSummary() {
  const total = cart.filter(item => item.selected).reduce((sum, item) => sum + item.price * item.quantity, 0);
  $('#subtotal').innerHTML = `<span class="summary-amount">${money(total)}</span><span class="summary-currency">MXN</span>`;
  $('.cart-summary').classList.toggle('has-wide-total', total >= 10000);
  $('#cart-total').textContent = money(total);
  const all = $('#select-all');
  all.checked = cart.length > 0 && cart.every(item => item.selected);
  all.indeterminate = cart.some(item => item.selected) && !all.checked;
  all.disabled = cart.length === 0;
  $('.pay-button').disabled = total === 0;
  $('.shipping-price').textContent = total >= 499 ? 'Gratis' : '*Por calcular';
}

const accountNavItems = [
  {key:'summary',label:'Resumen',href:'perfil.html#resumen',icon:'homeActive'},
  {key:'club',label:'Club Lumen',href:'perfil.html#club-lumen',icon:'credit'},
  {key:'member-benefits',label:'Mis beneficios',href:'perfil.html#mis-beneficios',icon:'benefit-gift'},
  {key:'orders',label:'Mis compras',href:'mis-compras.html',icon:'bag'},
  {key:'favorites',label:'Mis favoritos',href:'perfil.html#favoritos',icon:'heartProfile'},
  {key:'settings',label:'Configuración',href:'configuracion.html',icon:'settings'},
  {key:'help',label:'Ayuda',href:'perfil.html#ayuda',icon:'help'}
];

function accountNavigation(active) {
  return `${accountNavItems.map(item => `<a href="${item.href}" class="account-nav-link${item.key === active ? ' is-active' : ''}" data-account-link="${item.key}" ${item.key === active ? 'aria-current="page"' : ''}>${icon(item.icon)}<span>${item.label}</span></a>`).join('')}<button class="account-nav-link account-signout" data-action="logout">${icon('profile-logout')}<span>Cerrar sesión</span></button>`;
}

function accountLayout(active, content) {
  const current = accountNavItems.find(item => item.key === active);
  document.body.dataset.accountView = active;
  document.title = `${current?.label || 'Resumen'} · Mi perfil · Lumen`;
  document.documentElement.classList.add('account-navigation-active');
  const view = $('#account-view');
  if (view && $('.account-workspace')) {
    // El menú y su foco permanecen; solo cambia el panel de contenido.
    view.innerHTML = content;
    $$('[data-account-link]').forEach(link => {
      const selected = link.dataset.accountLink === active;
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    $('.account-mobile-menu strong').textContent = current?.label || 'Resumen';
    view.classList.remove('is-switching');
    void view.offsetWidth;
    view.classList.add('is-switching');
    return;
  }
  main.innerHTML = `<div class="account-workspace container">
    <aside class="account-sidebar" aria-label="Mi perfil"><h2>Mi perfil</h2><p>Tu cuenta Club Lumen</p><nav class="account-nav" aria-label="Secciones de Mi perfil">${accountNavigation(active)}</nav></aside>
    <div class="account-body"><button class="account-mobile-menu" data-action="account-menu" aria-haspopup="dialog">${icon('profile-menu')}<span>Mi perfil <strong>${current?.label || 'Resumen'}</strong></span><span class="account-menu-caption">Menú</span></button><section class="account-view" id="account-view" tabindex="-1">${content}</section></div>
  </div>`;
}

function accountPageForURL(url) {
  if (url.origin !== location.origin) return null;
  const name = decodeURIComponent(url.pathname.split('/').pop() || '').replace(/\.html$/,'');
  return ({perfil:'profile',configuracion:'settings','mis-compras':'orders'})[name] || null;
}
let lastAccountURL = location.href;
let releaseAccountScroll = null;
function renderAccountRoute() {
  const nextPage = accountPageForURL(new URL(location.href));
  if (!nextPage || !signedIn) return;
  const workspace = $('.account-workspace');
  const previousHeight = workspace?.getBoundingClientRect().height || 0;
  releaseAccountScroll?.();
  if (workspace) workspace.style.minHeight = `${previousHeight}px`;
  page = nextPage;
  document.body.dataset.page = page;
  ({profile:renderProfile,settings:renderSettings,orders:renderOrders})[page]();
  if (page !== 'profile') document.title = `${page === 'settings' ? 'Configuración' : 'Mis compras'} · Mi perfil · Lumen`;
  lastAccountURL = location.href;
  const view = $('#account-view');
  const headerBottom = $('#encabezado').getBoundingClientRect().bottom;
  const restoreHeight = () => {
    if (workspace) workspace.style.minHeight = '';
    clearTimeout(timer);
    window.removeEventListener('scrollend',restoreHeight);
    if (releaseAccountScroll === restoreHeight) releaseAccountScroll = null;
  };
  let timer;
  releaseAccountScroll = restoreHeight;
  if (view && view.getBoundingClientRect().top < headerBottom) {
    // Reservar la altura anterior evita que el navegador recorte el scroll
    // al pasar de un contenido largo a otro más breve.
    const top = Math.max(0,view.getBoundingClientRect().top + scrollY - headerBottom - 20);
    window.addEventListener('scrollend',restoreHeight,{once:true});
    timer = setTimeout(restoreHeight,800);
    window.scrollTo({top,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  } else timer = setTimeout(restoreHeight,220);
}
function navigateAccount(url) {
  if (url.href === location.href) return;
  // Al abrir los HTML directamente, el navegador solo permite cambiar
  // el fragmento del archivo actual con History API.
  if (location.protocol === 'file:' && url.pathname !== location.pathname) {
    location.href = url.href;
    return;
  }
  history.pushState({account:true},'',url.pathname+url.search+url.hash);
  renderAccountRoute();
}

function memberCardCover() {
  return `<div class="member-card-cover"><div class="member-cover-heading"><span>Tarjeta digital Club Lumen</span><span class="membership-type">${clubMember.type}</span></div>
    <button class="club-card" data-action="flip-card" aria-label="Mostrar reverso y código de barras de la tarjeta Club Lumen" aria-pressed="false"><span class="club-card-inner"><span class="club-face club-front">${image('card-front.png','Tarjeta digital Club Lumen, número '+clubMember.cardNumber,'', 'width="341" height="210" fetchpriority="high"')}<span class="student-label">${clubMember.type}</span></span><span class="club-face club-back">${image('card-back.png','Reverso Club Lumen. Identificación '+clubMember.barcodeNumber,'', 'width="351" height="210"')}</span></span></button>
    <button class="member-barcode-trigger" data-action="show-barcode">Ver código de barras</button>
  </div>`;
}

function memberIdentification() {
  return `<section class="member-identification member-panel" aria-labelledby="membership-identification-title"><div class="member-panel-heading">${icon('credit')}<div><h2 id="membership-identification-title">Club Lumen</h2><p>Tu tarjeta digital de beneficios</p></div></div>
    <div class="member-barcode-frame"><div class="member-barcode-art">${image('card-back.png','Código de barras de tu tarjeta Club Lumen','', 'width="351" height="210"')}</div><p class="member-barcode-number">${clubMember.barcodeNumber}</p></div>
    <button class="member-text-button" data-action="show-barcode">Ampliar código</button>
  </section>`;
}

function memberPoints() {
  return `<section class="member-points member-panel" aria-labelledby="membership-points-title"><div class="member-panel-heading">${icon('profile-points')}<h2 id="membership-points-title">Puntos disponibles</h2></div><p class="member-points-balance">${clubMember.points.toFixed(2)}<span>puntos acumulados</span></p><p class="member-points-description">Consulta el saldo de tu tarjeta Club Lumen.</p><button class="member-text-button" data-action="movements">Ver movimientos</button></section>`;
}

function profileSection() {
  return ({'#club-lumen':'club','#mis-beneficios':'member-benefits','#favoritos':'favorites','#ayuda':'help'})[location.hash] || 'summary';
}

function memberBenefitsContent() {
  const benefits = [
    {icon:'profile-points',title:'Acumula puntos',description:'Recibe el 2% en Puntos Lumen sobre compras participantes, antes de IVA.'},
    {icon:'benefit-payment',title:'Canjea tus puntos',description:'Utiliza tus puntos para pagar compras elegibles. Cada punto equivale a $1 MXN.'},
    {icon:'benefit-gift',title:'Promociones especiales',description:'Accede a promociones para miembros de Club Lumen.'},
    {icon:'benefit-movements',title:'Consulta tus movimientos',description:'Revisa tus puntos acumulados y transacciones.'},
    {icon:'benefit-membership',title:'Sin anualidad',description:'Disfruta tu membresía sin cuotas anuales.'}
  ];
  return `<div class="account-view-heading"><h1 id="account-view-title" tabindex="-1">Beneficios que inspiran</h1><p>Aprovecha todas las ventajas de tu membresía Club Lumen Estudiante.</p></div>
    <div class="member-benefits-grid">${benefits.map(benefit => `<article class="member-panel member-benefit-card"><span class="member-benefit-icon">${icon(benefit.icon)}</span><div><h2>${benefit.title}</h2><p>${benefit.description}</p></div></article>`).join('')}</div>
    <div class="member-benefits-conditions"><button class="button cyan" data-action="member-benefit-conditions" aria-haspopup="dialog">Consultar condiciones</button><p>Aplican restricciones. La acumulación y el canje de puntos están sujetos a productos, servicios y canales participantes. Las promociones tienen vigencias y condiciones particulares.</p></div>`;
}

function accountHelpContent() {
  return `<div class="help-options account-help-options"><details open><summary>¿Cómo consulto mi tarjeta digital?</summary><p>La tarjeta aparece al inicio de tu Resumen. Tócala para ver el reverso o selecciona Ver código de barras para ampliarlo.</p></details><details><summary>¿Dónde están mis productos guardados?</summary><p>En Mis favoritos encontrarás los productos que guardaste con el corazón. Puedes añadirlos al carrito desde ahí.</p></details><details><summary>¿Cómo actualizo mis datos?</summary><p>Abre Configuración y selecciona Mi cuenta para actualizar tu nombre y correo.</p></details><details><summary>¿Cómo encuentro una tienda?</summary><p>En Ubicaciones, selecciona Localiza tu tienda y elige un estado.</p></details></div><div class="account-support"><h2>Estamos para ayudarte</h2><a href="mailto:enlinea@lumen.com.mx">enlinea@lumen.com.mx</a><a href="tel:+525544455000">55 4445 5000</a></div>`;
}

function renderProfile() {
  if (!signedIn) {
    main.innerHTML = `<section class="sign-in-page container"><h1>Bienvenida a Club Lumen</h1><p>Tus favoritos, tus compras y todo tu color en un solo lugar.</p><form id="sign-in-form" class="form-stack"><label>Tu nombre<input name="name" autocomplete="given-name" required maxlength="60" value="${escapeHTML(profile.name)}"></label><button class="button cyan" type="submit">Entrar al prototipo</button><p class="form-note">Acceso de demostración, sin contraseña.</p></form></section>`;
    return;
  }
  const section = profileSection();
  document.title = `${accountNavItems.find(item => item.key === section)?.label || 'Resumen'} · Mi perfil · Lumen`;
  if (section === 'member-benefits') {
    accountLayout('member-benefits', memberBenefitsContent());
    return;
  }
  if (section === 'club') {
    accountLayout('club', `<h1 class="sr-only" id="account-view-title" tabindex="-1">Club Lumen: tarjeta digital y puntos</h1><div class="member-summary member-club-only">${memberCardCover()}<div class="member-club-caption"><h2>Club Lumen</h2><p>Tu tarjeta digital de beneficios</p><span>Membresía ${clubMember.type}</span></div></div><div class="member-detail-grid">${memberIdentification()}${memberPoints()}</div>`);
    return;
  }
  if (section === 'favorites') {
    const saved = allProducts.filter(product => favorites.includes(product.id));
    accountLayout('favorites', `<div class="account-view-heading"><h1 id="account-view-title" tabindex="-1">Mis favoritos</h1><p>${saved.length} ${saved.length === 1 ? 'producto guardado' : 'productos guardados'} para tu próxima idea.</p></div>${saved.length ? `<div class="account-favorites-grid">${saved.map(product => productCard({...product,account:true})).join('')}</div>` : '<div class="member-panel account-empty"><h2>Tu próxima idea empieza aquí</h2><p>Guarda los productos que te gustan tocando el corazón.</p><a class="button cyan" href="productos.html">Explorar Crayola</a></div>'}`);
    return;
  }
  if (section === 'help') {
    accountLayout('help', `<div class="account-view-heading"><h1 id="account-view-title" tabindex="-1">Ayuda</h1><p>Encuentra respuestas y opciones para contactar a Lumen.</p></div><div class="member-panel">${accountHelpContent()}</div>`);
    return;
  }
  const initials = profile.name.trim().split(/\s+/).slice(0,2).map(word => word.charAt(0)).join('').toLocaleUpperCase('es-MX') || 'CL';
  accountLayout('summary', `<h1 class="sr-only" id="account-view-title" tabindex="-1">Resumen de Mi perfil</h1><section class="member-summary" aria-label="Tarjeta Club Lumen e información del usuario">
    ${memberCardCover()}
    <div class="member-user-info"><div class="member-avatar" role="img" aria-label="Avatar de ${escapeHTML(profile.name)}">${escapeHTML(initials)}</div><div class="member-user-heading"><h2>Hola, <strong class="profile-name">${escapeHTML(profile.name)}</strong></h2><button class="member-edit-profile" data-action="account">Editar perfil</button></div><p class="member-user-description">Gestiona tu cuenta y consulta tu tarjeta Club Lumen.</p>${profile.email ? `<p class="member-user-email">${escapeHTML(profile.email)}</p>` : ''}<dl class="member-user-meta"><div><dt>Membresía</dt><dd>${clubMember.type}</dd></div><div><dt>Número de tarjeta</dt><dd>${clubMember.cardNumber}</dd></div></dl></div>
  </section><div class="member-detail-grid">${memberIdentification()}${memberPoints()}</div>`);
}

function renderSettings() {
  if (!signedIn) { renderProfile(); return; }
  accountLayout('settings', `<div class="account-view-heading"><h1 id="account-view-title" tabindex="-1">Configuración</h1><p>Administra la información y las preferencias de tu cuenta.</p></div><div class="account-settings-grid">
    <section class="member-panel settings-card"><span class="settings-card-icon">${icon('person')}</span><h2>Mi cuenta</h2><dl class="settings-account-data"><div><dt>Nombre</dt><dd>${escapeHTML(profile.name)}</dd></div><div><dt>Correo electrónico</dt><dd>${profile.email ? escapeHTML(profile.email) : 'Agrega tu correo electrónico'}</dd></div></dl><button class="button cyan" id="account-details-button" data-action="account">Editar mis datos</button></section>
    <section class="member-panel settings-card"><span class="settings-card-icon">${icon('location')}</span><h2>Direcciones</h2><p>${addresses.length ? `${addresses.length} ${addresses.length === 1 ? 'dirección guardada' : 'direcciones guardadas'} para tus entregas.` : 'Guarda una dirección para tus próximas entregas.'}</p>${addresses.length ? `<p class="settings-address-preview"><strong>${escapeHTML(addresses[0].label)}</strong><span>${escapeHTML(addresses[0].street)}</span><span>${escapeHTML(addresses[0].city)}, C.P. ${escapeHTML(addresses[0].zip)}</span></p>` : ''}<button class="button cyan" id="account-addresses-button" data-action="addresses">Administrar direcciones</button></section>
    <section class="member-panel settings-card"><span class="settings-card-icon">${icon('profile-points')}</span><h2>Movimientos</h2><p>Consulta el saldo de tu membresía Club Lumen.</p><p class="settings-points">${clubMember.points.toFixed(2)} <span>puntos disponibles</span></p><button class="button cyan" data-action="movements">Ver movimientos</button></section>
    <section class="member-panel settings-card"><span class="settings-card-icon">${icon('benefit-gift')}</span><h2>Club Lumen</h2><p>Membresía ${clubMember.type}. Descubre las ventajas que acompañan tus ideas.</p><a class="button cyan" href="perfil.html#mis-beneficios" data-account-link="member-benefits">Mis beneficios</a></section>
    </div><p class="account-prototype-note">Cuenta de demostración. Tus cambios se conservan en este navegador.</p>`);
}

function renderOrders() {
  if (!signedIn) { renderProfile(); return; }
  accountLayout('orders', `<div class="account-view-heading"><h1 id="account-view-title" tabindex="-1">Mis compras</h1><p>Consulta tus pedidos y vuelve a comprar tus favoritos.</p></div><div class="account-purchase-list">${pastOrders.map(order => `<article class="member-panel purchase-card"><header class="purchase-header"><div><h2>Pedido ${order.id}</h2><p>${order.date}</p></div><span class="purchase-status">Entregado</span></header><div class="purchase-product"><div class="order-image">${image(order.product.image,order.product.title)}</div><div class="order-copy"><h3>${order.product.title}</h3><p>${order.product.detail}</p><p>Cantidad: 1</p></div><strong class="purchase-price">${money(order.product.price)} MXN</strong></div><footer class="purchase-actions"><button class="button purchase-detail-button" data-action="order-detail" data-id="${order.id}" aria-label="Ver detalle del pedido ${order.id}" aria-haspopup="dialog">Ver detalle</button><button class="button cyan" data-action="repeat-order" data-id="${order.product.id}" aria-label="Volver a comprar ${order.product.title}">Volver a comprar</button></footer></article>`).join('')}</div><p id="order-cart-status" class="account-action-status" role="status" aria-live="polite"></p><a class="member-text-button purchase-cart-link" href="carrito.html">Ver mi carrito</a><p class="account-prototype-note">Historial de compras de demostración del rediseño.</p>`);
}

function showOrderDetail(id) {
  const order = pastOrders.find(item => item.id === id);
  if (!order) return;
  const product = order.product;
  openDialog('Detalle de tu compra', `<div class="purchase-detail"><div class="purchase-header"><div><h3>Pedido ${order.id}</h3><p>${order.date}</p></div><span class="purchase-status">Entregado</span></div><div class="purchase-product"><div class="order-image">${image(product.image,product.title)}</div><div class="order-copy"><h3>${product.title}</h3><p>${product.detail}</p><p>Cantidad: 1</p></div></div><div class="purchase-total"><span>Total de productos (IVA incluido)</span><strong>${money(product.price)} MXN</strong></div><button class="button cyan" data-action="repeat-order" data-id="${product.id}" aria-label="Volver a comprar ${product.title}">Volver a comprar</button><p id="purchase-cart-status" class="account-action-status" role="status" aria-live="polite"></p><a class="detail-view-cart" href="carrito.html">Ver mi carrito</a><p class="account-prototype-note">Pedido de demostración del rediseño.</p></div>`, 'purchase-detail-dialog');
}

function renderLocations() {
  window.initLumenLocations(main);
}

function openDialog(title, content, className = '') {
  if (!dialog.open) returnFocus = document.activeElement;
  dialog.className = `app-dialog ${className}`;
  dialog.innerHTML = `<div class="dialog-heading"><h2 id="dialog-title">${title}</h2><button class="close-dialog icon-button" data-action="close-dialog" aria-label="Cerrar">×</button></div><div class="dialog-body">${content}</div>`;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
}
function closeDialog() { dialog.close(); }
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open','search-open');
  if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
});

function toast(message) {
  clearTimeout(toastTimer);
  $('#aviso').textContent = message;
  $('#aviso').classList.add('visible');
  toastTimer = setTimeout(() => $('#aviso').classList.remove('visible'), 3200);
}
function addToCart(product, quantity = 1) {
  const existing = cart.find(item => item.id === product.id);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return false;
  if ((existing?.quantity || 0) + quantity > 99) {
    toast('Puedes añadir hasta 99 piezas por producto.');
    return false;
  }
  if (existing) { existing.quantity += quantity; existing.selected = true; }
  else cart.push({...product, quantity, selected:true});
  persistCart();
  toast(`${product.title}: ${quantity === 1 ? '1 caja añadida' : `${quantity} cajas añadidas`} al carrito`);
  return true;
}
function syncProductDetailQuantity() {
  const form = $('#product-detail-form');
  if (!form) return;
  const remaining = Math.max(0,99 - (cart.find(item => item.id === form.dataset.productId)?.quantity || 0));
  const input = $('#detail-quantity');
  input.max = Math.max(1,remaining);
  input.disabled = remaining === 0;
  if (remaining > 0 && Number(input.value) > remaining) input.value = remaining;
  $('[data-action="detail-quantity"][data-delta="-1"]',form).disabled = remaining === 0 || Number(input.value) <= 1;
  $('[data-action="detail-quantity"][data-delta="1"]',form).disabled = remaining === 0 || Number(input.value) >= remaining;
  $('#detail-add',form).disabled = remaining === 0;
  if (remaining === 0) $('#detail-cart-status').textContent = 'Ya tienes el máximo de 99 cajas de este producto en tu carrito.';
}
function showProductDetail(id) {
  const product = products.find(item => item.id === id);
  const details = seasonProductDetails[id];
  if (!product || !details) return;
  const saved = favorites.includes(id);
  openDialog('Detalles del producto', `<form id="product-detail-form" data-product-id="${id}" class="product-detail-panel">
    <div class="product-detail-visual"><div class="product-detail-image">${image(details.image || product.image,details.name+' '+product.detail,'','fetchpriority="high"')}<button type="button" class="favorite-button ${saved ? 'is-favorite' : ''}" data-action="favorite" data-id="${id}" data-heart="heart" aria-label="${saved ? 'Quitar de' : 'Añadir a'} favoritos: ${escapeHTML(product.title)}" aria-pressed="${saved}">${icon(saved ? 'heart' : 'heartOutline')}</button></div>
      <label class="detail-quantity-label" for="detail-quantity">Cantidad</label><div class="detail-quantity-control"><button type="button" data-action="detail-quantity" data-delta="-1" aria-label="Restar una caja" disabled>−</button><input type="number" id="detail-quantity" name="quantity" value="1" min="1" max="99" step="1" inputmode="numeric" required aria-label="Cantidad de cajas"><button type="button" data-action="detail-quantity" data-delta="1" aria-label="Añadir una caja">+</button></div>
    </div>
    <div class="product-detail-copy"><h3>${escapeHTML(details.name)}</h3><p class="product-detail-presentation">${escapeHTML(product.detail)}</p><div class="product-detail-meta"><p>SKU: Por confirmar · Código de barras: ${details.barcode || 'Por confirmar'}</p><p>Marca: Crayola | Modelo: ${escapeHTML(details.model)} | Unidad: ${escapeHTML(details.unit)}</p></div>
      <p class="detail-price-label">Precio en línea</p><p class="detail-price">${money(product.price)} <span>MXN</span></p><p class="detail-color"><strong>Color:</strong> ${escapeHTML(details.color)}</p>
      <button id="detail-add" type="submit" class="button cyan detail-add">Agregar</button><a class="detail-view-cart" href="carrito.html">Ver mi carrito</a><p class="detail-cart-status" id="detail-cart-status" role="status" aria-live="polite"></p>
      <details class="product-detail-description"><summary>Sobre este producto</summary><p>${escapeHTML(details.description)}</p></details>
    </div>
  </form>`, 'product-detail-dialog');
  syncProductDetailQuantity();
}

function showPromotion(type) {
  const promotion = crayolaPromotions[type];
  if (!promotion) return;
  const total = promotion.products.reduce((sum, product) => sum + product.price, 0);
  const savings = promotion.products.reduce((sum, product) => sum + product.originalPrice - product.price, 0);
  openDialog('Promociones Crayola', `<div class="promotion-detail-panel" data-promotion="${type}">
    ${type === 'paint' ? `<div class="promotion-desktop-art" aria-label="Productos de ${escapeHTML(promotion.title)}">${promotion.products.map(product => image(product.image,product.title+' '+product.detail,product.artClass)).join('')}</div>` : `<div class="promotion-detail-art ${type}" aria-label="Productos de ${escapeHTML(promotion.title)}">${promotion.products.map(product => image(product.image,product.title+' '+product.detail,product.artClass)).join('')}</div>`}
    <div class="promotion-detail-copy">${type === 'paint' ? '<div class="promotion-introduction">' : ''}<p class="promotion-eyebrow">Promoción</p><h3>${promotion.title}</h3><p class="promotion-description">${promotion.description}</p>
      <div class="promotion-list-heading"><h4>Productos<br>de promoción</h4><div class="promotion-bundle"><button class="button cyan" data-action="add-promotion" data-type="${type}" aria-label="Añadir todos los productos de ${escapeHTML(promotion.title)} al carrito">Añadir promoción</button><p>1 unidad de cada producto</p></div></div>
      ${type === 'paint' ? '</div>' : ''}<div class="promotion-product-list">${promotion.products.map(product => `<article class="promotion-product-row${type === 'paint' ? ' promotion-illustrated-row' : ''}">${type === 'paint' ? `<div class="promotion-item-visual">${image(product.image,product.title+' '+product.detail,product.artClass)}</div><div class="promotion-product-content">` : ''}<div class="promotion-product-name"><h4>${product.title}</h4><p>${product.detail}</p></div><div class="promotion-product-price"><p><span class="sr-only">Precio de promoción: </span><strong>${money(product.price)} <span>MXN</span></strong></p><p class="promotion-original-price"><span class="sr-only">Precio anterior: </span><del>${money(product.originalPrice)} MXN</del></p><button class="promotion-add-item" data-action="add-promotion" data-type="${type}" data-id="${product.id}" aria-label="Añadir ${escapeHTML(product.title)} ${escapeHTML(product.detail)} al carrito">Añadir</button></div>${type === 'paint' ? '</div>' : ''}</article>`).join('')}</div>
      <div class="promotion-totals"><p>Total de la promoción<strong>${money(total)} MXN</strong></p><p>Ahorras <strong>${money(savings)} MXN</strong></p></div>
      <p id="promotion-cart-status" class="promotion-cart-status" role="status" aria-live="polite"></p><a class="detail-view-cart" href="carrito.html">Ver mi carrito</a>
      <p class="promotion-terms">Precios de referencia del prototipo en MXN. Sujetos a disponibilidad.</p>
    </div></div>`, 'promotion-detail-dialog');
  syncPromotionButtons();
}

function syncPromotionButtons() {
  const panel = $('.promotion-detail-panel');
  if (!panel) return;
  const promotion = crayolaPromotions[panel.dataset.promotion];
  $$('[data-action="add-promotion"]',panel).forEach(button => {
    const selected = button.dataset.id ? promotion.products.filter(product => product.id === button.dataset.id) : promotion.products;
    const full = selected.some(product => (cart.find(item => item.id === product.id)?.quantity || 0) >= 99);
    button.disabled = full;
    button.textContent = full ? 'Máximo alcanzado' : button.dataset.id ? 'Añadir' : 'Añadir promoción';
  });
}

function addPromotion(button) {
  const promotion = crayolaPromotions[button.dataset.type];
  if (!promotion) return;
  const selected = button.dataset.id ? promotion.products.filter(product => product.id === button.dataset.id) : promotion.products;
  if (!selected.length) return;
  const status = $('#promotion-cart-status');
  // Validar el paquete completo antes de añadirlo evita compras parciales.
  if (selected.some(product => (cart.find(item => item.id === product.id)?.quantity || 0) >= 99)) {
    status.textContent = 'Puedes añadir hasta 99 unidades por producto. Revisa las cantidades en tu carrito.';
    syncPromotionButtons();
    return;
  }
  selected.forEach(product => addToCart(product));
  const total = selected.reduce((sum, product) => sum + product.price, 0);
  const message = button.dataset.id ? `Añadiste ${selected[0].title} ${selected[0].detail} al carrito.` : `Añadiste ${selected.length} productos de ${promotion.title} al carrito por ${money(total)} MXN.`;
  status.textContent = message;
  toast(message);
  syncPromotionButtons();
}

function showFavorites() {
  const saved = allProducts.filter(product => favorites.includes(product.id));
  openDialog('Favoritos', saved.length ? `<div class="favorites-dialog-grid">${saved.map(productCard).join('')}</div>` : '<div class="empty-state"><p>Guarda tus favoritos tocando el corazón de los productos.</p><a class="button green" href="productos.html">Explorar productos</a></div>');
}
function showAddresses(editIndex) {
  const editing = Number.isInteger(editIndex) && editIndex >= 0 && editIndex < addresses.length;
  const current = editing ? addresses[editIndex] : {};
  openDialog('Direcciones', `${addresses.length ? `<div class="saved-addresses">${addresses.map((address,index) => `<div class="saved-address-item"><p><strong>${escapeHTML(address.label)}</strong><br>${escapeHTML(address.street)}<br>${escapeHTML(address.city)}, C.P. ${escapeHTML(address.zip)}</p><button class="member-text-button" data-action="edit-address" data-index="${index}" aria-label="Editar dirección ${escapeHTML(address.label)}">Editar</button></div>`).join('')}</div>` : '<p>Añade una dirección para tus próximas entregas.</p>'}<form class="form-stack" id="address-form"><h3>${editing ? 'Editar dirección' : 'Añadir dirección'}</h3><input type="hidden" name="addressIndex" value="${editing ? editIndex : ''}"><label>Nombre de la dirección<input name="label" value="${escapeHTML(current.label)}" placeholder="Casa, escuela…" required maxlength="50" autocomplete="off"></label><label>Calle y número<input name="street" value="${escapeHTML(current.street)}" required maxlength="150" autocomplete="address-line1"></label><div class="form-columns"><label>Ciudad<input name="city" value="${escapeHTML(current.city)}" required maxlength="80" autocomplete="address-level2"></label><label>Código postal<input name="zip" value="${escapeHTML(current.zip)}" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" required autocomplete="postal-code"></label></div><button type="submit" class="button cyan">${editing ? 'Guardar cambios' : 'Guardar dirección'}</button>${editing ? '<button type="button" class="member-text-button" data-action="addresses">Cancelar edición</button>' : ''}</form>`);
}

const actions = {
  'account-menu':() => openDialog('Mi perfil', `<nav class="account-drawer-nav" aria-label="Secciones de Mi perfil">${accountNavigation(document.body.dataset.accountView || 'summary')}</nav>`, 'account-menu-dialog'),
  'member-benefit-conditions':() => openDialog('Condiciones de Club Lumen', `<div class="member-benefit-terms"><p>Los beneficios están sujetos a los términos y condiciones vigentes de Club Lumen.</p><ul><li>La acumulación aplica sobre productos y servicios participantes, antes de IVA, en los canales autorizados.</li><li>Para canjear puntos, tu tarjeta debe estar registrada. Los puntos se utilizan como forma de pago en compras elegibles y no son canjeables por dinero en efectivo.</li><li>Las promociones tienen vigencias y condiciones particulares.</li><li>La membresía no tiene anualidad. La adquisición o reposición de la tarjeta puede tener un costo.</li></ul><a href="https://www.clublumen.com.mx/" class="button cyan" target="_blank" rel="noopener noreferrer" aria-label="Ver condiciones oficiales de Club Lumen, abre otra pestaña">Ver condiciones oficiales</a></div>`, 'member-benefit-conditions-dialog'),
  'show-barcode':() => openDialog('Club Lumen', `<p class="barcode-dialog-caption">Tu tarjeta digital de beneficios</p>${image('card-back.png','Código de barras Club Lumen. Identificación '+clubMember.barcodeNumber,'barcode-dialog-card','width="351" height="210"')}<p class="barcode-dialog-number">${clubMember.barcodeNumber}</p><p class="barcode-dialog-type">Membresía ${clubMember.type}</p><button class="button cyan" data-action="close-dialog">Listo</button>`, 'member-barcode-dialog'),
  'search':() => {
    openDialog('Buscar en Lumen', `<form class="search-form" role="search" id="search-form"><label class="sr-only" for="search-input">Buscar por nombre de producto</label><input type="search" id="search-input" name="q" autocomplete="off" placeholder="¿Qué quieres crear hoy?" autofocus><button class="icon-button" type="submit" aria-label="Buscar">${icon('search')}</button></form><div id="search-results" class="search-results" aria-live="polite"><p class="search-hint">Busca en la colección Crayola.</p></div>`, 'search-dialog');
    document.body.classList.add('search-open');
    $('#search-input').focus();
  },
  'close-dialog':closeDialog,
  'product-detail':button => showProductDetail(button.dataset.id),
  'detail-quantity':button => {
    const input = $('#detail-quantity');
    const current = Number(input.value);
    input.value = Math.max(1,Math.min(Number(input.max), (Number.isInteger(current) ? current : 1) + Number(button.dataset.delta)));
    syncProductDetailQuantity();
  },
  'slide':button => $('#carrusel').scrollBy({left:Number(button.dataset.direction) * ($('#carrusel').clientWidth * .8), behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}),
  'add-product':button => {
    const product = allProducts.find(item => item.id === button.dataset.id);
    if (!product || !addToCart(product)) return;
    clearTimeout(addButtonTimers.get(button));
    button.textContent = 'Agregado';
    button.classList.add('is-added');
    button.setAttribute('aria-label', `${product.title} agregado. Agregar otro al carrito`);
    addButtonTimers.set(button, setTimeout(() => {
      if (!button.isConnected) return;
      button.textContent = 'Agregar';
      button.classList.remove('is-added');
      button.setAttribute('aria-label', `Agregar ${product.title} ${product.detail} al carrito`);
      addButtonTimers.delete(button);
    }, 1600));
  },
  'favorite':button => {
    const id = button.dataset.id;
    const saved = favorites.includes(id);
    favorites = saved ? favorites.filter(item => item !== id) : [...favorites, id];
    storage.set('favorites', favorites);
    $$('[data-action="favorite"]').filter(el => el.dataset.id === id).forEach(el => {
      el.classList.toggle('is-favorite', !saved);
      el.innerHTML = icon(saved ? 'heartOutline' : el.dataset.heart || 'heart');
      el.setAttribute('aria-pressed', String(!saved));
      el.setAttribute('aria-label', `${saved ? 'Añadir a' : 'Quitar de'} favoritos: ${allProducts.find(product => product.id === id)?.title || ''}`);
    });
    toast(saved ? 'Producto eliminado de tus favoritos' : 'Guardado en tus favoritos');
    if (page === 'profile' && profileSection() === 'favorites' && !dialog.open) {
      renderProfile();
      $('#account-view-title')?.focus({preventScroll:true});
    }
  },
  'promotion':button => showPromotion(button.dataset.type),
  'add-promotion':addPromotion,
  'quantity':button => {
    const item = cart.find(item => item.id === button.dataset.id);
    if (!item) return;
    const newQuantity = item.quantity + Number(button.dataset.delta);
    if (newQuantity <= 0) {
      cart = cart.filter(product => product.id !== item.id);
      toast('Producto eliminado del carrito');
    } else item.quantity = Math.min(99, newQuantity);
    persistCart();
    renderCartItems();
    const next = $$('.quantity-control button').find(el => el.dataset.id === item.id && el.dataset.delta === button.dataset.delta);
    next?.focus({preventScroll:true});
  },
  'summary':button => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    $('#shipping-row').hidden = expanded;
  },
  'checkout':() => {
    const items = cart.filter(item => item.selected);
    if (!items.length) return;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    openDialog('Resumen de tu pedido', `<div class="checkout-items">${items.map(item => `<div class="summary-row"><span>${escapeHTML(item.title)} × ${item.quantity}</span><strong>${money(item.price * item.quantity)}</strong></div>`).join('')}</div><div class="summary-row checkout-total"><strong>Total de productos</strong><strong>${money(total)}</strong></div><p>${total >= 499 ? 'Envío gratis.' : 'El envío se calcularía al ingresar tu dirección.'}</p><p class="demo-note">Este es un prototipo de demostración. No se realizará ningún cargo.</p><button class="button green" data-action="close-dialog">Volver al carrito</button>`);
  },
  'flip-card':button => {
    const flipped = button.classList.toggle('is-flipped');
    button.setAttribute('aria-pressed', String(flipped));
    button.setAttribute('aria-label', flipped ? 'Mostrar frente de la tarjeta Club Lumen' : 'Mostrar reverso y código de barras de la tarjeta Club Lumen');
  },
  'order-detail':button => showOrderDetail(button.dataset.id),
  'repeat-order':button => {
    const product = pastProducts.find(item => item.id === button.dataset.id);
    if (!product) return;
    const added = addToCart(product);
    const status = $('#purchase-cart-status') || $('#order-cart-status');
    if (status) status.textContent = added ? `${product.title}: añadiste una unidad al carrito.` : 'Alcanzaste el máximo de 99 unidades de este producto.';
  },
  'favorites':showFavorites,
  'help':() => openDialog('¿En qué podemos ayudarte?', `<div class="help-options"><details><summary>¿Cómo guardo un favorito?</summary><p>Toca el corazón en las tarjetas del inicio. Encontrarás tu selección en Mi perfil → Favoritos.</p></details><details><summary>¿Cómo uso mi tarjeta Club Lumen?</summary><p>Toca tu tarjeta en Mi perfil para mostrar el código de barras.</p></details><details><summary>¿Cómo encuentro una tienda?</summary><p>En Ubicaciones, toca Localiza tu tienda y selecciona un estado.</p></details><a class="button cyan" href="ubicaciones.html">Ir a Ubicaciones</a></div>`),
  'account':() => openDialog('Mi cuenta', `<form id="account-form" class="form-stack"><label>Nombre<input name="name" value="${escapeHTML(profile.name)}" autocomplete="name" required maxlength="60"></label><label>Correo electrónico<input type="email" name="email" value="${escapeHTML(profile.email)}" autocomplete="email" maxlength="120"></label><button type="submit" class="button cyan">Guardar cambios</button></form>`),
  'movements':() => openDialog('Movimientos', '<div class="points-summary"><span>Tus puntos Club Lumen</span><strong>279.67</strong></div><p>No hay nuevos movimientos en este prototipo.</p>'),
  'addresses':() => showAddresses(),
  'edit-address':button => showAddresses(Number(button.dataset.index)),
  'logout':() => { if (signedIn) { signedIn = false; storage.set('signedIn', false); } location.href = 'perfil.html'; },

};

document.addEventListener('click', event => {
  const accountLink = event.target.closest('[data-account-link]');
  if (accountLink && signedIn && ['profile','settings','orders'].includes(page) && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && (!accountLink.target || accountLink.target === '_self')) {
    const url = new URL(accountLink.href);
    if (accountPageForURL(url)) {
      event.preventDefault();
      const fromDrawer = dialog.open && dialog.classList.contains('account-menu-dialog');
      const sameSection = accountLink.getAttribute('aria-current') === 'page';
      if (dialog.open) closeDialog();
      if (!sameSection) navigateAccount(url);
      if (fromDrawer) {
        returnFocus = $('#account-view-title');
        returnFocus?.focus({preventScroll:true});
      }
      return;
    }
  }
  const button = event.target.closest('[data-action]');
  if (button && !button.disabled) actions[button.dataset.action]?.(button, event);
  if (event.target.closest('[data-close-on-home]') && page === 'home') closeDialog();
  if (event.target.closest('[data-account-link]') && dialog.open) closeDialog();
});
document.addEventListener('change', event => {
  if (event.target.dataset.action === 'select-item') {
    const item = cart.find(item => item.id === event.target.dataset.id);
    if (item) item.selected = event.target.checked;
    event.target.closest('.cart-item')?.classList.toggle('is-selected', item?.selected);
    persistCart(); updateSummary();
  }
  if (event.target.dataset.action === 'select-all') {
    cart.forEach(item => { item.selected = event.target.checked; });
    persistCart(); renderCartItems();
  }
});
function runSearch() {
  const query = $('#search-input').value.trim();
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const matches = allProducts.filter(product => normalize(`${product.title} ${product.detail}`).includes(normalize(query)));
  $('#search-results').innerHTML = !query ? '<p class="search-hint">Busca en la colección Crayola.</p>' : matches.length ? `<p class="results-count">${matches.length} ${matches.length === 1 ? 'producto encontrado' : 'productos encontrados'}</p><div class="favorites-dialog-grid">${matches.map(productCard).join('')}</div>` : '<div class="empty-state"><p>No encontramos ese producto en la colección Crayola.</p><p>Prueba con crayones, pinturas, plumones o lápices.</p></div>';
}
document.addEventListener('input', event => { if (event.target.id === 'search-input') runSearch(); if (event.target.id === 'detail-quantity') syncProductDetailQuantity(); });
document.addEventListener('submit', event => {
  if (!['account-form','address-form','search-form','sign-in-form','product-detail-form'].includes(event.target.id)) return;
  event.preventDefault();
  const data = new FormData(event.target);
  if (event.target.id === 'product-detail-form') {
    const product = products.find(item => item.id === event.target.dataset.productId);
    const quantity = Number(data.get('quantity'));
    if (!event.target.reportValidity() || !product) return;
    if (addToCart(product,quantity)) {
      syncProductDetailQuantity();
      const full = (cart.find(item => item.id === product.id)?.quantity || 0) >= 99;
      $('#detail-cart-status').textContent = `Agregaste ${quantity} ${quantity === 1 ? 'caja' : 'cajas'} al carrito.${full ? ' Alcanzaste el máximo de 99 cajas.' : ''}`;
    }
    return;
  }
  if (event.target.id === 'search-form') return runSearch();
  if (['account-form','sign-in-form'].includes(event.target.id)) {
    const name = String(data.get('name') || '').trim();
    if (!name) { event.target.elements.name.setCustomValidity('Escribe tu nombre.'); event.target.elements.name.reportValidity(); return; }
    profile = {name, email:String(data.get('email') ?? profile.email).trim()};
    storage.set('profile', profile);
    if (event.target.id === 'sign-in-form') { signedIn = true; storage.set('signedIn', true); if(page === 'profile') renderProfile(); else location.href = 'perfil.html'; }
    else {
      closeDialog();
      if (page === 'profile') { renderProfile(); returnFocus = $('.member-edit-profile') || $('#account-view-title'); }
      else if (page === 'settings') { renderSettings(); returnFocus = $('#account-details-button'); }
    }
    toast('Tu perfil se guardó en este navegador');
  }
  if (event.target.id === 'address-form') {
    const address = Object.fromEntries(['label','street','city','zip'].map(key => [key,String(data.get(key) || '').trim()]));
    if (Object.values(address).some(value => !value) || !event.target.reportValidity()) return;
    const rawIndex = data.get('addressIndex');
    const index = rawIndex === '' || rawIndex === null ? -1 : Number(rawIndex);
    if (Number.isInteger(index) && index >= 0 && index < addresses.length) addresses[index] = address;
    else addresses.push(address);
    storage.set('addresses', addresses);
    closeDialog();
    if (page === 'settings') { renderSettings(); returnFocus = $('#account-addresses-button'); }
    toast(index >= 0 ? 'Dirección actualizada' : 'Dirección guardada');
  }
});
document.addEventListener('input', event => { if (event.target.name === 'name') event.target.setCustomValidity(''); });

renderShell();
({home:renderHome, products:renderProducts, cart:renderCart, profile:renderProfile, settings:renderSettings, orders:renderOrders, locations:renderLocations})[page]();
renderFooter();

function handleAccountHistory() {
  if (!['profile','settings','orders'].includes(page) || !signedIn || location.href === lastAccountURL) return;
  if (dialog.open) closeDialog();
  renderAccountRoute();
}
window.addEventListener('hashchange',handleAccountHistory);
window.addEventListener('popstate',handleAccountHistory);

// La composición ilustrada conserva sus proporciones en pantallas pequeñas.
const heroOuter = $('.hero-art-outer');
if (heroOuter) {
  const resizeArt = () => {
    const desktop = matchMedia('(min-width:1000px)').matches;
    const scale = heroOuter.clientWidth / (desktop ? 908 : 430);
    heroOuter.style.setProperty('--art-scale', scale);
    $('.hero').style.setProperty('--hero-scale', scale);
    if (desktop && Number.isFinite(window.innerWidth)) {
      const bleed = Math.max(0, (window.innerWidth - heroOuter.clientWidth) / (2 * scale));
      const start = Math.min(-180, -bleed - 120);
      const end = Math.max(1260, 908 + bleed + 120);
      const curve = `M${start} 257.5H-160C45 293 195 290 350 275C550 250 700 170 850 106C960 60 1070 60 1200 92.5H${end}`;
      $$('.hero-ribbon-reveal-path').forEach(path => path.setAttribute('d', curve));
    }
    heroOuter.style.height = `${(desktop ? 916 : 493) * scale}px`;
  };
  new ResizeObserver(resizeArt).observe(heroOuter);
  window.addEventListener('resize', resizeArt, {passive:true});
  matchMedia('(min-width:1000px)').addEventListener?.('change', resizeArt);
  resizeArt();
}
function animateHeroPencil(scene) {
  const route = $('#pencil-route', scene);
  const trace = $('.pencil-trace', scene);
  const pencil = $('.pencil-position', scene);
  const tilt = $('.pencil-tilt', scene);
  const shadow = $('.pencil-shadow', scene);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const length = route.getTotalLength();
  const sampleCount = Math.ceil(length / 5);
  const samples = Array.from({length:sampleCount}, (_, index) => sample(index / sampleCount));
  const start = samples[0].point;
  const lastSample = sample(1);
  const end = lastSample.point;
  const drawEnd = 3200;
  const returnEnd = 4700;
  const fadeStart = 6900;
  const cycleEnd = 7900;
  let elapsed = 0;
  let previousTime;
  let frame;
  let lastProgress;
  let lastTime;
  let visible = !('IntersectionObserver' in window);

  // La punta y el borde del trazo comparten el mismo punto del recorrido.
  function sample(progress) {
    const distance = progress * length;
    const point = route.getPointAtLength(distance);
    const before = route.getPointAtLength(Math.max(0, distance - 1));
    const after = route.getPointAtLength(Math.min(length, distance + 1));
    const dx = after.x - before.x;
    const dy = after.y - before.y;
    const grain = .45 * Math.sin(distance * .37) + .3 * Math.sin(distance * .79);
    const radius = 2 + 7 * Math.sin(Math.PI * progress) + 36 * progress ** 3 + grain;
    const tangentLength = Math.hypot(dx, dy);
    const normal = radius / tangentLength;
    const cap = Math.min(25, radius * 2) / tangentLength;
    return {
      point,
      cap: `${(point.x + dx * cap).toFixed(2)} ${(point.y + dy * cap).toFixed(2)}`,
      left: `${(point.x - dy * normal).toFixed(2)} ${(point.y + dx * normal).toFixed(2)}`,
      right: `${(point.x + dy * normal).toFixed(2)} ${(point.y - dx * normal).toFixed(2)}`
    };
  }

  function drawTrace(progress, tip) {
    if (progress === lastProgress) return;
    lastProgress = progress;
    const visibleSamples = samples.slice(0, Math.ceil(progress * sampleCount));
    visibleSamples.push(tip);
    const left = visibleSamples.map(point => point.left).join('L');
    const right = visibleSamples.reverse().map(point => point.right).join('L');
    trace.setAttribute('d', progress === 0 ? '' :
      `M${left}Q${tip.cap} ${right}A2 2 0 0 0 ${samples[0].left}Z`);
  }

  const smooth = value => value * value * (3 - 2 * value);

  function paint(time) {
    // Durante la pausa solo cambia la opacidad, y únicamente al final.
    if (time >= returnEnd && lastTime >= returnEnd) {
      if (time >= fadeStart) trace.setAttribute('opacity', 1 - smooth((time - fadeStart) / (cycleEnd - fadeStart)));
      else if (lastTime >= fadeStart) trace.setAttribute('opacity', 1);
      lastTime = time;
      return;
    }
    lastTime = time;
    const linear = Math.min(time / drawEnd, 1);
    // La velocidad sube y baja gradualmente. El lápiz se levanta al regresar.
    const progress = smooth(linear);
    const returnProgress = smooth(Math.max(0, Math.min((time - drawEnd) / (returnEnd - drawEnd), 1)));
    const lift = Math.sin(Math.PI * returnProgress);
    const tip = progress === 1 ? lastSample : sample(progress);
    const x = time < drawEnd ? tip.point.x : end.x + (start.x - end.x) * returnProgress;
    const y = time < drawEnd ? tip.point.y : end.y + (start.y - end.y) * returnProgress - 92 * lift;
    const angle = 3 * Math.sin(2 * Math.PI * progress) - 8 * lift;
    drawTrace(progress, tip);
    trace.setAttribute('opacity', 1 - smooth(Math.max(0, Math.min((time - fadeStart) / (cycleEnd - fadeStart), 1))));
    pencil.style.transform = `translate(${x}px, ${y}px)`;
    tilt.setAttribute('transform', `rotate(${angle})`);
    shadow.setAttribute('transform', `translate(0 ${24 * lift})`);
    shadow.setAttribute('opacity', .76 - .5 * lift);
  }

  function tick(now) {
    // Un cuadro retrasado no debe hacer que la punta salte sobre el papel.
    if (previousTime !== undefined) elapsed = (elapsed + Math.min(now - previousTime, 34)) % cycleEnd;
    previousTime = now;
    paint(elapsed);
    frame = requestAnimationFrame(tick);
  }

  function syncPlayback() {
    if (!visible || document.hidden || motion.matches) {
      cancelAnimationFrame(frame);
      frame = previousTime = undefined;
      if (motion.matches) paint(returnEnd);
      return;
    }
    frame ??= requestAnimationFrame(tick);
  }

  paint(motion.matches ? returnEnd : 0);
  if ('IntersectionObserver' in window) {
    const pencilObserver = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= .12;
      syncPlayback();
    }, {threshold:.12});
    pencilObserver.observe($('.pencil-paper', scene));
  }
  document.addEventListener('visibilitychange', syncPlayback);
  motion.addEventListener?.('change', syncPlayback);
  syncPlayback();
}

const heroPencil = $('.hero-pencil-animation');
if (heroPencil) animateHeroPencil(heroPencil);
// La franja inferior se dibuja una vez, al llegar a su sección.
const brandRibbon = $('.brand-ribbon');
if (brandRibbon && matchMedia('(prefers-reduced-motion: no-preference)').matches && 'IntersectionObserver' in window) {
  brandRibbon.classList.add('ribbon-will-draw');
  const ribbonObserver = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      brandRibbon.classList.add('is-drawn');
      ribbonObserver.unobserve(brandRibbon);
    }
  }, {threshold:0.15});
  ribbonObserver.observe(brandRibbon);
}
if (matchMedia('(prefers-reduced-motion: no-preference)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:0.08});
  $$('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
}
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  $('#encabezado').classList.toggle('is-scrolled', y > 12);
  $('#navegacion').classList.toggle('is-scrolling', y > lastScroll && y > 200);
  lastScroll = y;
}, {passive:true});

if (location.hash === '#favoritos' && page === 'home') requestAnimationFrame(() => $('#favoritos').scrollIntoView());
