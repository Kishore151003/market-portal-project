import { useEffect, useState } from "react";

const API_KEY = "29add75bb568d18fcb95d13ccbe0ee1f"; // 🔁 Replace with your real key

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://gnews.io/api/v4/top-headlines?topic=business&lang=en&country=in&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.articles) {
          setArticles(data.articles);
        } else {
          setError("No news found");
        }
      } catch (err) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="card p-3">
      <h5>📰 Latest Business News</h5>

      {loading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <ul className="list-group" style={{ maxHeight: "300px", overflowY: "auto" }}>
          {articles.map((article, index) => (
            <li key={index} className="list-group-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <strong>{article.title}</strong>
              </a>
              <br />
              <small className="text-muted">{article.source.name}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsFeed;
