// MK Cars — Detail page

const DetailPage = ({ carId, onNav }) => {
  const { CARS } = window.MK_DATA;
  const car = CARS.find(c => c.id === carId);
  const [tab, setTab] = useState('overview');
  const [favorited, setFavorited] = useState(false);

  if (!car) {
    return (
      <div className="container" style={{padding: '120px 0', textAlign: 'center'}}>
        <h2>Car not found</h2>
        <button className="btn btn-primary" onClick={() => onNav('/inventory')} style={{marginTop: 16}}>Back to inventory</button>
      </div>
    );
  }

  const related = CARS.filter(c => c.id !== car.id && (c.brand === car.brand || c.type === car.type)).slice(0, 3);

  const specs = [
    { icon: 'settings', label: 'Engine', value: car.engine },
    { icon: 'bolt', label: 'Power', value: `${car.power} hp` },
    { icon: 'gauge', label: '0–100 km/h', value: `${car.accel} sec` },
    { icon: 'gauge', label: 'Top speed', value: `${car.topSpeed} km/h` },
    { icon: 'car', label: 'Transmission', value: car.transmission },
    { icon: 'fuel', label: 'Fuel', value: car.fuel },
    { icon: 'palette', label: 'Color', value: car.color },
    { icon: 'calendar', label: 'Year', value: car.year },
  ];

  return (
    <div className="page-fade">
      {/* Breadcrumb */}
      <div className="container" style={{padding: '24px 0 0'}}>
        <div style={dStyles.crumbs}>
          <a href="#/" onClick={(e) => { e.preventDefault(); onNav('/'); }} style={dStyles.crumb}>Home</a>
          <Icon name="chevronRight" size={12} />
          <a href="#/inventory" onClick={(e) => { e.preventDefault(); onNav('/inventory'); }} style={dStyles.crumb}>Inventory</a>
          <Icon name="chevronRight" size={12} />
          <span style={{color: 'var(--text)'}}>{car.brand} {car.model}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{padding: '24px 0 0'}}>
        <div className="container">
          <div style={dStyles.heroLayout}>
            {/* Left: image */}
            <div className="car-photo-frame" style={dStyles.heroImg}>
              <CarImage src={car.img} alt={car.model} label={car.brand + ' ' + car.model} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <div style={dStyles.imgChips}>
                <span style={dStyles.chip}>
                  <span style={{width: 8, height: 8, borderRadius: '50%', background: '#bdbdbd'}} />
                  {car.color}
                </span>
                <span style={dStyles.chip}>{car.transmission}</span>
              </div>
              <button style={dStyles.heart} onClick={() => setFavorited(!favorited)} title="Favorite">
                <Icon name="heart" size={20} stroke={favorited ? 0 : 1.6} />
                {favorited && <span style={{position:'absolute', inset:0, display:'grid', placeItems:'center'}}><Icon name="heart" size={20} stroke={0} /></span>}
              </button>
              {/* gallery dots placeholder */}
              <div style={dStyles.dots}>
                {[0,1,2,3].map(i => <span key={i} style={{...dStyles.dot, ...(i === 0 ? dStyles.dotActive : {})}} />)}
              </div>
            </div>

            {/* Right: info */}
            <div style={dStyles.info}>
              <div style={{color: 'var(--text-faint)', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase'}}>{car.year} · {fmtMileage(car.mileage)}</div>
              <h1 style={dStyles.title}>{car.brand}<br/>{car.model}</h1>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16}}>
                {car.tags.map(t => (
                  <span key={t} style={dStyles.tag}>{t}</span>
                ))}
              </div>

              <div style={dStyles.priceCard}>
                <div>
                  <div style={{color: 'var(--text-muted)', fontSize: 13, marginBottom: 4}}>Asking</div>
                  <div style={{fontSize: 36, fontWeight: 700, letterSpacing: '-0.01em'}}>{fmtMoney(car.price)}</div>
                  <div style={{color: 'var(--text-muted)', fontSize: 13, marginTop: 4}}>or finance from <span style={{color:'var(--text)', fontWeight: 600}}>{fmtMoney(Math.round(car.price * 0.012))}/mo</span></div>
                </div>
                <button className="btn btn-primary">Book Now <Icon name="arrow" size={16} /></button>
              </div>

              <div style={dStyles.quickRow}>
                <button className="btn btn-ghost" style={{flex: 1, justifyContent: 'center'}}>
                  <Icon name="phone" size={16} /> Request a call
                </button>
                <button className="btn btn-ghost" style={{flex: 1, justifyContent: 'center'}}>
                  <Icon name="calendar" size={16} /> Schedule viewing
                </button>
              </div>

              <div style={dStyles.locationRow}>
                <Icon name="pin" size={16} />
                <span>Available at <strong style={{color: 'var(--text)'}}>{car.location}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs + Description */}
      <section style={{padding: '64px 0'}}>
        <div className="container">
          <div style={dStyles.specsLayout}>
            <div className="card" style={dStyles.specsCard}>
              <div style={dStyles.specsHead}>
                <h2 style={{margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em'}}>Key Specifications</h2>
              </div>
              <div style={dStyles.specsGrid}>
                {specs.map((s, i) => (
                  <div key={i} style={dStyles.specItem}>
                    <div style={dStyles.specLabel}>
                      <Icon name="arrow" size={12} /> {s.label}
                    </div>
                    <div style={dStyles.specValue}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={dStyles.tabs}>
                {['overview', 'history', 'included'].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                          style={{...dStyles.tab, ...(t === tab ? dStyles.tabActive : {})}}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <div className="card" style={{padding: 28, minHeight: 240}}>
                {tab === 'overview' && (
                  <div>
                    <p style={dStyles.body}>{car.description}</p>
                    <p style={dStyles.body}>
                      Each car at MK Cars passes a 120-point inspection by our master technicians before entering the floor. We provide a 12-month limited warranty and a fully transferable service history with every purchase.
                    </p>
                  </div>
                )}
                {tab === 'history' && (
                  <div>
                    <Timeline items={[
                      { date: 'Mar 2026', text: 'Acquired by MK Cars · 120-point inspection passed' },
                      { date: 'Sep 2025', text: 'Major service · all fluids & filters replaced' },
                      { date: 'Jun 2024', text: 'Single owner · garage-kept since delivery' },
                      { date: car.year + '-04', text: 'First registration · ' + car.location.split('·')[1].trim() },
                    ]} />
                  </div>
                )}
                {tab === 'included' && (
                  <ul style={dStyles.list}>
                    {['12-month MK Cars limited warranty', 'Fresh major service & fluids', '120-point inspection report', 'Two original keys & remote', 'Full service history bundle', 'Complimentary delivery within Germany'].map(i => (
                      <li key={i} style={dStyles.listItem}>
                        <span style={dStyles.check}><Icon name="check" size={12} /></span>
                        {i}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{padding: '24px 0 96px', borderTop: '1px solid var(--border)'}}>
          <div className="container" style={{paddingTop: 64}}>
            <div className="section-head">
              <div>
                <div className="section-eyebrow"><span style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)'}}/>You may also like</div>
                <h2 className="section-title" style={{fontSize: 'clamp(28px, 4vw, 48px)'}}>Similar in our collection</h2>
              </div>
              <button className="btn btn-ghost" onClick={() => onNav('/inventory')}>See all <Icon name="arrowRight" size={16} /></button>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
              {related.map(c => <CarCard key={c.id} car={c} onOpen={(id) => onNav(`/car/${id}`)} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const Timeline = ({ items }) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
    {items.map((it, i) => (
      <div key={i} style={{display: 'flex', gap: 16, position: 'relative'}}>
        <div style={{flexShrink: 0, width: 12, position: 'relative'}}>
          <span style={{position: 'absolute', top: 6, left: 4, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)'}} />
          {i < items.length - 1 && <span style={{position: 'absolute', top: 14, left: 7, bottom: -22, width: 1, background: 'var(--border-strong)'}} />}
        </div>
        <div style={{flex: 1, paddingBottom: 4}}>
          <div style={{fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase'}}>{it.date}</div>
          <div style={{color: 'var(--text)', marginTop: 4}}>{it.text}</div>
        </div>
      </div>
    ))}
  </div>
);

const dStyles = {
  crumbs: { display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)', fontSize: 13 },
  crumb: { color: 'var(--text-muted)' },
  heroLayout: {
    display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32,
  },
  heroImg: {
    position: 'relative', aspectRatio: '4/3',
    borderRadius: 'var(--radius-lg)', overflow: 'hidden',
    background: 'var(--bg-card)', border: '1px solid var(--border)',
  },
  imgChips: {
    position: 'absolute', top: 20, left: 20,
    display: 'flex', gap: 8,
  },
  chip: {
    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
    color: '#fff', fontSize: 12, fontWeight: 500,
    padding: '7px 12px', borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'inline-flex', alignItems: 'center', gap: 8,
  },
  heart: {
    position: 'absolute', top: 20, right: 20,
    width: 44, height: 44, borderRadius: '50%',
    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'grid', placeItems: 'center', color: '#fff',
    cursor: 'pointer',
  },
  dots: {
    position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
    display: 'flex', gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' },
  dotActive: { background: '#fff', width: 20, borderRadius: 999 },
  info: { display: 'flex', flexDirection: 'column' },
  title: { fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.0, margin: '12px 0 0' },
  tag: {
    fontSize: 12, fontWeight: 500,
    padding: '6px 12px', borderRadius: 999,
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    color: 'var(--text-muted)',
  },
  priceCard: {
    marginTop: 32,
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)', padding: 24,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
    flexWrap: 'wrap',
  },
  quickRow: { display: 'flex', gap: 12, marginTop: 16 },
  locationRow: {
    marginTop: 24, padding: '14px 18px',
    background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
    display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)', fontSize: 14,
  },
  specsLayout: {
    display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 32,
  },
  specsCard: { padding: 32 },
  specsHead: { marginBottom: 24 },
  specsGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28,
  },
  specItem: {},
  specLabel: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    color: 'var(--text-muted)', fontSize: 13, fontWeight: 500,
    marginBottom: 6,
  },
  specValue: { fontSize: 17, fontWeight: 600, letterSpacing: '-0.005em' },
  tabs: { display: 'flex', gap: 4, padding: 4, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 999, marginBottom: 16, width: 'fit-content' },
  tab: {
    padding: '10px 22px', borderRadius: 999, border: 0,
    background: 'transparent', color: 'var(--text-muted)',
    fontSize: 14, fontWeight: 500, cursor: 'pointer',
  },
  tabActive: { background: 'var(--accent)', color: 'var(--accent-text)', fontWeight: 600 },
  body: { color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.65, margin: '0 0 16px' },
  list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 },
  listItem: { display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text)', fontSize: 15 },
  check: {
    width: 22, height: 22, borderRadius: '50%',
    background: 'color-mix(in oklab, var(--accent) 20%, transparent)',
    color: 'var(--accent)', display: 'grid', placeItems: 'center', flexShrink: 0,
  },
};

window.DetailPage = DetailPage;
