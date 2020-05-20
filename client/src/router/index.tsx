import * as React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Effect from "../components/effect/index"
import Header from "../components/header/index"
import Footer from "../components/footer/index"
import HomePage from "../page/index"
import DetailPage from "../page/detail/index"
import EmailPage from "../page/email/index"


function AppRouter() {
    return (
        <Router>
            <div className="page-right">
                <Header />
                <div className="pageContent">
                    <Route path="/" exact component={HomePage} />
                    <Route path="/detail/:id" component={DetailPage} />
                    <Route path="/email" component={EmailPage} />
                </div>
                <Footer />
                <Effect />
            </div>
        </Router>
    );
}
export default AppRouter;