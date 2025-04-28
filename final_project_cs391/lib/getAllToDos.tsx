// Author: Arooj Kamran

import getCollection, {TODO_COLLECTION} from "@/db";
import {Task} from "@/types";


export default async function getAllToDos() {
    const todoCollection = await getCollection(TODO_COLLECTION)
    const data = await todoCollection.find().toArray();

    const todos: Task[] = data.map((task)=>({
        id: task.id,
        text: task.text,
        dueDate: task.dueDate,
        completed: task.completed,
    }));
    return todos
}


