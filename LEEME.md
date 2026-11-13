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

## ⚠️ Reglas nuevas de Firestore (obligatorio al actualizar)
Ahora la nube guarda los movimientos **partidos por meses** (un documento por mes), así no hay límite de tamaño. Para que funcione tienes que publicar las reglas nuevas: **Firestore → Reglas →** pega el contenido de `firestore.rules` → **Publicar**. Si reutilizas el proyecto de OpoTest, sustituye solo el bloque `match /gastos/{docId}` y deja el resto de tus reglas.
- Sin esas reglas, «Guardar en la nube» te avisará con «Falta publicar las reglas nuevas».
- Los datos antiguos se leen sin problema; se convierten al nuevo formato la primera vez que pulses «Guardar».
- **Antes de guardar, actualiza la app en todos tus dispositivos** (ábrela una vez con conexión para que se descargue la versión nueva). Una versión antigua no entiende el formato nuevo.
- Solo se reescriben los meses que han cambiado, y se comprueba que los meses cargados coinciden con el resumen antes de aplicarlos.

## Grupos: Pareja y Familia
El botón de arriba «👥 Grupos» abre dos pestañas:
- **Pareja**: igual que antes.
- **Familia** (estilo Tricount): creas un grupo con los miembros que quieras (sin límite, y puedes añadir o quitar después), apuntáis gastos indicando quién pagó y cómo se reparte (por igual entre los que elijas, o por importes), y la app calcula el saldo de cada uno y la liquidación con el mínimo de pagos. Pulsa «✓ Pagado» al hacer cada pago; también puedes copiar la liquidación para mandarla. No hay cuenta conjunta ni toca tus cuentas.
Para que se una el resto, comparte el código del grupo: cada uno entra con su cuenta de Google y elige quién es. Puedes tener **varios grupos a la vez** (por ejemplo «Familia» y «Viaje a Roma»): se cambia de uno a otro con las pastillas de arriba, y puedes **renombrar** el grupo. Usa la colección `grupos` que ya existe.

## Novedades de esta versión
- **Calculadora en el importe**: puedes escribir «12+3,50» o «45/3» y usar los botones ＋ − × ÷ =. Se calcula al guardar y se ve en vivo arriba.
- **Objetivo de ahorro mensual** (pestaña Cuentas): fija cuánto quieres ahorrar al mes y verás tu progreso y los últimos 6 meses.
- **Gráfica de cada cuenta**: el saldo de los últimos 6 meses dentro de la tarjeta de la cuenta.
- **Apartados**: al apuntar un gasto o ingreso de un apartado aparece un botón para que además reste o sume de la cuenta elegida (apagado por defecto).
- **Cuentas**: cada cuenta muestra sus últimos 5 movimientos, con «Ver todos» para filtrar la lista por esa cuenta.
- **Cuentas** (antes «Carpetas»): efectivo y bancos con saldo inicial, tarjetas de color, transferencias entre cuentas y totales «Total» / «Solo bancos».
- **Apartados independientes** (Categorías → «＋ Nuevo apartado»): como «Autoescuela». Llevan su propio saldo y NO cuentan en el saldo general ni en las cuentas. Puedes crear los que quieras.
- Editar movimientos (toca uno) y deslizar: derecha = editar, izquierda = borrar.
- Recurrentes, presupuestos por categoría, comparativa mensual, etiquetas, gráficos, exportar CSV.
- Fotos de tickets: se guardan solo en el dispositivo donde se hacen (no se sincronizan, por el límite de tamaño de Firestore).
- Bloqueo con PIN y huella / Face ID, recordatorio diario, negro puro y color de acento (pestaña «Más»).
- No hace falta tocar las reglas de Firestore: siguen igual.

## Sincronización manual (nueva)
La app NUNCA sube nada sola: solo guarda cuando pulsas «Guardar». Al abrirla (o volver a ella), si no tienes cambios sin guardar y hay una versión más nueva en la nube, la carga sola. Si tienes cambios sin guardar y la nube también cambió, te pregunta. Toca el botón ☁️ de arriba:
- **⬆️ Guardar en la nube**: sube lo de este dispositivo y sustituye la copia de la nube.
- **⬇️ Cargar de la nube**: trae la copia de la nube y sustituye lo de este dispositivo (con «Deshacer»).
- El panel muestra, para cada lado, nº de movimientos y fecha/dispositivo del último guardado.
- Si la nube tiene una versión más nueva que la tuya, te avisa antes de sobrescribir.
- Estados del botón: Al día · Sin guardar · Hay nueva · Revisar.
- Las reglas de Firestore siguen igual. Sube `index.html` y `sw.js` a GitHub.
