import axios from "axios";
import { CreateStudent, Student } from "../interfaces/students.interface";

export class ApiService {
    baseURL = "http://localhost:3000/students";

    async readAll(): Promise<Array<Student>>{
        try {
            const response = await axios.get(this.baseURL);
            return response.data;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
    
    async create(student: CreateStudent): Promise<string | undefined>{
        try {
            const response = await axios.post(this.baseURL, student);
            if(response.status === 201) {
                return response.statusText;
            }
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    async update(id: string, student: CreateStudent): Promise<string | undefined> {
        try {
            const response = await axios.patch(`${this.baseURL}/${id}`, student);
            if(response.status === 200) {
                return response.statusText;
            }
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    async delete(id: string): Promise<string | undefined> {
        try {
            const response = await axios.delete(`${this.baseURL}/${id}`);
            return response.statusText;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}