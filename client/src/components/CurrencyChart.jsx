import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const API_KEY = "b043641b4e2da7c91b49db42"; // Replace with yours

function CurrencyChart() {
  const [data, setData] = useState([]);
  const [base, setBase] = useState("USD");
  const [loading, setLoading] = useState(true);

  const topCurrencies = ["INR", "EUR", "GBP", "JPY", "CAD", "AUD"];

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
        );
        const json = await res.json();

        const chartData = topCurrencies.map((cur) => ({
          currency: cur,
          rate: json.conversion_rates[cur],
        }));

        setData(chartData);
      } catch (e) {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [base]);

  return (
    <div className="card p-3 mt-4">
      <h5>💱 Currency Comparison (Base: {base})</h5>

      <div className="mb-3">
        <select
          className="form-select w-auto"
          value={base}
          onChange={(e) => setBase(e.target.value)}
        >
          {["USD", "EUR", "INR", "JPY", "GBP"].map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="currency" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rate" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CurrencyChart;
