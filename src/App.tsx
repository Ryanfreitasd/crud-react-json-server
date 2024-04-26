import { useEffect, useState } from "react";
import "./App.css";
import { Student } from "./interfaces/students.interface";
import { ApiService } from "./services/api.service";
import Form from "./components/Form";

function App() {
  const [students, setStudents] = useState<Array<Student>>([]);
  const [student, setStudent] = useState<Student>();
  const service = new ApiService();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await service.readAll();
    setStudents(res);
  }

  function deleteStudent(id: string) {
    service.delete(id).then((data) => {
      if (data !== undefined) {
        fetchData();
      }
    });
  }

  return (
    <>
      <h1>Cadastro de estudantes</h1>
      <h3>Insira o nome e o email</h3>
      <Form fetchData={fetchData} listStudents={students} student={student} />
      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button onClick={() => setStudent(student)}>Edit</button>
                    <button onClick={() => deleteStudent(student.id)}>
                      Del
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Sem registros a exibir</p>
      )}
    </>
  );
}

export default App;
