import {
  Link,
  useParams
} from "react-router-dom";

import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Leaf
} from "lucide-react";

import { useState } from "react";

import ZoomGallery from "../components/ZoomGallery";
import ProductCard from "../components/ProductCard";

const money = value =>
  `₹${Math.round(Number(value || 0) * 84).toLocaleString("en-IN")}`;

export default function Product({
  products = [],
  wish = [],
  onWish,
  onAdd
}) {
  const { id } = useParams();

  const product =
    products.find(item => item.id === Number(id)) ||
    products[0];

  const [size, setSize] = useState(
    product?.sizes?.[0] || ""
  );

  if (!product) {
    return (
      <main className="section narrow">
        <div className="empty">
          <h1>Product not found</h1>

          <Link
            className="btn dark"
            to="/category/new-arrivals"
          >
            SHOP NEW IN
          </Link>
        </div>
      </main>
    );
  }

  const related = products
    .filter(
      item =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const handleAdd = () => {
    onAdd?.({
      ...product,
      selectedSize:
        size || product.sizes?.[0] || ""
    });
  };

  return (
    <>
      <main className="pdp">
        <ZoomGallery
          images={product.images}
          name={product.name}
        />

        <article className="details">
          <small>
            {product.category} / {product.material}
          </small>

          <h1>{product.name}</h1>

          <div className="rating">
            ★★★★★

            <span>
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <h2>
            {product.compareAt && (
              <del>
                {money(product.compareAt)}
              </del>
            )}

            {" "}
            {money(product.price)}
          </h2>

          <p>{product.description}</p>

          <div className="color">
            <b>COLOUR</b>{" "}
            {product.color}
          </div>

          <div className="sizeHead">
            <b>SELECT SIZE</b>

            <Link to="/size-guide">
              SIZE GUIDE
            </Link>
          </div>

          <div className="sizes">
            {product.sizes?.map(itemSize => (
              <button
                type="button"
                className={
                  size === itemSize
                    ? "sel"
                    : ""
                }
                key={itemSize}
                onClick={() =>
                  setSize(itemSize)
                }
                aria-pressed={
                  size === itemSize
                }
              >
                {itemSize}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="addBtn"
            onClick={handleAdd}
          >
            ADD TO BAG
            <ShoppingBag />
          </button>

          <button
            type="button"
            className="wishP"
            onClick={() =>
              onWish?.(product.id)
            }
          >
            <Heart
              fill={
                wish.includes(product.id)
                  ? "currentColor"
                  : "none"
              }
            />

            {wish.includes(product.id)
              ? "REMOVE FROM WISHLIST"
              : "ADD TO WISHLIST"}
          </button>

          <div className="promises">
            <div>
              <Truck />
              Fast delivery
            </div>

            <div>
              <RotateCcw />
              Easy returns
            </div>

            <div>
              <Leaf />
              Considered materials
            </div>
          </div>

          <div className="accord">
            <details open>
              <summary>
                Product details
              </summary>

              <p>
                Clean proportions, refined
                finishing and a versatile
                silhouette designed for
                repeat wear.
              </p>
            </details>

            <details>
              <summary>
                Material & care
              </summary>

              <p>
                {product.material}.
                Follow garment care
                instructions.
              </p>
            </details>

            <details>
              <summary>
                Delivery & returns
              </summary>

              <p>
                Standard and express
                delivery options.
                Returns accepted
                according to policy.
              </p>
            </details>
          </div>
        </article>
      </main>

      <section className="section">
        <div className="title">
          <div>
            <small>
              COMPLETE THE LOOK
            </small>

            <h2>
              You may also like.
            </h2>
          </div>
        </div>

        <div className="grid four">
          {related.map(item => (
            <ProductCard
              key={item.id}
              p={item}
              wish={wish.includes(item.id)}
              onWish={onWish}
              onAdd={onAdd}
            />
          ))}
        </div>
      </section>
    </>
  );
}
