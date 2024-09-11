
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ProductBuy from "@/components/product/ProductBuy";
import Similar from "@/components/product/Similar";
import { Suspense } from 'react'


export default function Product() {


    return (
        <Suspense>
            <Header />
            <main>

                <ProductBuy />
                <Similar />

            </main>
            <Footer />
        </Suspense>
    )
}
