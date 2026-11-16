declare module 'tz-lookup' {
  /** Returns the IANA time zone name for the given coordinates. */
  export default function tzlookup(lat: number, lng: number): string;
}
