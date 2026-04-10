import { getAllCategories } from "@/services/api/api";
import type { categoryType } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div className="flex  items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop By <span className="text-emerald-600">Category</span>
            </h2>
          </div>
          <Link
            className="text-green-600 self-end sm:self-auto hover:text-green-700 font-medium flex items-center cursor-pointer"
            href="categories"
          >
            View All Categories
            <svg
              data-prefix="fas"
              data-icon="arrow-right"
              className="svg-inline--fa fa-arrow-right ml-2 h-4 w-5"
              role="img"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
            </svg>
            <ArrowRight className="w-4 h-4 text-green-600 -ml-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.map((cat: categoryType) => {
            return (
              <Link
                key={cat.name}
                href={`/categories/${cat._id}`}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
              >
                <div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
                  <Image
                    alt={cat.slug}
                    src={
                      cat.image ||
                      "https://ecommerce.routemisr.com/Route-Academy-categories/1681511121316.png"
                    }
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="font-medium">{cat.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
