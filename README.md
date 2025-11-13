# tg-winter-game

Vue 3 + TypeScript + TailwindCSS



- Подключить TailwindCSS
- Подключить шрифт и общие цвета для проекта
- Сделать layout и menu внизу
- Сделать компонент Dialog
- Сделать компонент Sheart
- Приступить к главному экрану

Компонентная архитектура

| Уровень       | Пример                            | Назначение               |
| ------------- | --------------------------------- | ------------------------ |
| **Atoms**     | `Button.vue`, `Input.vue`         | Базовые UI элементы      |
| **Molecules** | `LoginForm.vue`, `UserCard.vue`   | Комбинация атомов        |
| **Organisms** | `ChatSidebar.vue`, `Navbar.vue`   | Сложные блоки интерфейса |
| **Pages**     | `ChatPage.vue`, `ProfilePage.vue` | Целостные страницы       |

```sh
src/
├── assets/              # изображения, шрифты, статичные файлы
├── components/          # базовые переиспользуемые компоненты
│   ├── ui/              # атомарные UI-компоненты (Button, Input, Modal)
│   ├── layout/          # шапка, сайдбар, футер и т.п.
│   └── shared/          # общие, часто используемые блоки (Card, Avatar)
│
├── features/            # функциональные модули (авторизация, чат, профиль)
│   ├── chat/
│   │   ├── components/  # внутренние компоненты фичи
│   │   ├── store/       # локальный Pinia store
│   │   └── api/         # API-запросы фичи
│   └── auth/
│       ├── components/
│       └── composables/
│
├── pages/               # страницы маршрутов (Vue Router)
│   ├── Home.vue
│   ├── Chat.vue
│   └── Profile.vue
│
├── composables/         # хуки и бизнес-логика (useFetch, useSocket, useTheme)
├── stores/               # глобальные Pinia stores
├── router/              # маршруты
├── utils/               # утилиты (форматирование, helpers)
├── types/               # типы TS (интерфейсы, модели)
├── styles/              # глобальные стили, Tailwind, SCSS
└── App.vue
```



This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
