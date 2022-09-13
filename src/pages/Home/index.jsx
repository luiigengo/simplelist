import { useEffect, useState } from "react";
import "./styles.css";
import { Card } from "../../components/Card";

function Home() {
  // https://api.github.com/users/luiigengo

  const [studentName, setStudentName] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [user, setUser] = useState({ name: "", avatar: "" });

  function addStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br"),
    };

    setStudentList((preValue) => [...preValue, newStudent]);
  }

  useEffect(() => {
    fetch("https://api.github.com/users/luiigengo")
      .then((response) => response.json())
      .then((data) => {
        setUser({ name: data.name, avatar: data.avatar_url });
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar}></img>
        </div>
      </header>
      <input
        type="text"
        placeholder="Type your name..."
        onChange={(e) => {
          setStudentName(e.target.value);
        }}
      ></input>
      <button onClick={addStudent} type="button">
        ADICIONAR
      </button>
      {studentList.map((eachStudent) => {
        return (
          <Card
            key={eachStudent.name}
            name={eachStudent.name}
            time={eachStudent.time}
          />
        );
      })}
    </div>
  );
}

export default Home;
