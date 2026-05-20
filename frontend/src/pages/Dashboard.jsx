import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const Dashboard = () => {

  const [products,
    setProducts] =
    useState([]);

  const [sales,
    setSales] =
    useState([]);






  useEffect(() => {

    const getData =
      async () => {

        try {

          const p =
            await API.get(
              "/products"
            );






          const s =
            await API.get(
              "/sales"
            );






          setProducts(p.data);

          setSales(s.data);

        } catch (err) {

          console.log(err);

        }

      };






    getData();

  }, []);







  const today =
    new Date()
      .toDateString();






  const todaySales =
    sales.filter(
      (s) =>
        new Date(
          s.createdAt
        ).toDateString() ===
        today
    );






  const totalRevenue =
    sales.reduce(
      (acc, s) =>
        acc + s.total,
      0
    );






  const todayRevenue =
    todaySales.reduce(
      (acc, s) =>
        acc + s.total,
      0
    );






  const lowStock =
    products.filter(
      (p) => p.stock <= 5
    );







  const recent =
    sales
      .slice()
      .reverse()
      .slice(0, 5);







  return (

    <div>






      <h1
        style={{
          fontSize:"35px",
          marginBottom:"20px",
        }}
      >
        📊 Maamulka
      </h1>









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
            background:"#2563eb",
            color:"white",
            padding:"20px",
            borderRadius:"16px",
          }}
        >

          <h3>📦 Alaabo</h3>

          <h1>{products.length}</h1>

        </div>









        <div
          style={{
            background:"#059669",
            color:"white",
            padding:"20px",
            borderRadius:"16px",
          }}
        >

          <h3>💰 Dakhliga Total</h3>

          <h1>${totalRevenue}</h1>

        </div>









        <div
          style={{
            background:"#7c3aed",
            color:"white",
            padding:"20px",
            borderRadius:"16px",
          }}
        >

          <h3>📅 Dakhliga Maanta</h3>

          <h1>${todayRevenue}</h1>

        </div>









        <div
          style={{
            background:"#dc2626",
            color:"white",
            padding:"20px",
            borderRadius:"16px",
          }}
        >

          <h3>⚠️ Alaab Yar</h3>

          <h1>{lowStock.length}</h1>

        </div>

      </div>









      <div
        style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap:"20px",
        }}
      >

        <div
          style={{
            background:"white",
            padding:"20px",
            borderRadius:"16px",
          }}
        >

          <h2>⚠️ Alaabta Yar</h2>

          {lowStock.length === 0 ? (

            <p>Wax alaab yar ma jiro</p>

          ) : (

            lowStock.map((p) => (

              <div
                key={p._id}
                style={{
                  display:"flex",
                  justifyContent:"space-between",
                  padding:"10px",
                  borderBottom:
                    "1px solid #eee",
                }}
              >

                <span>{p.name}</span>

                <b style={{color:"red"}}>
                  {p.stock}
                </b>

              </div>

            ))

          )}

        </div>









        <div
          style={{
            background:"white",
            padding:"20px",
            borderRadius:"16px",
          }}
        >

          <h2>🧾 Iibkii Ugu Dambeeyay</h2>

          {recent.map((s) => (

            <div
              key={s._id}
              style={{
                display:"flex",
                justifyContent:"space-between",
                padding:"10px",
                borderBottom:
                  "1px solid #eee",
              }}
            >

              <span>{s.productName}</span>

              <b>${s.total}</b>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default Dashboard;