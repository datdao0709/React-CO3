import { useState } from "react";

export default function ListNumber() {
    const [so, setSo] = useState("");
    const [mang, setMang] = useState([]);
    const [tong, setTong] = useState(0);
    const [tbChia3, setTbChia3] = useState(0);

    function themSo() {
        const giaTri = Number(so);
        if (!isNaN(giaTri)) {
            setMang([...mang, giaTri]);
            setSo("");
        }
    }

    function tinhTong() {
        let tongSo = 0;
        for (let i = 0; i < mang.length; i++) {
            tongSo += mang[i];
        }
        setTong(tongSo);
    }
    function tinhTbChia3() {
        let tongChia3 = 0;
        let dem = 0;
        for (let i = 0; i < mang.length; i++) {
            if (mang[i] % 3 === 0) {
                tongChia3 += mang[i];
                dem++;
            }
        }
        if (dem > 0) {
            setTbChia3(tongChia3 / dem);
        } else {
            setTbChia3(0);
        }
    }

    return (
        <div>
            <h2>List Number</h2>

            <input
                type="text" value={so} onChange={(e) => setSo(e.target.value)} placeholder="Nhập số"
            />
            <button onClick={themSo}>Thêm</button>

            <p>Mảng: {mang.join(", ")}</p>

            <button onClick={tinhTong}>Tính tổng</button>
            <p>Tổng: {tong}</p>

            <button onClick={tinhTbChia3}>Tính TBC chia hết cho 3</button>
            <p>TBC chia hết cho 3: {tbChia3}</p>
        </div>
    );
}
