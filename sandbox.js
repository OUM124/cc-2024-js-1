document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.querySelector('.add'); // Form for adding new todos
    const searchInput = document.querySelector('.search input'); // The search input field
    const list = document.querySelector('.todos'); // The list of todos
    const input = addForm.querySelector('input[name="add"]'); // Input for new todo

    // Initialize the array to keep track of original todos from the existing list
    const originalTodos = Array.from(list.querySelectorAll('span')).map(span => span.textContent);

    // Function to generate a new todo element using the provided template
    const generateTemplate = (todo) => {
        const template = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${todo}</span>
                <i class="far fa-trash-alt delete"></i>
            </li>
        `;
        list.insertAdjacentHTML('beforeend', template); // Add the new task to the todo list
    };

    // Add a new todo
    addForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission

        const todo = input.value.trim(); // Get the input value and trim it

        if (todo.length) {
            originalTodos.push(todo); // Store the new todo in the originalTodos array
            generateTemplate(todo); // Use the template to add the new task
            input.value = ''; // Clear the input field after submission
            filterTodos(); // Update the display after adding a todo
        }
    });

    // Function to filter todos based on the search input
    searchInput.addEventListener('input', filterTodos);
    function filterTodos() {
        const searchTerm = searchInput.value.toLowerCase(); // Get the current search input
        let filteredTodos = [];

        if (searchTerm) {
            // Filter todos based on the search term
            filteredTodos = originalTodos.filter(item => item.toLowerCase().includes(searchTerm));
        } else {
            // If search is empty, show all original todos
            filteredTodos = [...originalTodos]; // Spread the originalTodos array
        }

        // Display the filtered results
        displayTodos(filteredTodos);
    }

    // Function to display todos
    function displayTodos(todos) {
        list.innerHTML = ''; // Clear the current list

        if (todos.length > 0) {
            todos.forEach(item => {
                generateTemplate(item); // Generate template for each todo
            });
            attachDeleteEvent(); // Attach delete event to newly created elements
        } else {
            // Show no items found if the array is empty
            list.innerHTML = '<div class="no-item text-light">No item found</div>';
        }
    }

    // Function to attach delete event to delete icons
    function attachDeleteEvent() {
        const deleteIcons = document.querySelectorAll('.delete'); // Select all delete icons
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                const todoItem = e.target.closest('li'); // Get the closest list item (li) of the clicked icon
                if (todoItem) {
                    const todoText = todoItem.querySelector('span').textContent; // Get the text of the todo
                    // Remove the todo from originalTodos
                    const index = originalTodos.indexOf(todoText);
                    if (index > -1) {
                        originalTodos.splice(index, 1); // Remove from the array
                    }
                    todoItem.remove(); // Remove the list item from the DOM
                    filterTodos(); // Update the display after deletion
                }
            });
        });
    }

    // Initial attachment of delete event for existing items
    attachDeleteEvent(); 
});
