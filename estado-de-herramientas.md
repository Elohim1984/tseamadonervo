# Estado de herramientas — Telesecundaria "Amado Nervo"

*Este documento se actualiza (no se duplica) cada vez que algo cambia. Refleja el estado real más reciente de cada archivo del repositorio.*

---

## Archivos en el repositorio (`github.com/Elohim1984/tseamadonervo`, rama `principal`)

| Archivo | Qué es | Estado (10 sept 2026) |
|---|---|---|
| `index.html` | Portal público + Control Escolar completo (fusión en cascada: portada → candado dirección/docentes → app completa) | ✅ Al día. 13 pestañas: Inicio, Diagnóstico, Asistencia, Inscripciones, Directorio, Calificaciones, Avisos, Calendario, CTE, Reglamento, Programa Analítico y PIC, Documentos de Dirección, Recursos. Enlaces a PIC/Programa Analítico/PEMC ya apuntan a archivos locales, no a claude.ai. Portada pública ("Herramientas del ciclo") y pestaña Recursos ya incluyen la tarjeta/enlace de EIA |
| `examen.html` | Examen diagnóstico académico (55 reactivos, 3 grados) | ✅ Al día. Selector de alumnos inscritos + botón imprimir/PDF combinados |
| `diagnostico.html` | Diagnóstico Integral (socioemocional, socioeconómico, aprendizaje, académico, comunitario) | ✅ Al día. Apellidos separados + orden alfabético + botón Editar + imprimir + jalado automático de inscritos (bug de `ESCUELA_GRUPO` corregido) |
| `estilosaprendizaje.html` | VAK (Visual/Auditivo/Kinestésico) | ✅ Al día. Editar/Eliminar/Imprimir, agrupado por grado |
| `EIA_2026-2027_Fase6_Telesecundaria.html` | Ejercicios Integradores del Aprendizaje (diagnóstico oficial SEP, Fase 6) | ✅ Al día. Migrado de localStorage a las 4 acciones genéricas; alumnos se leen de Control Escolar (ya no hay registro manual propio); ya enlazada desde la portada pública y desde Recursos dentro de Control Escolar |
| `pic-2026-2027.html` | Documento PIC 2026-2027 (consulta) | ✅ Nuevo (10 sept). Extraído de artefacto de Claude a archivo plano |
| `programa-analitico-2026-2027.html` | Programa Analítico por Campos Formativos (consulta) | ✅ Nuevo (10 sept). Extraído de artefacto de Claude a archivo plano |
| `pemc-2026-2027.html` | Programa Escolar de Mejora Continua (consulta) | ✅ Nuevo (10 sept). Extraído de artefacto de Claude a archivo plano |
| `lector_omr.html` | Lector de hojas de respuestas por foto (OMR) para el Examen aplicado en papel | Entregado, probado solo con fotos sintéticas — falta prueba con fotos reales del director |

## Solo como página de Claude (correcto dejarlo así, sin datos de alumnos)

- **Reglamento de Convivencia:** `https://claude.ai/code/artifact/8fcbd47e-0fde-414d-b540-4133c343d1b0` — es solo texto de consulta, no captura datos, no necesita migrarse.

## Dentro de Control Escolar (`index.html`) — módulos internos

- **Documentos de Dirección (APF):** 6 documentos oficiales completos (Primera Convocatoria, Acta Constitutiva, Lista de Asistencia, Acta Entrega-Recepción, Constancia de Registro, Informe Bimestral ×6), cada uno con vista previa + botón de imprimir independiente + botón "Exportar datos" para generar los PDFs oficiales reales.
- **Programa Analítico y PIC (pestaña interna):** formularios de contextualización y codiseño por grado/trimestre, más las 3 tarjetas de consulta hacia los documentos completos.

## Herramientas de generación de PDFs (fuera del sitio, scripts locales)

- `llenar_documentos_apf.py` — llena los 6 PDFs oficiales de APF a partir del JSON exportado desde Documentos de Dirección.
- `estampado_acentos.py` — corrige un bug de pypdf con acentos en Helvetica.
- `llenar_pdf.py` — llena las cédulas oficiales SEP por alumno (33 cédulas ya generadas y verificadas).

---

*Última actualización: 10 de septiembre de 2026.*
