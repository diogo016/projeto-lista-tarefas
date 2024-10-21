document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const filterAll = document.getElementById('filterAll');
    const filterCompleted = document.getElementById('filterCompleted');
    const filterPending = document.getElementById('filterPending');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        });

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <div>
                    <!-- Botão Concluir ou Desmarcar -->
                    <button class="botao botao-concluir" title="${task.completed ? 'Desmarcar tarefa' : 'Concluir tarefa'}" onclick="toggleComplete(${index})">
                        <img src="${task.completed ? './imagens/retirar.png' : './imagens/verificar.png'}" 
                             width="20px" height="20px" alt="${task.completed ? 'Desmarcar' : 'Concluir'}">
                    </button>
                    
                    <!-- Botão Editar -->
                    <button class="botao botao-editar" title="Editar tarefa" onclick="editTask(${index})">
                        <img src="./imagens/editar.png" width="20px" height="20px" alt="Editar">
                    </button>
                    
                    <!-- Botão Remover -->
                    <button class="botao botao-remover" title="Remover tarefa" onclick="removeTask(${index})">
                        <img src="./imagens/lixeira-de-reciclagem.png" width="20px" height="20px" alt="Remover">
                    </button>
                </div>
            `;
            
            taskList.appendChild(li);
        });
        
        
        
        
    }

    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.editTask = (index) => {
        const newText = prompt('Editar tarefa:', tasks[index].text);
        if (newText) {
            tasks[index].text = newText;
            saveTasks();
            renderTasks();
        }
    };

    window.removeTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    filterAll.addEventListener('click', () => renderTasks('all'));
    filterCompleted.addEventListener('click', () => renderTasks('completed'));
    filterPending.addEventListener('click', () => renderTasks('pending'));

    renderTasks();
});


const input = document.getElementById('taskInput');

input.addEventListener('click', () => {
  const bolha = document.createElement('span');
  bolha.classList.add('efeito-bolha');
  input.parentNode.appendChild(bolha);
  
  setTimeout(() => {
    bolha.remove();
  }, 1500);
});
