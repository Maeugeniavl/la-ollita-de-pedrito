import { useState, useEffect } from "react";

const STORAGE_KEY = "pedro-saved-recipes";
const pastelBg = "linear-gradient(135deg, #fdf6ec 0%, #fce8d5 50%, #fdf0e8 100%)";

const palette = {
  cream: "#fdf6ec", peach: "#f4a96a", softOrange: "#e8824a",
  deepOrange: "#c4612a", sage: "#7a9e7e", softSage: "#a8c5ac",
  warmGray: "#7a6a5a", lightGray: "#f0e8e0", white: "#fffdf9",
  blw: "#6a8fc4", blwLight: "#d5e4f4",
};
const fonts = { display: "'Playfair Display', Georgia, serif", body: "'DM Sans', 'Segoe UI', sans-serif" };

function Tag({ children, color = palette.peach }) {
  return <span style={{ background: color, color: palette.white, borderRadius: 20, padding: "2px 12px", fontSize: 11, fontFamily: fonts.body, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{children}</span>;
}

function Card({ children, style = {} }) {
  return <div style={{ background: palette.white, borderRadius: 20, padding: 24, boxShadow: "0 2px 16px rgba(196,97,42,0.08)", ...style }}>{children}</div>;
}

function Btn({ children, onClick, variant = "primary", style = {}, disabled = false }) {
  const base = { border: "none", borderRadius: 12, padding: "10px 22px", fontFamily: fonts.body, fontWeight: 600, fontSize: 14, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.18s", opacity: disabled ? 0.5 : 1, ...style };
  const variants = {
    primary: { background: palette.softOrange, color: palette.white },
    secondary: { background: palette.lightGray, color: palette.warmGray },
    sage: { background: palette.sage, color: palette.white },
    ghost: { background: "transparent", color: palette.softOrange, border: `1.5px solid ${palette.softOrange}` },
    blw: { background: palette.blw, color: palette.white },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant] }}>{children}</button>;
}

function Input({ label, type = "number", value, onChange, unit, min, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, ...style }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12, color: palette.warmGray, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input type={type} value={value} min={min} onChange={e => onChange(e.target.value === "" ? "" : String(parseInt(e.target.value, 10) || 0))} style={{ border: `1.5px solid ${palette.lightGray}`, borderRadius: 10, padding: "8px 12px", fontFamily: fonts.body, fontSize: 15, background: palette.cream, color: palette.deepOrange, fontWeight: 600, width: "100%", outline: "none" }} />
        {unit && <span style={{ fontFamily: fonts.body, fontSize: 13, color: palette.warmGray, whiteSpace: "nowrap" }}>{unit}</span>}
      </div>
    </div>
  );
}

function VolumePanel({ onVolumeCalc }) {
  const [gramsPerMeal, setGramsPerMeal] = useState(120);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [days, setDays] = useState(4);
  const total = gramsPerMeal * mealsPerDay * days;
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 24 }}>⚖️</span>
        <h2 style={{ fontFamily: fonts.display, fontSize: 20, color: palette.deepOrange, margin: 0 }}>Configurar volumen</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        <Input label="Gramos por comida" value={gramsPerMeal} onChange={v => setGramsPerMeal(Number(v))} unit="g" min={10} />
        <Input label="Comidas al día" value={mealsPerDay} onChange={v => setMealsPerDay(Number(v))} unit="veces" min={1} />
        <Input label="Días" value={days} onChange={v => setDays(Number(v))} unit="días" min={1} />
      </div>
      <div style={{ background: pastelBg, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontFamily: fonts.body, fontSize: 14, color: palette.warmGray }}>Total a cocinar</span>
        <span style={{ fontFamily: fonts.display, fontSize: 28, color: palette.deepOrange, fontWeight: 700 }}>{total.toLocaleString()} g</span>
      </div>
      <Btn onClick={() => onVolumeCalc({ gramsPerMeal, mealsPerDay, days, total })}>Usar este volumen →</Btn>
    </Card>
  );
}

function StyleSelector({ value, onChange }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12, color: palette.warmGray, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 10 }}>
        Estilo de alimentación
      </label>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => onChange("papilla")} style={{ flex: 1, padding: "12px 0", border: `2px solid ${value === "papilla" ? palette.softOrange : palette.lightGray}`, borderRadius: 14, background: value === "papilla" ? `${palette.softOrange}15` : palette.white, cursor: "pointer", transition: "all 0.18s" }}>
          <div style={{ fontSize: 24 }}>🥣</div>
          <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 13, color: value === "papilla" ? palette.softOrange : palette.warmGray, marginTop: 4 }}>Papilla</div>
          <div style={{ fontFamily: fonts.body, fontSize: 11, color: palette.warmGray }}>puré / triturado</div>
        </button>
        <button onClick={() => onChange("blw")} style={{ flex: 1, padding: "12px 0", border: `2px solid ${value === "blw" ? palette.blw : palette.lightGray}`, borderRadius: 14, background: value === "blw" ? `${palette.blw}15` : palette.white, cursor: "pointer", transition: "all 0.18s" }}>
          <div style={{ fontSize: 24 }}>✋</div>
          <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 13, color: value === "blw" ? palette.blw : palette.warmGray, marginTop: 4 }}>BLW</div>
          <div style={{ fontFamily: fonts.body, fontSize: 11, color: palette.warmGray }}>finger food</div>
        </button>
      </div>
    </div>
  );
}

function CookingTimeline({ ingredients }) {
  const sorted = [...ingredients].sort((a, b) => (b.cook_minutes || 0) - (a.cook_minutes || 0));
  const maxTime = sorted[0]?.cook_minutes || 1;
  return (
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ fontFamily: fonts.body, fontSize: 12, color: palette.warmGray, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
        🍳 Orden de cocción en la olla
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((ing, i) => {
          const pct = Math.round(((ing.cook_minutes || 0) / maxTime) * 100);
          const isFirst = i === 0;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: isFirst ? palette.softOrange : palette.lightGray, color: isFirst ? palette.white : palette.warmGray, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontFamily: fonts.body, fontSize: 13, color: palette.deepOrange, fontWeight: 600 }}>{ing.name}</span>
                  <span style={{ fontFamily: fonts.body, fontSize: 12, color: palette.warmGray }}>{ing.cook_minutes} min</span>
                </div>
                <div style={{ height: 6, background: palette.lightGray, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: isFirst ? palette.softOrange : palette.peach, borderRadius: 4 }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ background: `${palette.peach}20`, borderRadius: 10, padding: "8px 12px", marginTop: 10 }}>
        <span style={{ fontFamily: fonts.body, fontSize: 12, color: palette.warmGray }}>
          💡 Empieza con el ingrediente <strong style={{ color: palette.deepOrange }}>nº1</strong> y ve sumando los siguientes según pasen los minutos.
        </span>
      </div>
    </div>
  );
}

function RecipeImage({ recipe, style: mealStyle }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setImgUrl(null);
    const query = mealStyle === "blw"
      ? `baby led weaning finger food ${recipe.name} healthy toddler`
      : `baby food puree ${recipe.name} homemade bowl`;
    const url = `https://source.unsplash.com/400x220/?${encodeURIComponent(query)}`;
    // Use a fetch to get the final redirected URL
    fetch(url).then(r => {
      setImgUrl(r.url);
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, [recipe.name, mealStyle]);

  if (error) return null;

  return (
    <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 18, position: "relative", height: 180, background: palette.lightGray }}>
      {loading && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 32 }}>{recipe.emoji}</span>
        </div>
      )}
      {imgUrl && (
        <img src={imgUrl} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: loading ? "none" : "block" }} onLoad={() => setLoading(false)} onError={() => setError(true)} />
      )}
      <div style={{ position: "absolute", bottom: 8, left: 8 }}>
        <Tag color={mealStyle === "blw" ? palette.blw : palette.softOrange}>
          {mealStyle === "blw" ? "✋ BLW" : "🥣 Papilla"}
        </Tag>
      </div>
    </div>
  );
}

function BalanceWarning({ balance }) {
  if (!balance) return null;
  const groups = ["proteina", "carbohidrato", "verdura_fruta", "grasa_saludable"];
  const missing = groups.filter(g => balance[g] && !balance[g].ok);
  if (missing.length === 0) {
    return (
      <div style={{ background: "#eef6ef", border: "1.5px solid #a8c5ac", borderRadius: 12, padding: "12px 16px", marginBottom: 18 }}>
        <div style={{ fontFamily: fonts.body, fontSize: 13, color: "#3d6b41", fontWeight: 700, marginBottom: 2 }}>✅ ¡Plato bien balanceado!</div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: "#3d6b41" }}>Pedro tiene proteína, carbohidrato, verdura y grasa saludable.</div>
      </div>
    );
  }
  return (
    <div style={{ background: "#fff8e6", border: "1.5px solid #f4c96a", borderRadius: 12, padding: "12px 16px", marginBottom: 18 }}>
      <div style={{ fontFamily: fonts.body, fontSize: 13, color: "#b8860b", fontWeight: 700, marginBottom: 8 }}>⚠️ Completa el plato de Pedro</div>
      {missing.map(g => (
        <div key={g} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 5 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>{balance[g].emoji}</span>
          <span style={{ fontFamily: fonts.body, fontSize: 12, color: "#7a5a00" }}>
            <strong style={{ textTransform: "capitalize" }}>Falta {g.replace("_", " ")}</strong> — {balance[g].sugerencia}
          </span>
        </div>
      ))}
    </div>
  );
}

function RecipeGenerator({ volumeConfig, onSaveRecipe }) {
  const [ingredients, setIngredients] = useState("");
  const [mealStyle, setMealStyle] = useState("papilla");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [adjustments, setAdjustments] = useState({});
  const [saved, setSaved] = useState(false);

  const total = volumeConfig?.total || 400;

  async function generateRecipe() {
    setLoading(true);
    setRecipe(null);
    setSaved(false);
    setAdjustments({});

    const blwExtra = mealStyle === "blw" ? `
- Estilo BLW: indica en "blw_format" el formato de presentación más adecuado (bastoncitos, mini hamburguesas, bolitas, entero, cubos, tortita, etc.) y por qué es seguro para 11 meses.
- Los ingredientes deben poder cocinarse con una textura que el bebé pueda agarrar y morder con las encías.` : `
- Estilo Papilla: textura puré suave o semisólida, apta para cuchara.`;

    const prompt = `Eres un nutricionista especializado en alimentación complementaria para bebés de 11 meses.

El usuario quiere cocinar exactamente ${total}g de comida total para su bebé en estilo ${mealStyle.toUpperCase()}.
Ingredientes disponibles: ${ingredients}

Responde SOLO con un JSON sin backticks ni explicación adicional:
{
  "name": "Nombre del plato",
  "emoji": "emoji del plato",
  "description": "descripción breve y apetitosa (1 frase)",
  "suitable_age": "Apto desde X meses",
  "blw_format": "solo si es BLW: bastoncitos / bolitas / etc. con breve explicación",
  "ingredients": [
    {"name": "nombre", "grams": número, "notes": "opcional", "cook_minutes": número_entero_minutos_cocción}
  ],
  "steps": ["paso 1", "paso 2", "paso 3"],
  "tips": "un consejo práctico"
}

IMPORTANTE:
- Los gramos deben sumar aproximadamente ${total}g.
- Sin sal añadida, sin miel, sin leche de vaca como base principal.
- Solo usa ingredientes de la lista del usuario. Excluye silenciosamente los no aptos.
- cook_minutes: tiempo real de cocción de cada ingrediente (ej: pollo 20, papa 15, espinaca 3). Si no se cocina, pon 0.
- balance: evalúa los 4 grupos para bebé de 11 meses. JSON así: { "proteina": { "ok": true/false, "emoji": "🍗", "sugerencia": "ej: agrega pollo, lentejas o huevo" }, "carbohidrato": { "ok": true/false, "emoji": "🌾", "sugerencia": "ej: suma papa, arroz o fideos" }, "verdura_fruta": { "ok": true/false, "emoji": "🥦", "sugerencia": "ej: incorpora zanahoria o zapallo" }, "grasa_saludable": { "ok": true/false, "emoji": "🥑", "sugerencia": "ej: un toque de aceite de oliva o palta" } }${blwExtra}`;

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 1200, temperature: 0.7 },
        }),
      });
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setRecipe({ ...parsed, mealStyle });
      const initAdj = {};
      parsed.ingredients.forEach((ing, i) => { initAdj[i] = ing.grams; });
      setAdjustments(initAdj);
    } catch (e) {
      alert("Hubo un error generando la receta. Intenta de nuevo.");
    }
    setLoading(false);
  }

  // Proportional adjustment: when one ingredient changes, adjust others proportionally
  function handleIngredientChange(changedIdx, newGrams) {
    const newVal = Number(newGrams);
    const oldVal = adjustments[changedIdx];
    if (!oldVal || oldVal === 0) {
      setAdjustments(prev => ({ ...prev, [changedIdx]: newVal }));
      return;
    }
    const ratio = newVal / oldVal;
    const updated = {};
    Object.keys(adjustments).forEach(idx => {
      updated[idx] = idx == changedIdx ? newVal : Math.round(adjustments[idx] * ratio);
    });
    setAdjustments(updated);
  }

  function handleSave() {
    if (!recipe) return;
    const adjustedIngredients = recipe.ingredients.map((ing, i) => ({ ...ing, grams: adjustments[i] ?? ing.grams }));
    onSaveRecipe({ ...recipe, ingredients: adjustedIngredients, volumeConfig, savedAt: new Date().toISOString() });
    setSaved(true);
  }

  const adjustedTotal = Object.values(adjustments).reduce((a, b) => a + Number(b), 0);
  const sorted = recipe ? [...recipe.ingredients].sort((a, b) => (b.cook_minutes || 0) - (a.cook_minutes || 0)) : [];

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>🥄</span>
        <h2 style={{ fontFamily: fonts.display, fontSize: 20, color: palette.deepOrange, margin: 0 }}>Generar receta</h2>
      </div>

      {volumeConfig && (
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <Tag color={palette.sage}>{volumeConfig.total}g total</Tag>
          <Tag color={palette.peach}>{volumeConfig.days} días</Tag>
          <Tag color={palette.softOrange}>{volumeConfig.mealsPerDay}x al día</Tag>
        </div>
      )}

      <StyleSelector value={mealStyle} onChange={v => { setMealStyle(v); setRecipe(null); setSaved(false); }} />

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontFamily: fonts.body, fontSize: 12, color: palette.warmGray, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>
          ¿Qué ingredientes tienes?
        </label>
        <textarea
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          placeholder="Ej: zanahoria, papa, pollo, zapallo, brócoli, aceite de oliva..."
          rows={3}
          style={{ width: "100%", border: `1.5px solid ${palette.lightGray}`, borderRadius: 12, padding: "10px 14px", fontFamily: fonts.body, fontSize: 14, background: palette.cream, color: palette.deepOrange, resize: "vertical", outline: "none", boxSizing: "border-box" }}
        />
      </div>

      <Btn onClick={generateRecipe} disabled={loading || !ingredients.trim()} variant={mealStyle === "blw" ? "blw" : "primary"}>
        {loading ? "🍳 Generando receta..." : `✨ Recomendar plato ${mealStyle === "blw" ? "BLW" : "papilla"}`}
      </Btn>

      {recipe && (
        <div style={{ marginTop: 24 }}>
          <RecipeImage recipe={recipe} style={recipe.mealStyle} />

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>{recipe.emoji}</span>
            <div>
              <h3 style={{ fontFamily: fonts.display, fontSize: 20, color: palette.deepOrange, margin: 0 }}>{recipe.name}</h3>
              <p style={{ fontFamily: fonts.body, fontSize: 13, color: palette.warmGray, margin: "2px 0 0" }}>{recipe.description}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            <Tag color={palette.softSage}>{recipe.suitable_age}</Tag>
            <Tag color={recipe.mealStyle === "blw" ? palette.blw : palette.softOrange}>
              {recipe.mealStyle === "blw" ? "✋ BLW" : "🥣 Papilla"}
            </Tag>
          </div>

          <BalanceWarning balance={recipe.balance} />

          {recipe.mealStyle === "blw" && recipe.blw_format && (
            <div style={{ background: palette.blwLight, border: `1.5px solid ${palette.blw}40`, borderRadius: 12, padding: "12px 16px", marginBottom: 18 }}>
              <div style={{ fontFamily: fonts.body, fontSize: 12, color: palette.blw, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>✋ Formato BLW</div>
              <div style={{ fontFamily: fonts.body, fontSize: 14, color: "#3a5a8a" }}>{recipe.blw_format}</div>
            </div>
          )}

          {/* Cooking timeline */}
          {recipe.ingredients.some(i => i.cook_minutes > 0) && (
            <CookingTimeline ingredients={recipe.ingredients.map((ing, i) => ({ ...ing, grams: adjustments[i] ?? ing.grams }))} />
          )}

          {/* Ingredient adjustment */}
          <h4 style={{ fontFamily: fonts.body, fontSize: 13, color: palette.warmGray, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
            Ingredientes — ajusta y el resto se recalcula
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
            {recipe.ingredients.map((ing, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: palette.cream, borderRadius: 10, padding: "8px 14px" }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: fonts.body, fontSize: 14, color: palette.deepOrange }}>{ing.name}</span>
                  {ing.notes && <span style={{ color: palette.warmGray, fontSize: 12 }}> · {ing.notes}</span>}
                  {ing.cook_minutes > 0 && <span style={{ marginLeft: 6, fontSize: 11, color: palette.peach, fontWeight: 600 }}>⏱ {ing.cook_minutes} min</span>}
                </div>
                <input
                  type="number"
                  value={adjustments[i] ?? ing.grams}
                  min={0}
                  onChange={e => handleIngredientChange(i, e.target.value)}
                  style={{ width: 70, border: `1.5px solid ${palette.peach}`, borderRadius: 8, padding: "4px 8px", fontFamily: fonts.body, fontSize: 14, color: palette.deepOrange, fontWeight: 700, background: palette.white, textAlign: "right", outline: "none" }}
                />
                <span style={{ fontFamily: fonts.body, fontSize: 13, color: palette.warmGray }}>g</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <span style={{ fontFamily: fonts.body, fontSize: 13, color: adjustedTotal > total * 1.15 || adjustedTotal < total * 0.85 ? palette.softOrange : palette.sage, fontWeight: 600 }}>
              Total ajustado: {adjustedTotal}g {adjustedTotal > total * 1.15 ? "⚠️ por encima" : adjustedTotal < total * 0.85 ? "⚠️ por debajo" : "✓"}
            </span>
          </div>

          <h4 style={{ fontFamily: fonts.body, fontSize: 13, color: palette.warmGray, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Preparación</h4>
          <ol style={{ paddingLeft: 18, margin: "0 0 16px" }}>
            {recipe.steps.map((step, i) => (
              <li key={i} style={{ fontFamily: fonts.body, fontSize: 14, color: palette.deepOrange, marginBottom: 6, lineHeight: 1.5 }}>{step}</li>
            ))}
          </ol>

          {recipe.tips && (
            <div style={{ background: `${palette.sage}18`, border: `1.5px solid ${palette.softSage}`, borderRadius: 12, padding: "10px 14px", marginBottom: 16 }}>
              <span style={{ fontFamily: fonts.body, fontSize: 13, color: palette.sage }}>💡 <strong>Consejo:</strong> {recipe.tips}</span>
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={handleSave} variant="sage" disabled={saved}>{saved ? "✓ Guardada" : "💾 Guardar receta"}</Btn>
            <Btn onClick={() => { setRecipe(null); setSaved(false); }} variant="ghost">Nueva receta</Btn>
          </div>
        </div>
      )}
    </Card>
  );
}

function SavedRecipes({ recipes, onDelete }) {
  const [expanded, setExpanded] = useState(null);
  if (recipes.length === 0) {
    return (
      <Card style={{ textAlign: "center", padding: "36px 24px" }}>
        <span style={{ fontSize: 40 }}>📖</span>
        <p style={{ fontFamily: fonts.body, color: palette.warmGray, marginTop: 10 }}>
          Aún no tienes recetas guardadas.<br /><span style={{ fontSize: 13 }}>Genera y guarda una desde arriba.</span>
        </p>
      </Card>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {recipes.map((r, i) => (
        <Card key={i} style={{ padding: 0, overflow: "hidden" }}>
          <div onClick={() => setExpanded(expanded === i ? null : i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", cursor: "pointer" }}>
            <span style={{ fontSize: 28 }}>{r.emoji}</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: fonts.display, fontSize: 17, color: palette.deepOrange, margin: 0 }}>{r.name}</h3>
              <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                <Tag color={palette.sage}>{r.volumeConfig?.total}g</Tag>
                <Tag color={palette.peach}>{r.volumeConfig?.days} días</Tag>
                <Tag color={r.mealStyle === "blw" ? palette.blw : palette.softOrange}>{r.mealStyle === "blw" ? "BLW" : "Papilla"}</Tag>
              </div>
            </div>
            <span style={{ color: palette.peach, fontSize: 18 }}>{expanded === i ? "▲" : "▼"}</span>
          </div>
          {expanded === i && (
            <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${palette.lightGray}` }}>
              <p style={{ fontFamily: fonts.body, fontSize: 13, color: palette.warmGray, marginTop: 14 }}>{r.description}</p>
              {r.mealStyle === "blw" && r.blw_format && (
                <div style={{ background: palette.blwLight, borderRadius: 10, padding: "8px 12px", marginBottom: 12 }}>
                  <span style={{ fontFamily: fonts.body, fontSize: 12, color: palette.blw }}>✋ <strong>Formato:</strong> {r.blw_format}</span>
                </div>
              )}
              {r.ingredients?.some(ing => ing.cook_minutes > 0) && <CookingTimeline ingredients={r.ingredients} />}
              <h4 style={{ fontFamily: fonts.body, fontSize: 12, color: palette.warmGray, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Ingredientes</h4>
              {r.ingredients?.map((ing, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", fontFamily: fonts.body, fontSize: 14, color: palette.deepOrange, padding: "4px 0", borderBottom: `1px dashed ${palette.lightGray}` }}>
                  <span>{ing.name}{ing.notes ? ` (${ing.notes})` : ""}{ing.cook_minutes > 0 ? <span style={{ color: palette.peach, fontSize: 12 }}> ⏱{ing.cook_minutes}min</span> : null}</span>
                  <strong>{ing.grams}g</strong>
                </div>
              ))}
              <h4 style={{ fontFamily: fonts.body, fontSize: 12, color: palette.warmGray, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 14, marginBottom: 8 }}>Preparación</h4>
              <ol style={{ paddingLeft: 18, margin: 0 }}>
                {r.steps?.map((s, j) => <li key={j} style={{ fontFamily: fonts.body, fontSize: 13, color: palette.deepOrange, marginBottom: 5, lineHeight: 1.5 }}>{s}</li>)}
              </ol>
              {r.tips && <div style={{ background: `${palette.sage}18`, border: `1.5px solid ${palette.softSage}`, borderRadius: 10, padding: "8px 12px", marginTop: 14 }}><span style={{ fontFamily: fonts.body, fontSize: 12, color: palette.sage }}>💡 {r.tips}</span></div>}
              <div style={{ marginTop: 14 }}>
                <Btn onClick={() => onDelete(i)} variant="ghost" style={{ fontSize: 13, padding: "6px 14px", color: "#c0392b", borderColor: "#c0392b" }}>🗑 Eliminar</Btn>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function calcMonths(birthDateStr) {
  const birth = new Date(birthDateStr);
  const now = new Date();
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months--;
  return Math.max(0, months);
}

function WelcomeScreen({ onEnter }) {
  const saved = localStorage.getItem("pedro-birthdate");
  const [birthdate, setBirthdate] = useState(saved || "");
  const [step, setStep] = useState(saved ? "welcome" : "setup");
  const months = birthdate ? calcMonths(birthdate) : null;

  function handleSave() {
    if (!birthdate) return;
    localStorage.setItem("pedro-birthdate", birthdate);
    setStep("welcome");
  }

  const bubbles = ["🥕", "🥦", "🍠", "🫛", "🍗", "🥑", "🍳", "🫐"];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #fdf0e8 0%, #fce8d5 40%, #f5d5b8 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", position: "relative", overflow: "hidden", fontFamily: fonts.body }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet" />
      {bubbles.map((b, i) => (
        <div key={i} style={{ position: "absolute", fontSize: i % 2 === 0 ? 28 : 20, opacity: 0.18, top: (10 + (i * 11) % 80) + "%", left: (5 + (i * 13) % 88) + "%", transform: "rotate(" + ((i * 37) % 30 - 15) + "deg)", pointerEvents: "none" }}>{b}</div>
      ))}
      <div style={{ fontSize: 90, marginBottom: 8, filter: "drop-shadow(0 8px 16px rgba(196,97,42,0.15))" }}>🥣</div>
      <h1 style={{ fontFamily: fonts.display, fontSize: 34, color: palette.deepOrange, margin: "0 0 6px", textAlign: "center", lineHeight: 1.2 }}>La Ollita de Pedro</h1>
      {step === "welcome" && months !== null && (
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ background: palette.white, borderRadius: 24, padding: "10px 28px", display: "inline-block", boxShadow: "0 2px 16px rgba(196,97,42,0.13)", marginBottom: 16, marginTop: 14 }}>
            <span style={{ fontFamily: fonts.display, fontSize: 30, color: palette.softOrange, fontStyle: "italic" }}>{months} meses 🎉</span>
          </div>
          <p style={{ fontFamily: fonts.body, fontSize: 15, color: palette.warmGray, margin: "0 0 32px", textAlign: "center" }}>Recetas con amor, calculadas para él</p>
        </div>
      )}
      {step === "setup" && (
        <div style={{ width: "100%", maxWidth: 320, textAlign: "center", marginTop: 16, marginBottom: 24 }}>
          <p style={{ fontFamily: fonts.body, fontSize: 15, color: palette.warmGray, marginBottom: 20 }}>¿Cuándo nació Pedro? Así sabremos siempre cuántos meses tiene 🍼</p>
          <input type="date" value={birthdate} max={new Date().toISOString().split("T")[0]} onChange={e => setBirthdate(e.target.value)} style={{ width: "100%", border: "1.5px solid " + palette.peach, borderRadius: 12, padding: "12px 16px", fontFamily: fonts.body, fontSize: 16, color: palette.deepOrange, background: palette.white, outline: "none", marginBottom: 14, boxSizing: "border-box", textAlign: "center" }} />
          <Btn onClick={handleSave} disabled={!birthdate} style={{ width: "100%", padding: "13px", fontSize: 15 }}>Guardar fecha ✓</Btn>
        </div>
      )}
      {step === "welcome" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%", maxWidth: 300 }}>
          <Btn onClick={onEnter} style={{ width: "100%", padding: "14px", fontSize: 16 }}>Entrar a la ollita →</Btn>
          <button onClick={() => setStep("setup")} style={{ background: "none", border: "none", fontFamily: fonts.body, fontSize: 12, color: palette.warmGray, cursor: "pointer", textDecoration: "underline" }}>Cambiar fecha de nacimiento</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [tab, setTab] = useState("config");
  const [volumeConfig, setVolumeConfig] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedRecipes(JSON.parse(stored));
    } catch {}
  }, []);

  function persist(recipes) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes)); } catch {}
  }

  function handleSaveRecipe(recipe) {
    const updated = [recipe, ...savedRecipes];
    setSavedRecipes(updated);
    persist(updated);
  }

  function handleDeleteRecipe(index) {
    const updated = savedRecipes.filter((_, i) => i !== index);
    setSavedRecipes(updated);
    persist(updated);
  }

  const tabs = [
    { id: "config", label: "⚖️ Volumen" },
    { id: "generate", label: "🥄 Receta" },
    { id: "saved", label: `📖 Guardadas${savedRecipes.length > 0 ? ` (${savedRecipes.length})` : ""}` },
  ];

  if (screen === "welcome") {
    return <WelcomeScreen onEnter={() => setScreen("app")} />;
  }

  const tabIcons = { config: "⚖️", generate: "🥄", saved: "📖" };
  const tabLabels = { config: "Volumen", generate: "Receta", saved: "Guardadas" };

  return (
    <div style={{ minHeight: "100vh", background: pastelBg, fontFamily: fonts.body, paddingBottom: 70 }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet" />

      {/* TOP HEADER — no tabs */}
      <div style={{ background: palette.white, borderBottom: `1px solid ${palette.lightGray}`, padding: "16px 20px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 12px rgba(196,97,42,0.07)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>🥣</span>
          <div>
            <h1 style={{ fontFamily: fonts.display, fontSize: 20, color: palette.deepOrange, margin: 0 }}>La Ollita de Pedro</h1>
            <p style={{ fontFamily: fonts.body, fontSize: 11, color: palette.warmGray, margin: 0 }}>
              {(() => { const bd = localStorage.getItem("pedro-birthdate"); return bd ? calcMonths(bd) + " meses · cocina por volumen" : "cocina por volumen"; })()}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px" }}>
        {tab === "config" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <VolumePanel onVolumeCalc={cfg => { setVolumeConfig(cfg); setTab("generate"); }} />
            {volumeConfig && (
              <div style={{ background: `${palette.sage}15`, borderRadius: 14, padding: "12px 18px", display: "flex", gap: 10, alignItems: "center" }}>
                <span>✅</span>
                <span style={{ fontFamily: fonts.body, fontSize: 13, color: palette.sage }}>Volumen activo: <strong>{volumeConfig.total}g</strong> para {volumeConfig.days} días</span>
              </div>
            )}
          </div>
        )}
        {tab === "generate" && <RecipeGenerator volumeConfig={volumeConfig} onSaveRecipe={handleSaveRecipe} />}
        {tab === "saved" && (
          <div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 20, color: palette.deepOrange, marginTop: 0, marginBottom: 16 }}>Recetas guardadas</h2>
            <SavedRecipes recipes={savedRecipes} onDelete={handleDeleteRecipe} />
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: palette.white, borderTop: `1px solid ${palette.lightGray}`, display: "flex", zIndex: 20, boxShadow: "0 -2px 12px rgba(196,97,42,0.08)" }}>
        {["config", "generate", "saved"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, border: "none", background: "transparent", cursor: "pointer", padding: "10px 4px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 20 }}>{tabIcons[t]}</span>
            <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: 600, color: tab === t ? palette.softOrange : palette.warmGray, letterSpacing: "0.03em" }}>{tabLabels[t]}{t === "saved" && savedRecipes.length > 0 ? ` (${savedRecipes.length})` : ""}</span>
            {tab === t && <div style={{ width: 24, height: 2.5, background: palette.softOrange, borderRadius: 2 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
