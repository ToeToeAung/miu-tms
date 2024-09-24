import { v4 as uuidv4 } from 'uuid';

let tasks: Task[] = [
  {
    id : "",
    content : "New Task 1",
    completed : false,
    position : 1,
    priority : "medium"
  }
];
export default class Task {
    constructor(
        public id: string | null, 
        public content: string,        
        public completed: boolean, 
        public position: number, 
        public priority: string
      ) {}

      static createTask(content: string,completed: boolean, position: number, priority: string): Task {
        const task = new Task(null, content,  completed, position, priority);
        task.id = uuidv4(); 
        console.log("Task ID: ", task.id);    
        tasks.push(task);     
        return task; 
      }
  
      static getAllTasks(): Task[] {
        return tasks; 
      }
}



