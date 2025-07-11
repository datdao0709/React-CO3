import React, {useState} from "react";

export default ListStudent;

function ListStudent() {
    let [classes, setClasses] = useState(["12A1", "12A2"]);
    let [students, setStudents] = useState([]);
    let [newClass, setNewClass] = useState("");
    let [newStudent, setNewStudent] = useState({
        name: "",
        age: "",
        class: "",
        score: "",
    });

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
            setStudents([...students, {...newStudent}]);
            setNewStudent({name: "", age: "", class: "", score: ""});
        }
    };

    let deleteStudent = (index) => {
        let updated = [...students];
        updated.splice(index, 1);
        setStudents(updated);
    };

    return (
        <div>
            <h2>Danh sách lớp học</h2>
            {classes.map((cls, i) => (
                <div key={i}>
                    {cls}
                    <button onClick={() => deleteClass(cls)}>Xóa</button>
                </div>
            ))}

            <input
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                placeholder="Nhập tên lớp"
            />
            <button onClick={addClass}>Thêm lớp</button>

            <hr/>

            <h2>Danh sách học sinh</h2>
            <div>
                {students.map((s, i) => (
                    <div key={i}>
                        {s.name} - {s.age} tuổi - Lớp {s.class} - Điểm: {s.score}{" "}
                        <button onClick={() => deleteStudent(i)}>Xóa</button>
                    </div>
                ))}
            </div>

            <h3>Thêm học sinh</h3>
            <input
                placeholder="Tên"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
            />
            <input
                placeholder="Tuổi"
                type="number"
                value={newStudent.age}
                onChange={(e) => setNewStudent({...newStudent, age: e.target.value})}
            />
            <select
                value={newStudent.class}
                onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
            >
                <option value="">Chọn lớp</option>
                {classes.map((cls, i) => (
                    <option key={i} value={cls}>{cls}</option>
                ))}
            </select>
            <input
                placeholder="Điểm"
                type="number"
                value={newStudent.score}
                onChange={(e) => setNewStudent({...newStudent, score: e.target.value})}
            />
            <button onClick={addStudent}>Thêm học sinh</button>
        </div>
    );
}
