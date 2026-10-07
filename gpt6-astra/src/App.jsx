import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Article from "./components/Article.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Article />
      </main>
      <Footer />
    </>
  );
}
