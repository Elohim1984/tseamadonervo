// Prepara la app para publicarla. Uso (desde la carpeta del repositorio):
//   cd herramientas && npm install   (solo la primera vez)
//   node herramientas/construir.js
// 1) Revisa y convierte app.jsx en app.js (lo que el navegador ejecuta directo, sin Babel).
// 2) Genera tailwind.css con solo los estilos que la app usa (antes se generaban en cada celular).
// 3) Pone la versión nueva en index.html para que los navegadores no usen copias viejas.
const fs = require("fs"), path = require("path"), crypto = require("crypto"), { execFileSync } = require("child_process");
const raiz = path.join(__dirname, "..");
const req = (m) => require(require.resolve(m, { paths: [__dirname, process.cwd()] }));
const Babel = req("@babel/standalone");
const fuente = fs.readFileSync(path.join(raiz, "app.jsx"), "utf8");
const version = crypto.createHash("sha1").update(fuente).digest("hex").slice(0, 12);
let codigo;
try {
  codigo = Babel.transform(fuente, { presets: [["react", { runtime: "classic" }]], compact: true, comments: false }).code;
} catch (e) { console.error("ERROR en app.jsx, no se publicó nada:\n" + e.message); process.exit(1); }
fs.writeFileSync(path.join(raiz, "app.js"), `/* Generado por herramientas/construir.js desde app.jsx. No editar a mano. */\n${codigo}\nwindow.__VERSION_APP_JS="${version}";\n`);
// Tailwind
const cfg = path.join(__dirname, "tailwind.config.js"), entrada = path.join(__dirname, "tailwind.entrada.css");
const bin = require.resolve("tailwindcss/lib/cli.js", { paths: [__dirname, process.cwd()] });
execFileSync(process.execPath, [bin, "-c", cfg, "-i", entrada, "-o", path.join(raiz, "tailwind.css"), "--minify"], { stdio: "inherit", cwd: raiz });
// Versión en index.html
const idx = path.join(raiz, "index.html");
let html = fs.readFileSync(idx, "utf8");
html = html.replace(/window\.__VERSION_APP = "[^"]*"/, `window.__VERSION_APP = "${version}"`)
           .replace(/app\.js\?v=[^"]*"/, `app.js?v=${version}"`)
           .replace(/tailwind\.css\?v=[^"]*"/, `tailwind.css?v=${version}"`);
fs.writeFileSync(idx, html);
console.log(`Listo. Versión ${version} · app.js ${(codigo.length / 1e6).toFixed(2)} MB`);
