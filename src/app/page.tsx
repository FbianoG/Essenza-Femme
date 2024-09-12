import Comments from "@/components/home/Comments";
import Content from "@/components/home/Content";
import Explore from "@/components/home/Explore";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Hero from "@/components/home/Hero";
import SideBar from "@/components/shared/SideBar";




export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Content />
        <Explore />
        <Comments />
      </main>
      <Footer />
      <SideBar />
    </div>
  )
}
