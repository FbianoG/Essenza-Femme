import ListProducts from "@/components/products/ListProducts"
import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import SideBar from "@/components/shared/SideBar"

const Products = () => {

    return (
        <div>
            <Header />
            <main>
                <ListProducts />
            </main>
            <Footer />
            <SideBar />
        </div>
    )
}

export default Products