import {defineQuery} from "next-sanity";
import {sanityFetch} from "@/sanity/lib/live";

export const searchProductsByName = async (searchParams: string) => {

    const PRODUCT_SEARCH_QUERY = defineQuery(`
     *[
            _type == "product"
            && name match $searchParams
        ] | order(name asc)
        
        `)

    try{
        //use sanityFetch to send the query and pass the search parameter with a wildcard
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params:{
                searchParams:`${searchParams}*`, //APPEND WILDCARD FOR PARTIAL MATCH
            },
        });
        //RETURN THE LIST OF PRODUCTS, OR AN EMPTY ARRAY IF NONE ARE FOUND
        return products.data || [];
    }catch(error){
        console.error("Error fetching product by name", error);
        return [];
    }
}