import { useEffect, useState } from "react";
import axios from "axios";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(0);

  const userEmail = localStorage.getItem("email"); // stored at login

 const fetchPortfolio = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/portfolio/${userEmail}`);
    const items = res.data;
    
    // For each item, get live stock price
const updatedItems = await Promise.all(
  items.map(async (item) => {
    try {
      const response = await axios.get(
        `https://api.twelvedata.com/price?symbol=${item.symbol}&apikey=...`
      );

      if (response.data && response.data.price) {
        const price = parseFloat(response.data.price);
        return {
          ...item,
          price,
          totalValue: price * item.quantity,
        };
      } else {
        return { ...item, price: 0, totalValue: 0 };
      }
    } catch (err) {
      console.error("Error fetching price for", item.symbol, err);
      return { ...item, price: 0, totalValue: 0 };
    }
  })
);


    setPortfolio(updatedItems);
  } catch (err) {
    console.error("Error fetching portfolio", err);
  }
};

const addStock = async () => {
  try {
    console.log("Trying to add:", { userEmail, symbol, quantity }); // ✅ add this

    await axios.post("http://localhost:8080/api/portfolio/add", {
      userEmail,
      symbol,
      quantity: Number(quantity)
    });

    setSymbol("");
    setQuantity(0);
    fetchPortfolio(); // refresh
  } catch (err) {
    console.error("Error adding stock", err);
  }
};


  const deleteStock = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/portfolio/delete/${id}`);
      fetchPortfolio(); // refresh
    } catch (err) {
      console.error("Error deleting stock", err);
    }
  };

  const totalWorth = portfolio.reduce((sum, item) => sum + item.totalValue, 0);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <div className="container mt-5">
      <h3>📊 My Portfolio</h3>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Stock Symbol (e.g., AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={addStock}>
            Add to Portfolio
          </button>
        </div>
      </div>

      <table className="table table-striped">
  <thead className="table-dark">
    <tr>
      <th>Symbol</th>
      <th>Qty</th>
      <th>Price (₹)</th>
      <th>Total (₹)</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {portfolio.map((stock) => (
      <tr key={stock.id}>
        <td>{stock.symbol}</td>
        <td>{stock.quantity}</td>
        <td>{stock.price ? stock.price.toFixed(2) : "Fetching..."}</td>
        <td>{stock.totalValue ? stock.totalValue.toFixed(2) : "Fetching..."}</td>

        <td>
          <button className="btn btn-danger btn-sm" onClick={() => deleteStock(stock.id)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan="3"><strong>Total Portfolio Value</strong></td>
      <td><strong>₹{totalWorth.toFixed(2)}</strong></td>
      <td></td>
    </tr>
  </tfoot>
</table>

    </div>
  );
}

export default Portfolio;
