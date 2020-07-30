import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Effect from "../components/effect/index";
import Header from "../components/header/index";
import Footer from "../components/footer/index";
// import HomePage from "../page/index"
// import BlogPage from "../page/blog/index"
// import DetailPage from "../page/detail/index"
// import EmailPage from "../page/email/index"

// import HomePage from "../page/index"
// import BlogPage from "../page/blog/index"
// import DetailPage from "../page/detail/index"
// import EmailPage from "../page/email/index"
                                                                                                      
const HomePage = React.lazy(() => import("../page/index"));
const BlogPage = React.lazy(() => import("../page/blog/index"));
const DetailPage = React.lazy(() => import("../page/detail/index"));
const EmailPage = React.lazy(() => import("../page/email/index"));
const ChartPage = React.lazy(() => import("../page/chart/index"));

function AppRouter() {
    return (
        <BrowserRouter>
            <div className="page-right">
                <Header />
                <div className="pageContent">
                    <Route path="/" exact component={HomePage} />
                    <Route path="/blog" component={BlogPage} />
                    <Route path="/detail/:id" component={DetailPage} />
                    <Route path="/email" component={EmailPage} />
                    <Route path="/chart" component={ChartPage} />
                </div>
                <Footer />
                <Effect />
            </div>
        </BrowserRouter>
    );
}
export default AppRouter;
