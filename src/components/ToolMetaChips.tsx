// ToolMetaChips.tsx
import { FaTag, FaLightbulb } from "react-icons/fa";
import Link from "next/link";

type ToolMetaChipsProps = {
  price?: string;
  useCase?: string;
};

export default function ToolMetaChips({ price, useCase }: ToolMetaChipsProps) {
  return (
    <div className="flex gap-2 flex-wrap mb-2">
      {price && (
        <Link
          href={`/?use_case=${encodeURIComponent(price)}`}
          className="inline-flex items-center border border-white px-4 py-1 rounded-md bg-[#626262] text-white font-semibold text-xs leading-tight hover:bg-[#6251F0] hover:text-white transition-colors"
          title={price}
        >
          <FaTag className="text-purple-400 mr-1 text-base" />
          <span className="truncate max-w-[60px] inline-block">{price}</span>
        </Link>
      )}
      {useCase && (
        <Link
          href={`/?use_case=${encodeURIComponent(useCase)}`}
          className="inline-flex items-center border border-white px-4 py-1 rounded-md bg-[#626262] text-white font-semibold text-xs leading-tight hover:bg-[#6251F0] hover:text-white transition-colors"
          title={useCase}
        >
          <FaLightbulb className="text-yellow-400 mr-1 text-sm" />
          <span className="truncate max-w-[90px] inline-block">{useCase}</span>
        </Link>
      )}
    </div>
  );
}