import React, { useState } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { ImageLightbox } from '@/components/ImageLightbox';
import { useLetterboxdFeed } from '@/hooks/public/live/useLetterboxdFeed';
import { useLastfmFeed } from '@/hooks/public/live/useLastfmFeed';
import { useAnimeFeed } from '@/hooks/public/live/useAnimeFeed';
import { CONTEMPLATIONS } from '@/data/contemplations';

type Tab = 'all' | 'films' | 'music' | 'anime' | 'thoughts';

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'films', label: 'films' },
  { key: 'music', label: 'music' },
  { key: 'anime', label: 'anime' },
  { key: 'thoughts', label: "things i'm thinking about" },
];

const Pastime = () => {
  const [tab, setTab] = useState<Tab>('all');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');

  const { films, loading: loadingFilms } = useLetterboxdFeed('Annyxtopheles');
  const { tracks, nowPlaying, loading: loadingMusic } = useLastfmFeed('Asphyxtonihil');
  const { items: animeList, loading: loadingAnime } = useAnimeFeed('Annyxtopheles');

  const openLightbox = (src?: string | null, alt = '') => {
    if (!src) return;
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SEOHead
        title="Pastime — Sadman Zaman Khan"
        description="A live pulse of cinema on Letterboxd, heavy music rotation on Last.fm, anime watching diary on MyAnimeList, and things I'm thinking about."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Pastime — Live Cultural Diary',
          description: 'A live stream of films, music, anime, and thoughts by Sadman Zaman Khan.',
          url: 'https://sadmanzamankhan.pages.dev/pastime',
        }}
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full">
        {/* Page Header */}
        <section className="pt-36 md:pt-44 lg:pt-52 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-scanport text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight mb-8 lowercase">
              pastime
            </h1>

            {/* Category Filter Tabs (Unboxed, pure opacity) */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-base font-normal lowercase tracking-normal">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`py-1 transition-opacity duration-200 cursor-pointer ${
                    tab === t.key
                      ? 'opacity-100 font-medium'
                      : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Live Now Playing Banner */}
        {nowPlaying && (tab === 'all' || tab === 'music') && (
          <section className="mb-12 max-w-2xl mx-auto">
            <a
              href={nowPlaying.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors group"
            >
              {nowPlaying.coverUrl ? (
                <img
                  src={nowPlaying.coverUrl}
                  alt={nowPlaying.name}
                  className="w-14 h-14 object-cover rounded-md shrink-0 grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                />
              ) : (
                <div className="w-14 h-14 rounded-md bg-foreground/10 flex items-center justify-center shrink-0">
                  🎵
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium opacity-50 mb-1">
                  <span className="inline-block size-2 rounded-full bg-foreground animate-pulse" />
                  <span>Now Playing (Spotify / Last.fm)</span>
                </div>
                <div className="font-medium text-base truncate group-hover:opacity-60 transition-opacity">
                  {nowPlaying.name}
                </div>
                <div className="text-base opacity-70 truncate">{nowPlaying.artist}</div>
              </div>
              <span className="opacity-40 group-hover:opacity-100 transition-opacity text-base pr-2">↗</span>
            </a>
          </section>
        )}

        {/* 1. FILMS SECTION (Letterboxd - 6 items) */}
        {(tab === 'all' || tab === 'films') && (
          <section className="pb-16 pt-4">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-scanport text-2xl md:text-3xl font-medium tracking-tight lowercase">
                films
              </h2>
              <a
                href="https://letterboxd.com/Annyxtopheles/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base lowercase opacity-40 hover:opacity-100 transition-opacity"
              >
                @annyxtopheles ↗
              </a>
            </div>

            {loadingFilms ? (
              <div className="py-8 text-base opacity-40 text-center">Loading diary…</div>
            ) : films.length === 0 ? (
              <div className="py-8 text-base opacity-40 text-center">No recent films logged.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {films.slice(0, 6).map((film) => (
                  <div key={film.id} className="group block">
                    <div
                      onClick={() => openLightbox(film.posterUrl, film.title)}
                      className="aspect-[2/3] bg-muted overflow-hidden mb-3 rounded-lg cursor-zoom-in relative"
                      title="Click to view poster"
                    >
                      {film.posterUrl ? (
                        <img
                          src={film.posterUrl}
                          alt={film.title}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="w-full h-full bg-foreground/5 flex items-center justify-center p-2 text-center text-xs opacity-50">
                          {film.title}
                        </div>
                      )}
                    </div>
                    <div>
                      <a
                        href={film.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium leading-snug line-clamp-1 group-hover:opacity-60 transition-opacity block"
                      >
                        {film.title}
                      </a>
                      <div className="flex flex-col items-start text-sm opacity-50 mt-1 space-y-0.5">
                        {film.rating && <span>{film.rating}</span>}
                        {film.pubDate && <span>{film.pubDate}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 2. MUSIC SECTION (Last.fm - 6 items) */}
        {(tab === 'all' || tab === 'music') && (
          <section className="pb-16 pt-4">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-scanport text-2xl md:text-3xl font-medium tracking-tight lowercase">
                music
              </h2>
              <a
                href="https://www.last.fm/user/Asphyxtonihil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base lowercase opacity-40 hover:opacity-100 transition-opacity"
              >
                @asphyxtonihil ↗
              </a>
            </div>

            {loadingMusic ? (
              <div className="py-8 text-base opacity-40 text-center">Loading scrobbles…</div>
            ) : tracks.length === 0 ? (
              <div className="py-8 text-base opacity-40 text-center">No recent tracks found.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {tracks.slice(0, 6).map((track) => (
                  <div key={track.id} className="group block">
                    <div
                      onClick={() => openLightbox(track.coverUrl, `${track.name} by ${track.artist}`)}
                      className="aspect-square bg-muted overflow-hidden mb-3 rounded-lg cursor-zoom-in relative"
                      title="Click to view album cover"
                    >
                      {track.coverUrl ? (
                        <img
                          src={track.coverUrl}
                          alt={track.name}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="w-full h-full bg-foreground/5 flex items-center justify-center text-xs opacity-50 p-2 text-center">
                          {track.album || track.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <a
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium leading-snug line-clamp-1 group-hover:opacity-60 transition-opacity block"
                      >
                        {track.name}
                      </a>
                      <div className="text-sm opacity-60 truncate mt-0.5">{track.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 3. ANIME SECTION (MyAnimeList - 6 items) */}
        {(tab === 'all' || tab === 'anime') && (
          <section className="pb-16 pt-4">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-scanport text-2xl md:text-3xl font-medium tracking-tight lowercase">
                anime
              </h2>
              <a
                href="https://myanimelist.net/profile/Annyxtopheles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base lowercase opacity-40 hover:opacity-100 transition-opacity"
              >
                @annyxtopheles ↗
              </a>
            </div>

            {loadingAnime ? (
              <div className="py-8 text-base opacity-40 text-center">Loading anime entries…</div>
            ) : animeList.length === 0 ? (
              <div className="py-8 text-base opacity-40 text-center">No recent anime updates.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {animeList.slice(0, 6).map((entry) => (
                  <div key={entry.id} className="group block">
                    <div
                      onClick={() => openLightbox(entry.coverUrl, entry.title)}
                      className="aspect-[2/3] bg-muted overflow-hidden mb-3 rounded-lg cursor-zoom-in relative"
                      title="Click to view artwork"
                    >
                      {entry.coverUrl ? (
                        <img
                          src={entry.coverUrl}
                          alt={entry.title}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="w-full h-full bg-foreground/5 flex items-center justify-center p-2 text-center text-xs opacity-50">
                          {entry.title}
                        </div>
                      )}
                    </div>
                    <div>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium leading-snug line-clamp-1 group-hover:opacity-60 transition-opacity block"
                      >
                        {entry.title}
                      </a>
                      <div className="flex flex-col items-start text-sm opacity-50 mt-1 space-y-0.5">
                        {entry.score && <span>★ {entry.score}/10</span>}
                        <span>{entry.finishDate || entry.status || 'watched'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 4. THINGS I'M THINKING ABOUT SECTION */}
        {(tab === 'all' || tab === 'thoughts') && (
          <section className="pb-24 pt-4">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-scanport text-2xl md:text-3xl font-medium tracking-tight lowercase">
                things i'm thinking about
              </h2>
              <span className="text-base lowercase opacity-40">thoughts &amp; philosophy</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONTEMPLATIONS.map((c) => (
                <article
                  key={c.id}
                  className="p-6 md:p-8 rounded-lg bg-foreground/5 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-wider opacity-40 font-medium mb-3">
                      <span>{c.category || 'thought'}</span>
                      {c.date && <span>{c.date}</span>}
                    </div>
                    <h3 className="font-scanport text-2xl font-medium mb-3 tracking-tight lowercase">
                      {c.title}
                    </h3>
                    <p className="text-base opacity-70 leading-relaxed font-sans">
                      {c.body}
                    </p>
                  </div>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm lowercase font-medium opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                    >
                      <span>read source</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Pastime;
