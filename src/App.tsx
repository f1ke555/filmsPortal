import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import FavoritesFilmsPage from "./pages/FavoritesFilmsPage";
import HistorySearchPage from "./pages/HistorySearchPage";
import SearchPage from "./pages/SearchPage";
import SignInPage from "./pages/SignInPage";
import SingUpPage from "./pages/SingUpPage";
import ErrorPage from "./pages/ErrorPage";
import AppHeader from "./components/AppHeader";
import FilmPage from "./pages/FilmPage";
import {useAppSelector} from "./hooks/redux";

function App() {

    const {currentUser} = useAppSelector(state => state.userReducer)

    return (
        <div className="App">
            <BrowserRouter>
                <AppHeader/>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/favorites'
                           element={!currentUser ? <Navigate to='/signup' replace/> : <FavoritesFilmsPage/>}/>
                    <Route path='/history'
                           element={!currentUser ? <Navigate to='/signup' replace/> : <HistorySearchPage/>}/>
                    <Route path='/search' element={<SearchPage/>}/>
                    <Route path='/signin' element={<SignInPage/>}/>
                    <Route path='/signup' element={<SingUpPage/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                    <Route path='/film/:id' element={<FilmPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;