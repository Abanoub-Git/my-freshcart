import type { SubcategoryLike } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type subCategoryPropsType = {
  subCategory: SubcategoryLike;
};

export default function SubCategoryCard({ subCategory }: subCategoryPropsType) {
  return (
    <Link
      className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
      href={`/products?subcategory=${subCategory._id}`}
    >
      <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
        <svg
          data-prefix="fas"
          data-icon="folder-open"
          className="svg-inline--fa fa-folder-open text-2xl text-green-600"
          role="img"
          viewBox="0 0 576 512"
          aria-hidden="true"
          width={30}
          height={24}
        >
        </svg>
        <ArrowRight className="w-5 h-5 text-green-600 -ml-4" />
      </div>
      <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors mb-2">
        {subCategory.name}
      </h3>
      <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Browse Products</span>
        <svg
          data-prefix="fas"
          data-icon="arrow-right"
          className="svg-inline--fa fa-arrow-right text-xs"
          role="img"
          viewBox="0 0 512 512"
          aria-hidden="true"
          width={12.5}
          height={10}
        >
          
        </svg>
        <ArrowRight className="w-3 h-3 text-green-600 -ml-4" />
      </div>
    </Link>
  );
}
