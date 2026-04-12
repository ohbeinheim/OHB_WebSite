# 🎵 Orchestre d'Harmonie de Beinheim — Site Web

Site statique officiel de l'**Orchestre d'Harmonie de Beinheim (OHB)**, association loi 1901 fondée en 2001.

🌐 **Site en ligne :** [orchestrebeinheim.com](https://orchestrebeinheim.com/)

---

## Structure du projet

```
OHB_WebSite/
├── html/
│   ├── index.html            # Accueil
│   ├── a-propos.html         # Histoire, répertoire, recrutement
│   ├── concerts.html         # Concerts passés, à venir, extraits vidéo
│   ├── galerie.html          # Galerie photos avec filtres et lightbox
│   ├── oae-oj.html           # Orchestre à l'École & Orchestre des Jeunes
│   ├── benevoles.html        # Équipe bénévole
│   ├── partenaires.html      # Partenaires institutionnels et privés
│   ├── dossier-presse.html   # Ressources médias & téléchargements
│   ├── contact.html          # Formulaire de contact
│   └── mentions-legales.html # Mentions légales (RGPD)
├── css/
│   └── style.css             # Feuille de styles principale (thème clair/sombre)
├── js/
│   └── main.js               # Navigation, animations, lightbox, thème
└── photos/
    ├── logo/                 # Logo OHB
    ├── hero/                 # Photos de fond des pages
    ├── concerts/             # Photos de concerts
    ├── galerie/              # Photos galerie
    ├── oae-oj/               # Photos OAE et Orchestre Junior
    ├── partenaires_institutionnels/
    └── partenaires_privés/
```

---

## Fonctionnalités

- **Thème clair / sombre** — bascule mémorisée via `localStorage`
- **Menu burger** — navigation mobile plein écran avec animation
- **Lightbox** — visionneuse photo avec navigation clavier (←/→/Echap)
- **Filtres galerie** — par catégorie (concerts, répétitions, animations…)
- **Extraits vidéo YouTube** — chargement à la demande (lazy load iframe)
- **Animations au scroll** — `fade-up` via `IntersectionObserver`
- **Compteurs animés** — chiffres clés sur la page d'accueil
- **Formulaire de contact** — validation côté client
- **Onglets** — concerts, OAE/OJ, partenaires
- **Design responsive** — mobile first, grilles adaptatives

---

## Technologies

- HTML5 / CSS3 / JavaScript vanilla — aucune dépendance externe
- Polices : [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Lato](https://fonts.google.com/specimen/Lato) (Google Fonts)
- Hébergement : GitHub Pages

---

## Contenu à compléter

- [ ] Fiches bénévoles (noms, rôles, photos)
- [ ] Infos pratiques OJ (âges, fréquence répétitions)
- [ ] PDF dossier de presse complet
- [ ] Photos Messti / Loto dans la galerie
- [ ] Connecter le formulaire de contact (ex : [Formspree](https://formspree.io))

---

## Réseaux sociaux

- [Facebook](https://www.facebook.com/OHBeinheim/)
- [Instagram](https://www.instagram.com/ohbeinheim/)
- [YouTube](https://www.youtube.com/@orchestredharmoniedebeinhe8247)
- [Email](mailto:ohbeinheim@gmail.com)

---

## Licence

Site développé bénévolement par un membre de l'OHB.  
Contenu (textes, photos, logo) © 2026 Orchestre d'Harmonie de Beinheim — tous droits réservés.
