document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const dateInput = document.getElementById('todo-date');
    const list = document.getElementById('todo-list');
    const filterAll = document.getElementById('filter-all');
    const filterPending = document.getElementById('filter-pending');
    const filterCompleted = document.getElementById('filter-completed');
    const filterDate = document.getElementById('filter-date');
    const deleteAll = document.getElementById('delete-all');
    let todos = [];
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting
  
      const todoText = input.value;
      const todoDate = dateInput.value;
      if (todoText === '') return; // Do nothing if the input is empty
  
      const todo = {
        text: todoText,
        date: todoDate,
        completed: false,
        id: Date.now()
      };
      todos.push(todo);
      addTodoToList(todo);
      input.value = ''; // Clear the input
      dateInput.value = ''; // Clear the date input
    });
  
    function addTodoToList(todo) {
      const listItem = document.createElement('li');
      listItem.textContent = `${todo.text}  -  (${todo.date})`;
      listItem.dataset.id = todo.id;
  
      const completeButton = document.createElement('button');
      completeButton.textContent = '✔';
      completeButton.addEventListener('click', function() {
        todo.completed = !todo.completed;
        listItem.classList.toggle('completed');
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', function() {
        listItem.remove();
        todos = todos.filter(t => t.id !== todo.id);
      });
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function() {
        const newText = prompt('Edit the text:', todo.text);
        const newDate = prompt('Edit the date:', todo.date);
        if (newText !== null && newText.trim() !== '') {
          todo.text = newText;
          listItem.firstChild.textContent = `${newText} (${newDate})`;
        }
        if (newDate !== null && newDate.trim() !== '') {
          todo.date = newDate;
          listItem.firstChild.textContent = `${newText} (${newDate})`;
        }
      });
  
      listItem.appendChild(completeButton);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      list.appendChild(listItem);
    }
  
    filterAll.addEventListener('click', function() {
      list.innerHTML = '';
      todos.forEach(addTodoToList);
    });
  
    filterPending.addEventListener('click', function() {
      list.innerHTML = '';
      todos.filter(todo => !todo.completed).forEach(addTodoToList);
    });
  
    filterCompleted.addEventListener('click', function() {
      list.innerHTML = '';
      todos.filter(todo => todo.completed).forEach(addTodoToList);
    });
  
    filterDate.addEventListener('change', function() {
      const selectedDate = filterDate.value;
      list.innerHTML = '';
      todos.filter(todo => todo.date === selectedDate).forEach(addTodoToList);
    });
  
    deleteAll.addEventListener('click', function() {
      todos = [];
      list.innerHTML = '';
    });
  });
  