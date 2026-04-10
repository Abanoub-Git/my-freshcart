import type { BrandLike } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type brandPropsType = {
  brand: BrandLike;
};

export default function BrandsCard({ brand }: brandPropsType) {
  return (
    <Link
      className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
      href={`/products?brand=${brand._id}`}
    >
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
        <Image
          alt={brand.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          src={brand.image || ""}
          width={100}
          height={100}
        />
      </div>
      <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
        {brand.name}
      </h3>
      <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-violet-600 flex items-center gap-1">
          View Products
          <svg
            data-prefix="fas"
            data-icon="arrow-right"
            className="svg-inline--fa fa-arrow-right text-[10px]"
            role="img"
            viewBox="0 0 512 512"
            aria-hidden="true"
            width={12.5}
            height={10}
          >
          </svg>
          <ArrowRight className="w-3 h-3 text-violet-600 -ml-4"/>
        </span>
      </div>
    </Link>
  );
}
