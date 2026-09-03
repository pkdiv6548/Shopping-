import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

const money = value =>
  `₹${Math.round(Number(value || 0) * 84).toLocaleString("en-IN")}`;

export default function ProductCard({
  p,
  wish = false,
  onWish,
  onAdd
}) {
  if (!p) return null;

  const colorCount =
    Number(p.id % 4) + 1;

  return (
    <article className="card">
      <div className="visual">
        <Link to={`/product/${p.id}`}>
          <img
            src={p.images?.[0]}
            alt={p.name}
            loading="lazy"
          />

          {p.images?.[1] && (
            <img
              className="hover"
              src={p.images[1]}
              alt=""
              loading="lazy"
            />
          )}
        </Link>

        {p.badge && (
          <span className="badge">
            {p.badge}
          </span>
        )}

        <button
          type="button"
          className={`heart ${wish ? "on" : ""}`}
          onClick={() => onWish?.(p.id)}
          aria-label={
            wish
              ? `Remove ${p.name} from wishlist`
              : `Add ${p.name} to wishlist`
          }
        >
          <Heart
            size={18}
            fill={wish ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          className="quick"
          onClick={() => onAdd?.(p)}
        >
          QUICK ADD
          <ShoppingBag size={15} />
        </button>
      </div>

      <div className="pinfo">
        <div className="meta">
          <span>{p.category}</span>

          <span>
            <Star
              size={11}
              fill="currentColor"
            />

            {p.rating}
          </span>
        </div>

        <Link
          className="pname"
          to={`/product/${p.id}`}
        >
          {p.name}
        </Link>

        <b>{money(p.price)}</b>

        <small>
          {p.color} · +{colorCount} colors
        </small>
      </div>
    </article>
  );
}
