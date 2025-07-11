import React, {useState} from "react";

export default function ProductManager() {
    const [products, setProducts] = useState([
        {name: "IPhone 13", price: 1000, quantity: 5, category: "Apple"},
        {name: "Samsung S22", price: 850, quantity: 10, category: "Samsung"},
        {name: "IPhone 15", price: 1200, quantity: 15, category: "Apple"},
        {name: "Oppo Reno 5", price: 1200, quantity: 20, category: "Oppo"},
        {name: "Samsung Z Fold 5", price: 1200, quantity: 25, category: "Samsung"},
    ]);

    const [searchName, setSearchName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("default");
    const [categoryFilter, setCategoryFilter] = useState("");

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        category: "",
    });

    // Lọc danh mục duy nhất
    const allCategories = [...new Set(products.map((p) => p.category))];
    const filteredCategories = allCategories.filter((cat) =>
        cat.toLowerCase().includes(categoryFilter.toLowerCase())
    );

    // Thêm sản phẩm mới
    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.category) return;

        const newItem = {
            ...newProduct,
            price: +newProduct.price,
            quantity: +newProduct.quantity,
        };

        setProducts([...products, newItem]);
        setNewProduct({name: "", price: "", quantity: "", category: ""});
    };

    // Lọc và sắp xếp sản phẩm
    const displayedProducts = products
        .filter(
            (p) =>
                p.name.toLowerCase().includes(searchName.toLowerCase()) &&
                (selectedCategory === "all" || p.category === selectedCategory)
        )
        .sort((a, b) => {
            if (sortOrder === "asc") return a.price - b.price;
            if (sortOrder === "desc") return b.price - a.price;
            return 0;
        });

    return (
        <div style={{maxWidth: "600px", margin: "auto"}}>
            <h2>Quản lý sản phẩm</h2>

            {/* Tìm kiếm tên sản phẩm */}
            <input
                type="text"
                placeholder="Tìm tên sản phẩm"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                style={{width: "100%", marginBottom: 10}}
            />

            {/* Tìm kiếm danh mục */}
            <input
                type="text"
                placeholder="Tìm danh mục..."
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{width: "100%", marginBottom: 10}}
            />

            {/* Lọc theo danh mục */}
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{width: "100%", marginBottom: 10}}
            >
                <option value="all">-- Tất cả danh mục --</option>
                {filteredCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            {/* Sắp xếp theo giá */}
            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{width: "100%", marginBottom: 10}}
            >
                <option value="default">-- Sắp xếp theo giá --</option>
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
            </select>

            {/* Form thêm sản phẩm */}
            <h4>Thêm sản phẩm mới</h4>
            <input
                placeholder="Tên"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                style={{width: "100%", marginBottom: 5}}
            />
            <input
                placeholder="Giá"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                style={{width: "100%", marginBottom: 5}}
            />
            <input
                placeholder="Số lượng"
                type="number"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                style={{width: "100%", marginBottom: 5}}
            />
            <input
                placeholder="Danh mục"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                style={{width: "100%", marginBottom: 10}}
            />
            <button onClick={handleAddProduct} style={{marginBottom: 20}}>
                Thêm sản phẩm
            </button>

            {/* Hiển thị danh sách sản phẩm */}
            <ul>
                {displayedProducts.map((p, index) => (
                    <li key={index}>
                        {p.name} - {p.price}$ - SL: {p.quantity} ({p.category})
                    </li>
                ))}
            </ul>
        </div>
    );
}
