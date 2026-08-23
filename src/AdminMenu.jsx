import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ['appetizers', 'maincourse', 'bfm', 'rice', 'deals', 'drinks', 'extra', 'desserts'];

function AdminMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const emptyForm = { category: "appetizers", name: "", description: "", price: "", image_name: "" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/admin/login");
      return;
    }
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost/dastr-khwan-backend/get_menu_items.php");
      const data = await res.json();
      if (data.success) {
        setItems(data.items || data.menu_items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? "http://localhost/dastr-khwan-backend/update_menu_item.php"
      : "http://localhost/dastr-khwan-backend/add_menu_item.php";

    const payload = editingId ? { ...form, id: editingId } : form;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setForm(emptyForm);
        setEditingId(null);
        fetchItems();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const handleEdit = (item) => {
    setForm({
      category: item.category,
      name: item.name,
      description: item.description || "",
      price: item.price,
      image_name: item.image_name || "",
    });
    setEditingId(item.id);
  };

  const handleCancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this item?")) return;
    try {
      const res = await fetch("http://localhost/dastr-khwan-backend/delete_menu_item.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchItems();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  if (loading) return <p className="admin-loading-text">Loading menu...</p>;

  return (
    <div className="admin-dashboard-container">
      <h2>Manage Menu</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="admin-menu-form">
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="text" name="name" placeholder="Item name" value={form.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input type="text" name="image_name" placeholder="Image filename (e.g. nuggets.jpeg)" value={form.image_name} onChange={handleChange} />
        <button type="submit">{editingId ? "Update Item" : "Add Item"}</button>
        {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
      </form>

      {/* Items Table */}
      <table className="admin-orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>Rs. {item.price}</td>
              <td>{item.image_name}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMenu;