import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage/login'
import HomePage from './pages/HomePage/HomePage'
import AddEstabelecimento from './pages/AddEstabelecimento/AddEstabelecimento'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/addestabelecimento' element={<AddEstabelecimento></AddEstabelecimento>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
