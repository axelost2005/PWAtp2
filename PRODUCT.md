# Product

## Register

brand

## Users

Estudiantes y docentes que evalúan el TP "Football Teams", más cualquier hincha
que explora equipos del fútbol argentino. Entran desde desktop o mobile, miran
la landing unos segundos y deciden si la app se siente profesional o "TP básico".

## Product Purpose

PWA que lista equipos del fútbol argentino (logo, liga, estadio, descripción),
permite buscarlos, ver el detalle y guardarlos como favoritos, en ES/EN.
El éxito visual: que la Home impacte como una landing premium deportiva sin
romper ninguna funcionalidad existente.

## Brand Personality

Deportivo, premium, nocturno. Energía de estadio de noche: fondo profundo,
colores vivos del club protagonista, tipografía display fuerte (Anton) sobre
cuerpo neutro (Inter). Animaciones suaves y contenidas, nunca circenses.

## Anti-references

- TOONHUB literal (textos o muñecos): se adapta el patrón de carrusel, no el contenido.
- Landing "TP básico": cards blancas planas, inputs sin diseño, spacing pobre.
- Glassmorphism decorativo en todos lados; solo sutil y funcional (nav, controles).
- Slop genérico de AI: eyebrows uppercase en cada sección, gradient text, métricas hero.

## Design Principles

1. El club activo manda: el color de fondo, el ghost text y el badge salen de la identidad del equipo seleccionado.
2. La funcionalidad es intocable: búsqueda, favoritos, rutas e idiomas siguen funcionando idénticos.
3. Una idea dominante por fold: hero = carrusel protagonista; debajo, el listado completo.
4. Motion con propósito: transiciones de 650ms con cubic-bezier(0.4, 0, 0.2, 1), bloqueo durante animación, fallback para reduced motion.
5. Mobile primero en jerarquía: el equipo central se ve grande sin overflow horizontal.

## Accessibility & Inclusion

Botones con aria-label traducidos, foco visible, contraste ≥4.5:1 para texto de
cuerpo sobre fondo oscuro, `prefers-reduced-motion` respetado en todas las
animaciones.
