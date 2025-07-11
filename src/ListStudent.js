import React, {useState} from "react";

export default function ListStudent() {
    let [classes, setClasses] = useState(["12A1", "12A2", "12A3"]);
    let [students, setStudents] = useState([
        {name: "Vũ", age: 17, class: "12A1", score: 8.5},
        {name: "Bảo", age: 18, class: "12A1", score: 9.0},
        {name: "Nam", age: 17, class: "12A2", score: 7.5},
        {name: "Tuấn", age: 18, class: "12A1", score: 6.0},
        {name: "Đạt", age: 17, class: "12A2", score: 9.5},
        {name: "Hiệu", age: 18, class: "12A2", score: 5.5},
        {name: "Ngọc", age: 18, class: "12A3", score: 9.8},
        {name: "Hòa", age: 17, class: "12A3", score: 8.0},
        {name: "Khánh", age: 18, class: "12A1", score: 7.2},
        {name: "Linh", age: 17, class: "12A3", score: 6.8},
    ]);
    let [newClass, setNewClass] = useState("");
    let [newStudent, setNewStudent] = useState({
        name: "",
        age: "",
        class: "",
        score: "",
    });
    let [searchName, setSearchName] = useState("");
    let [searchClass, setSearchClass] = useState("");
    let [top3, setTop3] = useState([]);

    let containerStyle = {
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        lineHeight: "1.6"
    };

    let sectionStyle = {marginBottom: "30px"};
    let formRowStyle = {display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "15px"};
    let listItemStyle = {marginBottom: "10px"};
    let inputStyle = {padding: "6px 10px"};

    let addClass = () => {
        if (newClass && !classes.includes(newClass)) {
            setClasses([...classes, newClass]);
            setNewClass("");
        }
    };

    let deleteClass = (cls) => {
        setClasses(classes.filter((item) => item !== cls));
        setStudents(students.filter((s) => s.class !== cls));
    };

    let addStudent = () => {
        let {name, age, class: cls, score} = newStudent;
        if (name && age && cls && score) {
            setStudents([...students, {...newStudent, age: +age, score: +score}]);
            setNewStudent({name: "", age: "", class: "", score: ""});
        }
    };

    let deleteStudent = (index) => {
        let updated = [...students];
        updated.splice(index, 1);
        setStudents(updated);
    };

    let showTop3 = () => {
        let top = [...students].sort((a, b) => b.score - a.score).slice(0, 3);
        setTop3(top);
    };

    let sortScore = (asc = true) => {
        let sorted = [...students].sort((a, b) =>
            asc ? a.score - b.score : b.score - a.score
        );
        setStudents(sorted);
    };

    let sortClassBySize = () => {
        let classCounts = classes.map((cls) => ({
            name: cls,
            count: students.filter((s) => s.class === cls).length,
        }));
        let sorted = classCounts
            .sort((a, b) => b.count - a.count)
            .map((item) => item.name);
        setClasses(sorted);
    };

    let filteredStudents = students.filter(
        (s) =>
            s.name.toLowerCase().includes(searchName.toLowerCase()) &&
            (searchClass === "" || s.class === searchClass)
    );

    return (
        <div style={containerStyle}>
            <div style={sectionStyle}>
                <h2>📘 Danh sách lớp học</h2>
                {classes.map((cls, i) => (
                    <div key={i} style={listItemStyle}>
                        {cls}
                        <button onClick={() => deleteClass(cls)} style={{marginLeft: 10}}>
                            Xóa
                        </button>
                    </div>
                ))}
                <div style={formRowStyle}>
                    <input
                        value={newClass}
                        onChange={(e) => setNewClass(e.target.value)}
                        placeholder="Nhập tên lớp"
                        style={inputStyle}
                    />
                    <button onClick={addClass}>Thêm lớp</button>
                    <button onClick={sortClassBySize}>Sắp xếp lớp theo số học sinh</button>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2>👨‍🎓 Danh sách học sinh</h2>
                <div style={formRowStyle}>
                    <input
                        placeholder="Tìm theo tên"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        style={inputStyle}
                    />
                    <select
                        value={searchClass}
                        onChange={(e) => setSearchClass(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="">Tất cả lớp</option>
                        {classes.map((cls, i) => (
                            <option key={i} value={cls}>
                                {cls}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredStudents.map((s, i) => (
                    <div key={i} style={listItemStyle}>
                        {s.name} - {s.age} tuổi - Lớp {s.class} - Điểm: {s.score}
                        <button onClick={() => deleteStudent(i)} style={{marginLeft: 10}}>
                            Xóa
                        </button>
                    </div>
                ))}

                <div style={formRowStyle}>
                    <button onClick={showTop3}>🎖 Top 3 điểm cao</button>
                    <button onClick={() => sortScore(false)}>🔽 Điểm giảm</button>
                    <button onClick={() => sortScore(true)}>🔼 Điểm tăng</button>
                </div>

                {top3.length > 0 && (
                    <div>
                        <h3>🏆 Top 3 học sinh điểm cao nhất:</h3>
                        {top3.map((s, i) => (
                            <div key={i} style={listItemStyle}>
                                {i + 1}. {s.name} - {s.score} điểm - Lớp {s.class}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={sectionStyle}>
                <h3>➕ Thêm học sinh</h3>
                <div style={formRowStyle}>
                    <input
                        placeholder="Tên"
                        value={newStudent.name}
                        onChange={(e) =>
                            setNewStudent({...newStudent, name: e.target.value})
                        }
                        style={inputStyle}
                    />
                    <input
                        placeholder="Tuổi"
                        type="number"
                        value={newStudent.age}
                        onChange={(e) =>
                            setNewStudent({...newStudent, age: e.target.value})
                        }
                        style={inputStyle}
                    />
                    <select
                        value={newStudent.class}
                        onChange={(e) =>
                            setNewStudent({...newStudent, class: e.target.value})
                        }
                        style={inputStyle}
                    >
                        <option value="">Chọn lớp</option>
                        {classes.map((cls, i) => (
                            <option key={i} value={cls}>
                                {cls}
                            </option>
                        ))}
                    </select>
                    <input
                        placeholder="Điểm"
                        type="number"
                        value={newStudent.score}
                        onChange={(e) =>
                            setNewStudent({...newStudent, score: e.target.value})
                        }
                        style={inputStyle}
                    />
                    <button onClick={addStudent}>Thêm học sinh</button>
                </div>
            </div>
        </div>
    );
}
