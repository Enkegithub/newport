'use client';

import { useEffect, useState } from 'react';
import {
  certificates,
  educationSteps,
  githubUsername,
  projects,
  socialLinks,
  techStack,
} from '../data/portfolio-data';

const filterOptions = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI' },
  { key: 'research', label: 'Research Paper' },
  { key: 'education', label: 'Education' },
  { key: 'utility', label: 'Utility' },
];

export default function PortfolioPage() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    if (!selectedCertificate) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedCertificate(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedCertificate]);

  return (
    <>
    
      <div className='page-noise' aria-hidden='true'></div>

      <main className='portfolio-shell'>
        <header className='hero'>
          <div className='hero-topbar'>
            <p className='eyebrow'>Personal Portfolio</p>
            <button className='theme-toggle' id='theme-toggle' type='button'>
              Dark Mode
            </button>
          </div>
          <h1>
            Nitesh Kushwaha
            <span className='verified-badge' aria-label='Verified profile' title='Verified profile'>
              <svg viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  d='M12 2.5l2.14 2.12 2.97-.15.96 2.82 2.61 1.41-1.12 2.75 1.12 2.75-2.61 1.41-.96 2.82-2.97-.15L12 21.5l-2.14-2.12-2.97.15-.96-2.82-2.61-1.41 1.12-2.75-1.12-2.75 2.61-1.41.96-2.82 2.97.15L12 2.5z'
                  fill='currentColor'
                />
                <path
                  d='M9.72 12.9l1.54 1.54 3.56-4.02'
                  fill='none'
                  stroke='#ffffff'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                />
              </svg>
            </span>
          </h1>
          <p className='tagline'>असाध्यं नास्ति लोकेऽत्र।</p>
        </header>

        <section className='section-block' aria-labelledby='highlights-title'>
          <div className='section-divider'>
            <span className='divider-line'></span>
            <span className='divider-label' id='highlights-title'>
              Highlights
            </span>
          </div>

          <div className='copy-stack'>
            <p>
              Self-taught
              <strong> Full-Stack Software Developer</strong>
              <span className='inline-badge'>🕉️</span>
              APP & ML enthusiast,
            </p>
            <p>
              Major Products:-
              <a href='https://omniworkspace.vercel.app/'> omniworkspace.vercel.app</a>
               {/* <a href='#'>Thumbnails.pro</a> */}
            </p>
             <p>
              Research paper:-
              <a href='https://fei.crinfoglobal.com/index.php/1/article/view/28/32'> Performance and Security Analysis of Blockchain-Based Decentralized Cloud Storage Systems</a>
               {/* <a href='#'>Thumbnails.pro</a> */}
            </p>
            <p>
              Contect me at:-
              <a href='mailto:niteshkushwaha484@gmail.com'> niteshkushwaha484@gmail.com</a>
            </p>
          </div>
        </section>

        <section className='section-block' aria-labelledby='info-title'>
          <div className='section-divider'>
            <span className='divider-line'></span>
            <span className='divider-label' id='info-title'>
              Info
            </span>
          </div>

          <div className='info-grid'>
            <div className='info-copy'>
              <p>
                <img
                  className='flag-badge'
                  src='https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Nepal.svg'
                  alt='Flag of Nepal'
                />
                <span className='meta-label'>NP</span>
                Nepal
                <span className='separator-dot'>&middot;</span>
                <span id='live-clock'>--:--:--</span>
              </p>
              <p>
                Birthday: sept 29, 2001 <span className='separator-dot'>&middot;</span>
              </p>
              <p>
                I’m a Computer Science student & full-stack developer passionate about building
                AI-powered applications, mobile apps, and innovative startup solutions.
              </p>
              <p>
                Recently <strong>focused on</strong> AI systems, automation tools, and scalable app
                development.
              </p>
              <p>
                I share my ideas on <a href='#'>Twitter / X</a> and visuals on <a href='#'>Instagram</a>.
              </p>
              <p className='calendar-line'>
                Schedule a call?
                <a href='#' className='calendar-link'>
                  Calendar
                </a>
              </p>
            </div>

            <aside className='now-card' aria-label='Now building'>
              <p className='card-kicker'>Now Building</p>
              <h2>Quiet products with loud outcomes.</h2>
              <p>Shipping small experiments around AI tooling, interface polish, and creator workflows.</p>
              <div className='status-row'>
                <span className='status-dot'></span>
                Available for collaborations
              </div>
            </aside>
          </div>
        </section>

        {/* <section className='section-block' aria-labelledby='certificates-title'>
          <details className='section-collapse' open>
            <summary className='section-heading section-heading--summary'>
              <div className='section-divider'>
                <span className='divider-line'></span>
                <span className='divider-label' id='certificates-title'>
                  Certificates
                </span>
              </div>
              <span className='section-toggle' aria-hidden='true'>
                <span className='section-toggle__open-text'>Hide +</span>
                <span className='section-toggle__closed-text'>Show +</span>
              </span>
            </summary>

            <div className='certificate-content' id='certificate-content'>
              <div className='certificate-wall' id='certificate-wall'>
                {certificates.map((certificate) => (
                  <article className='certificate-card' key={certificate.filename}>
                    <button
                      className='certificate-open'
                      type='button'
                      onClick={() => setSelectedCertificate(certificate)}
                    >
                      <div
                        className={`certificate-poster ${
                          certificate.kind === 'image'
                            ? 'certificate-poster--image'
                            : 'certificate-poster--pdf poster-medium'
                        }`}
                      >
                        {certificate.kind === 'image' ? (
                          <img src={certificate.src} alt={certificate.title} loading='lazy' />
                        ) : (
                          <>
                            <span className='poster-chip'>PDF</span>
                            <h3>{certificate.title}</h3>
                            <p>Portable Document Format</p>
                          </>
                        )}
                      </div>

                      <div className='certificate-meta'>
                        <p className='certificate-name'>{certificate.title}</p>
                        <p className='certificate-note'>{certificate.filename}</p>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </details>
        </section> */}

        <section className='section-block' aria-labelledby='experiments-title'>
          <div className='section-divider'>
            <span className='divider-line'></span>
            <span className='divider-label' id='experiments-title'>
              My Projects
            </span>
          </div>

          <div className='toolbar' role='tablist' aria-label='Project filters'>
            {filterOptions.map((option) => (
              <button
                key={option.key}
                className={`filter-chip${option.key === 'all' ? ' is-active' : ''}`}
                data-filter={option.key}
                type='button'
              >
                {option.label}
              </button>
            ))}
          </div>

          <section className='education-panel' id='education-panel' aria-label='Education overview' hidden>
            <div className='education-timeline'>
              {educationSteps.map((step) => (
                <article className='education-step' key={`${step.year}-${step.title}`}>
                  <span className='education-step__year'>{step.year}</span>
                  <div className='education-step__dot' aria-hidden='true'></div>
                  <div className='education-step__content'>
                    <p className='education-step__label'>{step.label}</p>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className='project-list' id='project-list'>
            {projects.map((project) => {
              const displayTitle = project.title || project.name;
              const displayDescription = project.desc || project.description;
              const displayLinks =
                project.links ||
                (project.link ? [{ label: 'Live Preview', href: project.link }] : []);
              const researchDetails = project.details || [
                {
                  label: 'Paper Title',
                  kind: 'title',
                  value: project.researchTitle || displayTitle,
                },
                {
                  label: 'Page Link',
                  kind: 'link',
                  href: project.paperLink || '#',
                  text:
                    project.paperLink && project.paperLink !== '#'
                      ? project.paperLink
                      : 'Add page link here',
                },
              ];

              return (
                <details
                  className='project-item'
                  data-tags={project.type}
                  key={project.id || `${project.type}-${displayTitle}-${project.year}`}
                >
                  <summary className='project-toggle'>
                    <span className='toggle-icon' aria-hidden='true'>
                      +
                    </span>
                    <span className='project-name'>
                      {displayTitle}
                      {project.mark ? <span className='project-mark'> {project.mark}</span> : null}
                    </span>
                    <span className='project-year'>{project.year}</span>
                  </summary>

                  {project.type === 'research' ? (
                    <div className='project-panel'>
                      <div className='paper-detail paper-detail--card'>
                        {researchDetails.map((detail) => (
                          <div className='paper-row' key={`${project.id}-${detail.label}`}>
                            <span className='paper-label'>{detail.label}</span>
                            {detail.kind === 'title' ? (
                              <strong>{detail.value}</strong>
                            ) : detail.kind === 'link' ? (
                              <a href={detail.href} target='_blank' rel='noreferrer'>
                                {detail.text || detail.href}
                              </a>
                            ) : (
                              <p>{detail.value}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className='project-panel'>
                      <div className='project-card__head'>
                        <div>
                          <p className='project-card__kicker'>{project.type.toUpperCase()}</p>
                          <h3 className='project-card__title'>
                            {displayTitle}
                            {project.mark ? <span className='project-mark'> {project.mark}</span> : null}
                          </h3>
                        </div>
                        <span className='project-year'>{project.year}</span>
                      </div>

                      <div className='project-image-frame'>
                        <img className='project-image' src={project.image} alt={project.imageAlt} />
                      </div>

                      <p>{displayDescription}</p>

                      <div className='project-card__features'>
                        <span className='paper-label'>Features</span>
                        <div className='project-feature-list'>
                          {project.features?.map((feature) => (
                            <span className='project-feature-chip' key={feature}>
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className='project-links'>
                        {displayLinks.map((link) => (
                          <a href={link.href} key={`${project.id}-${link.label}`} target='_blank' rel='noreferrer'>
                            {link.label}
                          </a>
                        ))}
                        <span className='project-link-type'>Type: {project.type.toUpperCase()}</span>
                      </div>
                    </div>
                  )}
                </details>
              );
            })}
          </div>
        </section>
      </main>

      <section className='section-block tech-section' aria-labelledby='tech-title'>
        <div className='section-divider'>
          <span className='divider-line'></span>
          <span className='divider-label' id='tech-title'>
            Tech Stack
          </span>
        </div>

        <div className='tech-stack-shell'>
          <div className='tech-stack-track' aria-label='Technology stack'>
            {[0, 1].map((rowIndex) => (
              <div className='tech-stack-row' aria-hidden={rowIndex === 1} key={rowIndex}>
                {techStack.map((tech) => (
                  <div className='tech-item' data-tech={tech.name} key={`${rowIndex}-${tech.name}`}>
                    <span className='tech-glyph'>
                      <img
                        className={`tech-logo${tech.invert ? ' tech-logo--invert' : ''}`}
                        src={tech.logo}
                        alt={rowIndex === 1 ? '' : `${tech.name} logo`}
                        loading='lazy'
                      />
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section-block activity-section' aria-labelledby='activity-title'>
        <div className='section-divider'>
          <span className='divider-line'></span>
          <span className='divider-label' id='activity-title'>
            Activity
          </span>
        </div>

        <div className='activity-card'>
          <div className='activity-card__header'>
            <div>
              <p className='activity-kicker'>GitHub Activity</p>
              {/* <h2>Real contribution graph.</h2> */}
            </div>
            <div className='activity-legend' aria-label='GitHub username'>
              <span>@{githubUsername}</span>
            </div>
          </div>

          <div className='github-graph-frame'>
            <img
              className='github-graph-image'
              src={`https://ghchart.rshah.org/2d6e3e/${githubUsername}`}
              alt={`GitHub contributions graph for ${githubUsername}`}
            />
          </div>

          {/* <p className='activity-note'>
            GitHub contribution <strong>@{githubUsername}</strong>.
          </p> */}
        </div>
      </section>

      <footer className='site-footer' aria-labelledby='footer-title'>
        <div className='site-footer__divider'>
          <span className='divider-line'></span>
          <span className='divider-label' id='footer-title'>
            Social
          </span>
        </div>

        <div className='site-footer__content'>
          <p className='site-footer__copy'>
            Connect with me across social media and professional platforms.
          </p>
          <div className='site-footer__links'>
            {socialLinks.map((link) => (
              <a href={link.href} key={link.label} target='_blank' rel='noreferrer'>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {selectedCertificate ? (
        <dialog className='certificate-modal' open onClick={() => setSelectedCertificate(null)}>
          <div className='certificate-modal__content' onClick={(event) => event.stopPropagation()}>
            <button
              className='certificate-modal__close'
              type='button'
              aria-label='Close'
              onClick={() => setSelectedCertificate(null)}
            >
              Close
            </button>
            <p className='certificate-modal__eyebrow'>Certificate Details</p>
            <h2>{selectedCertificate.title}</h2>
            <p className='certificate-modal__issuer'>
              {selectedCertificate.kind === 'pdf' ? 'Document Certificate' : 'Image Certificate'}
            </p>
            <p className='certificate-modal__date'>
              Type: {selectedCertificate.extension.toUpperCase()}
            </p>
            <p className='certificate-modal__id'>File: {selectedCertificate.filename}</p>
            <div className='certificate-modal__preview'>
              {selectedCertificate.kind === 'image' ? (
                <img src={selectedCertificate.src} alt={selectedCertificate.title} />
              ) : (
                <iframe src={selectedCertificate.src} title={selectedCertificate.title}></iframe>
              )}
            </div>
            <p className='certificate-modal__desc'>Previewing the original file from your certificate folder.</p>
            <a
              className='certificate-modal__link'
              href={selectedCertificate.src}
              target='_blank'
              rel='noreferrer'
            >
              Open original file
            </a>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
