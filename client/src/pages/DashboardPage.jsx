import Navbar from "../components/Navbar";
import CurrencyRates from "../components/CurrencyRates";
import StockPrices from "../components/StockPrices";
import NewsFeed from "../components/NewsFeed";

function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Welcome to the Dashboard</h2>

        <div className="row mt-4">
          <div className="col-md-4">
                  <div className="col-md-4">
          <StockPrices />
        </div>
          </div>

          <div className="col-md-4">
        
            <div className="col-md-4">
              <CurrencyRates />
            </div>
          </div>

          <div className="col-md-4">
              <div className="col-md-4">
                 <NewsFeed />
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
