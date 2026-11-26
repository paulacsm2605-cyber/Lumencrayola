/* Directorio Lumen y capturas locales del mapa de referencia. */
'use strict';
window.initLumenLocations = function (main) {
  const stores = window.LUMEN_STORES || [];
  const esc = value => String(value || '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const states = [...new Set(stores.map(s=>s.state))].sort((a,b)=>a.localeCompare(b,'es'));
  const mapNames = {'':'mexico','Aguascalientes':'aguascalientes','Ciudad de México':'cdmx','Estado de México':'estado-de-mexico','Guanajuato':'guanajuato','Jalisco':'jalisco','Michoacán':'michoacan','Nuevo León':'nuevo-leon','Puebla':'puebla','Querétaro':'queretaro','San Luis Potosí':'san-luis-potosi'};
  const directions = s => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${s.name}, ${s.address}, ${s.state}, México`)}`;
  const referenceImage = (state='', className='') => `<picture class="${className}"><source media="(max-width:999px)" srcset="assets/maps/${mapNames[state]}-mobile.jpg"><img src="assets/maps/${mapNames[state]}-desktop.jpg" width="1800" height="1000" alt="Mapa de referencia de ${esc(state || 'las sucursales Lumen en México')}, con ubicaciones señaladas en azul" decoding="async" fetchpriority="high"></picture>`;
  main.innerHTML = `<section class="locations-page is-static-map" aria-label="Ubicaciones de tiendas Lumen">
    <div class="location-map map-reference" role="region" aria-label="Mapa de referencia de sucursales Lumen">
      <div class="map-reference-toolbar"><div><span class="map-reference-label">Mapa de referencia</span><h2 id="map-region-title">México</h2></div><button class="button map-enlarge" id="enlarge-map" aria-haspopup="dialog">Ampliar mapa</button></div>
      <div class="map-reference-image" id="reference-map-image">${referenceImage('','reference-picture')}</div>
      <div class="map-reference-caption"><p>Ubicaciones de referencia. Consulta la dirección en cada sucursal.</p><p class="map-reference-credits"><a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> · <a href="https://openmaptiles.org/" target="_blank" rel="noopener noreferrer">© OpenMapTiles</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a></p></div>
    </div>
    <aside class="locator-panel" aria-label="Encuentra tu tienda Lumen"><div class="locator-heading"><span class="locator-eyebrow">CERCA DE TU CREATIVIDAD</span><h1>Localiza tu tienda</h1><p>Encuentra tu Lumen en México.</p></div>
      <label class="locator-label" for="location-state">Estado</label><select id="location-state"><option value="">Todo México</option>${states.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('')}</select>
      <label class="sr-only" for="location-search">Buscar sucursal o dirección</label><input id="location-search" type="search" placeholder="Buscar sucursal o dirección" autocomplete="off">
      <div class="locator-summary"><p id="location-count" role="status" aria-live="polite"></p><button type="button" id="toggle-stores" aria-expanded="false" aria-controls="location-results">Ver lista</button></div>
      <div class="locator-results" id="location-results" role="list" aria-label="Sucursales encontradas"></div>
      <div class="locator-source"><a href="https://lumen.com.mx/sucursales/" target="_blank" rel="noopener noreferrer">Directorio oficial de Lumen</a></div>
    </aside>
  </section>`;
  const stateSelect=main.querySelector('#location-state');
  const search=main.querySelector('#location-search');
  const results=main.querySelector('#location-results');
  const count=main.querySelector('#location-count');
  const toggle=main.querySelector('#toggle-stores');
  const panel=main.querySelector('.locator-panel');
  const mapImage=main.querySelector('#reference-map-image');
  let currentMapState='';
  function updateMap() {
    currentMapState=stateSelect.value;
    main.querySelector('#map-region-title').textContent=currentMapState || 'México';
    mapImage.innerHTML=referenceImage(currentMapState,'reference-picture');
  }
  function updateList() {
    const term=normalize(search.value.trim());
    const visible=stores.filter(s=>(!stateSelect.value||s.state===stateSelect.value)&&normalize(`${s.name} ${s.address} ${s.state}`).includes(term));
    count.textContent=`${visible.length} ${visible.length===1?'sucursal':'sucursales'}${stateSelect.value?` en ${stateSelect.value}`:' en México'}`;
    results.innerHTML=visible.length?visible.map(s=>`<article class="store-result" role="listitem"><button class="store-select" data-store="${esc(s.id)}" aria-haspopup="dialog"><span class="store-pin" aria-hidden="true"></span><span><strong>${esc(s.name)}</strong><span>${esc(s.address)}</span><span class="store-region">${esc(s.state)}</span></span></button><a class="store-directions" href="${directions(s)}" target="_blank" rel="noopener noreferrer" aria-label="Cómo llegar a ${esc(s.name)}">Cómo llegar</a></article>`).join(''):'<p class="locator-empty">No encontramos sucursales con esa búsqueda. Prueba otro nombre o dirección.</p>';
  }
  stateSelect.addEventListener('change',()=>{search.value='';updateMap();updateList();});
  search.addEventListener('input',updateList);
  toggle.addEventListener('click',()=>{const expanded=panel.classList.toggle('is-list-open');toggle.setAttribute('aria-expanded',String(expanded));toggle.textContent=expanded?'Ocultar lista':'Ver lista';});
  main.querySelector('#enlarge-map').addEventListener('click',()=>{
    window.openDialog(`Mapa de referencia · ${currentMapState || 'México'}`,`<div class="reference-map-expanded">${referenceImage(currentMapState)}<p>Imagen de referencia con las sucursales señaladas en azul.</p></div>`,'map-reference-dialog');
  });
  results.addEventListener('click',event=>{
    const button=event.target.closest('[data-store]');
    const store=stores.find(s=>s.id===button?.dataset.store);
    if(!store)return;
    window.openDialog(store.name,`<div class="store-popup"><p>${esc(store.address)}</p><p>${esc(store.state)}</p>${store.hours?`<p>${esc(store.hours)}</p>`:''}<a href="${directions(store)}" target="_blank" rel="noopener noreferrer">Cómo llegar</a><a href="${esc(store.url)}" target="_blank" rel="noopener noreferrer">Información oficial de la sucursal</a></div>`);
  });
  updateList();
};
