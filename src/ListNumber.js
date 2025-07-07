import { useState } from "react";

export default function ListNumber() {
    const [number, setNumber] = useState("");
    const [list, setList] = useState([]);
    const [sum, setSum] = useState(0);
    const [avgDiv3, setAvgDiv3] = useState(0);

    const addNumber = () => {
        const num = +number;
        if (!isNaN(num)) {
            setList([...list, num]);
            setNumber("");
        }
    };

    const calcSum = () => {
        const total = list.reduce((acc, cur) => acc + cur, 0);
        setSum(total);
    };

    const calcAvgDiv3 = () => {
        const div3 = list.filter((n) => n % 3 === 0);
        const avg = div3.length ? div3.reduce((a, b) => a + b) / div3.length : 0;
        setAvgDiv3(avg);
    };

    return (
        <div>
            <h2>List Number</h2>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <button onClick={addNumber}>Thêm vào mảng</button>
            <br /><br />

            <div>Mảng hiện tại: {JSON.stringify(list)}</div>

            <button onClick={calcSum}>Tính tổng</button>
            <div>Tổng: {sum}</div>

            <button onClick={calcAvgDiv3}>Tính TBC các số chia hết cho 3</button>
            <div>Trung bình chia hết cho 3: {avgDiv3}</div>
        </div>
    );
}
