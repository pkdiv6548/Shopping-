import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Lock
} from "lucide-react";

const RATE = 84;

const money = value =>
  `₹${Math.round(
    Number(value || 0) * RATE
  ).toLocaleString("en-IN")}`;

function Box({ title, children }) {
  return (
    <div className="box">
      <h3>
        {title}
      </h3>

      {children}
    </div>
  );
}

export default function Checkout({
  items = []
}) {
  const safeItems = Array.isArray(items)
    ? items.filter(Boolean)
    : [];

  const [step, setStep] =
    useState(1);

  const [deliveryMethod, setDeliveryMethod] =
    useState("standard");

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [done, setDone] =
    useState(false);

  const [form, setForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      upi: "",
      wallet: ""
    });

  const [errors, setErrors] =
    useState({});

  const subtotal = useMemo(
    () =>
      safeItems.reduce(
        (sum, item) =>
          sum +
          Number(item?.price || 0) *
          Math.max(
            1,
            Number(item?.qty) || 1
          ),
        0
      ),
    [safeItems]
  );

  const standardDelivery =
    subtotal >= 100
      ? 0
      : 12;

  const delivery =
    deliveryMethod === "express"
      ? 20
      : standardDelivery;

  const total =
    subtotal + delivery;

  const updateField = (
    field,
    value
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));

    setErrors(prev => ({
      ...prev,
      [field]: ""
    }));
  };

  const validateAddress = () => {
    const nextErrors = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName =
        "First name is required.";
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName =
        "Last name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email =
        "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      nextErrors.email =
        "Enter a valid email.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone =
        "Phone number is required.";
    } else if (
      !/^[0-9+\-\s]{8,15}$/.test(
        form.phone.trim()
      )
    ) {
      nextErrors.phone =
        "Enter a valid phone number.";
    }

    if (!form.address.trim()) {
      nextErrors.address =
        "Address is required.";
    }

    if (!form.city.trim()) {
      nextErrors.city =
        "City is required.";
    }

    if (!form.postalCode.trim()) {
      nextErrors.postalCode =
        "Postal code is required.";
    } else if (
      !/^[0-9]{5,6}$/.test(
        form.postalCode.trim()
      )
    ) {
      nextErrors.postalCode =
        "Enter a valid postal code.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  const validatePayment = () => {
    const nextErrors = {};

    if (paymentMethod === "card") {
      const card =
        form.cardNumber.replace(
          /\s/g,
          ""
        );

      if (!card) {
        nextErrors.cardNumber =
          "Card number is required.";
      } else if (
        !/^[0-9]{12,19}$/.test(card)
      ) {
        nextErrors.cardNumber =
          "Enter a valid card number.";
      }

      if (!form.cardExpiry.trim()) {
        nextErrors.cardExpiry =
          "Expiry date is required.";
      }

      if (!form.cardCvv.trim()) {
        nextErrors.cardCvv =
          "CVV is required.";
      } else if (
        !/^[0-9]{3,4}$/.test(
          form.cardCvv.trim()
        )
      ) {
        nextErrors.cardCvv =
          "Enter a valid CVV.";
      }
    }

    if (paymentMethod === "upi") {
      if (!form.upi.trim()) {
        nextErrors.upi =
          "UPI ID is required.";
      } else if (
        !/^[\w.-]+@[\w.-]+$/.test(
          form.upi.trim()
        )
      ) {
        nextErrors.upi =
          "Enter a valid UPI ID.";
      }
    }

    if (paymentMethod === "wallet") {
      if (!form.wallet.trim()) {
        nextErrors.wallet =
          "Wallet selection is required.";
      }
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  const continueAddress = () => {
    if (validateAddress()) {
      setStep(2);
    }
  };

  const continueDelivery = () => {
    setStep(3);
  };

  const placeOrder = () => {
    if (
      safeItems.length === 0
    ) {
      return;
    }

    if (!validatePayment()) {
      return;
    }

    setDone(true);
  };

  if (safeItems.length === 0) {
    return (
      <main className="section narrow">
        <div className="empty">
          <h1>
            Your bag is empty.
          </h1>

          <p>
            Add products before starting
            checkout.
          </p>

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

  if (done) {
    return (
      <main className="success section">
        <Check />

        <h1>
          Order confirmed.
        </h1>

        <p>
          Your demo order has been placed
          successfully.
        </p>

        <p>
          Total paid:{" "}
          <strong>
            {money(total)}
          </strong>
        </p>

        <Link
          className="btn dark"
          to="/"
        >
          CONTINUE SHOPPING
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout section">
      <div>
        <small>
          SECURE CHECKOUT
        </small>

        <h1>
          Complete your order
        </h1>

        <div className="steps">
          <b
            className={
              step >= 1
                ? "on"
                : ""
            }
          >
            1 Address
          </b>

          <b
            className={
              step >= 2
                ? "on"
                : ""
            }
          >
            2 Delivery
          </b>

          <b
            className={
              step >= 3
                ? "on"
                : ""
            }
          >
            3 Payment
          </b>
        </div>

        {step === 1 && (
          <Box title="Delivery address">
            <div className="form">
              <div>
                <input
                  value={form.firstName}
                  onChange={event =>
                    updateField(
                      "firstName",
                      event.target.value
                    )
                  }
                  placeholder="First name"
                  autoComplete="given-name"
                  required
                />

                {errors.firstName && (
                  <small>
                    {errors.firstName}
                  </small>
                )}
              </div>

              <div>
                <input
                  value={form.lastName}
                  onChange={event =>
                    updateField(
                      "lastName",
                      event.target.value
                    )
                  }
                  placeholder="Last name"
                  autoComplete="family-name"
                  required
                />

                {errors.lastName && (
                  <small>
                    {errors.lastName}
                  </small>
                )}
              </div>

              <div>
                <input
                  type="email"
                  value={form.email}
                  onChange={event =>
                    updateField(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="Email"
                  autoComplete="email"
                  required
                />

                {errors.email && (
                  <small>
                    {errors.email}
                  </small>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={event =>
                    updateField(
                      "phone",
                      event.target.value
                    )
                  }
                  placeholder="Phone"
                  autoComplete="tel"
                  required
                />

                {errors.phone && (
                  <small>
                    {errors.phone}
                  </small>
                )}
              </div>

              <div>
                <input
                  value={form.address}
                  onChange={event =>
                    updateField(
                      "address",
                      event.target.value
                    )
                  }
                  placeholder="Address"
                  autoComplete="street-address"
                  required
                />

                {errors.address && (
                  <small>
                    {errors.address}
                  </small>
                )}
              </div>

              <div>
                <input
                  value={form.city}
                  onChange={event =>
                    updateField(
                      "city",
                      event.target.value
                    )
                  }
                  placeholder="City"
                  autoComplete="address-level2"
                  required
                />

                {errors.city && (
                  <small>
                    {errors.city}
                  </small>
                )}
              </div>

              <div>
                <input
                  inputMode="numeric"
                  value={form.postalCode}
                  onChange={event =>
                    updateField(
                      "postalCode",
                      event.target.value
                    )
                  }
                  placeholder="Postal code"
                  autoComplete="postal-code"
                  required
                />

                {errors.postalCode && (
                  <small>
                    {errors.postalCode}
                  </small>
                )}
              </div>
            </div>

            <button
              type="button"
              className="btn dark full"
              onClick={continueAddress}
            >
              CONTINUE
            </button>
          </Box>
        )}

        {step === 2 && (
          <Box title="Delivery method">
            <label className="choice">
              <input
                type="radio"
                name="delivery"
                value="standard"
                checked={
                  deliveryMethod ===
                  "standard"
                }
                onChange={() =>
                  setDeliveryMethod(
                    "standard"
                  )
                }
              />

              <span>
                Standard · 3–5 days
              </span>

              <b>
                {standardDelivery === 0
                  ? "Free"
                  : money(
                      standardDelivery
                    )}
              </b>
            </label>

            <label className="choice">
              <input
                type="radio"
                name="delivery"
                value="express"
                checked={
                  deliveryMethod ===
                  "express"
                }
                onChange={() =>
                  setDeliveryMethod(
                    "express"
                  )
                }
              />

              <span>
                Express · 1–2 days
              </span>

              <b>
                {money(20)}
              </b>
            </label>

            <button
              type="button"
              className="btn dark full"
              onClick={continueDelivery}
            >
              CONTINUE
            </button>

            <button
              type="button"
              className="btn full"
              onClick={() =>
                setStep(1)
              }
            >
              <ArrowLeft />
              BACK
            </button>
          </Box>
        )}

        {step === 3 && (
          <Box title="Payment">
            <div className="pay">
              <button
                type="button"
                className={
                  paymentMethod === "card"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPaymentMethod("card")
                }
              >
                Card
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "upi"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPaymentMethod("upi")
                }
              >
                UPI
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "wallet"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPaymentMethod(
                    "wallet"
                  )
                }
              >
                Wallet
              </button>
            </div>

            {paymentMethod === "card" && (
              <>
                <input
                  className="payInput"
                  inputMode="numeric"
                  value={form.cardNumber}
                  onChange={event =>
                    updateField(
                      "cardNumber",
                      event.target.value
                    )
                  }
                  placeholder="Card number"
                  autoComplete="cc-number"
                />

                {errors.cardNumber && (
                  <small>
                    {errors.cardNumber}
                  </small>
                )}

                <div className="form">
                  <input
                    className="payInput"
                    value={form.cardExpiry}
                    onChange={event =>
                      updateField(
                        "cardExpiry",
                        event.target.value
                      )
                    }
                    placeholder="MM/YY"
                    autoComplete="cc-exp"
                  />

                  <input
                    className="payInput"
                    inputMode="numeric"
                    value={form.cardCvv}
                    onChange={event =>
                      updateField(
                        "cardCvv",
                        event.target.value
                      )
                    }
                    placeholder="CVV"
                    autoComplete="cc-csc"
                  />
                </div>

                {errors.cardExpiry && (
                  <small>
                    {errors.cardExpiry}
                  </small>
                )}

                {errors.cardCvv && (
                  <small>
                    {errors.cardCvv}
                  </small>
                )}
              </>
            )}

            {paymentMethod === "upi" && (
              <>
                <input
                  className="payInput"
                  value={form.upi}
                  onChange={event =>
                    updateField(
                      "upi",
                      event.target.value
                    )
                  }
                  placeholder="yourname@upi"
                  autoComplete="off"
                />

                {errors.upi && (
                  <small>
                    {errors.upi}
                  </small>
                )}
              </>
            )}

            {paymentMethod === "wallet" && (
              <>
                <select
                  className="payInput"
                  value={form.wallet}
                  onChange={event =>
                    updateField(
                      "wallet",
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    Select wallet
                  </option>

                  <option value="wallet">
                    Digital Wallet
                  </option>

                  <option value="cash">
                    Cash Wallet
                  </option>
                </select>

                {errors.wallet && (
                  <small>
                    {errors.wallet}
                  </small>
                )}
              </>
            )}

            <button
              type="button"
              className="btn dark full"
              onClick={placeOrder}
            >
              <Lock />
              PAY {money(total)}
            </button>

            <button
              type="button"
              className="btn full"
              onClick={() =>
                setStep(2)
              }
            >
              <ArrowLeft />
              BACK
            </button>
          </Box>
        )}
      </div>

      <aside className="order">
        <h3>
          Order summary
        </h3>

        {safeItems.map(item => {
          const quantity =
            Math.max(
              1,
              Number(item?.qty) || 1
            );

          return (
            <p
              key={`${item.id}-${item.selectedSize || ""}`}
            >
              <span>
                {item?.name ||
                  "Product"}{" "}
                × {quantity}
              </span>

              <b>
                {money(
                  Number(
                    item?.price || 0
                  ) * quantity
                )}
              </b>
            </p>
          );
        })}

        <hr />

        <p>
          <span>
            Subtotal
          </span>

          <b>
            {money(subtotal)}
          </b>
        </p>

        <p>
          <span>
            Delivery
          </span>

          <b>
            {delivery === 0
              ? "Free"
              : money(delivery)}
          </b>
        </p>

        <hr />

        <h3>
          <span>
            Total
          </span>

          <b>
            {money(total)}
          </b>
        </h3>
      </aside>
    </main>
  );
      }
