# Beccasoft — Sitio Corporativo Angular 20

Sitio web corporativo de **Beccasoft**, landing comercial de
[BeccaFact](https://beccafact.com), software SaaS de facturación electrónica en Colombia.

---

## Requisitos

| Herramienta   | Versión mínima |
|---------------|---------------|
| Node.js       | 20.x LTS      |
| npm           | 10.x          |
| Angular CLI   | 20.3.x        |

---

## Instalación paso a paso

```bash
# 1. Instalar Node 20 con nvm (Linux/macOS)
nvm install 20
nvm use 20
nvm alias default 20

# Verificar
node -v   # v20.x.x
npm  -v   # 10.x.x

# 2. Instalar Angular CLI globalmente
npm install -g @angular/cli@20

# 3. Entrar al proyecto
cd beccasoft

# 4. Instalar dependencias
npm install

# 5. Iniciar servidor de desarrollo
ng serve --open
# → http://localhost:4200
```

---

## Scripts

| Comando              | Descripción                         |
|----------------------|-------------------------------------|
| `ng serve`           | Servidor dev (puerto 4200)          |
| `ng build`           | Build de producción                 |
| `npm run build:prod` | Build optimizado para producción    |
| `ng build --watch`   | Build con recarga automática        |

---

## Estructura del proyecto

```
beccasoft/
├── angular.json                   # Configuración Angular CLI
├── package.json                   # Dependencias
├── tsconfig.json                  # TypeScript base
├── tsconfig.app.json              # TypeScript app
├── tsconfig.spec.json             # TypeScript tests
├── public/
│   └── favicon.svg                # Favicon SVG
└── src/
    ├── index.html                 # HTML + SEO meta tags
    ├── main.ts                    # Bootstrap
    ├── environments/
    │   ├── environment.ts         # Dev
    │   └── environment.production.ts
    ├── styles/
    │   ├── _variables.scss        # Design tokens (colores, tipografía, espaciado)
    │   ├── _mixins.scss           # Mixins SCSS reutilizables
    │   ├── base.scss              # Reset + clases globales (.btn, .container, etc.)
    │   └── main.scss              # Entry point global
    └── app/
        ├── app.component.ts       # Componente raíz
        ├── app.config.ts          # Providers (Router, etc.)
        ├── app.routes.ts          # Rutas con lazy loading
        ├── core/
        │   ├── services/
        │   │   └── scroll.service.ts      # Servicio de scroll suave
        │   └── guards/
        │       └── home.guard.ts          # Guard de ruta (extensible)
        ├── shared/
        │   ├── components/
        │   │   ├── navbar/                # Navbar fija, responsive, scroll-aware
        │   │   └── footer/                # Footer corporativo completo
        │   └── directives/
        │       └── scroll-animation.directive.ts  # Animación fadeInUp al hacer scroll
        └── features/
            ├── home/
            │   ├── components/
            │   │   ├── hero/              # Hero section con dashboard animado
            │   │   ├── what-is-beccafact/ # ¿Qué es BeccaFact? (6 features)
            │   │   ├── benefits/          # Beneficios (layout sticky)
            │   │   ├── how-it-works/      # 4 pasos de implementación
            │   │   ├── plans/             # 3 planes (Pyme, Empresarial, Personalizado)
            │   │   └── cta/               # CTA principal fondo azul oscuro
            │   └── pages/
            │       └── home/              # Página ensambladora de la landing
            └── contact/                   # Página de contacto
```

---

## Solución de errores comunes

### Error: `Can't find stylesheet to import`
El proyecto usa `includePaths: ["src"]` en `angular.json`.
Todos los SCSS de componentes importan con:
```scss
@use 'styles/variables' as v;
@use 'styles/mixins' as m;
```

### Error: `RouterLinkActive is not used`
Eliminado en la versión corregida. El navbar solo usa `RouterLink`.

### Error: `CSS nesting syntax` en `contact.component`
Los estilos del componente de contacto ahora están en un archivo `.scss` externo
con clases BEM planas (sin `&__` que cause conflictos con CSS nativo).

---

## Tecnologías

- **Angular 20.3** — Standalone components, Lazy loading, Signals
- **SCSS** — Variables, Mixins, BEM
- **IntersectionObserver** — Animaciones scroll via directiva
- **CSS Grid + Flexbox** — Layouts responsivos
- **Mobile first** — Breakpoints: 576 / 768 / 1024 / 1280 px
- **SEO básico** — Meta tags, Open Graph, structured data

---

*Beccasoft SAS · Colombia · [beccasoft.com](https://beccasoft.com)*
# beccasoft
