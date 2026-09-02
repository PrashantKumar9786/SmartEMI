import { Link } from "react-router-dom";
import { formatINR } from "../utils/format";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatINR(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatINR(product.mrp)}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {product.variantCount} variant{product.variantCount !== 1 ? "s" : ""}{" "}
          available
        </p>
      </div>
    </Link>
  );
}
