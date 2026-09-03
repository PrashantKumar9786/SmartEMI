// Maps a variant's color name to a swatch color. This is a simple lookup,
// not derived from real data — if you add a new color name in seed.js that
// isn't listed here, it falls back to a neutral gray circle.
const COLOR_MAP = {
  silver: "#e8e8e8",
  orange: "#d9622b",
  "deep blue": "#1f3a5f",
  "titanium black": "#1a1a1a",
  "titanium gray": "#6b6b6b",
  obsidian: "#2b2b2b",
  porcelain: "#f0e9e0",
};

function getColorHex(colorName) {
  return COLOR_MAP[colorName?.toLowerCase()] || "#cccccc";
}

export default function ColorSwatchSelector({
  variants,
  selectedVariant,
  onSelect,
}) {
  return (
    <div className="flex flex-col items-center mt-4">
      <p className="text-md text-black-400 mb-2">
        Available in {variants.length} finish{variants.length !== 1 ? "es" : ""}
      </p>
      <div className="flex gap-3">
        {variants.map((v) => {
          const isActive = v.variantId === selectedVariant.variantId;
          return (
            <button
              key={v.variantId}
              onClick={() => onSelect(v)}
              title={`${v.storage} ${v.color}`}
              aria-label={`Select ${v.storage} ${v.color}`}
              className={`h-6 w-6 rounded-full border-2 transition-transform ${
                isActive
                  ? "border-gray-900 scale-110"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              style={{ backgroundColor: getColorHex(v.color) }}
            />
          );
        })}
      </div>
    </div>
  );
}
