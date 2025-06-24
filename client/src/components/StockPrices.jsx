import { useEffect, useState } from "react";

const API_KEY = "2026e253ed1b45ee9ef5794412046586";
const TRENDING = ["AAPL", "TSLA", "MSFT"];


function StockPrices() {
  const [topStocks, setTopStocks] = useState({});
  const [symbol, setSymbol] = useState("");
  const [searchedPrice, setSearchedPrice] = useState(null);
  const [error, setError] = useState("");

  // Fetch top trending stocks on mount
  useEffect(() => {
    const fetchTopStocks = async () => {
      const temp = {};

      for (let stock of TRENDING) {
        try {
          const res = await fetch(
            `https://api.twelvedata.com/price?symbol=${stock}&apikey=${API_KEY}`
          );
          const data = await res.json();
          temp[stock] = data.price || "N/A";
        } catch {
          temp[stock] = "N/A";
        }
      }

      setTopStocks(temp);
    };

    fetchTopStocks();
  }, []);

  const fetchSearchedPrice = async () => {
    try {
      setError("");
      setSearchedPrice(null);

      const res = await fetch(
        `https://api.twelvedata.com/price?symbol=${symbol.toUpperCase()}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.status === "error" || !data.price) {
        setError("Stock not found or limit exceeded");
      } else {
        setSearchedPrice({ symbol: symbol.toUpperCase(), price: data.price });
      }
    } catch {
      setError("Error fetching stock price");
    }
  };

  return (
    <div className="card p-3">
      <h5>📈 Top Trending Stocks</h5>
      <ul className="list-group mb-3">
        {Object.entries(topStocks).map(([stock, price]) => (
          <li
            key={stock}
            className="list-group-item d-flex justify-content-between"
          >
            <strong>{stock}</strong> <span>${price}</span>
          </li>
        ))}
      </ul>

      <h6>🔍 Search Stock</h6>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter symbol (e.g. TCS, NFLX)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button className="btn btn-primary mb-2" onClick={fetchSearchedPrice}>
        Get Price
      </button>

      {error && <p className="text-danger">{error}</p>}

      {searchedPrice && (
        <div className="alert alert-success">
          {searchedPrice.symbol}: ${searchedPrice.price}
        </div>
      )}
    </div>
  );
}

export default StockPrices;
