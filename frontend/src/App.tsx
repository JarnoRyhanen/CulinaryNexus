import './App.css'
import ButtonGradient from './assets/ButtonGradient'
import Header from './components/Header'
import Hero from './components/Hero'

function App() {

  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[6.5rem] overflow-hidden'>
        <Header />
        <Hero />
      </div>
      <ButtonGradient />
    </>
  )
}

export default App
