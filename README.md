# Beccasoft — Sitio Corporativo Angular 20

Sitio web corporativo de **Beccasoft**, integrador tecnológico especializado en facturación
electrónica para empresas colombianas.

Producto principal: **[BeccaFact](https://www.beccafact.com)** — Mini ERP SaaS de integración
y gestión empresarial.

> **Nota conceptual:** Beccasoft es **integrador tecnológico**, no proveedor autorizado DIAN.
> La emisión electrónica se realiza a través de un proveedor tecnológico autorizado mediante API.

---

## Requisitos

| Herramienta | Versión |
|-------------|---------|
| Node.js     | 20.x LTS |
| npm         | 10.x    |
| Angular CLI | 20.3.x  |

---

## Instalación

```bash
# 1. Node 20 con nvm
nvm install 20
nvm use 20

# 2. Angular CLI global
npm install -g @angular/cli@20

# 3. Instalar dependencias
cd beccasoft
npm install

# 4. Servidor de desarrollo
ng serve --open
# → http://localhost:4200
```

---

## Scripts

| Comando             | Descripción                      |
|---------------------|----------------------------------|
| `ng serve`          | Dev server (puerto 4200)         |
| `ng build`          | Build de producción              |
| `npm run build:prod`| Build optimizado                 |

---

## Estructura

```
beccasoft/
├── angular.json
├── package.json
├── .nvmrc                              # Node 20
├── tsconfig.json / tsconfig.app.json
├── public/
│   └── favicon.svg
└── src/
    ├── index.html                      # SEO + Google Fonts
    ├── main.ts
    ├── environments/
    │   ├── environment.ts
    │   └── environment.production.ts
    ├── styles/
    │   ├── _variables.scss             # Design tokens
    │   ├── _mixins.scss                # Mixins + keyframes
    │   ├── base.scss                   # Reset + clases globales
    │   └── main.scss                   # Entry point
    └── app/
        ├── app.component.ts
        ├── app.config.ts
        ├── app.routes.ts
        ├── core/
        │   ├── services/scroll.service.ts
        │   └── guards/home.guard.ts
        ├── shared/
        │   ├── components/
        │   │   ├── navbar/             # Navbar fija con scroll detection
        │   │   └── footer/             # Footer + aviso legal integrador
        │   └── directives/
        │       └── scroll-animation.directive.ts
        └── features/
            ├── home/
            │   ├── components/
            │   │   ├── hero/                  # Hero con dashboard animado
            │   │   ├── what-is-beccafact/     # Mini ERP SaaS
            │   │   ├── integration-model/     # Diagrama: Cliente → Beccasoft → Proveedor → DIAN
            │   │   ├── benefits/              # 6 beneficios
            │   │   ├── how-it-works/          # 4 pasos de integración
            │   │   ├── plans/                 # 3 planes
            │   │   └── cta/                   # CTA principal
            │   └── pages/home/
            └── contact/                       # Página de contacto
```

---

## Posicionamiento de marca

| Concepto         | Descripción |
|------------------|-------------|
| **Beccasoft**    | Integrador tecnológico de facturación electrónica |
| **BeccaFact**    | Plataforma SaaS (Mini ERP) desarrollada por Beccasoft |
| **Rol DIAN**     | Integra con proveedor autorizado vía API (NO es emisor directo) |
| **Diferencial**  | Automatización, integración a medida, gestión empresarial |

---

## Correcciones técnicas incluidas

- `includePaths: ["src"]` en `angular.json` → todos los SCSS usan `@use 'styles/variables' as v`
- Sin `RouterLinkActive` (no se usa)
- Estilos de componentes en archivos `.scss` externos (sin inline BEM)
- Sin `mixed-decls` deprecation en SCSS
- Standalone components + lazy loading
- Guard funcional en ruta raíz

---

*Beccasoft SAS · Colombia · [beccasoft.com](https://beccasoft.com)*
