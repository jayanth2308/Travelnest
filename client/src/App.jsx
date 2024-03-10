import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Indexpage from './pages/Indexpage'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import Layout from './Layout'
import { UserContextProvider } from './Usercontext'
import Profilepage from './pages/Profilepage'
import Placespage from './pages/Placespage'
import Bookingspage from './pages/Bookingspage'
import Bookingpage from './pages/Bookingpage'
import PlacesFormpage from './pages/PlacesFormpage'
import Place from './pages/Place'

axios.defaults.baseURL='http://localhost:4048';
axios.defaults.withCredentials= true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path='/login' element={<Loginpage />}/>
          <Route path='/register' element={<Registerpage />}/>
          <Route path='/account' element={<Profilepage />}/>
          <Route path='/account/places' element={<Placespage />} />
          <Route path='/account/places/new' element={<PlacesFormpage />} />
          <Route path='account/places/:id' element={<PlacesFormpage />} />
          <Route path='/place/:id' element={<Place />} /> 
          <Route path='account/bookings' element={<Bookingspage />} />
          <Route path='/account/bookings/:id' element={<Bookingpage />} /> 
        </Route>
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
