document.addEventListener("DOMContentLoaded", () => {
    
    function loadUsers() {
        const users = [
            { id: 1, name: "João" },
            { id: 2, name: "Maria" },
            { id: 3, name: "Pedro" }
        ];

        const userSelect = document.getElementById("user");
        if (userSelect) {
            users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        }
    }

    loadUsers();

    function validateForm(event) {
        event.preventDefault();
        const form = event.target;
        const inputs = [
            { id: "name", errorMsg: "O campo Nome é obrigatório.", validate: value => value.trim() !== '' },
            { id: "email", errorMsg: "O campo Email é obrigatório.", validate: value => /\S+@\S+\.\S+/.test(value) },
            { id: "description", errorMsg: "O campo Descrição é obrigatório.", validate: value => value.trim() !== '' },
            { id: "sector", errorMsg: "O campo Setor é obrigatório.", validate: value => value.trim() !== '' },
            { id: "user", errorMsg: "Selecione um usuário.", validate: value => value !== "" }
        ];

        let isValid = true;

        inputs.forEach(input => {
            const element = form.querySelector(`#${input.id}`);
            const errorElement = document.getElementById(`${input.id}Error`);
            if (element && !input.validate(element.value)) {
                errorElement.textContent = input.errorMsg;
                errorElement.style.display = "block";
                isValid = false;
            } else if (element) {
                errorElement.style.display = "none";
            }
        });

        if (isValid) {
            alert("Formulário enviado com sucesso!");
            form.reset();
        }
    }

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", validateForm);
    });

    let tasks = [
        { id: 1, description: 'Descrição da tarefa de Alta Prioridade', sector: 'Setor A', priority: 'Alta', user: 'Usuário A', status: 'A Fazer' },
        { id: 2, description: 'Descrição da tarefa de Baixa Prioridade', sector: 'Setor F', priority: 'Baixa', user: 'Usuário C', status: 'Fazendo' },
        { id: 3, description: 'Descrição da tarefa concluída', sector: 'Setor H', priority: 'Média', user: 'Usuário D', status: 'Pronto' },
    ];

    function renderTasks() {
        const columns = {
            "A Fazer": document.getElementById("todo-list"),
            "Fazendo": document.getElementById("inprogress-list"),
            "Pronto": document.getElementById("done-list")
        };

        Object.values(columns).forEach(col => col.innerHTML = '');

        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
                <h3>${task.description}</h3>
                <p><strong>Setor:</strong> ${task.sector}</p>
                <p><strong>Prioridade:</strong> ${task.priority}</p>
                <p><strong>Vinculado a:</strong> ${task.user}</p>
                <button class="edit-btn" onclick="editTask(${task.id})">Editar</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Excluir</button>
                <select onchange="changeStatus(${task.id}, this.value)">
                    <option value="A Fazer" ${task.status === 'A Fazer' ? 'selected' : ''}>A Fazer</option>
                    <option value="Fazendo" ${task.status === 'Fazendo' ? 'selected' : ''}>Fazendo</option>
                    <option value="Pronto" ${task.status === 'Pronto' ? 'selected' : ''}>Pronto</option>
                </select>
            `;

            columns[task.status].appendChild(taskCard);
        });
    }

    function editTask(id) {
        alert(`Edit task ${id}`);
    }

    function deleteTask(id) {
        if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
            tasks = tasks.filter(task => task.id !== id);
            renderTasks();
        }
    }

    function changeStatus(id, status) {
        const task = tasks.find(task => task.id === id);
        if (task) task.status = status;
    }

    function showDeleteModal(taskId) {
        const modal = document.getElementById("deleteModal");
        const confirmDeleteButton = document.getElementById("confirmDelete");
        const cancelDeleteButton = document.getElementById("cancelDelete");

        modal.style.display = "flex";

        confirmDeleteButton.onclick = () => {
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex > -1) tasks.splice(taskIndex, 1);
            modal.style.display = "none";
            renderTasks();
        };

        cancelDeleteButton.onclick = () => {
            modal.style.display = "none";
        };
    }

    renderTasks();
});

document.getElementById('taskForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;

    const description = document.getElementById('description');
    const descriptionError = document.getElementById('descriptionError');
    if (description.value.trim() === '') {
        descriptionError.style.visibility = 'visible';
        description.classList.add('invalid');
        isValid = false;
    } else {
        descriptionError.style.visibility = 'hidden';
        description.classList.remove('invalid');
    }

    const sector = document.getElementById('sector');
    const sectorError = document.getElementById('sectorError');
    if (sector.value.trim() === '') {
        sectorError.style.visibility = 'visible';
        sector.classList.add('invalid');
        isValid = false;
    } else {
        sectorError.style.visibility = 'hidden';
        sector.classList.remove('invalid');
    }

    const user = document.getElementById('user');
    const userError = document.getElementById('userError');
    if (user.value === '') {
        userError.style.visibility = 'visible';
        user.classList.add('invalid');
        isValid = false;
    } else {
        userError.style.visibility = 'hidden';
        user.classList.remove('invalid');
    }

    if (isValid) {
        alert('Tarefa cadastrada com sucesso!');
    }
});

document.getElementById('userForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    function validateField(fieldId, errorId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(errorId);
        if (field.value.trim() === '') {
            errorElement.textContent = errorMessage;
            field.classList.add('invalid');
            isValid = false;
        } else {
            errorElement.textContent = '';
            field.classList.remove('invalid');
        }
    }

    validateField('name', 'nameError', 'Este campo é obrigatório.');

    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Por favor, insira um email válido.';
        email.classList.add('invalid');
        isValid = false;
    } else {
        emailError.textContent = '';
        email.classList.remove('invalid');
    }

    if (isValid) {
        alert('Usuário cadastrado com sucesso!');
    }
});
