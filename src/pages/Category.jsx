import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

const slug = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, "-");

const money = (value) =>
  `₹${Math.round(Number(value || 0) * 84).toLocaleString("en-IN")}`;

export default function Category({
  products = [],
  wish = [],
  onWish,
  onAdd
}) {
  const { name = "" } = useParams();

  const categorySlug = slug(name);

  const title =
    categorySlug === "new-arrivals"
      ? "New Arrivals"
      : categorySlug
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  const base = products.filter(product => {
    const productSlug = slug(product.category);

    return (
      productSlug === categorySlug ||
      (
        categorySlug === "new-arrivals" &&
        product.badge === "NEW"
      )
    );
  });

  const colors = [
    ...new Set(base.map(product => product.color).filter(Boolean))
  ];

  const materials = [
    ...new Set(base.map(product => product.material).filter(Boolean))
  ];

  const [filters, setFilters] = useState({
    color: "All",
    size: "All",
    material: "All",
    max: 250,
    stock: "All"
  });

  const [sort, setSort] = useState("Recommended");
  const [drawer, setDrawer] = useState(false);

  const resetFilters = () => {
    setFilters({
      color: "All",
      size: "All",
      material: "All",
      max: 250,
      stock: "All"
    });
  };

  const list = useMemo(() => {
    const filtered = base.filter(product => {
      const colorMatch =
        filters.color === "All" ||
        product.color === filters.color;

      const sizeMatch =
        filters.size === "All" ||
        product.sizes?.includes(filters.size);

      const materialMatch =
        filters.material === "All" ||
        product.material === filters.material;

      const priceMatch =
        Number(product.price || 0) <= Number(filters.max);

      const stockMatch =
        filters.stock === "All" ||
        product.stock === filters.stock;

      return (
        colorMatch &&
        sizeMatch &&
        materialMatch &&
        priceMatch &&
        stockMatch
      );
    });

    const sorted = [...filtered];

    if (sort === "Price low-high") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    if (sort === "Newest") {
      sorted.sort((a, b) => b.id - a.id);
    }

    return sorted;
  }, [base, filters, sort]);

  const FilterBox = () => (
    <div className="filter">
      <div className="filterHead">
        <b>FILTERS</b>

        <button type="button" onClick={resetFilters}>
          RESET
        </button>
      </div>

      <label>
        COLOR

        <select
          value={filters.color}
          onChange={event =>
            setFilters(prev => ({
              ...prev,
              color: event.target.value
            }))
          }
        >
          <option>All</option>

          {colors.map(color => (
            <option key={color}>{color}</option>
          ))}
        </select>
      </label>

      <label>
        SIZE

        <select
          value={filters.size}
          onChange={event =>
            setFilters(prev => ({
              ...prev,
              size: event.target.value
            }))
          }
        >
          <option>All</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
      </label>

      <label>
        MATERIAL

        <select
          value={filters.material}
          onChange={event =>
            setFilters(prev => ({
              ...prev,
              material: event.target.value
            }))
          }
        >
          <option>All</option>

          {materials.map(material => (
            <option key={material}>{material}</option>
          ))}
        </select>
      </label>

      <label>
        AVAILABILITY

        <select
          value={filters.stock}
          onChange={event =>
            setFilters(prev => ({
              ...prev,
              stock: event.target.value
            }))
          }
        >
          <option>All</option>
          <option>In stock</option>
          <option>Low stock</option>
        </select>
      </label>

      <label>
        PRICE

        <input
          type="range"
          min="0"
          max="250"
          value={filters.max}
          onChange={event =>
            setFilters(prev => ({
              ...prev,
              max: Number(event.target.value)
            }))
          }
        />

        <span>Up to {money(filters.max)}</span>
      </label>
    </div>
  );

  return (
    <>
      <div className="intro">
        <small>COLLECTION</small>

        <h1>{title}</h1>

        <p>
          Explore considered pieces across the latest collection.
        </p>
      </div>

      <div className="bar">
        <button
          type="button"
          className="mobileFilter"
          onClick={() => setDrawer(true)}
        >
          <SlidersHorizontal />
          FILTERS
        </button>

        <span>
          {list.length} PRODUCTS
        </span>

        <select
          value={sort}
          onChange={event => setSort(event.target.value)}
        >
          <option>Recommended</option>
          <option>Newest</option>
          <option>Price low-high</option>
          <option>Price high-low</option>
        </select>
      </div>

      <div className="catalog">
        <aside>
          <FilterBox />
        </aside>

        <main className="section">
          {list.length ? (
            <div className="grid four">
              {list.map(product => (
                <ProductCard
                  key={product.id}
                  p={product}
                  wish={wish.includes(product.id)}
                  onWish={onWish}
                  onAdd={onAdd}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No products found</h2>
              <p>
                Try changing your filters or explore another collection.
              </p>

              <button
                type="button"
                className="btn dark"
                onClick={resetFilters}
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </main>
      </div>

      {drawer && (
        <div className="drawer">
          <div>
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Close filters"
            >
              <X />
            </button>

            <FilterBox />
          </div>
        </div>
      )}
    </>
  );
}
