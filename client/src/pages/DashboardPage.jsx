import Navbar from "../components/Navbar";
import CurrencyRates from "../components/CurrencyRates";
import StockPrices from "../components/StockPrices";
import NewsFeed from "../components/NewsFeed";
import StockChart from "../components/StockChart";
import CurrencyChart from "../components/CurrencyChart";
import Portfolio from "../components/Portfolio";

function DashboardPage() {
  return (
    <>
      <Navbar />
<Portfolio />
      <div className="container mt-4">
        <h2 className="text-center">Welcome to the Dashboard</h2>

        {/* Top 3 Cards */}
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <StockPrices />
          </div>
          <div className="col-md-4 mb-4">
            <CurrencyRates />
          </div>
          <div className="col-md-4 mb-4">
            <NewsFeed />
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mt-4">
          <div className="col-md-12 mb-4">
            <StockChart />
          </div>
          <div className="col-md-12 mb-4">
            <CurrencyChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
