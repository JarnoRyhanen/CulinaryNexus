import { Outlet } from 'react-router-dom'
import './App.css'
import ButtonGradient from './assets/ButtonGradient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App({ children }: any) {

  return (
    <>
      <div className='overflow-hidden'>
        {children}
        <Outlet />
      </div>
      <ButtonGradient />
    </>
  )
}

export default App
