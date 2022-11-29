// Variables linking button elements
const addButton = document.body.querySelector('#add-btn');
const removeButton = document.body.querySelector('#remove-btn');

// EventListeners
addButton.addEventListener('click', addTaskEvent);
removeButton.addEventListener('click', removeTaskEvent);   
/*  Cannot figure out where to place eventlistener to avoid
    creating global variable, meanwhile this is going right up top for now -_-;
    Personal note: IIFE invokes nested methods inside event listeners if given ()
    Doesn't trigger if methods used without ()
*/

// (IIFE) Function that contains list array and methods for read / write controls
const taskList = (function () {
    let tasks = [];

    function addToList(item){
        tasks.push(item);
        console.log("Added \"" + item + "\" to task list");
    }
    function removeLastItem(){
        console.log("Removing \"" + tasks[tasks.length -1] + "\" from list.")
        tasks.pop();
    }

    // Sub-methods... if that's the right term?
    return {
        addTask(task){
            addToList(task);
        },
        removeLast(){
            removeLastItem();
        },
        value(){
            return tasks;
        }
    };
})();

// 
function addTaskEvent(){
    // Variables to access output fields
    const taskText = document.body.querySelector("#task-line");
    const outList = document.body.querySelector("#test-output");   
    let taskListArray = taskList.value(); 

    // Adds value of taskText (user input) to list, displays alert if field is blank
    outList.innerHTML = "Task List Length : \"" + taskList.value().length + "\"";
    if(taskText.value == ""){
        console.log('need an item to add')
        alert('Please enter task to add to list');
        taskText.focus();
    } else {
        taskList.addTask(taskText.value);
        changeHtmlElements('add',taskText.value)
        taskText.value = "";
        taskText.focus();
        outList.innerHTML = "Task List Length : \"" + taskList.value().length + "\"";
        console.log('Value of tasks[' + (taskListArray.length-1) + '] is ' + taskListArray[taskListArray.length-1]);
    }
}
function removeTaskEvent(){
    const outList = document.body.querySelector("#test-output");
    let taskListArray = taskList.value();

    // Removes last item from task list, if no items in list, displays alert
    if(taskList.value().length > 0){
        taskList.removeLast();
        changeHtmlElements('remove');
        outList.innerHTML = "Task List Length : \"" + taskList.value().length + "\"";
    } else {
        alert("There are no tasks to remove.")
    }
    outList.value = "Task List Length : \"" + taskListArray.length + "\"";
}

/* Module that creates HTML elements and adds them to the UL/OL (class: task-list)
   Takes up to 2 arguments: a command argument to add or remove;
   If adding an element, 2nd argument takes a string value to output on screen
*/
function changeHtmlElements(action, task){
    // Function variables
    const itemList = document.body.querySelector('.task-list');
    
    
    if(action == 'add'){
        let li = document.createElement('li');
        li.innerHTML = task;
        li.id = "list-item";
        itemList.appendChild(li);
    }
    if(action == 'remove'){
        itemList.removeChild(itemList.lastElementChild);
    }
}