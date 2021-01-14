// Encapsulation of complex data look ups into selector functions.

// Gets the tasks
export const getTaskState = store => store.task;

// Get task list
export const getTaskList = store => {
    getTaskState(store) ?
        getTaskState(store).allIds:
        [];
};

// Get task by id
export const getTaskById = (store, id) => {
    getTaskState(store) ?
        {... getTaskState.byIds[id],
         id}:
        {};
}

export const getTasks = store => {
    getTaskList(store).map(id => getTaskById(store, id));
}