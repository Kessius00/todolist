
// import {Todo, Project} from "./classes.js";



// export function placeInStorage(projectObjects) {

//   const formatProjectList = (projectObjects) => {
//     return projectObjects.map(project => {
//         return {
//             title: project.title,
//             active: project.active,
//             id: project.id,
//             todos: project.todos.map(todo => {
//                 return {
//                     title: todo.title,
//                     dueDate: todo.dueDate,
//                     priority: todo.priority,
//                     completed: todo.completed,
//                     id: todo.id
//                 };
//             })
//         };
//     });
//   }

//   if (!Array.isArray(projectObjects) || projectObjects.length === 0) {
//         console.warn("Not saving: empty or invalid project list.");
//         return;
//     }

//   const cleanedList = formatProjectList(projectObjects);

//   const myListJSON = JSON.stringify(cleanedList);
//   localStorage.setItem("projects", myListJSON);

//   console.log("LOCAL STORAGE", localStorage.getItem("projects"));
// }

// export function getStorageList() {
//     const data = localStorage.getItem("projects");
//     if (data) {
//         try {
//             const projects = JSON.parse(data);
//             // Convert raw data into your project objects if needed
//             return projects;
//         } catch (e) {
//             console.error("Failed to parse project data from localStorage", e);
//             return [];
//         }
//     } else {
//         console.log("No project data found in localStorage");
//         return [];
//     }
// }

// // export function createProjectObjectsFromStorage(){
// //     const storedList = getStorageList();
// //     const projectObjects = [];
// //     storedList.forEach(projectData => {
// //         const project = new Project(projectData.title);
// //         project.active = projectData.active;
// //         project.id = projectData.id;
// //         projectData.todos.forEach(todoData => {
// //             const todo = new Todo(todoData.title, new Date(todoData.dueDate), todoData.priority);
// //             todo.completed = todoData.completed;
// //             todo.id = todoData.id;
// //         });
// //         projectObjects.push(project);
// //     });
// //     // Assign the project to each todo
// //     projectObjects.forEach(project => {
// //         project.todos.forEach(todo => {
// //             todo.project = project;
// //         });
// //     });
// //     return projectObjects;
// // }

