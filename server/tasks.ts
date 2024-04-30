import { GenezioDeploy } from "@genezio/types";
import pg from 'pg'
const { Pool } = pg

// type MyUser = {
//   name: string;
//   age?: number;
// }

@GenezioDeploy()
export class TaskService {
    pool = new Pool({
        connectionString: process.env["RUNTIME_DATABASE_URL"],
        ssl: true,
      });

  /**
   * Says hello to the user.
   * @param {string} user - The name of the user.
   * @returns {Promise<string>} A promise that resolves to a greeting message.
   */
  async hello(user: string): Promise<string>{
    const msg = `Hello, ${user} from Genezio!`;
    console.log(msg);
    return msg;
  }

  async getTasks(): Promise<string[]> {
    await this.pool.query(
      "CREATE TABLE IF NOT EXISTS tasks (id serial PRIMARY KEY,name VARCHAR(255))"
    );

    const result = await this.pool.query("select * from tasks");
    const tasks = result.rows.map((task: { name: string }) => task.name);

    return tasks;
  }

  async insertTask(name: string) {
    await this.pool.query(
      "CREATE TABLE IF NOT EXISTS tasks (id serial PRIMARY KEY,name VARCHAR(255))"
    );

    await this.pool.query("INSERT INTO tasks (name) VALUES ($1)", [name]);

    return "success";
  }

   async deleteTask(id: number) {
    await this.pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    return "success";
   }
}
