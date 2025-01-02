import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Highlights from "./components/highlights";
import Model from "./components/model";
import Features from "./components/features";
import HowItWorks from "./components/howitworks";
import Footer from "./components/footer";
const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App
