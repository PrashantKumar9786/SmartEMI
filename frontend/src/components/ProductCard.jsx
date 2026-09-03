import { Link } from "react-router-dom";
import { formatINR } from "../utils/format";
import { resolveImageUrl } from "../api/client";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={resolveImageUrl(product.image)}
          alt={product.name}
          className="h-full w-[83%] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="text-semibold uppercase tracking-wide text-black-900 mb-1">
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
        <p className="text-md text-black-500 mt-1">
          {product.variantCount} variant{product.variantCount !== 1 ? "s" : ""}{" "}
          available
        </p>
      </div>
    </Link>
  );
}
