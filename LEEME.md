# Mis gastos: puesta en marcha

Archivos: `index.html`, `sw.js`, `manifest.webmanifest` (la app), `firestore.rules` y `firebase.json` (solo para Firebase).

## 1. Proyecto de Firebase
Puedes crear uno nuevo o reutilizar el de OpoTest. Si reutilizas, en el paso 3 AÑADE el bloque de `firestore.rules` a tus reglas actuales (dentro de `match /databases/{database}/documents { ... }`) sin reemplazarlas. La app usa su propia colección `gastos`, así que no se pisa con nada.

1. https://console.firebase.google.com → **Añadir proyecto** (Analytics no hace falta).

## 2. Inicio de sesión con Google
1. **Compilación → Authentication → Comenzar → Google → Habilitar** (elige tu correo de asistencia) → Guardar.
2. **Authentication → Configuración → Dominios autorizados → Añadir dominio**: `TUUSUARIO.github.io`.

## 3. Base de datos
1. **Compilación → Firestore Database → Crear base de datos** (modo producción, región `europe-west`).
2. Pestaña **Reglas** → pega el contenido de `firestore.rules` → **Publicar**.

## 4. Configuración en la app
1. Engranaje ⚙️ → **Configuración del proyecto → Tus apps → icono `</>` (Web)** → registra la app.
2. Copia `apiKey`, `authDomain`, `projectId` y `appId`.
3. Pégalos en la constante `CFG` del principio del script de `index.html`.
(La apiKey de una app web no es secreta; la seguridad la dan las reglas del paso 3.)

## 5. Publicar en GitHub Pages
1. Crea un repositorio y sube `index.html`, `sw.js` y `manifest.webmanifest`.
2. **Settings → Pages → Branch: main, carpeta / (root)** → Save.
3. Tu app queda en `https://TUUSUARIO.github.io/NOMBRE-REPO/`.

## 6. Usarla
Abre la URL en cada dispositivo, pulsa **☁️ Iniciar sesión** con la misma cuenta de Google y añádela a la pantalla de inicio.

## Gastos compartidos con tu pareja (reglas nuevas)
Si ya habías publicado las reglas antes, vuelve a **Firestore → Reglas**, pega el contenido nuevo de `firestore.rules` y pulsa **Publicar**. Sin esto, el botón «👥 Pareja» no podrá crear ni unirse a grupos.
Si reutilizas el proyecto de OpoTest, AÑADE el bloque `match /grupos/{gid}` a tus reglas en vez de reemplazarlas.
