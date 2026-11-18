import { useEffect, useMemo, useState } from 'react'
import './App.css'

const guitarImage =
  'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=900&q=85'
const blueGuitarImage =
  'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=900&q=85'
const stringsImage =
  'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=85'
const acousticImage =
  'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=900&q=85'

const products = [
  { id: 'les-paul', brand: 'Gibson', name: 'Les Paul Studio', category: 'Eléctrica', level: 'Profesional', price: 28900, image: guitarImage },
  { id: 'pacifica', brand: 'Yamaha', name: 'Pacifica 112V', category: 'Eléctrica', level: 'Intermedio', price: 6200, image: blueGuitarImage },
  { id: 'sg-special', brand: 'Epiphone', name: 'SG Special', category: 'Eléctrica', level: 'Principiante', price: 5450, image: acousticImage },
  { id: 'california', brand: 'Fender', name: 'California Standard', category: 'Acústica', level: 'Principiante', price: 7890, image: stringsImage },
  { id: 'stratocaster', brand: 'Fender', name: 'Player Stratocaster', category: 'Eléctrica', level: 'Intermedio / Pro', price: 15499, image: guitarImage },
  { id: 'grx70qa', brand: 'Ibanez', name: 'GRX70QA', category: 'Eléctrica', level: 'Principiante', price: 4890, image: blueGuitarImage },
  { id: 'strings', brand: "D'Addario", name: 'Juego de cuerdas .010', category: 'Accesorio', level: 'Acero niquelado · 6 piezas', price: 249, image: stringsImage, freeShipping: true },
]

const initialCart = [
  { ...products[4], quantity: 1, mode: 'Compra directa', unitPrice: products[4].price },
  { ...products[6], quantity: 2, mode: 'Compra directa', unitPrice: products[6].price },
]

const money = (amount, decimals = 0) =>
  `$${amount.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`

const routeForPath = (path) => {
  const name = path.split('/').pop()?.replace(/\.html$/, '') || 'index'
  return name === 'index' ? 'index' : name
}

function Brand({ admin = false, footer = false }) {
  return (
    <a className={`brand${admin ? ' admin-brand' : ''}${footer ? ' footer-brand' : ''}`} href={admin ? '/admin-dashboard.html' : '/index.html'}>
      <span className="brand-mark">GH</span>
      <span>Guitar<span className="brand-light">Hero</span>{admin && <small>ADMIN</small>}</span>
    </a>
  )
}

function Header({ route, cartCount, search, setSearch }) {
  const admin = route.startsWith('admin-')
  const checkout = route === 'pago'
  const confirmation = route === 'confirmacion'

  if (checkout || confirmation) {
    return (
      <header className="site-header checkout-header">
        <Brand />
        {checkout
          ? <div className="checkout-secure"><span aria-hidden="true">⌑</span> Pago protegido</div>
          : <a className="header-link" href="/cuenta.html"><span className="header-icon" aria-hidden="true">◉</span><span>Mi cuenta</span></a>}
      </header>
    )
  }

  if (admin) {
    const adminLinks = [
      ['admin-dashboard', 'Dashboard'],
      ['admin-inventario', 'Inventario'],
      ['admin-pedidos', 'Pedidos'],
      ['admin-apartados', 'Apartados'],
      ['admin-clientes', 'Clientes'],
    ]
    return (
      <header className="site-header admin-header">
        <Brand admin />
        <nav className="main-nav" aria-label="Administración">
          {adminLinks.map(([href, label]) => <a className={route === href ? 'active' : ''} href={`/${href}.html`} key={href}>{label}</a>)}
        </nav>
        <span className="header-link admin-user"><span className="avatar">AS</span><span>Admin Sys</span></span>
      </header>
    )
  }

  return (
    <header className="site-header">
      <Brand />
      <nav className="main-nav" aria-label="Navegación principal">
        <a className={route === 'index' ? 'active' : ''} href="/index.html">Inicio</a>
        <a className={route === 'catalogo' || route === 'producto' ? 'active' : ''} href="/catalogo.html">Guitarras</a>
        <a href="/mantenimiento.html">Bajos</a>
        <a href="/mantenimiento.html">Cuerdas</a>
        <a href="/mantenimiento.html">Accesorios</a>
      </nav>
      <div className="header-actions">
        {route !== 'carrito' && <label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Buscar productos" placeholder="Buscar productos" value={search} onChange={(event) => setSearch(event.target.value)} /></label>}
        <a className="header-link" href="/carrito.html"><span className="header-icon" aria-hidden="true">▱</span><span>Carrito <b className="count">{cartCount}</b></span></a>
        <a className="header-link" href="/cuenta.html"><span className="header-icon" aria-hidden="true">◉</span><span>Mi cuenta</span></a>
      </div>
    </header>
  )
}

function Footer({ admin = false }) {
  return (
    <footer className="site-footer">
      <Brand admin={admin} footer />
      <span>{admin ? 'Panel de administración · © 2026 Guitar Hero Inc.' : '© 2026 Guitar Hero Inc. Hecho para quienes hacen música.'}</span>
      <span>{admin ? 'v1.0.0' : 'Actualizado 11/11/2026 · v1.0.0'}</span>
    </footer>
  )
}

function ProductCard({ product, home = false }) {
  return (
    <article className="product-card">
      <a className="product-photo" href="/producto.html">
        <img src={product.image} alt={`${product.brand} ${product.name}`} />
        <span className={`product-tag${product.freeShipping ? ' tag-blue' : ''}`}>{product.freeShipping ? 'ENVÍO GRATIS' : 'APARTADO 20%'}</span>
      </a>
      <div className="product-info">
        <p className="product-category">{product.brand} · {product.category}</p>
        <h3><a href="/producto.html">{product.name}</a></h3>
        <p className="product-meta">{product.level}</p>
        <div className="product-bottom">
          <span className="price">{money(product.price)} <small>MXN</small></span>
          {home
            ? <a className="icon-action" href="/producto.html" aria-label={`Ver ${product.name}`}>↗</a>
            : <a className="button button-dark" href="/producto.html">Ver detalle</a>}
        </div>
      </div>
    </article>
  )
}

function HomePage() {
  const featured = [products[4], products[5], products[6]]
  return (
    <main>
      <section className="hero">
        <img className="hero-image" src="https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=2200&q=85" alt="Guitarra eléctrica en primer plano" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow eyebrow-light">Temporada de amplificadores al once</p>
          <h1>Tu próximo<br />sonido empieza aquí.</h1>
          <p className="hero-copy">Instrumentos para encontrar tu tono. Envíos a todo México y apartado con 20% de anticipo.</p>
          <a className="button button-coral" href="/catalogo.html">Explorar guitarras <span aria-hidden="true">↗</span></a>
        </div>
        <span className="hero-note">Toca fuerte. Llega lejos.</span>
      </section>
      <section className="section-wrap home-categories">
        <div className="section-heading"><div><p className="eyebrow">Encuentra tu instrumento</p><h2>¿Qué quieres tocar?</h2></div><a className="text-link" href="/catalogo.html">Ver todo el catálogo <span aria-hidden="true">→</span></a></div>
        <div className="category-grid">
          {[
            ['01', '🎸', 'Eléctricas'], ['02', '🪕', 'Acústicas'], ['03', '🎸', 'Bajos'], ['04', '♫', 'Cuerdas y más'],
          ].map(([number, emoji, label]) => <a className="category-tile" href="/catalogo.html" key={number}><span className="category-number">{number}</span><span className="category-emoji" aria-hidden="true">{emoji}</span><span className="category-name">{label}</span><span className="category-arrow" aria-hidden="true">↗</span></a>)}
        </div>
      </section>
      <section className="section-wrap featured-section">
        <div className="section-heading"><div><p className="eyebrow">Selección Guitar Hero</p><h2>Favoritas de la banda</h2></div><a className="text-link" href="/catalogo.html">Ver catálogo completo <span aria-hidden="true">→</span></a></div>
        <div className="product-grid product-grid-home">{featured.map((product) => <ProductCard home key={product.id} product={product} />)}</div>
      </section>
      <section className="home-promo"><div><p className="eyebrow eyebrow-light">Tu instrumento, a tu ritmo</p><h2>Hoy apartas.<br />Pronto haces historia.</h2></div><p>Elige tu guitarra favorita y llévatela con solo el 20% de anticipo.</p><a className="button button-outline" href="/catalogo.html">Conoce el catálogo <span aria-hidden="true">→</span></a></section>
    </main>
  )
}

function CatalogPage({ search }) {
  const [categories, setCategories] = useState(['Eléctrica', 'Acústica', 'Accesorio'])
  const [sort, setSort] = useState('popular')
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('es-MX')
    return products
      .filter((product) => categories.includes(product.category))
      .filter((product) => `${product.brand} ${product.name} ${product.category}`.toLocaleLowerCase('es-MX').includes(query))
      .sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0)
  }, [categories, search, sort])
  const toggleCategory = (category) => setCategories((selected) => selected.includes(category) ? selected.filter((item) => item !== category) : [...selected, category])

  return (
    <main className="page-shell">
      <div className="page-title-row"><div><p className="eyebrow">Elige tu sonido</p><h1>Guitarras</h1></div><p className="title-aside">{visibleProducts.length} instrumentos <span className="dot-separator">·</span> Envío gratis desde $1,500</p></div>
      <div className="catalog-layout">
        <aside className="filter-panel">
          <div className="filter-title"><h2>Filtrar por</h2><span aria-hidden="true">☷</span></div>
          <fieldset><legend>Categoría</legend>
            {['Eléctrica', 'Acústica', 'Accesorio'].map((category) => <label className="check-row" key={category}><input type="checkbox" checked={categories.includes(category)} onChange={() => toggleCategory(category)} /> {category === 'Accesorio' ? 'Cuerdas y accesorios' : `${category}${category === 'Eléctrica' ? 's' : 's'}`}</label>)}
          </fieldset>
          <fieldset><legend>Nivel</legend><a className="check-row maintenance-filter" href="/mantenimiento.html">□ Principiante</a><a className="check-row maintenance-filter" href="/mantenimiento.html">□ Intermedio</a><a className="check-row maintenance-filter" href="/mantenimiento.html">□ Profesional</a></fieldset>
          <fieldset><legend>Opción de pago</legend><a className="check-row maintenance-filter" href="/mantenimiento.html">□ Apartado disponible</a></fieldset>
          <div className="filter-note"><span aria-hidden="true">✳</span> Hasta 6 meses para liquidar tu apartado.</div>
        </aside>
        <section className="catalog-results">
          <div className="results-toolbar"><span>Mostrando <strong>{visibleProducts.length}</strong> resultados</span><label>Ordenar por <select aria-label="Ordenar productos" value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Más populares</option><option value="low">Precio menor</option><option value="high">Precio mayor</option></select></label></div>
          <div className="product-grid catalog-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          {visibleProducts.length === 0 && <p role="status">No encontramos productos con esos filtros.</p>}
          <nav className="pagination" aria-label="Paginación"><span className="page-current">01</span><a href="/mantenimiento.html">02</a><a href="/mantenimiento.html">03</a><a href="/mantenimiento.html" aria-label="Página siguiente">→</a></nav>
        </section>
      </div>
    </main>
  )
}

function ProductPage({ addToCart }) {
  const [purchaseMode, setPurchaseMode] = useState('full')
  const product = products[4]
  const deposit = Math.round(product.price * 0.2 * 100) / 100
  const handleAdd = (mode = purchaseMode) => addToCart({
    ...product,
    quantity: 1,
    mode: mode === 'reserve' ? 'Apartado 20%' : 'Compra directa',
    unitPrice: mode === 'reserve' ? deposit : product.price,
  })

  return (
    <main className="page-shell">
      <div className="breadcrumb"><a href="/catalogo.html">← Volver a guitarras</a><span>/</span><span>Player Stratocaster</span></div>
      <section className="product-detail">
        <div className="detail-gallery"><div className="detail-image"><img src={guitarImage.replace('w=900&q=85', 'w=1400&q=90')} alt="Fender Player Stratocaster color rojo" /></div><div className="thumbnail-row">{[guitarImage, blueGuitarImage, acousticImage].map((image, index) => <div className={`thumbnail${index === 0 ? ' selected' : ''}`} key={image}><img src={image} alt={`Vista ${index + 1} de la guitarra`} /></div>)}</div></div>
        <div className="detail-info">
          <p className="eyebrow">Fender · Serie Player</p><h1>Player Stratocaster</h1><p className="detail-sku">SKU FEND-STRAT-2026 <span className="dot-separator">·</span> En existencia</p><div className="detail-price">{money(product.price)} <small>MXN</small></div>
          <p className="detail-description">El sonido icónico de Fender, listo para acompañar cada escenario. Un instrumento versátil, cómodo y hecho para durar.</p>
          <div className="purchase-box"><h2>Elige cómo llevarla</h2>
            <label className="purchase-option"><input type="radio" name="purchase" checked={purchaseMode === 'full'} onChange={() => setPurchaseMode('full')} /><span><strong>Compra directa</strong><small>Pago completo hoy</small></span><b>{money(product.price)}</b></label>
            <label className="purchase-option"><input type="radio" name="purchase" checked={purchaseMode === 'reserve'} onChange={() => setPurchaseMode('reserve')} /><span><strong>Apartado 20%</strong><small>Liquida el saldo en tienda</small></span><b>{money(deposit, 2)}</b></label>
            <p className="installment-note">Anticipo inicial. Saldo pendiente: {money(product.price - deposit, 2)} MXN.</p>
          </div>
          <div className="detail-actions"><button className="button button-coral button-wide" type="button" onClick={() => handleAdd()}>Añadir al carrito <span aria-hidden="true">↗</span></button><button className="button button-outline-dark button-wide" type="button" onClick={() => handleAdd('reserve')}>Apartar ahora</button></div>
          <div className="specifications"><h2>Especificaciones</h2><dl><div><dt>Cuerpo</dt><dd>Aliso con acabado brillante</dd></div><div><dt>Mástil</dt><dd>Arce, perfil moderno en C</dd></div><div><dt>Pastillas</dt><dd>3 Player Series Alnico 5 Strat</dd></div><div><dt>Incluye</dt><dd>Garantía de fábrica · 2 años</dd></div></dl></div>
        </div>
      </section>
      <section className="detail-footnote"><span aria-hidden="true">✳</span> Envío asegurado a todo México. Compra protegida en cada paso.</section>
    </main>
  )
}

function OrderSummary({ cart, total, checkout = false }) {
  return (
    <aside className={`order-summary${checkout ? ' checkout-summary' : ''}`}>
      <p className="eyebrow">{checkout ? 'Revisa antes de pagar' : 'Resumen'}</p><h2>Tu pedido</h2>
      {checkout && cart.map((item) => <div className="mini-order" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>{item.mode} · {item.quantity} pieza{item.quantity === 1 ? '' : 's'}</small></div><b>{money(item.unitPrice * item.quantity)}</b></div>)}
      {!checkout && <><div className="summary-line"><span>Subtotal</span><strong>{money(total, 2)}</strong></div><div className="summary-line"><span>Envío</span><strong className="free-shipping">Gratis</strong></div></>}
      {checkout && <div className="summary-line"><span>Envío</span><strong className="free-shipping">Gratis</strong></div>}
      <div className="summary-total"><span>{checkout ? 'Total a pagar' : 'Total'}</span><strong>{money(total, 2)} <small>MXN</small></strong></div>
      {checkout
        ? <a className="button button-coral button-wide" href="/mantenimiento.html"><span aria-hidden="true">⌑</span> Pagar {money(total)} MXN</a>
        : <a className="button button-coral button-wide" href="/pago.html">Continuar al pago <span aria-hidden="true">→</span></a>}
      <p className="secure-note">{checkout ? 'Tus datos de pago están protegidos.' : '⌑ Compra protegida · Pago seguro'}</p>
    </aside>
  )
}

function CartPage({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const updateQuantity = (id, quantity) => setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, Number(quantity) || 1) } : item))
  return (
    <main className="page-shell">
      <div className="page-title-row"><div><p className="eyebrow">Ya casi es tuyo</p><h1>Tu carrito</h1></div><a className="text-link" href="/catalogo.html">← Seguir comprando</a></div>
      <div className="cart-layout"><section className="cart-items"><div className="cart-table-head"><span>Producto</span><span>Modalidad</span><span>Precio</span><span>Cant.</span><span /></div>
        {cart.length === 0 ? <p>Tu carrito está vacío. <a className="text-link" href="/catalogo.html">Explora el catálogo.</a></p> : cart.map((item) => <article className="cart-row" key={item.id}>
          <div className="cart-product"><img src={item.image} alt={item.name} /><div><h2>{item.brand} {item.name}</h2><p>{item.brand} · {item.category}</p></div></div><span className="mode-label">{item.mode}</span><strong>{money(item.unitPrice * item.quantity, 2)}</strong><input className="quantity" type="number" min="1" aria-label={`Cantidad de ${item.name}`} value={item.quantity} onChange={(event) => updateQuantity(item.id, event.target.value)} /><button className="remove-link" type="button" aria-label={`Quitar ${item.name}`} onClick={() => setCart((items) => items.filter((product) => product.id !== item.id))}>×</button>
        </article>)}
        {cart.length > 0 && <div className="cart-footnote"><span aria-hidden="true">✳</span> Tu pedido tiene envío gratis a Aguascalientes.</div>}
      </section>{cart.length > 0 && <OrderSummary cart={cart} total={total} />}</div>
    </main>
  )
}

function CheckoutPage({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  return (
    <main className="page-shell checkout-shell">
      <div className="checkout-intro"><a className="text-link" href="/carrito.html">← Regresar al carrito</a><div><p className="eyebrow">Último paso</p><h1>Completa tu compra</h1></div><div className="checkout-steps"><span className="step-done">01 <small>Carrito</small></span><i /><span className="step-active">02 <small>Pago</small></span><i /><span>03 <small>Confirmación</small></span></div></div>
      <div className="checkout-layout"><form className="checkout-form" onSubmit={(event) => event.preventDefault()}>
        <section className="form-section"><div className="form-section-title"><span>01</span><div><h2>Dirección de entrega</h2><p>¿A dónde enviamos tu pedido?</p></div></div><div className="form-grid"><label className="field field-full">Calle y número<input value="Av. Universidad 123" readOnly /></label><label className="field">Colonia<input value="Bosques" readOnly /></label><label className="field">Código postal<input value="20100" readOnly /></label><label className="field">Ciudad<input value="Aguascalientes" readOnly /></label><label className="field">Estado<input value="Aguascalientes" readOnly /></label></div></section>
        <section className="form-section"><div className="form-section-title"><span>02</span><div><h2>Método de pago</h2><p>Selecciona una forma de pago segura.</p></div></div><label className="payment-choice selected"><input type="radio" name="method" defaultChecked /><span className="payment-choice-copy"><strong>Tarjeta de crédito o débito</strong><small>Visa · Mastercard · American Express</small></span><span className="payment-brands">VISA　MC</span></label><div className="form-grid card-fields"><label className="field field-full">Número de tarjeta<input placeholder="••••  ••••  ••••  4242" readOnly /></label><label className="field">Vencimiento<input placeholder="MM / AA" readOnly /></label><label className="field">Código de seguridad<input placeholder="•••" readOnly /></label></div><label className="payment-choice"><input type="radio" name="method" /><span className="payment-choice-copy"><strong>PayPal</strong><small>Continúa en una plataforma segura.</small></span><span className="paypal-word">PayPal</span></label></section>
      </form><OrderSummary cart={cart} total={total} checkout /></div>
    </main>
  )
}

function ConfirmationPage() {
  return (
    <main className="confirmation-main"><div className="confirmation-card"><div className="success-mark" aria-hidden="true">✓</div><p className="eyebrow">Todo listo</p><h1>La música ya empezó.</h1><p className="confirmation-lead">Tu compra fue procesada correctamente. Estamos preparando tu pedido.</p><div className="receipt-number"><span>Folio de compra</span><strong>GH-2026-98421</strong></div><div className="receipt-details"><div><span>Estado del pago</span><strong><i className="status-dot" /> Aprobado</strong></div><div><span>Método</span><strong>Tarjeta terminación 4242</strong></div><div><span>Entrega estimada</span><strong>En 3 a 5 días hábiles</strong></div><div><span>Dirección</span><strong>Av. Universidad 123, Aguascalientes</strong></div></div><p className="confirmation-email">Enviamos los detalles de tu pedido y el seguimiento a tu correo.</p><div className="confirmation-actions"><a className="button button-coral" href="/cuenta-pedidos.html">Ver mis pedidos <span aria-hidden="true">→</span></a><a className="text-link" href="/index.html">Volver a la tienda</a></div></div></main>
  )
}

function AccountTabs({ active }) {
  return <nav className="account-tabs" aria-label="Secciones de mi cuenta"><a className={active === 'account' ? 'tab-active' : ''} href="/cuenta.html">Mis apartados <span>1</span></a><a className={active === 'orders' ? 'tab-active' : ''} href="/cuenta-pedidos.html">Historial de compras</a><a className={active === 'addresses' ? 'tab-active' : ''} href="/cuenta-direcciones.html">Mis direcciones</a></nav>
}

function AccountShell({ active, children }) {
  return <main className="page-shell account-shell"><div className="page-title-row"><div><p className="eyebrow">Qué gusto verte</p><h1>Hola, Juan.</h1></div><a className="text-link" href="/index.html">← Volver a la tienda</a></div><AccountTabs active={active} />{children}</main>
}

function AccountPage() {
  return <AccountShell active="account"><section className="account-overview"><div className="account-intro"><div><p className="eyebrow">Tu instrumento te espera</p><h2>Apartados activos</h2></div><p>Liquida el saldo pendiente antes de la fecha límite para recoger tu guitarra.</p></div><article className="reservation-card"><div className="reservation-product"><img src={guitarImage} alt="Gibson Les Paul Studio" /><div><span className="reservation-id">APARTADO APT-402</span><h3>Gibson Les Paul Studio</h3><p>Eléctrica · Cherry Sunburst</p></div></div><div className="reservation-progress"><div className="progress-copy"><span>Anticipo cubierto</span><strong>20%</strong></div><div className="progress-track"><span /></div><div className="progress-amounts"><span>$5,780.00 pagados</span><span>$23,120.00 restantes</span></div></div><div className="reservation-deadline"><span>Fecha límite</span><strong>15 nov 2026</strong><a className="button button-coral" href="/pago.html">Liquidar saldo <span aria-hidden="true">→</span></a></div></article><div className="account-note"><span aria-hidden="true">✳</span><span>¿Necesitas más tiempo? <a href="/contacto.html">Contáctanos</a> y buscamos una opción contigo.</span></div></section></AccountShell>
}

function AccountOrdersPage() {
  return <AccountShell active="orders"><section className="account-overview"><div className="account-intro"><div><p className="eyebrow">Tus compras</p><h2>Historial de pedidos</h2></div><p>Consulta el estado de tus compras recientes.</p></div><div className="table-scroll"><table className="data-table"><thead><tr><th>Pedido</th><th>Fecha</th><th>Productos</th><th>Total</th><th>Estado</th></tr></thead><tbody><tr><td className="sku">GH-2026-98421</td><td>11 nov 2026</td><td>Fender Player Stratocaster, cuerdas D'Addario × 2</td><td className="table-price">$15,997.00</td><td><span className="status-pill status-pending">En preparación</span></td></tr><tr><td className="sku">GH-2026-95107</td><td>18 oct 2026</td><td>Cable de instrumento 3 m</td><td className="table-price">$490.00</td><td><span className="status-pill status-success">Entregado</span></td></tr><tr><td className="sku">GH-2026-91044</td><td>02 sep 2026</td><td>Soporte para guitarra</td><td className="table-price">$890.00</td><td><span className="status-pill status-success">Entregado</span></td></tr></tbody></table></div></section></AccountShell>
}

function AccountAddressesPage() {
  return <AccountShell active="addresses"><section className="account-overview"><div className="account-intro"><div><p className="eyebrow">Entrega</p><h2>Mis direcciones</h2></div><p>Administra las direcciones guardadas para tus pedidos.</p></div><article className="admin-panel address-card"><div><span className="status-pill status-success">Predeterminada</span><h3>Casa · Juan Pérez</h3><p>Av. Universidad 123<br />Colonia Bosques, C.P. 20100<br />Aguascalientes, Aguascalientes</p><p>Tel. 449 123 4567</p></div><a className="text-link" href="/contacto.html">Solicitar cambio de dirección →</a></article></section></AccountShell>
}

function ContactPage() {
  return <main className="page-shell contact-shell"><div className="page-title-row"><div><p className="eyebrow">Estamos para ayudarte</p><h1>Hablemos de música.</h1></div><a className="text-link" href="/cuenta.html">← Volver a mi cuenta</a></div><div className="contact-grid"><section className="admin-panel"><p className="eyebrow">Atención a clientes</p><h2>¿Necesitas ayuda con tu apartado?</h2><p>Escríbenos o llámanos y te ayudamos con tu compra, entrega o saldo pendiente.</p><p><strong>Correo</strong><br /><a className="text-link" href="mailto:hola@guitarhero.mx">hola@guitarhero.mx</a></p><p><strong>Teléfono</strong><br /><a className="text-link" href="tel:+524491234567">449 123 4567</a></p><p className="contact-hours">Lunes a viernes · 9:00 a 18:00 h (hora centro)</p><a className="button button-coral" href="mailto:hola@guitarhero.mx?subject=Ayuda%20con%20mi%20apartado">Enviar correo <span aria-hidden="true">↗</span></a></section></div></main>
}

function MaintenancePage() {
  return (
    <main className="maintenance-page">
      <section className="maintenance-card">
        <p className="eyebrow">Guitar Hero</p>
        <h1>EN MANTENIMIENTO</h1>
        <p>Estamos trabajando para habilitar esta opción. Inténtalo de nuevo más tarde.</p>
        <a className="button button-coral" href="/index.html">Volver a la tienda</a>
      </section>
    </main>
  )
}

function AdminDashboardPage() {
  const bars = [['Lun', 38], ['Mar', 63], ['Mié', 48], ['Jue', 82], ['Vie', 58], ['Sáb', 94], ['Dom', 71]]
  return <main className="page-shell admin-shell"><div className="page-title-row"><div><p className="eyebrow">Martes, 11 de noviembre de 2026</p><h1>Resumen del negocio</h1></div><span className="live-label"><i className="status-dot" /> Vista general</span></div><section className="metric-grid"><article className="metric-card metric-red"><span>Ventas del mes</span><strong>$142,500 <small>MXN</small></strong><p>↑ 12.8% respecto al mes pasado</p></article><article className="metric-card metric-blue"><span>Pedidos procesados</span><strong>48 <small>pedidos</small></strong><p>6 pedidos requieren atención</p></article><article className="metric-card metric-green"><span>Apartados activos</span><strong>12 <small>registros</small></strong><p>$86,400 MXN en anticipos</p></article><article className="metric-card metric-amber"><span>Stock crítico</span><strong>3 <small>productos</small></strong><p>Revisar niveles de inventario</p></article></section><div className="admin-dashboard-grid"><section className="admin-panel sales-panel"><div className="panel-heading"><div><p className="eyebrow">Rendimiento</p><h2>Ventas recientes</h2></div><a className="select-like select-like-link" href="/mantenimiento.html">Últimos 7 días⌄</a></div><div className="chart-area" aria-label="Gráfico ilustrativo de ventas de los últimos siete días"><div className="chart-y-labels"><span>$40k</span><span>$30k</span><span>$20k</span><span>$10k</span><span>$0</span></div><div className="chart-bars">{bars.map(([day, height]) => <div className="chart-bar" style={{ '--bar-height': `${height}%` }} key={day}><span /><small>{day}</small></div>)}</div></div><div className="chart-caption"><span><i className="legend-dot" /> Ventas netas</span><strong>$68,240 MXN</strong></div></section><section className="admin-panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">Actividad</p><h2>Últimas transacciones</h2></div><a className="text-link" href="/admin-pedidos.html">Ver todas →</a></div>{[['Carlos Mendoza', 'Fender Player Stratocaster · Stripe', '$15,499', 'Aprobado', ''], ['Ana María Silva', 'Pedido de cuerdas · PayPal', '$2,400', 'Aprobado', 'activity-blue'], ['Juan Pérez', 'Gibson Les Paul · Apartado', '$5,780', 'Pendiente', 'activity-amber']].map(([name, description, amount, status, color]) => <div className="activity-row" key={name}><span className={`activity-icon ${color}`}>↗</span><div><strong>{name}</strong><small>{description}</small></div><b>{amount}</b><span className={`status-pill ${status === 'Aprobado' ? 'status-success' : 'status-pending'}`}>{status}</span></div>)}</section></div></main>
}

const inventory = [
  ['FEND-STRAT-2026', 'Fender Player Stratocaster', 'Guitarras / Eléctrica', 15499, 8, 'Sí', 'Activo', guitarImage],
  ['GIB-LP-STUDIO', 'Gibson Les Paul Studio', 'Guitarras / Eléctrica', 28900, 2, 'Sí', 'Stock bajo', blueGuitarImage],
  ['DAD-CUERDAS-010', "Juego cuerdas D'Addario", 'Accesorios / Cuerdas', 249, 45, 'No', 'Activo', stringsImage],
]

function AdminInventoryPage() {
  const [query, setQuery] = useState('')
  const rows = inventory.filter((row) => row.slice(0, 3).join(' ').toLocaleLowerCase('es-MX').includes(query.toLocaleLowerCase('es-MX')))
  return <main className="page-shell admin-shell"><div className="page-title-row"><div><p className="eyebrow">Administración / Catálogo</p><h1>Inventario y productos</h1></div><a className="button button-dark" href="/admin-producto.html"><span aria-hidden="true">＋</span> Nuevo producto</a></div><div className="inventory-toolbar"><label className="search-box inventory-search"><span aria-hidden="true">⌕</span><input placeholder="Buscar por SKU o nombre" aria-label="Buscar productos" value={query} onChange={(event) => setQuery(event.target.value)} /></label><span>{rows.length} productos <span className="dot-separator">·</span> Sincronización local</span></div><div className="table-scroll"><table className="data-table inventory-table"><thead><tr><th>SKU</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Apartable</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{rows.map(([sku, name, category, price, stock, reservable, status, image]) => <tr key={sku}><td className="sku">{sku}</td><td><div className="table-product"><img src={image} alt="" /><strong>{name}</strong></div></td><td>{category}</td><td className="table-price">{money(price, 2)}</td><td><strong>{stock}</strong> unid.</td><td><span className={`status-pill ${reservable === 'Sí' ? 'status-success' : 'status-muted'}`}>{reservable}</span></td><td><span className={`stock-state${status === 'Stock bajo' ? ' stock-low' : ''}`}><i className="status-dot" /> {status}</span></td><td><a className="table-action" href="/admin-producto-editar.html">Editar</a><span className="dot-separator"> · </span><a className="table-action" href="/admin-producto-editar.html">Ver</a></td></tr>)}</tbody></table></div><div className="table-bottom"><span>Mostrando {rows.length} de {inventory.length} productos</span><div className="pagination"><span className="page-current">1</span><a href="/mantenimiento.html" aria-label="Página siguiente">→</a></div></div></main>
}

function AdminTablePage({ type }) {
  const config = {
    'admin-pedidos': {
      eyebrow: 'Administración / Ventas', title: 'Pedidos', summary: '48 pedidos este mes',
      headers: ['Folio', 'Cliente', 'Productos', 'Fecha', 'Total', 'Pago', 'Estado'],
      rows: [
        ['GH-2026-98421', 'Carlos Mendoza', 'Fender Player Stratocaster', '11 nov 2026', '$15,499.00', 'Tarjeta', 'Procesado'],
        ['GH-2026-98420', 'Ana María Silva', "Juego de cuerdas D'Addario × 2", '11 nov 2026', '$2,400.00', 'PayPal', 'Por preparar'],
        ['GH-2026-98419', 'Juan Pérez', 'Gibson Les Paul Studio · Apartado', '10 nov 2026', '$5,780.00', 'Tarjeta', 'Pendiente'],
      ],
    },
    'admin-clientes': {
      eyebrow: 'Administración / Relaciones', title: 'Clientes', summary: 'Clientes de la tienda',
      headers: ['Cliente', 'Correo electrónico', 'Pedidos', 'Apartados activos', 'Total comprado', 'Registro'],
      rows: [
        ['Juan Pérez', 'juan.perez@email.com', '3', '1', '$21,279.00', '05 ago 2026'],
        ['María Gómez', 'maria.g@email.com', '5', '0', '$32,490.00', '22 jun 2026'],
        ['Diego Ramos', 'diego.r@email.com', '2', '1', '$8,440.00', '14 sep 2026'],
        ['Ana María Silva', 'ana.s@email.com', '8', '0', '$46,120.00', '03 feb 2026'],
      ],
    },
  }[type]
  const [query, setQuery] = useState('')
  const rows = config.rows.filter((row) => row.join(' ').toLocaleLowerCase('es-MX').includes(query.toLocaleLowerCase('es-MX')))
  return <main className="page-shell admin-shell"><div className="page-title-row"><div><p className="eyebrow">{config.eyebrow}</p><h1>{config.title}</h1></div>{type === 'admin-pedidos' ? <span className="live-label"><i className="status-dot" /> 6 requieren atención</span> : <span className="live-label">128 clientes registrados</span>}</div><div className="inventory-toolbar"><label className="search-box inventory-search"><span aria-hidden="true">⌕</span><input placeholder={type === 'admin-clientes' ? 'Buscar nombre o correo' : 'Buscar folio, cliente o producto'} aria-label={`Buscar ${config.title.toLocaleLowerCase('es-MX')}`} value={query} onChange={(event) => setQuery(event.target.value)} /></label>{type === 'admin-pedidos' && <a className="select-like select-like-link" href="/mantenimiento.html">Todos los estados　⌄</a>}<span>{config.summary}</span></div><div className="table-scroll"><table className="data-table"><thead><tr>{config.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td className={index === 0 && type === 'admin-pedidos' ? 'sku' : index === 4 && type === 'admin-clientes' ? 'table-price' : ''} key={`${row[0]}-${index}`}>{index === row.length - 1 && type === 'admin-pedidos' ? <span className={`status-pill ${cell === 'Procesado' ? 'status-success' : 'status-pending'}`}>{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div><div className="table-bottom"><span>Mostrando {rows.length} de {type === 'admin-clientes' ? 128 : 48} {config.title.toLocaleLowerCase('es-MX')}</span><nav className="pagination" aria-label="Paginación"><span className="page-current">1</span><a href="/mantenimiento.html">2</a><a href="/mantenimiento.html" aria-label="Página siguiente">→</a></nav></div></main>
}

function AdminReservationsPage() {
  const [query, setQuery] = useState('')
  const rows = [
    ['APT-402', 'Juan Pérez', 'Gibson Les Paul Studio', '$5,780.00', '$23,120.00', '15 nov 2026', 'Vigente', blueGuitarImage],
    ['APT-398', 'María Gómez', 'Fender Player Stratocaster', '$3,099.80', '$12,399.20', '02 nov 2026', 'Liquidado', guitarImage],
    ['APT-391', 'Diego Ramos', 'Yamaha Pacifica 112V', '$1,240.00', '$4,960.00', '18 nov 2026', 'Vigente', acousticImage],
  ]
  const filteredRows = rows.filter((row) => row.slice(0, 3).join(' ').toLocaleLowerCase('es-MX').includes(query.toLocaleLowerCase('es-MX')))
  return <main className="page-shell admin-shell"><div className="page-title-row"><div><p className="eyebrow">Administración / Clientes</p><h1>Control de apartados</h1></div><span className="live-label"><i className="status-dot" /> 12 apartados activos</span></div><section className="reservation-metrics"><article><span>Anticipos recibidos</span><strong>$86,400 <small>MXN</small></strong></article><article><span>Saldos por liquidar</span><strong>$216,000 <small>MXN</small></strong></article><article><span>Próximos a vencer</span><strong>3 <small>en 7 días</small></strong></article></section><div className="inventory-toolbar"><label className="search-box inventory-search"><span aria-hidden="true">⌕</span><input placeholder="Buscar folio, cliente o producto" aria-label="Buscar apartados" value={query} onChange={(event) => setQuery(event.target.value)} /></label><a className="select-like select-like-link" href="/mantenimiento.html">Todos los estados　⌄</a><span>Actualizado hoy</span></div><div className="table-scroll"><table className="data-table reservations-table"><thead><tr>{['Folio', 'Cliente', 'Producto reservado', 'Anticipo 20%', 'Saldo restante', 'Fecha límite', 'Estado'].map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{filteredRows.map(([id, customer, product, deposit, balance, date, status, image]) => <tr key={id}><td className="sku">{id}</td><td><strong>{customer}</strong><small className="cell-sub">{customer.toLocaleLowerCase('es-MX').replace(' ', '.')}@email.com</small></td><td><div className="table-product"><img src={image} alt="" /><strong>{product}</strong></div></td><td>{deposit}</td><td className="table-price">{balance}</td><td>{date}</td><td><span className={`status-pill ${status === 'Vigente' ? 'status-pending' : 'status-success'}`}>{status}</span></td></tr>)}</tbody></table></div><div className="table-bottom"><span>Mostrando {filteredRows.length} de 12 apartados</span><div className="pagination"><span className="page-current">1</span><a href="/mantenimiento.html">2</a><a href="/mantenimiento.html">3</a></div></div></main>
}

function AdminProductPage({ edit = false }) {
  return <main className="page-shell admin-shell"><div className="page-title-row"><div><p className="eyebrow">Administración / Inventario{edit ? ' / FEND-STRAT-2026' : ''}</p><h1>{edit ? 'Editar producto' : 'Nuevo producto'}</h1></div><a className="text-link" href="/admin-inventario.html">← Volver al inventario</a></div><form className="admin-form"><section className="admin-panel form-section"><div className="form-section-title"><span>01</span><div><h2>Información del producto</h2><p>{edit ? 'Actualiza los datos visibles del instrumento.' : 'Completa los datos que verá el cliente en la tienda.'}</p></div></div><div className="form-grid"><label className="field">Nombre del producto<input defaultValue={edit ? 'Fender Player Stratocaster' : ''} placeholder="Ej. Player Stratocaster" required /></label><label className="field">SKU<input defaultValue={edit ? 'FEND-STRAT-2026' : ''} placeholder="Ej. FEND-STRAT-2026" required /></label><label className="field">Marca<input defaultValue={edit ? 'Fender' : ''} placeholder="Marca" required /></label><label className="field">Categoría<select defaultValue={edit ? 'Guitarras / Eléctrica' : ''} required><option value="">Selecciona una categoría</option><option>Guitarras / Eléctrica</option><option>Guitarras / Acústica</option><option>Bajos</option><option>Accesorios / Cuerdas</option></select></label><label className="field">Precio (MXN)<input type="number" min="0" step="0.01" defaultValue={edit ? '15499' : ''} placeholder="0.00" required /></label><label className="field">Existencias<input type="number" min="0" step="1" defaultValue={edit ? '8' : ''} placeholder="0" required /></label><label className="field field-full">Descripción<textarea rows="4" defaultValue={edit ? 'El sonido icónico de Fender, listo para acompañar cada escenario. Un instrumento versátil, cómodo y hecho para durar.' : ''} placeholder="Describe el producto" /></label><label className="field field-full">URL de imagen<input type="url" defaultValue={edit ? guitarImage.split('?')[0] : ''} placeholder="https://" /></label></div></section><section className="admin-panel form-section"><div className="form-section-title"><span>02</span><div><h2>Opciones de venta</h2><p>Define cómo estará disponible el producto.</p></div></div><label className="check-row"><input type="checkbox" defaultChecked={edit} /> Permitir apartado con 20% de anticipo</label><label className="check-row"><input type="checkbox" defaultChecked /> Publicar producto en la tienda</label></section><div className="form-actions"><a className="button button-outline-dark" href="/admin-inventario.html">Cancelar</a><a className="button button-dark" href="/mantenimiento.html">{edit ? 'Guardar cambios' : 'Guardar producto'}</a></div></form></main>
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState(initialCart)
  const route = routeForPath(path)
  const cartCount = cart.length
  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id && item.mode === product.mode)
      return existing
        ? items.map((item) => item.id === product.id && item.mode === product.mode ? { ...item, quantity: item.quantity + product.quantity } : item)
        : [...items, product]
    })
    window.history.pushState({}, '', '/carrito.html')
    setPath('/carrito.html')
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const onClick = (event) => {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || !url.pathname.endsWith('.html')) return
      event.preventDefault()
      window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
      setPath(url.pathname)
      window.scrollTo(0, 0)
    }
    const onPopState = () => setPath(window.location.pathname)
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPopState)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  useEffect(() => {
    const titles = {
      index: 'Guitar Hero | Instrumentos para hacer ruido',
      catalogo: 'Guitarras | Guitar Hero',
      producto: 'Player Stratocaster | Guitar Hero',
      carrito: 'Carrito | Guitar Hero',
      pago: 'Pago seguro | Guitar Hero',
      confirmacion: 'Compra confirmada | Guitar Hero',
      contacto: 'Contacto | Guitar Hero',
      cuenta: 'Mi cuenta | Guitar Hero',
      'cuenta-pedidos': 'Historial de compras | Guitar Hero',
      'cuenta-direcciones': 'Mis direcciones | Guitar Hero',
      mantenimiento: 'En mantenimiento | Guitar Hero',
    }
    document.title = titles[route] || `${route.replace('admin-', '').replaceAll('-', ' ')} | Guitar Hero Admin`
    document.documentElement.lang = 'es-MX'
  }, [route])

  let page
  switch (route) {
    case 'catalogo': page = <CatalogPage search={search} />; break
    case 'producto': page = <ProductPage addToCart={addToCart} />; break
    case 'carrito': page = <CartPage cart={cart} setCart={setCart} />; break
    case 'pago': page = <CheckoutPage cart={cart} />; break
    case 'confirmacion': page = <ConfirmationPage />; break
    case 'cuenta': page = <AccountPage />; break
    case 'cuenta-pedidos': page = <AccountOrdersPage />; break
    case 'cuenta-direcciones': page = <AccountAddressesPage />; break
    case 'contacto': page = <ContactPage />; break
    case 'mantenimiento': page = <MaintenancePage />; break
    case 'admin-dashboard': page = <AdminDashboardPage />; break
    case 'admin-inventario': page = <AdminInventoryPage />; break
    case 'admin-pedidos':
    case 'admin-clientes': page = <AdminTablePage type={route} />; break
    case 'admin-apartados': page = <AdminReservationsPage />; break
    case 'admin-producto': page = <AdminProductPage />; break
    case 'admin-producto-editar': page = <AdminProductPage edit />; break
    default: page = <HomePage />
  }

  return <><Header route={route} cartCount={cartCount} search={search} setSearch={setSearch} />{page}<Footer admin={route.startsWith('admin-')} /></>
}

export default App
