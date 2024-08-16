import React from "react";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home.jsx";
import { Login } from "./pages/Login/login.jsx";
import { Display } from "./pages/Display/display.jsx";
import { SingleDisplay } from "./pages/Display/SingleDisplay/singledisplay.jsx";
import { Footer } from "./component/Footer/footer.jsx";
import { SearchPage } from './pages/SearchPage/SearchPage.jsx'
import { CreateAccount } from "./pages/CreateAccount/CreateAccount.jsx";
import injectContext from "./store/appContext";
import { Navbar } from "./component/Navbar/navbar.js";
import { ProfilePage } from "./pages/Profile/ProfilePage.jsx";
import OtherProfile from "./pages/Profile/otherProfile.jsx";
import { AdvancedFilter } from "./pages/Display/AdvFilter/AdvFilter.jsx";
import NotFound from "./pages/NotFound.jsx";

const PrivateRoutes = () => {
    let token = sessionStorage.getItem('token')
    if (token) {
        let auth = { 'token': true }
        return (
            auth.token ? <Outlet /> : <Navigate to='/login' />
        )
    }
    else {
        let auth = { 'token': false }
        return (
            auth.token ? <Outlet /> : <Navigate to='/login' />
        )
    }
}

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Display />} path="/games" />
                        <Route element={<SingleDisplay />} path="/game/:id" />
                        <Route element={<SearchPage />} path="/search/" />
                        <Route element={<CreateAccount />} path="/signup" />
                        <Route element={<AdvancedFilter />} path="/filter" />
                        <Route element={<NotFound />} path="/:id" />
                        <Route element={<PrivateRoutes />}>
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path="/profile/:username" element={<OtherProfile />} />
                        </Route>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
