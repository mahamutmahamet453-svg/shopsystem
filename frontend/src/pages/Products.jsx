import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const Products = () => {

  const [products,
    setProducts] =
    useState([]);

  const [name,
    setName] =
    useState("");

  const [price,
    setPrice] =
    useState("");

  const [stock,
    setStock] =
    useState("");

  const [search,
    setSearch] =
    useState("");

  const [editingId,
    setEditingId] =
    useState(null);







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







  const submitHandler =
    async (e) => {

      e.preventDefault();






      try {

        if (editingId) {

          await API.put(

            `/products/${editingId}`,

            {

              name,

              price,

              stock,

            }

          );






          setEditingId(null);

        } else {

          await API.post(
            "/products",
            {

              name,

              price,

              stock,

            }
          );

        }






        setName("");

        setPrice("");

        setStock("");






        getProducts();

      } catch (error) {

        console.log(error);

      }

    };







  const deleteHandler =
    async (id) => {

      if (
        window.confirm(
          "Ma tirtiraysaa alaabtan?"
        )
      ) {

        try {

          await API.delete(
            `/products/${id}`
          );






          getProducts();

        } catch (error) {

          console.log(error);

        }

      }

    };







  const editHandler =
    (product) => {

      setEditingId(
        product._id
      );






      setName(
        product.name
      );






      setPrice(
        product.price
      );






      setStock(
        product.stock
      );

    };







  const filteredProducts =
    products.filter((product) =>

      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );







  const inventoryValue =
    products.reduce(

      (acc, item) =>

        acc +
        item.price *
        item.stock,

      0

    );







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
          📦 Alaabo
        </h1>






        <p
          style={{
            color:"#6b7280",
          }}
        >
          Maamul alaabta dukaanka
        </p>

      </div>









      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap:"20px",
          marginBottom:"30px",
        }}
      >






        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color:"white",
            padding:"20px",
            borderRadius:"18px",
          }}
        >

          <h3>
            📦 Wadarta Alaabta
          </h3>






          <h1
            style={{
              fontSize:"35px",
            }}
          >
            {products.length}
          </h1>

        </div>









        <div
          style={{
            background:
              "linear-gradient(135deg,#059669,#047857)",
            color:"white",
            padding:"20px",
            borderRadius:"18px",
          }}
        >

          <h3>
            💰 Qiimaha Kaydka
          </h3>






          <h1
            style={{
              fontSize:"35px",
            }}
          >
            ${inventoryValue}
          </h1>

        </div>

      </div>









      <form
        onSubmit={submitHandler}
        style={{
          background:"white",
          padding:"25px",
          borderRadius:"20px",
          marginBottom:"30px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >

        <div
          style={{
            display:"grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap:"15px",
          }}
        >






          <input
            type="text"
            placeholder="Magaca Alaabta"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
            style={{
              padding:"14px",
              borderRadius:"12px",
              border:
                "1px solid #d1d5db",
            }}
          />









          <input
            type="number"
            placeholder="Qiimaha"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            required
            style={{
              padding:"14px",
              borderRadius:"12px",
              border:
                "1px solid #d1d5db",
            }}
          />









          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
            required
            style={{
              padding:"14px",
              borderRadius:"12px",
              border:
                "1px solid #d1d5db",
            }}
          />









          <button
            style={{
              background:
                editingId
                  ? "#f59e0b"
                  : "#2563eb",
              color:"white",
              border:"none",
              borderRadius:"12px",
              cursor:"pointer",
              fontWeight:"bold",
            }}
          >

            {editingId
              ? "✏️ Cusboonaysii"
              : "➕ Kudar"}

          </button>

        </div>

      </form>









      <input
        type="text"
        placeholder="🔍 Raadi alaab..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width:"100%",
          padding:"14px",
          borderRadius:"12px",
          border:"1px solid #d1d5db",
          marginBottom:"20px",
          outline:"none",
        }}
      />









      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap:"20px",
        }}
      >

        {filteredProducts.map(
          (product) => (

            <div
              key={product._id}
              style={{
                background:"white",
                padding:"20px",
                borderRadius:"20px",
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >

              <div
                style={{
                  display:"flex",
                  justifyContent:
                    "space-between",
                  marginBottom:"15px",
                }}
              >

                <h3>
                  {product.name}
                </h3>






                <span
                  style={{
                    background:
                      product.stock <= 5
                        ? "#fee2e2"
                        : "#dcfce7",

                    color:
                      product.stock <= 5
                        ? "red"
                        : "green",

                    padding:
                      "5px 10px",

                    borderRadius:"20px",

                    fontSize:"13px",

                    fontWeight:"bold",
                  }}
                >

                  {product.stock <= 5
                    ? "wuu sii dhamaanaya"
                    : "wuu fiican yahay"}

                </span>

              </div>









              <p
                style={{
                  marginBottom:"8px",
                }}
              >
                💵 Qiimo:
                {" "}
                <strong>
                  ${product.price}
                </strong>
              </p>






              <p
                style={{
                  marginBottom:"20px",
                }}
              >
                📦 Stock:
                {" "}
                <strong>
                  {product.stock}
                </strong>
              </p>









              <div
                style={{
                  display:"flex",
                  gap:"10px",
                }}
              >

                <button
                  onClick={() =>
                    editHandler(
                      product
                    )
                  }
                  style={{
                    flex:1,
                    background:"#f59e0b",
                    color:"white",
                    border:"none",
                    padding:"12px",
                    borderRadius:"12px",
                    cursor:"pointer",
                    fontWeight:"bold",
                  }}
                >
                  ✏️ Edit
                </button>









                <button
                  onClick={() =>
                    deleteHandler(
                      product._id
                    )
                  }
                  style={{
                    flex:1,
                    background:"#dc2626",
                    color:"white",
                    border:"none",
                    padding:"12px",
                    borderRadius:"12px",
                    cursor:"pointer",
                    fontWeight:"bold",
                  }}
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

};

export default Products;