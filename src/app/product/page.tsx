
import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import ProductBuy from "@/components/product/ProductBuy";
import Similar from "@/components/product/Similar";
import { Suspense } from 'react'
import SideBar from "@/components/shared/SideBar";


export default function Product() {


    return (
        <Suspense>
            <Header />
            <main>

                <ProductBuy />
                <Similar />

            </main>
            <Footer />
            <SideBar/>
        </Suspense>
    )
}
