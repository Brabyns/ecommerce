import {CouponCode} from "@/sanity/lib/sales/couponCodes";
import {defineQuery} from "next-sanity";
import {sanityFetch} from "@/sanity/lib/live";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
    *[
    _type == "sale"
    && isActive == true
    && couponCode == $couponCode
    ] | order(validFrom desc)[0]
    `);

    try{
        //Use sanityFetch to send the query
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
            params:{
                couponCode,
            }, //PASS THE COUPON CODE AS A QUERY PARAMETER
        });


        return activeSale ? activeSale.data : null;
    }catch(error){
        console.error("Error fetching active coupon code:", error);
        return null;
    }

}