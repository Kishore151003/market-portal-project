import { useEffect, useState } from "react";

function CurrencyRates() {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState("USD");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://v6.exchangerate-api.com/v6/b043641b4e2da7c91b49db42/latest/${base}`);
        const data = await res.json();

        if (data.result === "success") {
          setRates(data.conversion_rates);
          setError("");
        } else {
          setError("Failed to fetch currency rates");
        }
      } catch (err) {
        setError("Error fetching rates");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [base]);

  return (
    <div className="card p-3">
      <h5>💱 Currency Exchange Rates (Base: {base})</h5>

      <select
        className="form-select mb-3"
        value={base}
        onChange={(e) => setBase(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <ul className="list-group" style={{ maxHeight: "300px", overflowY: "auto" }}>
          {Object.entries(rates).map(([currency, value]) => (
            <li key={currency} className="list-group-item d-flex justify-content-between">
              <strong>{currency}</strong>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CurrencyRates;
