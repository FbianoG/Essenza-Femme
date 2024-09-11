
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ProductBuy from "@/components/product/ProductBuy";
import Similar from "@/components/product/Similar";



export default function Product() {


    return (
        <div>
            <Header />
            <main>

                <ProductBuy />
                <Similar />

            </main>
            <Footer />
        </div>
    )
}
