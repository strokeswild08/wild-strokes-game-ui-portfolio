'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ExternalLink, Play, ShieldCheck } from 'lucide-react';

type Category = 'Game UI' | 'HUD' | 'Mobile UI' | 'Pixel UI' | 'Motion';
type PortfolioItem = { file: string; category: Category; label?: string };

const portfolio: PortfolioItem[] = [
  { file: 'r-h-stevens-home-screen.jpg', category: 'HUD', label: 'Neon Music Hub' },
  { file: 'r-h-stevens-battlepass.jpg', category: 'Game UI', label: 'Cosmik Battlepass' },
  { file: 'r-h-stevens-achievements-rewards.jpg', category: 'Game UI', label: 'Progression Rewards' },
  { file: 'andrii-shafetov-andrii-shafetov-hud-gameplay.jpg', category: 'HUD', label: 'Combat Interface' },
  { file: 'stanislav-strelets-sci-fi-battlestar-mobile-ui-prew-2.jpg', category: 'Mobile UI', label: 'Battlestar Command' },
  { file: 'pixarts-studio-tcg-template-modular-png-assets-anime-ui.webp', category: 'Pixel UI', label: 'Tactical Card System' },
  { file: 'victoryscreen.mp4', category: 'Motion', label: 'Victory Screen Motion' },
  { file: 'r-h-stevens-achievements-daily.jpg', category: 'Game UI' },
  { file: 'r-h-stevens-character-material-edit.jpg', category: 'Game UI' },
  { file: 'r-h-stevens-createsong-custom-uplox-finish.webp', category: 'Game UI' },
  { file: 'r-h-stevens-dj-queue.jpg', category: 'Game UI' },
  { file: 'r-h-stevens-legend-owned.jpg', category: 'Game UI' },
  { file: 'r-h-stevens-loadoutslot1.jpg', category: 'HUD' },
  { file: 'r-h-stevens-reticles.jpg', category: 'HUD' },
  { file: 'r-h-stevens-what-s-new-tab1.jpg', category: 'Game UI' },
  { file: 'alena-fedorova-sci-fi-ui.jpg', category: 'HUD' },
  { file: 'ekaterina-sci-fi-ui.jpg', category: 'HUD' },
  { file: 'andrii-shafetov-andrii-shafetov-03-mainmenu-options-customizecontrols.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-all-1.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-all-2.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-pause-2.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-pause-3.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-pause.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-ui-movelist-v0.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-ui-options-v3.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-ui-pausemenu-v3.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-ui-pressanybuttonmodall-v0.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-andrii-shafetov-uinew.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-pausemenu.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-ui-campaign-v1.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-ui-confirmationmodal-v1.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-ui-loading-v1.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-ui-options-v5.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-ui-play-mainmenu-v2.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-ui-pressanybuttonmodall-v0.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-ui-shop-v0.jpg', category: 'Game UI' },
  { file: 'andrii-shafetov-ui.jpg', category: 'Game UI', label: 'Fantasy UI Kit' },
  { file: 'flashback_23-ui-visual1.jpg', category: 'Mobile UI' },
  { file: 'flashback_23-ui-visual2.jpg', category: 'Mobile UI' },
  { file: 'flashback_23-ui-visual-3.jpg', category: 'Mobile UI' },
  { file: 'flashback_23-ui-visual-4.jpg', category: 'Mobile UI' },
  { file: 'flashback_23-ui-visual-5.jpg', category: 'Mobile UI' },
  { file: 'michal-bernat-ui-concept-01.jpg', category: 'Mobile UI' },
  { file: 'michal-bernat-ui-concept-02.jpg', category: 'Mobile UI' },
  { file: 'salih-duymaz-gameui.jpg', category: 'Mobile UI' },
  { file: 'tomas-navikas-ui.jpg', category: 'Mobile UI' },
];

const categories = ['All work', 'Game UI', 'HUD', 'Mobile UI', 'Pixel UI', 'Motion'] as const;
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function portfolioAsset(file: string) {
  return `${publicBasePath}/portfolio/${file}`;
}

function titleFor(item: PortfolioItem) {
  if (item.label) return item.label;
  return item.file
    .replace(/\.(jpg|jpeg|webp|png|mp4)$/i, '')
    .replace(/^(r-h-stevens|andrii-shafetov|alena-fedorova|ekaterina|flashback_23|michal-bernat|salih-duymaz|tomas-navikas)-/i, '')
    .replace(/^andrii-shafetov-/i, '')
    .replace(/-(v\d+|\d+)$/i, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All work');
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const filtered = useMemo(() => activeCategory === 'All work' ? portfolio : portfolio.filter((item) => item.category === activeCategory), [activeCategory]);

  useEffect(() => setVisible(12), [activeCategory]);
  useEffect(() => {
    const stopContext = (event: MouseEvent) => event.preventDefault();
    const stopDrag = (event: DragEvent) => event.preventDefault();
    const stopSave = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') event.preventDefault();
    };
    document.addEventListener('contextmenu', stopContext);
    document.addEventListener('dragstart', stopDrag);
    document.addEventListener('keydown', stopSave);
    return () => {
      document.removeEventListener('contextmenu', stopContext);
      document.removeEventListener('dragstart', stopDrag);
      document.removeEventListener('keydown', stopSave);
    };
  }, []);
  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null);
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', close);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', close);
    };
  }, [selected]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top"><span>WILD</span> STROKES</a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a><a href="#about">About</a><a href="#services">Capabilities</a><a href="#contact">Contact</a>
        </nav>
        <a className="contact-pill" href="mailto:strokeswild08@gmail.com">Let&apos;s work <ArrowUpRight size={16} /></a>
      </header>

      <section className="hero" id="top">
        <img className="hero-art" src={portfolioAsset('r-h-stevens-home-screen.jpg')} alt="Neon game interface artwork" draggable={false} />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <div className="availability"><i /> Available for selected projects</div>
          <p className="role">GAME UI / UX · MOBILE UI · PIXEL INTERFACES</p>
          <h1>INTERFACES<br />THAT <em>PLAY.</em></h1>
          <p className="intro">Wild Strokes creates bold, readable and immersive UI systems for games—from cinematic HUDs to pixel-perfect mobile experiences.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#work">View selected work <ArrowDownRight size={19} /></a>
            <span>{portfolio.length} visuals · {categories.length - 1} disciplines</span>
          </div>
        </div>
        <div className="hero-index"><span>01</span><i /><span>06</span></div>
      </section>

      <section className="work" id="work">
        <div className="section-top">
          <div><span className="eyebrow">SELECTED WORK / 2026</span><h2>BUILT FOR<br /><em>THE MOMENT.</em></h2></div>
          <p>The strongest interface systems lead the archive—organized by platform, gameplay need and visual language.</p>
        </div>
        <div className="view-note"><ShieldCheck size={16} /> View-only portfolio · right-click and drag are disabled</div>
        <div className="category-row" role="group" aria-label="Filter portfolio by category">
          {categories.map((category) => {
            const count = category === 'All work' ? portfolio.length : portfolio.filter((item) => item.category === category).length;
            return <button type="button" className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} key={category}>{category}<b>{count}</b></button>;
          })}
        </div>
        <div className="featured-grid">
          {filtered.slice(0, visible).map((item, index) => (
            <article className={`project-card project-${(index % 6) + 1}`} key={item.file}>
              <button className="project-media" type="button" onClick={() => setSelected(item)} aria-label={`Open ${titleFor(item)}`}>
                {item.category === 'Motion' ? <video src={portfolioAsset(item.file)} muted loop autoPlay playsInline controlsList="nodownload" draggable={false} /> : <img src={portfolioAsset(item.file)} alt={titleFor(item)} loading={index < 6 ? 'eager' : 'lazy'} draggable={false} />}
                <span className="open-project">Open <ArrowUpRight size={15} /></span>
                {item.category === 'Motion' && <i className="play-badge"><Play size={16} fill="currentColor" /> Motion</i>}
              </button>
              <div className="project-info"><span>{item.category}</span><h3>{titleFor(item)}</h3><b>{String(index + 1).padStart(2, '0')}</b></div>
            </article>
          ))}
        </div>
        {visible < filtered.length && <button className="load-more" type="button" onClick={() => setVisible((amount) => Math.min(amount + 12, filtered.length))}>Load more work <span>{visible} / {filtered.length}</span></button>}
      </section>

      <section className="motion-feature" aria-label="Motion design showcase">
        <video src={portfolioAsset('victoryscreen.mp4')} muted loop autoPlay playsInline controlsList="nodownload" draggable={false} />
        <div className="motion-overlay" />
        <div className="motion-copy"><span className="eyebrow">MOTION SYSTEMS</span><h2>THE SCREEN<br />COMES <em>ALIVE.</em></h2><p>Transitions, rewards and feedback sequences designed to make every interaction land.</p><button type="button" onClick={() => setSelected(portfolio.find((item) => item.category === 'Motion') ?? null)}>Watch the sequence <Play size={15} fill="currentColor" /></button></div>
      </section>

      <section className="about" id="about">
        <div className="about-label"><span className="eyebrow">ABOUT WILD STROKES</span><i /></div>
        <div className="about-copy"><h2>CLARITY FIRST.<br /><em>CHARACTER ALWAYS.</em></h2><p>I design game interfaces that feel native to their worlds while staying fast, readable and satisfying to use. Every screen is shaped around player attention, controller flow and the emotional beat of the moment.</p></div>
        <div className="stats"><article><b>46</b><span>Portfolio visuals</span></article><article><b>05</b><span>UI disciplines</span></article><article><b>01</b><span>Focused visual language</span></article></div>
      </section>

      <section className="services" id="services">
        <div className="service-heading"><span className="eyebrow">CAPABILITIES</span><h2>FROM SYSTEM<br />TO <em>SCREEN.</em></h2></div>
        <div className="service-list">
          <article><span>01</span><h3>Game UI / UX</h3><p>Menus, progression, stores, rewards and complete interaction flows.</p></article>
          <article><span>02</span><h3>HUD Systems</h3><p>Readable combat information, reticles, loadouts and player feedback.</p></article>
          <article><span>03</span><h3>Mobile UI</h3><p>Touch-first interfaces with clear hierarchy and responsive states.</p></article>
          <article><span>04</span><h3>Pixel UI</h3><p>Crisp retro systems, item cards and highly authored game panels.</p></article>
          <article><span>05</span><h3>Motion Design</h3><p>Animated menus, victory screens and rewarding state transitions.</p></article>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-top"><span>HAVE A GAME IN MIND?</span><span>AVAILABLE WORLDWIDE</span></div>
        <h2>LET&apos;S MAKE IT<br /><em>FEEL PLAYABLE.</em></h2>
        <div className="contact-grid">
          <a href="mailto:strokeswild08@gmail.com"><span>Email</span><strong>strokeswild08@gmail.com</strong><ArrowUpRight /></a>
          <a href="https://discord.com/users/wildstrokes23" target="_blank" rel="noreferrer"><span>Discord</span><strong>@wildstrokes23</strong><ExternalLink /></a>
        </div>
        <div className="footer-bottom"><span>© 2026 WILD STROKES</span><span>GAME UI / UX · MOBILE · HUD · PIXEL</span></div>
      </footer>

      {selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${titleFor(selected)} preview`} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
        <div className="lightbox-panel">
          <button className="close-lightbox" type="button" onClick={() => setSelected(null)} aria-label="Close preview">×</button>
          <div className="dialog-media">{selected.category === 'Motion' ? <video src={portfolioAsset(selected.file)} controls autoPlay loop playsInline controlsList="nodownload" draggable={false} /> : <img src={portfolioAsset(selected.file)} alt={titleFor(selected)} draggable={false} />}</div>
          <div className="dialog-meta"><span>{selected.category}</span><h3>{titleFor(selected)}</h3><p>Wild Strokes · UI / UX Portfolio</p><small>Press ESC or tap outside to close</small></div>
        </div>
      </div>}
    </main>
  );
}

