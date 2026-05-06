// MK Cars — Home page

const HomePage = ({ onNav }) => {
  const { CARS, BRANDS, TESTIMONIALS } = window.MK_DATA;
  const featured = CARS;
  const [activeIdx, setActiveIdx] = useState(0);
  const car = featured[activeIdx];

  return (
    <div className="page-fade">
      {/* HERO */}
      <section style={{ padding: '32px 0 0' }}>
        <div className="container">
          <div style={hStyles.hero}>
            <div className="car-photo-frame" style={hStyles.heroImgWrap}>
              <CarImage src={car.img} alt={car.model} label={car.brand + ' ' + car.model} style={hStyles.heroImg} key={car.id} />
              <div style={hStyles.heroOverlay} />
              <div style={hStyles.heroEyebrow}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                  In stock · {car.year}
                </span>
              </div>
              <div style={hStyles.heroCaption}>
                <div style={hStyles.heroTitle}>{car.brand} {car.model}</div>
                <div style={hStyles.heroSub}>{car.tags.join(' · ')}</div>
              </div>
            </div>

            {/* Thumbnails */}
            <div style={hStyles.thumbs}>
              {featured.map((c, i) =>
              <button key={c.id} onClick={() => setActiveIdx(i)}
              className="car-photo-frame"
              style={{ ...hStyles.thumb, ...(i === activeIdx ? hStyles.thumbActive : {}) }}>
                  <CarImage src={c.img} alt={c.model} label={c.brand} style={hStyles.thumbImg} />
                </button>
              )}
            </div>

            {/* Hero info bar */}
            <div style={hStyles.heroBar}>
              <div>
                <div style={hStyles.heroBarTitle}>{car.brand} {car.model} {car.year}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ display: 'inline-flex', marginRight: 4 }}>
                    {[0, 1, 2].map((i) =>
                    <span key={i} style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: ['#a87b4a', '#7a8b6f', '#6f7a8b'][i],
                      marginLeft: i === 0 ? 0 : -10,
                      border: '2px solid var(--bg-card)'
                    }} />
                    )}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>20+</span>
                  <span>Trusted by collectors across 14 countries</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--text-faint)', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>From</div>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{fmtMoney(car.price)}</div>
                </div>
                <button className="btn btn-primary" onClick={() => onNav(`/car/${car.id}`)}>
                  View Details <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS STRIP */}
      <section style={{ padding: '64px 0 24px' }}>
        <div className="container">
          <div style={hStyles.brandStrip}>
            <span style={{ color: 'var(--text-faint)', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, flexShrink: 0 }}>
              Marques in inventory
            </span>
            <div style={hStyles.brandsList}>
              {['Porsche', 'Mercedes-AMG', 'BMW M', 'Audi RS', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin', 'Bentley', 'Rolls-Royce'].map((b) =>
              <span key={b} style={hStyles.brandName}>{b}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="section-head animate-on-scroll animate-fade-in">
            <div>
              <div className="section-eyebrow">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                Curated stock
              </div>
              <h2 className="section-title">Our Collection</h2>
              <p className="section-sub">A rotating selection of pre-owned exotics and luxury cars — every one inspected, certified, and ready to deliver.</p>
            </div>
            <button className="btn btn-ghost" onClick={() => onNav('/inventory')}>
              Browse all {CARS.length} cars <Icon name="arrowRight" size={16} />
            </button>
          </div>

          <div style={hStyles.grid}>
            {CARS.slice(0, 6).map((c) => <CarCard key={c.id} car={c} onOpen={(id) => onNav(`/car/${id}`)} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head animate-on-scroll animate-fade-in">
            <div>
              <div className="section-eyebrow"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />What we do</div>
              <h2 className="section-title">Beyond the keys.</h2>
              <p className="section-sub">From sourcing rare specifications to ongoing care, MK Cars handles every step of ownership.</p>
            </div>
          </div>

          <div style={hStyles.servicesGrid}>
            {[
            { icon: 'sparkle', title: 'Sourcing', desc: 'Tell us the marque, year and spec — our European network finds it within weeks.' },
            { icon: 'shield', title: 'Inspection & Certify', desc: '120-point physical inspection with full provenance check before any car enters our floor.' },
            { icon: 'handshake', title: 'Trade-in', desc: 'Fair, transparent valuation on your current car — apply it directly to your next.' },
            { icon: 'bolt', title: 'Financing', desc: 'Bespoke finance and lease structures from our partner network across the EU.' }].
            map((s, i) =>
            <div key={i} className={`card animate-on-scroll animate-fade-in delay-${i + 1}`} style={hStyles.serviceCard}>
                <div style={hStyles.serviceIcon}><Icon name={s.icon} size={22} /></div>
                <h3 style={{ fontSize: 22, fontWeight: 700, margin: '24px 0 8px', letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
                <a href="#/" style={hStyles.serviceLink}>Learn more <Icon name="arrowRight" size={14} /></a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT + STATS */}
      <section id="about" className="section">
        <div className="container">
          <div style={hStyles.aboutGrid}>
            <div className="animate-on-scroll animate-slide-left">
              <div className="section-eyebrow"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />Since 2014</div>
              <h2 className="section-title" style={{ maxWidth: 560 }}>Drive beyond expectations.</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.6, maxWidth: 520, marginBottom: 32 }}>
                MK Cars began with a single Los Angeles showroom and a simple thesis: pre-owned performance cars should be sold the way they are bought — with transparency, expertise, and care. A decade later, our Sunset Boulevard flagship sources globally for clients who know exactly what they want.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-primary">Book a viewing <Icon name="arrow" size={16} /></button>
                <button className="btn btn-ghost">Our story</button>
              </div>
            </div>
            <div className="animate-on-scroll animate-slide-right" style={hStyles.statsGrid}>
              {[
              { v: '11', s: 'Years', label: 'sourcing performance cars across Europe' },
              { v: '2,400+', s: 'Cars delivered', label: 'to discerning owners worldwide' },
              { v: '120', s: 'Point inspection', label: 'on every car before it enters the floor' },
              { v: '14', s: 'Countries', label: 'where MK Cars clients reside today' }].
              map((st, i) =>
              <div key={i} className={`card animate-on-scroll animate-fade-in delay-${i + 1}`} style={hStyles.stat}>
                  <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em' }}>{st.v}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>{st.s}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5, marginTop: 6 }}>{st.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / SHOWROOM */}
      <section id="contact" className="section" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head animate-on-scroll animate-fade-in">
            <div>
              <div className="section-eyebrow"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />Visit us</div>
              <h2 className="section-title">Our place.</h2>
            </div>
          </div>

          <div style={hStyles.contactLayout}>
            {[
            { city: 'Los Angeles', addr: '9200 Sunset Boulevard, CA 90069', phone: '+1 (310) 555-0140', hours: 'Mon–Sat · 09:00 – 19:00', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format&fit=crop' }].
            map((s) =>
            <div key={s.city} className="card animate-on-scroll animate-slide-left" style={hStyles.showroom}>
                <div style={hStyles.showroomImgWrap}>
                  <CarImage src={s.img} alt={s.city + ' showroom'} label={s.city + ' showroom'} style={hStyles.showroomImg} />
                  <div style={hStyles.showroomOverlay} />
                  <div style={hStyles.showroomCity}>{s.city}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{s.city}</h3>
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text-muted)', fontSize: 14 }}>
                    <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><Icon name="pin" size={16} /> {s.addr}</span>
                    <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><Icon name="phone" size={16} /> {s.phone}</span>
                    <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><Icon name="calendar" size={16} /> {s.hours}</span>
                  </div>
                  <a href="#/" style={{ ...hStyles.serviceLink, marginTop: 20 }}>Get directions <Icon name="arrowRight" size={14} /></a>
                </div>
              </div>
            )}
            <div className="card animate-on-scroll animate-slide-right" style={hStyles.mapCard}>
              <iframe
                title="MK Cars Los Angeles location"
                src="https://www.google.com/maps?q=9200+Sunset+Boulevard,+Los+Angeles,+CA+90069&output=embed"
                style={hStyles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>);

};

const hStyles = {
  hero: { display: 'flex', flexDirection: 'column', gap: 24 },
  heroImgWrap: {
    position: 'relative', aspectRatio: '21/9',
    minHeight: 480,
    borderRadius: 'var(--radius-lg)', overflow: 'hidden',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)'
  },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover', animation: 'pageIn .6s ease' },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.85) 100%)',
    pointerEvents: 'none'
  },
  heroEyebrow: {
    position: 'absolute', top: 24, left: 24,
    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
    color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.15)'
  },
  heroCaption: {
    position: 'absolute', left: 32, bottom: 32, color: '#fff'
  },
  heroTitle: { fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05 },
  heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 15, marginTop: 8, letterSpacing: '0.04em' },
  thumbs: {
    display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4,
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'thin',
  },
  thumb: {
    flex: '0 0 calc((100% - 60px) / 6)',
    minWidth: 140,
    aspectRatio: '4/3', borderRadius: 'var(--radius)', overflow: 'hidden',
    border: '2px solid var(--border)', background: 'var(--bg-card)', padding: 0,
    cursor: 'pointer', transition: 'all .25s',
    scrollSnapAlign: 'start',
    position: 'relative',
  },
  thumbActive: { borderColor: 'var(--accent)', transform: 'translateY(-2px)' },
  thumbImg: { width: '100%', height: '100%', objectFit: 'cover' },
  heroBar: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px 28px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
    flexWrap: 'wrap'
  },
  heroBarTitle: { fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' },
  brandStrip: {
    display: 'flex', alignItems: 'center', gap: 32,
    paddingBottom: 24, borderBottom: '1px solid var(--border)',
    flexWrap: 'wrap'
  },
  brandsList: {
    display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap',
    color: 'var(--text-muted)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em'
  },
  brandName: { opacity: 0.7, transition: 'opacity .2s' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24
  },
  servicesGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20
  },
  serviceCard: {
    padding: 28, display: 'flex', flexDirection: 'column',
    minHeight: 240
  },
  serviceIcon: {
    width: 52, height: 52, borderRadius: 14,
    background: 'color-mix(in oklab, var(--accent) 18%, transparent)',
    color: 'var(--accent)',
    display: 'grid', placeItems: 'center'
  },
  serviceLink: {
    color: 'var(--accent)', fontWeight: 600, fontSize: 14,
    marginTop: 'auto', paddingTop: 24,
    display: 'inline-flex', alignItems: 'center', gap: 6
  },
  aboutGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center'
  },
  statsGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16
  },
  stat: { padding: 28 },
  contactGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20
  },
  contactLayout: {
    display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20, alignItems: 'stretch',
  },
  mapCard: {
    overflow: 'hidden', minHeight: 420, padding: 0,
  },
  mapIframe: {
    width: '100%', height: '100%', minHeight: 420,
    border: 0, display: 'block',
    filter: 'invert(0.92) hue-rotate(180deg) saturate(0.6)',
  },
  showroom: { overflow: 'hidden' },
  showroomImgWrap: { position: 'relative', aspectRatio: '16/10', overflow: 'hidden' },
  showroomImg: { width: '100%', height: '100%', objectFit: 'cover' },
  showroomOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)',
    pointerEvents: 'none',
  },
  showroomCity: {
    position: 'absolute', left: 20, bottom: 16,
    color: '#fff', fontSize: 14, fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase',
  },
};

// Mobile fixes
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 980px) {
      .home-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 640px) {
      .home-grid-3 { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(style);
}

window.HomePage = HomePage;
