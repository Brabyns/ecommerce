import {defineQuery} from "next-sanity";
import  {sanityFetch} from "@/sanity/lib/live";

export const getProductBySlug = async (slug: string) => {
    const PRODUCTS_BY_ID_QUERY = defineQuery(`
    *[
    _type == "product" && slug.current == $slug
    ] | order(name asc) [0]
    `)

    try{
        //Use sanityFetch to send the query with slug as a parameter
        const product = await sanityFetch({
            query: PRODUCTS_BY_ID_QUERY,
            params: {
                slug,
            },
        });

        //Return the list of products, or an empty array if none are found
        return product.data || null;
    }catch(error){
        console.error("Error fetching  product by ID:", error);
        return null;
    }
}