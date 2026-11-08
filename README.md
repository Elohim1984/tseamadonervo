# tseamadonervo
## Cómo se publica un cambio

La app está en `app.jsx`. Después de editarla:

```
cd herramientas && npm install   # solo la primera vez
node herramientas/construir.js
```

Eso revisa el código, genera `app.js` (lo que el navegador ejecuta directo, sin Babel) y `tailwind.css`, y pone la versión nueva en `index.html`. Hay que subir los cuatro archivos juntos. Si `app.js` no corresponde a la versión de `index.html`, la página usa el plan B (prepara `app.jsx` en el navegador) y sigue funcionando, solo que más lenta.
