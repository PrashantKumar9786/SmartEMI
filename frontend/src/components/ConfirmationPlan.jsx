import { resolveImageUrl } from "../api/client";
import { formatINR } from "../utils/format";

export default function ConfirmationToast({ product, variant, plan, onClose }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm bg-white border border-green-200 rounded-2xl shadow-lg p-4 flex gap-3">
      <img
        src={resolveImageUrl(variant.image)}
        alt={`${product.name} ${variant.color}`}
        className="h-16 w-16 rounded-lg object-cover border border-gray-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <svg
            className="h-4 w-4 text-green-600 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-semibold text-green-700">Selected</span>
        </div>
        <p className="font-semibold text-gray-900 truncate">{product.name}</p>
        <p className="text-sm text-gray-500">
          ({variant.storage} / {variant.color})
        </p>
        <p className="text-sm text-gray-700 mt-0.5">
          {plan.tenureMonths} months at {formatINR(plan.monthlyAmount)}/mo.
        </p>
      </div>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="text-gray-400 hover:text-gray-600 text-lg leading-none h-fit"
      >
        ×
      </button>
    </div>
  );
}
