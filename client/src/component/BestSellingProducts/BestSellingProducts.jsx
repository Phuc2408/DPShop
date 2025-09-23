import React, { useState, useEffect } from 'react';
import sampleProducts from '../../../sampledata/sample';
import ProductGrid from './ProductGrid';
import BestSellingTabs from './BestSellingTabs'
export default function BestSellingProducts() {
    const [activeTab, setActiveTab] = useState('electric');
    useEffect(() => {
        console.log("fetch api")
    })
    return (
        <>
            <h2 className=" text-[#9F8A46] text-2xl font-bold mb-1">
                Nổi bật
            </h2>
            <BestSellingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <ProductGrid products={sampleProducts} />
        </>
    );
}