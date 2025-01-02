import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Highlights from "./components/highlights";
import Model from "./components/model";
import Features from "./components/features";
import HowItWorks from "./components/howitworks";

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
    </main>
  )
}

export default App
