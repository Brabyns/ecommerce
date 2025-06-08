
import {getAllProducts} from "@/sanity/lib/products/getAllProducts";
import ProductsView from "@/components/ProductsView";
import {getAllCategories} from "@/sanity/lib/products/getAllCategories";


export default async function Home() {
    const products = await getAllProducts()
    const categories = await getAllCategories()
    // console.log(
    //     cypto.randomUUID().slice(0, 5) +
    //     `>>> Rerendered the home cache with ${products.length} products and ${categories.length} categories.`
    // )
  return (
    <div >
      <h1 className="text-red-950 font-black">Hello World</h1>
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
            <ProductsView products={products} />
        </div>

    </div>
  );
}
