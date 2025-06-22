import Navbar from "../components/Navbar";

function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Welcome to the Dashboard</h2>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card p-3">
              <h5>📈 Stocks</h5>
              <p>Coming soon...</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h5>💱 Currency</h5>
              <p>Coming soon...</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h5>📰 News</h5>
              <p>Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
