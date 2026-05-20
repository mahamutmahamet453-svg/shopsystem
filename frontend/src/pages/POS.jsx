import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const POS = () => {

  const [products,
    setProducts] =
    useState([]);

  const [selectedProduct,
    setSelectedProduct] =
    useState("");

  const [quantity,
    setQuantity] =
    useState(1);

  const [paid,
    setPaid] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const [receipt,
    setReceipt] =
    useState(null);






  // ✅ SETTINGS (NEW)
  const settings =
    JSON.parse(
      localStorage.getItem("shopSettings")
    ) || {};






  const getProducts =
    async () => {

      try {

        const { data } =
          await API.get(
            "/products"
          );

        setProducts(data);

      } catch (error) {

        console.log(error);

      }

    };






  useEffect(() => {

    getProducts();

  }, []);






  const product =
    products.find(
      (p) =>
        p._id === selectedProduct
    );






  const total =
    product
      ? product.price * quantity
      : 0;






  const change =
    paid
      ? paid - total
      : 0;






  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/sales",
          {

            productId:
              selectedProduct,

            quantity,

          }
        );






        setMessage(
          "✅ Iibka Waa Lagu Guuleystay"
        );






        // ✅ RECEIPT (UPDATED)
        setReceipt({

          shopName:
            settings.shopName || "Shop",

          phone:
            settings.phone || "",

          address:
            settings.address || "",

          message:
            settings.receiptMessage ||
            "Mahadsanid ❤️",

          product:
            product.name,

          quantity,

          total,

          paid,

          change,

          date:
            new Date().toLocaleString(),

        });






        setSelectedProduct("");
        setQuantity(1);
        setPaid("");

        getProducts();

      } catch (error) {

        setMessage(
          "❌ Iibka wuu fashilmay"
        );

      }

    };






  const printReceipt =
    () => {

      window.print();

    };






  return (

    <div>






      <div
        style={{
          marginBottom:"30px",
        }}
      >

        <h1
          style={{
            fontSize:"35px",
            fontWeight:"bold",
            marginBottom:"5px",
          }}
        >
          🛒 Kasheer
        </h1>






        <p
          style={{
            color:"#6b7280",
          }}
        >
          Samee iib cusub
        </p>

      </div>






      {message && (

        <div
          style={{
            background:"#ecfdf5",
            color:"#065f46",
            padding:"14px",
            borderRadius:"12px",
            marginBottom:"20px",
          }}
        >
          {message}
        </div>

      )}






      <form
        onSubmit={submitHandler}
        style={{
          background:"white",
          padding:"25px",
          borderRadius:"20px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.05)",
          marginBottom:"30px",
        }}
      >

        <div
          style={{
            display:"grid",
            gap:"20px",
          }}
        >






          <div>

            <label>Alaabta</label>

            <select
              value={selectedProduct}
              onChange={(e) =>
                setSelectedProduct(
                  e.target.value
                )
              }
              required
              style={{
                width:"100%",
                padding:"14px",
                borderRadius:"12px",
                border:
                  "1px solid #d1d5db",
                marginTop:"8px",
              }}
            >

              <option value="">
                Dooro Alaab
              </option>

              {products.map(
                (product) => (

                  <option
                    key={product._id}
                    value={product._id}
                  >
                    {product.name} | Stock:
                    {product.stock} | $
                    {product.price}
                  </option>

                )
              )}

            </select>

          </div>






          <div>

            <label>Tirada</label>

            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
              min="1"
              required
              style={{
                width:"100%",
                padding:"14px",
                borderRadius:"12px",
                border:
                  "1px solid #d1d5db",
                marginTop:"8px",
              }}
            />

          </div>






          <div>

            <label>Lacagta La Bixiyay</label>

            <input
              type="number"
              value={paid}
              onChange={(e) =>
                setPaid(e.target.value)
              }
              required
              style={{
                width:"100%",
                padding:"14px",
                borderRadius:"12px",
                border:
                  "1px solid #d1d5db",
                marginTop:"8px",
              }}
            />

          </div>






          <div
            style={{
              background:"#f9fafb",
              padding:"20px",
              borderRadius:"14px",
            }}
          >

            <h3>💵 Faahfaahinta</h3>

            <p>
              Wadarta: <strong>${total}</strong>
            </p>

            <p>
              Haraaga:
              {" "}
              <strong
                style={{
                  color:"#059669",
                }}
              >
                ${change}
              </strong>
            </p>

          </div>






          <button
            style={{
              background:"#2563eb",
              color:"white",
              border:"none",
              padding:"15px",
              borderRadius:"14px",
              fontSize:"16px",
              cursor:"pointer",
              fontWeight:"bold",
            }}
          >
            💰 Dhamee Iibka
          </button>

        </div>

      </form>






      {receipt && (

        <div
          style={{
            background:"white",
            padding:"25px",
            borderRadius:"20px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >

          <h2>🧾 Rasiid</h2>

          {/* SHOP INFO */}
          <h3>{receipt.shopName}</h3>
          <p>{receipt.phone}</p>
          <p>{receipt.address}</p>

          <hr />

          <p>
            Alaabta:
            {" "}
            <strong>{receipt.product}</strong>
          </p>

          <p>
            Tirada:
            {" "}
            <strong>{receipt.quantity}</strong>
          </p>

          <p>
            Wadarta:
            {" "}
            <strong>${receipt.total}</strong>
          </p>

          <p>
            La Bixiyay:
            {" "}
            <strong>${receipt.paid}</strong>
          </p>

          <p>
            Haraaga:
            {" "}
            <strong>${receipt.change}</strong>
          </p>

          <p>
            Taariikh:
            {" "}
            <strong>{receipt.date}</strong>
          </p>

          <hr />

          <p>{receipt.message}</p>

          <button
            onClick={printReceipt}
            style={{
              marginTop:"20px",
              background:"#059669",
              color:"white",
              border:"none",
              padding:"14px 20px",
              borderRadius:"12px",
              cursor:"pointer",
              fontWeight:"bold",
            }}
          >
            🖨️ Daabac Rasiid
          </button>

        </div>

      )}

    </div>

  );

};

export default POS;