export default function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-black-700 mb-2">
        Variant:{" "}
        <span className="text-black-500 font-normal">
          {selectedVariant.storage} · {selectedVariant.color}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isActive = v.variantId === selectedVariant.variantId;
          return (
            <button
              key={v.variantId}
              onClick={() => onSelect(v)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                isActive
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-black-700 border-black-300 hover:border-gray-500"
              }`}
            >
              {v.storage} | {v.color}
            </button>
          );
        })}
      </div>
    </div>
  );
}
