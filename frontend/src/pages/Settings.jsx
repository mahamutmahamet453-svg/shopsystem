import { useEffect, useState } from "react";

const Settings = () => {

  const [shopName, setShopName] = useState("📦 Somali Shop Manager");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [receiptMessage, setReceiptMessage] = useState("Mahadsanid ❤️");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shopSettings"));

    if (data) {
      setShopName(data.shopName);
      setPhone(data.phone);
      setAddress(data.address);
      setReceiptMessage(data.receiptMessage);
    }
  }, []);

  const saveSettings = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shopSettings",
      JSON.stringify({
        shopName,
        phone,
        address,
        receiptMessage,
      })
    );

    alert("Settings saved");
  };

  return (
    <div>

      <h1>⚙️ Settings</h1>

      <form onSubmit={saveSettings} style={{ display: "grid", gap: "10px" }}>

        <input
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Shop Name"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        <input
          value={receiptMessage}
          onChange={(e) => setReceiptMessage(e.target.value)}
          placeholder="Receipt message"
        />

        <button type="submit">
          Save Settings
        </button>

      </form>

    </div>
  );
};

export default Settings;