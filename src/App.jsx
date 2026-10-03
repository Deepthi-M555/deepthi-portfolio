import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Leadership from './components/Leadership'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AmbientField from './components/AmbientField'
import SmoothScroll from './components/SmoothScroll'
export default function App() {
  return (
    <SmoothScroll>
      <AmbientField />
      <Navbar />
      <main><Hero /><About /><TechStack /><Projects /><Leadership /><Education /><Contact /></main>
      <Footer />
    </SmoothScroll>
  )
}
