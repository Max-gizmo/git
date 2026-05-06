// MK Cars — Inventory page (catalog with filters)

const InventoryPage = ({ onNav }) => {
  const { CARS, BRANDS, TYPES, FUELS } = window.MK_DATA;

  const [brand, setBrand] = useState('All');
  const [type, setType] = useState('All');
  const [fuel, setFuel] = useState('All');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(400000);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');

  const filtered = useMemo(() => {
    let r = CARS.filter(c =>
      (brand === 'All' || c.brand === brand) &&
      (type === 'All' || c.type === type) &&
      (fuel === 'All' || c.fuel === fuel) &&
      c.price <= maxPrice &&
      (search === '' || (`${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())))
    );
    if (sort === 'price-asc') r = [...r].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') r = [...r].sort((a, b) => b.price - a.price);
    else if (sort === 'year-desc') r = [...r].sort((a, b) => b.year - a.year);
    else if (sort === 'mileage-asc') r = [...r].sort((a, b) => a.mileage - b.mileage);
    return r;
  }, [brand, type, fuel, sort, maxPrice, search, CARS]);

  const reset = () => {
    setBrand('All'); setType('All'); setFuel('All'); setMaxPrice(400000); setSearch(''); setSort('featured');
  };

  return (
    <div className="page-fade">
      <section style={{padding: '40px 0 24px'}}>
        <div className="container">
          <div style={iStyles.head}>
            <div>
              <div className="section-eyebrow"><span style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)'}}/>Inventory</div>
              <h1 style={iStyles.title}>Our Collection</h1>
              <p className="muted" style={{maxWidth:540, marginTop: 6}}>{filtered.length} cars currently available across our three flagships.</p>
            </div>
            <div style={iStyles.searchRow}>
              <div style={iStyles.searchBox}>
                <Icon name="search" size={18} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search marque or model" style={iStyles.searchInput} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{paddingBottom: 96}}>
        <div className="container">
          <div style={iStyles.layout}>
            {/* Filters sidebar */}
            <aside style={iStyles.filters}>
              <div style={iStyles.filterCard}>
                <div style={iStyles.filterHead}>
                  <h3 style={{margin: 0, fontSize: 18, fontWeight: 700}}>Filters</h3>
                  <button onClick={reset} style={iStyles.resetBtn}>Reset</button>
                </div>

                <FilterGroup label="Brand">
                  <Pills options={BRANDS} value={brand} onChange={setBrand} />
                </FilterGroup>

                <FilterGroup label="Body type">
                  <Pills options={TYPES} value={type} onChange={setType} />
                </FilterGroup>

                <FilterGroup label="Fuel">
                  <Pills options={FUELS} value={fuel} onChange={setFuel} />
                </FilterGroup>

                <FilterGroup label="Max price">
                  <div>
                    <input type="range" min={50000} max={400000} step={5000}
                           value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)}
                           style={iStyles.range} />
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 13, color: 'var(--text-muted)'}}>
                      <span>$50K</span>
                      <span style={{color: 'var(--accent)', fontWeight: 600}}>up to {fmtMoney(maxPrice)}</span>
                      <span>$400K</span>
                    </div>
                  </div>
                </FilterGroup>

                <button className="btn btn-primary" style={{width: '100%', justifyContent: 'center', marginTop: 8}}>
                  Apply filters
                </button>
              </div>
            </aside>

            {/* Results */}
            <div style={{minWidth: 0}}>
              <div style={iStyles.resultsHead}>
                <span style={{color: 'var(--text-muted)', fontSize: 14}}>
                  Showing <span style={{color: 'var(--text)', fontWeight: 600}}>{filtered.length}</span> of {CARS.length} cars
                </span>
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                  <Select value={sort} onChange={setSort} options={[
                    { value: 'featured', label: 'Featured' },
                    { value: 'price-asc', label: 'Price: low to high' },
                    { value: 'price-desc', label: 'Price: high to low' },
                    { value: 'year-desc', label: 'Year: newest' },
                    { value: 'mileage-asc', label: 'Mileage: lowest' },
                  ]} />
                </div>
              </div>

              {filtered.length === 0 ? (
                <div style={iStyles.empty}>
                  <Icon name="search" size={32} />
                  <h3 style={{fontSize: 22, margin: '16px 0 4px'}}>Nothing matches those filters</h3>
                  <p className="muted">Try widening your range or clearing a filter.</p>
                  <button className="btn btn-ghost" onClick={reset} style={{marginTop: 16}}>Reset filters</button>
                </div>
              ) : (
                <div style={iStyles.grid}>
                  {filtered.map(c => <CarCard key={c.id} car={c} onOpen={(id) => onNav(`/car/${id}`)} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FilterGroup = ({ label, children }) => (
  <div style={{borderTop: '1px solid var(--border)', paddingTop: 22, marginTop: 22}}>
    <div style={{fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14}}>{label}</div>
    {children}
  </div>
);

const Pills = ({ options, value, onChange }) => (
  <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
    {options.map(o => (
      <button key={o} onClick={() => onChange(o)}
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                border: '1px solid ' + (o === value ? 'var(--accent)' : 'var(--border)'),
                background: o === value ? 'color-mix(in oklab, var(--accent) 15%, transparent)' : 'transparent',
                color: o === value ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: 13, fontWeight: 500,
                cursor: 'pointer', transition: 'all .15s',
              }}>
        {o}
      </button>
    ))}
  </div>
);

const Select = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const cur = options.find(o => o.value === value);
  return (
    <div ref={ref} style={{position: 'relative'}}>
      <button onClick={() => setOpen(!open)} style={iStyles.selectBtn}>
        <span style={{color: 'var(--text-muted)', fontSize: 13}}>Sort:</span>
        <span style={{fontWeight: 600}}>{cur?.label}</span>
        <Icon name="chevronDown" size={14} />
      </button>
      {open && (
        <div style={iStyles.selectMenu}>
          {options.map(o => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }}
                    style={{...iStyles.selectItem, color: o.value === value ? 'var(--accent)' : 'var(--text)'}}>
              {o.label}
              {o.value === value && <Icon name="check" size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const iStyles = {
  head: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 32,
    flexWrap: 'wrap', marginBottom: 12,
  },
  title: { fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.05 },
  searchRow: { display: 'flex', gap: 12, alignItems: 'center' },
  searchBox: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    padding: '12px 18px', borderRadius: 999,
    width: 320,
  },
  searchInput: {
    flex: 1, background: 'transparent', border: 0, outline: 0,
    color: 'var(--text)', fontSize: 14, fontFamily: 'inherit',
  },
  layout: {
    display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32,
  },
  filters: { position: 'sticky', top: 100, alignSelf: 'start' },
  filterCard: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)', padding: 24,
  },
  filterHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  resetBtn: {
    background: 'transparent', border: 0,
    color: 'var(--accent)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
  },
  range: {
    width: '100%', accentColor: 'var(--accent)', cursor: 'pointer',
  },
  resultsHead: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 24, flexWrap: 'wrap', gap: 12,
  },
  selectBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '10px 16px',
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 999, color: 'var(--text)', fontSize: 14,
  },
  selectMenu: {
    position: 'absolute', top: 'calc(100% + 6px)', right: 0,
    background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
    borderRadius: 'var(--radius)', padding: 6, minWidth: 220,
    boxShadow: 'var(--shadow)', zIndex: 10,
  },
  selectItem: {
    width: '100%', display: 'flex', justifyContent: 'space-between',
    background: 'transparent', border: 0,
    padding: '10px 12px', borderRadius: 'var(--radius-sm)',
    color: 'var(--text)', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 },
  empty: {
    background: 'var(--bg-card)', border: '1px dashed var(--border-strong)',
    borderRadius: 'var(--radius-lg)', padding: 64, textAlign: 'center', color: 'var(--text-muted)',
  },
};

window.InventoryPage = InventoryPage;
