export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800 mb-3" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
