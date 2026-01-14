# Copilot Instructions - DevPort Website

## Project Overview

Dit is een **Hugo static site** voor DevPort.nl, een Nederlands IT-consultancybedrijf. De site gebruikt het **Meghna Hugo theme** met meertalige ondersteuning (Nederlands + Engels).

## Architectuur

### Contentstructuur
- **Homepage secties**: Gedefinieerd in `data/{nl,en}/*.yml` - elke sectie (banner, about, team, etc.) heeft een apart YAML-bestand
- **Pagina's met markdown**: `content/job/*.{nl,en}.md` voor vacatures, `content/author/*.{nl,en}.md` voor auteurs
- **Thema partials**: `themes/meghna-hugo/layouts/partials/*.html` - rendert data uit `data/` bestanden
- **i18n strings**: `i18n/{nl,en}.yaml` voor vertaalbare UI-teksten

### Meertalige conventies
- Nederlands is de **defaultContentLanguage** (`config.yaml`)
- Content bestanden: `<slug>.<lang>.md` patroon (bijv. `devops-engineer.nl.md`)
- Data bestanden: gescheiden folders `data/nl/` en `data/en/`
- Nieuwe content altijd in **beide talen** aanmaken

## Belangrijke patronen

### Nieuwe homepage sectie toevoegen
1. Maak data bestand: `data/nl/<sectie>.yml` + `data/en/<sectie>.yml`
2. Maak partial: `themes/meghna-hugo/layouts/partials/<sectie>.html`
3. Include in `themes/meghna-hugo/layouts/index.html`

### Nieuwe vacature toevoegen
Maak twee bestanden in `content/job/`:
```yaml
# content/job/nieuwe-rol.nl.md
---
title: Functienaam
date: 2026-01-14T12:00:00+02:00
image_webp: images/job/afbeelding.webp
image: images/job/afbeelding.jpg
description: Korte beschrijving
email: joinus@devport.nl
---
# Markdown content hier
```

### Afbeeldingen
- Plaats in `static/images/<categorie>/` (team, job, portfolio, etc.)
- Gebruik altijd WebP + fallback: `image_webp` én `image` velden
- Pad in content is relatief: `images/team/naam.webp`

## Ontwikkelen

```bash
# Lokale server starten
hugo server

# Bouwen voor productie
hugo --minify
```

## CMS & Deployment

- **Decap CMS** beschikbaar op `/admin/` - configuratie in `static/admin/config.yml`
- **GitHub Pages** deployment via `.github/workflows/gh-pages.yml`
- OAuth voor CMS: Azure Function in `oauthfunc/` (GitHub OAuth callback)

## Themify Icons

Gebruik `ti-*` iconen voor UI elementen. Beschikbaar in `themes/meghna-hugo/static/plugins/themify-icons/`.
Voorbeelden: `ti-linkedin`, `ti-shield`, `ti-light-bulb`, `ti-briefcase`
