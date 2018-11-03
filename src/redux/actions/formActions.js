export const LIST_ALL = 'LIST_ALL';
export const SAVE_TASK = 'SAVE_TASK';
export const TOGGLE_FORM = 'TOGGLE_FORM';
export const CLOSE_FORM = 'CLOSE_FORM';
export const OPEN_FORM = 'OPEN_FORM';
export const UPDATE_STATUS_TASK = 'UPDATE_STATUS_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const FILTER_TABLE = 'FILTER_TABLE';
export const SEARCH = 'SEARCH';
export const SORT = 'SORT';


export const formActions = {
    listAll,
    saveTask,
    toggleForm,
    openForm,
    closeForm,
    updateStatus,
    deleteTask,
    editTask,
    filterTask,
    searchTask,
    sortTask,
};

function listAll (){
    return {
        type : LIST_ALL
    }
}

function saveTask (task) {
    return {
        type : SAVE_TASK,
        task // task : task
    }
}

function toggleForm(){
    alert("get here");
    return {
        type : TOGGLE_FORM
    }
}

function openForm () {
    return {
        type : OPEN_FORM
    }
}

function closeForm () {
    return {
        type : CLOSE_FORM
    }
}

function updateStatus (id) {
    return {
        type : UPDATE_STATUS_TASK,
        id // id : id
    }
}

function deleteTask(id)  {
    return {
        type : DELETE_TASK,
        id // id : id
    }
}

function editTask (task) {
    return {
        type : EDIT_TASK,
        task // task : task
    }
}

function filterTask  (filter) {
    return {
        type : FILTER_TABLE,
        filter // filter : filter -> filterName, filterStatus
    }
}

function searchTask (keyword) {
    return {
        type : SEARCH,
        keyword // keyword : keyword
    }
}

function sortTask(sort) {
    return {
        type : SORT,
        sort // sort : sort -> sort.by sort.value
    }
}