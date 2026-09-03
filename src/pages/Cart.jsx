import { Link } from "react-router-dom";

import {
  Minus,
  Plus,
  Trash2,
  ArrowRight
} from "lucide-react";

const RATE = 84;

const money = value =>
  `₹${Math.round(
    Number(value || 0) * RATE
  ).toLocaleString("en-IN")}`;

export default function Cart({
  items = [],
  onQty,
  onRemove
}) {
  const safeItems = Array.isArray(items)
    ? items.filter(Boolean)
    : [];

  const subtotal = safeItems.reduce(
    (sum, item) =>
      sum +
      Number(item?.price || 0) *
      Math.max(1, Number(item?.qty) || 1),
    0
  );

  const delivery =
    subtotal >= 100
      ? 0
      : safeItems.length > 0
        ? 12
        : 0;

  const total =
    subtotal + delivery;

  const totalQuantity =
    safeItems.reduce(
      (sum, item) =>
        sum +
        Math.max(
          1,
          Number(item?.qty) || 1
        ),
      0
    );

  return (
    <main className="section narrow">
      <div className="pageTitle">
        <small>
          YOUR BAG
        </small>

        <h1>
          Shopping bag
        </h1>

        {safeItems.length > 0 && (
          <p>
            {totalQuantity}{" "}
            {totalQuantity === 1
              ? "item"
              : "items"}
          </p>
        )}
      </div>

      {safeItems.length === 0 ? (
        <div className="empty">
          <h2>
            Your bag is empty.
          </h2>

          <p>
            Discover the latest collection
            and add something you love.
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
            {safeItems.map(item => {
              const quantity =
                Math.max(
                  1,
                  Number(item?.qty) || 1
                );

              const lineTotal =
                Number(item?.price || 0) *
                quantity;

              const image =
                item?.images?.[0] ||
                item?.image ||
                "";

              const selectedSize =
                item?.selectedSize ||
                item?.sizes?.[0] ||
                "One size";

              const selectedColor =
                item?.selectedColor ||
                item?.color ||
                "";

              return (
                <div
                  className="cartItem"
                  key={`${item.id}-${selectedSize}-${selectedColor}`}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={
                        item?.name ||
                        "Product"
                      }
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="cartImageFallback"
                      aria-hidden="true"
                    />
                  )}

                  <div>
                    <small>
                      {item?.category ||
                        "Collection"}
                    </small>

                    <h3>
                      {item?.name ||
                        "Product"}
                    </h3>

                    <p>
                      {selectedColor ||
                        "Standard"}

                      {" · "}

                      {selectedSize}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        onRemove?.(item.id)
                      }
                      aria-label={`Remove ${item?.name || "product"} from bag`}
                    >
                      <Trash2 />
                      Remove
                    </button>
                  </div>

                  <div className="qty">
                    <button
                      type="button"
                      onClick={() =>
                        onQty?.(
                          item.id,
                          -1
                        )
                      }
                      aria-label={`Decrease quantity of ${item?.name || "product"}`}
                    >
                      <Minus />
                    </button>

                    <span>
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onQty?.(
                          item.id,
                          1
                        )
                      }
                      aria-label={`Increase quantity of ${item?.name || "product"}`}
                    >
                      <Plus />
                    </button>
                  </div>

                  <b>
                    {money(lineTotal)}
                  </b>
                </div>
              );
            })}
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

            {delivery > 0 && (
              <small>
                Free delivery on orders over{" "}
                {money(100)}
              </small>
            )}

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

            <Link
              className="btn full"
              to="/category/new-arrivals"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
