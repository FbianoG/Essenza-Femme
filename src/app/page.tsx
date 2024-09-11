import Comments from "@/components/Comments";
import Content from "@/components/Content";
import Explore from "@/components/Explore";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";




export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Content />
        <Explore/>
        <Comments/>
      </main>
      <Footer />
    </div>
  )
}
