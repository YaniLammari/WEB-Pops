# 🍔 FoodFlow - Système de Gestion de Restaurant

Application web moderne de gestion de restaurant avec tableau de bord, gestion des commandes, système de caisse, gestion des stocks et agent IA réceptionniste.

![FoodFlow](https://img.shields.io/badge/React-18.3.1-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff)

## ✨ Fonctionnalités

- 📊 **Dashboard** - Vue d'ensemble avec statistiques en temps réel
- 🛒 **Gestion des Commandes** - Suivi en temps réel avec statuts
- 💰 **Caisse (POS)** - Système de point de vente complet
- 📦 **Gestion des Stocks** - Suivi des stocks avec recherche
- 🤖 **Agent IA** - Statistiques de l'agent réceptionniste
- 📱 **Design Responsive** - Mobile, tablette et desktop

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/foodflow.git
cd foodflow
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez http://localhost:5173 dans votre navigateur

## 📦 Build Production

```bash
npm run build
npm run preview
```

## 🛠️ Technologies

- React 18
- Vite
- Tailwind CSS
- Lucide React

## 📁 Structure

```
foodflow/
├── src/
│   ├── App.jsx        # Composant principal
│   ├── main.jsx       # Point d'entrée
│   └── index.css      # Styles Tailwind
├── index.html
├── package.json
└── README.md
```

## 🌐 Déploiement

### Vercel
1. Importez votre repository GitHub
2. Vercel détecte automatiquement Vite
3. Déployez

### Netlify
```bash
npm run build
```
Puis glissez-déposez le dossier `dist/`

### GitHub Pages
```bash
npm run build
git subtree push --prefix dist origin gh-pages
```

## 📄 License

MIT License

## 🤝 Contribution

Les contributions sont bienvenues !

1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Push vers la branche
5. Ouvrez une Pull Request
