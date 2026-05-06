// Shared components for MK Cars

const { useState, useEffect, useMemo, useRef } = React;

// ==================== Icons ====================
const Icon = ({ name, size = 18, stroke = 1.6 }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round'
  };
  const paths = {
    arrow: <path d="M7 17L17 7M9 7h8v8" />,
    arrowRight: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
    arrowLeft: <><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></>,
    menu: <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    chevronRight: <path d="M9 6l6 6-6 6" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    fuel: <><path d="M3 22V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v18" /><path d="M3 14h13" /><path d="M16 10h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2v-7l-4-4" /></>,
    gauge: <><path d="M12 14l4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></>,
    check: <path d="M20 6L9 17l-5-5" />,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    handshake: <><path d="M11 17l2 2a1 1 0 1 0 3-3" /><path d="M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="M21 3l-6 6" /><path d="M3 21l8-8" /></>,
    sparkle: <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />,
    car: <><path d="M5 17h14M3 13h18l-2-6H5l-2 6z" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    palette: <><circle cx="12" cy="12" r="9" /><circle cx="7.5" cy="10.5" r="1" fill="currentColor" /><circle cx="12" cy="7.5" r="1" fill="currentColor" /><circle cx="16.5" cy="10.5" r="1" fill="currentColor" /></>,
    x: <><path d="M18 6L6 18M6 6l12 12" /></>,
  };
  return <svg {...props}>{paths[name]}</svg>;
};

// ==================== Logo ====================
const MKLogo = () => (
  <a href="#/" className="logo" data-route="/">
    <img src="assets/logo.png" alt="MK Collectible Cars" className="logo-img" />
  </a>
);

// ==================== Header ====================
const Header = ({ route, onNav, theme, setTheme }) => {
  const items = [
    { label: 'Home', path: '/' },
    { label: 'Inventory', path: '/inventory' },
    { label: 'Services', path: '/#services' },
    { label: 'About', path: '/#about' },
    { label: 'Contact', path: '/#contact' },
  ];
  const isActive = (p) => {
    if (p === '/inventory') return route.startsWith('/inventory') || route.startsWith('/car/');
    if (p === '/') return route === '/';
    return false;
  };
  return (
    <header className="header">
      <div className="container header-inner">
        <MKLogo />
        <nav className="nav">
          {items.map(it => (
            <a key={it.path}
               href={`#${it.path}`}
               className={isActive(it.path) ? 'active' : ''}
               onClick={(e) => { if (it.path.startsWith('/')) { e.preventDefault(); onNav(it.path); } }}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  title="Toggle theme">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>
          <button className="icon-btn" title="Search"><Icon name="search" size={18} /></button>
          <button className="icon-btn" title="Menu"><Icon name="menu" size={18} /></button>
        </div>
      </div>
    </header>
  );
};

// ==================== Footer ====================
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <MKLogo />
          <p className="muted" style={{marginTop: 16, maxWidth: 320, lineHeight: 1.5}}>
            Curated pre-owned performance and luxury cars. Authenticated, serviced, and delivered with the white-glove standard you expect.
          </p>
        </div>
        <div className="footer-col">
          <h4>Browse</h4>
          <a href="#/inventory">All Inventory</a>
          <a href="#/inventory">New Arrivals</a>
          <a href="#/inventory">Performance</a>
          <a href="#/inventory">Electric</a>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <a href="#/">Financing</a>
          <a href="#/">Trade-in</a>
          <a href="#/">Sourcing</a>
          <a href="#/">Service &amp; Care</a>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <a href="#/">Los Angeles Flagship</a>
          <a href="#/">Book a viewing</a>
          <a href="#/">Private appointments</a>
          <a href="#/">Concierge delivery</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 MK Cars GmbH. All rights reserved.</span>
        <span>Los Angeles, CA</span>
      </div>
    </div>
  </footer>
);

// ==================== Money / format ====================
const fmtMoney = (n) => '$' + n.toLocaleString('en-US');
const fmtMileage = (n) => n.toLocaleString('en-US') + ' km';

// ==================== Car Image (with fallback) ====================
const CarImage = ({ src, alt, label, style, className }) => {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className={'img-ph ' + (className || '')} style={style}>
        {(label || alt || 'CAR PHOTO').toUpperCase()}
      </div>
    );
  }
  return (
    <img src={src} alt={alt} loading="lazy"
         onError={() => setFailed(true)}
         style={style} className={'car-photo ' + (className || '')} />
  );
};

// ==================== Car Card ====================
const carCardStyles = {
  card: {
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden', cursor: 'pointer',
  },
  imgWrap: {
    position: 'relative', aspectRatio: '4/3',
    background: 'var(--bg-elev)',
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' },
  badges: {
    position: 'absolute', top: 16, left: 16, right: 16,
    display: 'flex', justifyContent: 'space-between', gap: 8,
  },
  badge: {
    background: 'color-mix(in oklab, var(--bg) 70%, transparent)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: 'var(--text)',
    fontSize: 12, fontWeight: 500,
    padding: '6px 12px', borderRadius: 999,
    border: '1px solid var(--border)',
    display: 'inline-flex', alignItems: 'center', gap: 6,
  },
  body: {
    padding: '20px 22px 22px',
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  year: { color: 'var(--text-faint)', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em' },
  title: { fontSize: 22, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0 },
  meta: { display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: 12, gap: 12 },
  price: { fontSize: 20, fontWeight: 700 },
  go: {
    width: 38, height: 38, borderRadius: '50%',
    border: '1px solid var(--border-strong)',
    background: 'transparent', color: 'var(--text)',
    display: 'grid', placeItems: 'center', cursor: 'pointer',
    flexShrink: 0,
  },
};

const CarCard = ({ car, onOpen }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="card"
      style={carCardStyles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(car.id)}
    >
      <div className="car-photo-frame" style={carCardStyles.imgWrap}>
        <CarImage src={car.img} alt={car.model} label={car.brand + ' ' + car.model}
             style={{...carCardStyles.img, transform: hover ? 'scale(1.04)' : 'scale(1)'}} />
        <div style={carCardStyles.badges}>
          <span style={carCardStyles.badge}>
            <span style={{width: 8, height: 8, borderRadius: '50%', background: '#bdbdbd', display: 'inline-block'}} />
            {car.color.split(' ').slice(0, 2).join(' ')}
          </span>
          <span style={carCardStyles.badge}>{car.transmission}</span>
        </div>
      </div>
      <div style={carCardStyles.body}>
        <div style={carCardStyles.year}>{car.year} · {fmtMileage(car.mileage)}</div>
        <h3 style={carCardStyles.title}>{car.brand}<br/>{car.model}</h3>
        <div style={carCardStyles.meta}>
          <div>
            <div style={carCardStyles.price}>{fmtMoney(car.price)}</div>
          </div>
          <button style={{...carCardStyles.go, background: hover ? 'var(--accent)' : 'transparent', color: hover ? 'var(--accent-text)' : 'var(--text)', borderColor: hover ? 'var(--accent)' : 'var(--border-strong)'}}>
            <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Export for other scripts
Object.assign(window, {
  Icon, MKLogo, Header, Footer, CarCard, CarImage, fmtMoney, fmtMileage,
});
