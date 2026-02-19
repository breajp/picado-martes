# 💎 Antigravity Premium PWA Design System

Si querés replicar este estilo en otras webs, usá esta guía. Este diseño se basa en **"Layers of Glass"** (Capas de vidrio), **Mesh Gradients** y una **Tipografía Agresiva Itálica**.

## 🧠 El Mega Prompt para AIs (Claude, GPT, Gemini)

Copia y pega esto para que la IA entienda el "Vibe":

> "Necesito que diseñes una interfaz web con una estética 'Ultra-Premium PWA Sport'. El look-and-feel debe ser:
> 1. **Fondo:** Dark mode absoluto (#050505) con 'Mesh Gradients' (orbes de luz desenfocados en las esquinas) en colores Acier Blue (#0070f3) y Sunset Orange (#ff7e4b) con opacidad baja (20%).
> 2. **Componentes:** Usa Glassmorphism extremo. Tarjetas con background `rgba(255,255,255, 0.03)`, `backdrop-blur` de 40px y bordes muy finos de `rgba(255,255,255, 0.08)`.
> 3. **Tipografía:** Usa la fuente 'Outfit' o 'Inter'. Los títulos deben ser 'Font-Black' (900), Itálicos, en mayúsculas y con `tracking-tighter`. Usa `clamp()` para que los títulos sean gigantes en desktop y se ajusten en mobile.
> 4. **Botones/Pills:** Bordes muy redondeados (full capsule o rounded-2xl). Usa un color 'Lemon' (#ccff00) para acentos positivos y 'Orange' (#ff7e4b) para elementos destacados.
> 5. **Interactividad:** Micro-animaciones con Framer Motion (hover scale 1.02, fade-in de abajo hacia arriba). Tablas con números monoespaciados ('tabular-nums').
> 6. **Layout:** Mobile-first, centrado en una sola columna con una Navbar flotante en el 'bottom' que use `backdrop-blur` extremo y bordes de cristal."

---

## 🎨 Paleta de Colores (Tokens)

| Elemento | Hex | Variable CSS |
| :--- | :--- | :--- |
| Background | `#050505` | `--bg` |
| Acento Naranja | `#ff7e4b` | `--accent-orange` |
| Acento Limón | `#ccff00` | `--accent-lemon` |
| Acento Azul | `#0070f3` | `--accent-blue` |
| Glass Base | `rgba(255,255,255, 0.03)` | `--glass` |
| Glass Border | `rgba(255,255,255, 0.08)` | `--glass-border` |

---

## 🛠️ Clases Maestras (Tailwind)

Copiá esto en tu `globals.css`:

```css
/* El alma del diseño */
.pwa-card {
  @apply bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] rounded-[32px] overflow-hidden transition-all duration-500;
}

.pwa-mesh {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: #050505;
  overflow: hidden;
}

.pwa-title {
  @apply font-black italic uppercase tracking-tighter leading-[0.85];
  font-size: clamp(3rem, 10vw, 7rem);
}

.pwa-input {
  @apply w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-orange transition-all font-black italic appearance-none;
}
```

---

## 📱 Navbar Flotante (Template)

La navbar debe ir siempre fija al fondo:
```tsx
<nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-[500px]">
    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full px-4 py-3 shadow-2xl">
        {/* Links con tracking-widest y font-black */}
    </div>
</nav>
```
