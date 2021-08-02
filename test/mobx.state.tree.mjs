import { types, getSnapshot, applySnapshot } from 'mobx-state-tree';
// declaring the shape of a node with the type `Todo`
const Todo = types.model({
    title: types.string,
    done: types.optional(types.boolean, false),
});

const TodoStore = types
    .model('TodoStore', {
        todos: types.array(Todo),
        selectedTodo: types.reference(Todo),
    })
    .views((self) => {
        return {
            get completedTodos() {
                return self.todos.filter((t) => t.done);
            },
            findTodosByUser(user) {
                return self.todos.filter((t) => t.user === user);
            },
        };
    })
    .actions((self) => {
        return {
            addTodo(title) {
                self.todos.push({
                    id: Math.random(),
                    title,
                });
            },
        };
    });
const todo = Todo.create({
    title: '100',
});
const storeInstance = TodoStore.create({
    selectedTodo: 0,
    todos: [todo],
});
console.log(getSnapshot(storeInstance));
console.log(storeInstance.selectedTodo);
