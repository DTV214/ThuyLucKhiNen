import { PackageSearch } from "lucide-react";
import type { ProductRecord, SelectOption } from "@/features/admin-api/server/admin-api";
import { DeleteProductButton } from "@/features/admin-products/components/DeleteProductButton";
import { EditProductDialog } from "@/features/admin-products/components/EditProductDialog";

type ProductsTableProps = Readonly<{ products: ProductRecord[]; categories: SelectOption[]; brands: SelectOption[] }>;

function productName(product: ProductRecord) { return product.name ?? product.productName ?? "Chưa có tên sản phẩm"; }
function productCode(product: ProductRecord) { return product.sku?.trim() || "Chưa cập nhật"; }
function categoryName(product: ProductRecord) { return product.categoryName ?? product.category?.name ?? "—"; }
function brandName(product: ProductRecord) { return product.brandName ?? product.brand?.name ?? "—"; }
function checkIsActive(product: ProductRecord) {
  const activeState = product.isActive ?? product.IsActive;
  return String(activeState).toLowerCase() === "true";
}

function isInStock(product: ProductRecord) {
  return Number(product.stockQuantity) > 0;
}

/** B2B product table: commercial price stays private and stock is binary to staff. */
export function ProductsTable({ products, categories, brands }: ProductsTableProps) {
  if (products.length === 0) {
    return <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-10 text-center"><PackageSearch aria-hidden="true" className="mx-auto size-9 text-outline" /><h2 className="mt-3 text-headline-sm font-semibold text-on-surface">Không tìm thấy sản phẩm</h2><p className="mt-1 text-body-md text-on-surface-variant">Hãy thử thay đổi từ khóa hoặc điều kiện lọc.</p></div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-sm">
      <table className="w-full min-w-[1040px] border-collapse text-left">
        <caption className="sr-only">Danh sách sản phẩm ThanhDanh-VMC</caption>
        <thead className="bg-surface-container-low text-label-sm font-semibold uppercase tracking-wide text-on-surface-variant">
          <tr>
            <th className="px-5 py-3">Sản phẩm</th><th className="px-5 py-3">SKU / Mã</th><th className="px-5 py-3">Danh mục</th><th className="px-5 py-3">Thương hiệu</th><th className="px-5 py-3">Giá công khai</th><th className="px-5 py-3">Tồn kho</th><th className="px-5 py-3">Trạng thái</th><th className="px-5 py-3"><span className="sr-only">Thao tác</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {products.map((product) => {
            const inStock = isInStock(product);
            const isActive = checkIsActive(product);

            return <tr key={product.id} className="transition hover:bg-surface-container-low">
              <td className="px-5 py-4"><p className="font-semibold text-on-surface">{productName(product)}</p><p className="mt-0.5 text-body-sm text-on-surface-variant">ID: {product.id}</p></td>
              <td className="px-5 py-4 font-mono text-body-sm text-primary">{productCode(product)}</td>
              <td className="px-5 py-4 text-body-md text-on-surface-variant">{categoryName(product)}</td>
              <td className="px-5 py-4 text-body-md text-on-surface-variant">{brandName(product)}</td>
              <td className="px-5 py-4 text-body-md font-semibold text-primary">Liên hệ Hotline</td>
              <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-label-sm font-semibold ${inStock ? "bg-emerald-100 text-emerald-800" : "bg-surface-container-high text-on-surface-variant"}`}>{inStock ? "Còn hàng" : "Không còn hàng"}</span></td>
              <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-label-sm font-semibold ${isActive ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-surface-container-high text-on-surface-variant"}`}>{isActive ? "Đang hiển thị" : "Đang ẩn"}</span></td>
              <td className="px-5 py-4"><div className="flex items-center"><EditProductDialog product={product} categories={categories} brands={brands} /><DeleteProductButton id={product.id} name={productName(product)} /></div></td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
