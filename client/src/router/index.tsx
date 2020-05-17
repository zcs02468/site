import * as React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Effect from "../components/effect/index"
import Header from "../components/header/index"
import Footer from "../components/footer/index"
import DetailPage from "../page/detail/index"
import HomePage from "../page/index"


function AppRouter() {
    return (
        <Router>
            <div className="page-right">
                <Header />
                <div className="pageContent">
                    <Route path="/" exact component={HomePage} />
                    <Route path="/detail" component={DetailPage} />
                </div>
                <Footer />
                <Effect />
            </div>
        </Router>
    );
}
export default AppRouter;