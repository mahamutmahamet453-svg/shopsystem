import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const Sales = () => {

  const [sales,
    setSales] =
    useState([]);

  const [search,
    setSearch] =
    useState("");






  const getSales =
    async () => {

      try {

        const { data } =
          await API.get(
            "/sales"
          );






        setSales(data);

      } catch (error) {

        console.log(error);

      }

    };







  useEffect(() => {

    getSales();

  }, []);







  const filteredSales =
    sales.filter((sale) =>

      sale.productName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );







  return (

    <div>






      <div
        style={{
          marginBottom:"25px",
        }}
      >

        <h1
          style={{
            fontSize:"35px",
            fontWeight:"bold",
            marginBottom:"5px",
          }}
        >
          🧾 Iibka
        </h1>






        <p
          style={{
            color:"#6b7280",
          }}
        >
          Taariikhda dhammaan iibka
        </p>

      </div>









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
          fontSize:"15px",
        }}
      />









      <div
        style={{
          background:"white",
          borderRadius:"20px",
          overflow:"hidden",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >

        <table
          style={{
            width:"100%",
            borderCollapse:"collapse",
          }}
        >

          <thead
            style={{
              background:"#f3f4f6",
            }}
          >

            <tr>

              <th
                style={{
                  padding:"16px",
                  textAlign:"left",
                }}
              >
                Alaabta
              </th>






              <th
                style={{
                  padding:"16px",
                  textAlign:"left",
                }}
              >
                Tirada
              </th>






              <th
                style={{
                  padding:"16px",
                  textAlign:"left",
                }}
              >
                Wadarta
              </th>






              <th
                style={{
                  padding:"16px",
                  textAlign:"left",
                }}
              >
                Taariikh
              </th>

            </tr>

          </thead>









          <tbody>

            {filteredSales.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  style={{
                    padding:"20px",
                    textAlign:"center",
                    color:"#6b7280",
                  }}
                >
                  Wax iib ah lama helin
                </td>

              </tr>

            ) : (

              filteredSales.map(
                (sale) => (

                  <tr
                    key={sale._id}
                    style={{
                      borderTop:
                        "1px solid #f3f4f6",
                    }}
                  >

                    <td
                      style={{
                        padding:"16px",
                      }}
                    >
                      {sale.productName}
                    </td>






                    <td
                      style={{
                        padding:"16px",
                      }}
                    >
                      {sale.quantity}
                    </td>






                    <td
                      style={{
                        padding:"16px",
                        color:"#059669",
                        fontWeight:"bold",
                      }}
                    >
                      ${sale.total}
                    </td>






                    <td
                      style={{
                        padding:"16px",
                        color:"#6b7280",
                      }}
                    >
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Sales;