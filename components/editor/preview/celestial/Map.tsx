import { useEffect, useState } from 'react';
import tzlookup from 'tz-lookup';
import { useMapConfig, useMapInfo } from '../../../../store/store';

// d3-celestial (https://github.com/ofrohn/d3-celestial) is an old browser
// library built on d3 v3 globals, so it is served from /public and loaded
// with plain script tags instead of being bundled.
const SCRIPTS = [
  '/celestial/lib/d3.min.js',
  '/celestial/lib/d3.geo.projection.min.js',
  '/celestial/lib/celestial.min.js',
];

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

let celestialPromise: Promise<any> | undefined;

const loadCelestial = () => {
  celestialPromise ??= SCRIPTS.reduce(
    (loaded, src) => loaded.then(() => loadScript(src)),
    Promise.resolve()
  ).then(() => (window as any).Celestial);
  return celestialPromise;
};

/** UTC offset (in minutes) of the given time zone at the given moment. */
const utcOffset = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).formatToParts(date);
  const part = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);
  const wallClock = Date.UTC(
    part('year'),
    part('month') - 1,
    part('day'),
    part('hour'),
    part('minute')
  );
  return Math.round((wallClock - date.getTime()) / 60000);
};

/**
 * The picked date and time is meant as local time at the picked place.
 * The time zone is looked up offline from the coordinates (d3-celestial
 * would otherwise call the timezonedb.com API for it).
 */
const getSkyview = (date: Date, geopos: string[]) => {
  const location = geopos.map(Number);
  const timeZone = tzlookup(location[0], location[1]);
  // the offset is first estimated at the browser-local moment and then
  // refined at the actual moment (matters only around DST changes)
  const localOffset = -date.getTimezoneOffset();
  const estimate = utcOffset(date, timeZone);
  const moment = new Date(date.getTime() - (estimate - localOffset) * 60000);
  return { date, location, timezone: utcOffset(moment, timeZone) };
};

export default function Map() {
  const config = useMapConfig();
  const date = useMapInfo().timeOnMap;
  const [celestial, setCelestial] = useState<any>(null);

  useEffect(() => {
    loadCelestial().then(setCelestial);
  }, []);

  useEffect(() => {
    if (!celestial) return;
    celestial.display(config);
    celestial.skyview(getSkyview(date, config.geopos));
  }, [celestial, date]);

  useEffect(() => {
    celestial?.reload(config);
  }, [celestial, config]);

  useEffect(() => {
    celestial?.skyview(getSkyview(date, config.geopos));
  }, [celestial, config.geopos]);

  return <div id="map" />;
}
