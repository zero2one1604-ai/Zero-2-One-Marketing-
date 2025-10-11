import React from "react";
import LuxuryShopPage from "../components/ProductCategory";
import LuxuryFooter from "../components/Footer";
import CorporateGifting from "../components/CorporateGifting";

export default function ShopPage() {
    return (
        <>
         <div className="min-h-screen w-full bg-gray-50">
           <LuxuryShopPage />
           <CorporateGifting />
        </div>
        <LuxuryFooter />
        </>
       
    );
}