import { useState } from "react";

export default function BT1() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [sum, setSum] = useState(0);

    return (
        <>
            <input
                type="text"
                value={x}
                onChange={(e) => setX(+e.target.value)}
            />
            <input
                type="text"
                value={y}
                onChange={(e) => setY(+e.target.value)}
            />
            <button onClick={() => setSum(x + y)}>Tính tổng</button>
            <h3>Sum: {sum}</h3>
        </>
    );
}
