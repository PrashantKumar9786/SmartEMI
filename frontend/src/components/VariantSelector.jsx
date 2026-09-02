export default function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-700 mb-2">
        Variant:{" "}
        <span className="text-gray-500 font-normal">
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
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
              }`}
            >
              {v.storage} {v.color}
            </button>
          );
        })}
      </div>
    </div>
  );
}
