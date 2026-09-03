import { Link } from "react-router-dom";

import {
  Minus,
  Plus,
  Trash2,
  ArrowRight
} from "lucide-react";

const money = value =>
  `₹${Math.round(Number(value || 0) * 84).toLocaleString("en-IN")}`;

export default function Cart({
  items = [],
  onQty,
  onRemove
}) {
  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.qty || 0),
    0
  );

  const delivery =
    subtotal >= 100
      ? 0
      : items.length
        ? 12
        : 0;

  const total =
    subtotal + delivery;

  return (
    <main className="section narrow">
      <div className="pageTitle">
        <small>YOUR BAG</small>

        <h1>
          Shopping bag
        </h1>
      </div>

      {!items.length ? (
        <div className="empty">
          <h2>
            Your bag is empty.
          </h2>

          <p>
            Discover the latest
            collection and add
            something you love.
          </p>

          <Link
            className="btn dark"
            to="/category/new-arrivals"
          >
            SHOP NEW IN
          </Link>
        </div>
      ) : (
        <>
          <div className="cartList">
            {items.map(item => (
              <div
                className="cartItem"
                key={item.id}
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  loading="lazy"
                />

                <div>
                  <small>
                    {item.category}
                  </small>

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.color}
                    {" · "}
                    {item.selectedSize ||
                      item.sizes?.[0] ||
                      "One size"}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      onRemove?.(item.id)
                    }
                  >
                    <Trash2 />
                    Remove
                  </button>
                </div>

                <div className="qty">
                  <button
                    type="button"
                    onClick={() =>
                      onQty?.(item.id, -1)
                    }
                    aria-label="Decrease quantity"
                  >
                    <Minus />
                  </button>

                  <span>
                    {item.qty}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      onQty?.(item.id, 1)
                    }
                    aria-label="Increase quantity"
                  >
                    <Plus />
                  </button>
                </div>

                <b>
                  {money(
                    Number(item.price || 0) *
                      Number(item.qty || 0)
                  )}
                </b>
              </div>
            ))}
          </div>

          <div className="summary">
            <div>
              <span>
                Subtotal
              </span>

              <b>
                {money(subtotal)}
              </b>
            </div>

            <div>
              <span>
                Delivery
              </span>

              <b>
                {delivery === 0
                  ? "Free"
                  : money(delivery)}
              </b>
            </div>

            <div className="total">
              <span>
                Total
              </span>

              <b>
                {money(total)}
              </b>
            </div>

            <Link
              className="btn dark full"
              to="/checkout"
            >
              CHECKOUT
              <ArrowRight />
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
