import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Highlights from "./components/highlights";
import Model from "./components/model";
import Features from "./components/features";
import Howitworks from "./components/howitworks";

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <Howitworks />
    </main>
  )
}

export default App
