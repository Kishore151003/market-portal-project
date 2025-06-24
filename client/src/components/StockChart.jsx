import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_KEY = "2026e253ed1b45ee9ef5794412046586"; // Replace this

function StockChart() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchStockHistory = async () => {
    try {
      setError("");
      setData([]);

      const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=7&apikey=${API_KEY}`
      );

      const json = await response.json();

      if (json.status === "error") {
        setError("Invalid symbol or API limit reached");
        return;
      }

      const formatted = json.values
        .reverse()
        .map((item) => ({
          date: item.datetime,
          price: parseFloat(item.close),
        }));

      setData(formatted);
    } catch (e) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="card p-3">
      <h5>📈 Stock Price - Last 7 Days</h5>
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchStockHistory}>
          Show Chart
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#007bff" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default StockChart;
