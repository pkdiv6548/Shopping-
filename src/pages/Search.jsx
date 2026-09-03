import {
  useMemo,
  useState
} from "react";

import {
  Link,
  useSearchParams
} from "react-router-dom";

const money = value =>
  `₹${Math.round(Number(value || 0) * 84).toLocaleString("en-IN")}`;

export default function Search({
  products = []
}) {
  const [searchParams] =
    useSearchParams();

  const initialQuery =
    searchParams.get("q") || "";

  const [q, setQ] =
    useState(initialQuery);

  const results = useMemo(() => {
    const query =
      q.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return products
      .filter(product => {
        const searchable = [
          product.name,
          product.category,
          product.material,
          product.color,
          product.badge,
          ...(product.sizes || [])
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(query);
      })
      .slice(0, 48);
  }, [products, q]);

  return (
    <main className="page-shell">
      <div className="page-hero">
        <small>SEARCH</small>

        <h1>
          Find your next piece
        </h1>

        <p>
          Search products by name,
          category, material, colour
          or size.
        </p>
      </div>

      <input
        autoFocus
        className="wide-input"
        value={q}
        onChange={event =>
          setQ(event.target.value)
        }
        placeholder="Try “wool”, “dress”, “black”..."
        aria-label="Search products"
      />

      <p>
        {q
          ? `${results.length} results`
          : "Popular: dresses · tailoring · knitwear · bags"}
      </p>

      {q && !results.length ? (
        <div className="empty">
          <h2>
            No results found
          </h2>

          <p>
            Try another product,
            colour or material.
          </p>
        </div>
      ) : (
        <div className="mini-grid">
          {results.map(product => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                loading="lazy"
              />

              <b>
                {product.name}
              </b>

              <span>
                {money(product.price)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
