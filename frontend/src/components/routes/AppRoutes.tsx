import HomePage from "../HomePage";
import UploadFacet from "../UploadFacet";
import Dashboard from '../Dashboard';
import {Route, Routes} from "react-router-dom";
import LandingPage from "../LandingPage";
import FacetDetail from '../FacetDetail';


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route index element={<HomePage />} />
                <Route path="upload-facet" element={<UploadFacet />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="landing-page" element={<LandingPage />} />
                <Route path="facet/:facetAddress" element={<FacetDetail />} />
          {/*  <Route path="dashboard-page" element={<DashboardPage />} />*/}
          {/*   <Route path="dashboard-page-action" element={<DashboardPageAction />} />*/}
          {/*   <Route path="search" element={<Search />} />*/}
          {/*  <Route index element={<LeagueStandings />} />*/}
            </Routes>
        </>
    )
};

export default AppRoutes