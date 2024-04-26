import { useState, useRef, useEffect } from "react";
import { ApiService } from "../services/api.service";
import { CreateStudent, Student } from "../interfaces/students.interface";
import './Form.css'

export default function Form({
  listStudents,
  fetchData,
  student,
}: {
  listStudents: Array<Student>;
  fetchData: Function;
  student?: Student;
}) {
  const [formData, setFormData] = useState<CreateStudent>({
    name: student?.name ?? "",
    email: student?.email ?? "",
  });

  const service = useRef(new ApiService()).current;

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  function handleSubmit(e: any) {
    e.preventDefault();

    if (student) {
      service.update(student.id, formData).then((data) => {
        if (data !== undefined) {
          clearForm();
          fetchData()
        }
      })
    } else {
      formData.id = String(listStudents.length + 1);
      service.create(formData).then((data) => {
        if (data !== undefined) {
          clearForm();
          fetchData();
        }
      });
    }
  }


  function clearForm() {
    setFormData({ name: "", email: "" });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <button type="submit">{student ? "Atualizar" : "Salvar"}</button>
        </div>
      </form>
    </>
  );
}
