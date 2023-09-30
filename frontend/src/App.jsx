import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Singnin from './components/pages/Signin'
import Signup from './components/pages/Signup'
import JoinRoom from './components/pages/JoinRoom'
import Room from './components/pages/Room'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Singnin />} />
                <Route path='/register' element={<Signup />} />
                <Route path='/joinroom' element={<JoinRoom />} />
                <Route path='/room/:roomId' element={<Room />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App