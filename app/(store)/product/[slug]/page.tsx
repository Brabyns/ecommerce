import {getProductBySlug} from "@/sanity/lib/products/getProductBySlug";
import {notFound} from "next/navigation";
import Image from "next/image";
import {imageUrl} from "@/lib/imageUrl";
import {PortableText} from "next-sanity";


async function  ProductPage ({
                                 params,
                             }: {
    params: Promise<{
        slug: string;
    }>
})  {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {

        return notFound()
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg">
                    {product.image && (
                        <Image
                            className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
                                isOutOfStock ? 'opacity-50' : ''
                            }`}
                            src={imageUrl(product.image).url()}
                            alt={product.name || "Product Image"}
                            fill
                        />
                    )}

                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <div className="text-xl font-semibold mb-4">
                            Ksh. {product.price?.toFixed(2)}
                        </div>
                        <div className="prose max-w-none mb-6">
                            {Array.isArray(product.description) && (
                                <PortableText value={product.description} />
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ProductPage
