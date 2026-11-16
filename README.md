# Editor hvězdných map

Jednoduchý editor hvězdných map v Next.js. Mapu si nastavíte v prohlížeči
(místo, datum a čas, texty, vzhled) a exportujete ji do PDF přes tiskový
dialog prohlížeče. Žádná databáze ani backend, všechno běží v prohlížeči.

## Spuštění

```bash
npm install
npm run dev
```

Pak otevřete http://localhost:3000.

## Export do PDF

1. V editoru klikněte na **Export do PDF**.
2. Počkejte pár sekund, než se mapa vykreslí ve vysokém rozlišení.
3. Klikněte na **STÁHNOUT MAPU V PDF** a v tiskovém dialogu zvolte
   „Uložit jako PDF“ (zapněte tisk pozadí / grafiky na pozadí).

## Deploy na Vercel

Projekt je statický Next.js bez proměnných prostředí. Stačí ho importovat
na https://vercel.com/new, výchozí nastavení (framework Next.js,
`npm run build`) funguje bez úprav.

## Struktura

- `components/editor` – editor (nastavení v `mapSetup`, náhled v `preview`)
- `components/export` – rozložení mapy pro tisk do PDF
- `store` – stav editoru (Redux Toolkit)
- `public/celestial` – knihovna [d3-celestial](https://github.com/ofrohn/d3-celestial)
  a katalog hvězd (BSD licence, viz `public/celestial/lib/LICENSE.d3-celestial`)
- `public/img` – pozadí map (`editorDesigns` pro náhled, `exportDesigns` pro tisk)

## Externí služby

- Hledání míst: [Photon](https://photon.komoot.io) (OpenStreetMap, bez API klíče).
  Souřadnice lze zadat i ručně.
- Fonty: Google Fonts.
- Časové pásmo místa se dopočítává offline knihovnou `tz-lookup`.
