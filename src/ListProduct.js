import { useState } from "react";

export default function ListProduct() {
    // Mảng sản phẩm ban đầu
    const [products, setProducts] = useState([
        { name: "IPHONE", price: 100, quantity: 10 },
        { name: "SAMSUNG", price: 150, quantity: 20 },
        { name: "XIAOMI", price: 50, quantity: 30 },
    ]);

    // State cho các ô input
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    // Thêm sản phẩm mới
    function addProduct() {
        // Chuyển đổi kiểu dữ liệu nếu cần
        const newProduct = {
            name: name,
            price: Number(price),
            quantity: Number(quantity),
        };

        setProducts([...products, newProduct]);

        // Reset input
        setName("");
        setPrice(0);
        setQuantity(0);
    }

    return (
        <>
            <h2>Danh sách sản phẩm:</h2>
            {products.map((product, index) => (
                <h3 key={index}>
                    {product.name} - Giá: {product.price} - SL: {product.quantity}
                </h3>
            ))}

            <hr />
            <h3>Thêm sản phẩm mới:</h3>

            <input
                type="text"
                value={name}
                placeholder="Tên sản phẩm"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />
            <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}            />
            <button onClick={addProduct}>Thêm</button>
        </>
    );
}
