import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Home from './Pages/HomePage';
import SignUp from './Pages/SignUp';
import Favourites from './Pages/favourites';
import Genres from './Pages/GenrePage';
import Login from './Pages/loginPage';
import MovieDetails from './Pages/movieDetails';
import SearchResults from './Pages/searchResult';
import AboutUs from './Pages/aboutUs';
import Footer from './Components/Navbar/footer';
import ContactUs from './Pages/contactUs';



function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Redirect to login if not authenticated */}
                <Route path='/login' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
                
                {/* Redirect to home after login */}
                <Route path='/' element={<Navigate to='/login' />} />

                <Route path='/home' element={<Home />} />
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path='/favourites' element={<Favourites />} />
                <Route path='/movies/:id' element={<MovieDetails />} />
                <Route path='/genre/:title' element={<Genres />} />
                <Route path='/contactUs' element={<ContactUs />} />
                <Route path='/search-results' element={<SearchResults />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
