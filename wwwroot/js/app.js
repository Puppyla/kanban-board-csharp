class KanbanBoard {
    constructor() {
        this.tasks = [];
        this.currentEditId = null;
        this.apiBase = '/api/task';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTasks();
    }

    setupEventListeners() {
        // Modal controls
        const modal = document.getElementById('taskModal');
        const addBtn = document.getElementById('addTaskBtn');
        const closeBtn = document.querySelector('.close');
        const cancelBtn = document.getElementById('cancelBtn');
        const taskForm = document.getElementById('taskForm');

        addBtn.addEventListener('click', () => this.openModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        cancelBtn.addEventListener('click', () => this.closeModal());
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });

        // Setup drag and drop for columns
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        const columns = document.querySelectorAll('.tasks');
        
        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                column.classList.add('drag-over');
            });

            column.addEventListener('dragleave', () => {
                column.classList.remove('drag-over');
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.classList.remove('drag-over');
                
                const taskId = parseInt(e.dataTransfer.getData('taskId'));
                const newStatus = parseInt(column.parentElement.dataset.status);
                
                this.updateTaskStatus(taskId, newStatus);
            });
        });
    }

    async loadTasks() {
        try {
            const response = await fetch(this.apiBase);
            if (!response.ok) throw new Error('Failed to load tasks');
            
            this.tasks = await response.json();
            this.renderTasks();
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.showError('Erro ao carregar tarefas');
        }
    }

    async saveTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();

        if (!title) {
            this.showError('O título é obrigatório');
            return;
        }

        const taskData = {
            title,
            description,
            status: 0 // ToDo
        };

        try {
            if (this.currentEditId) {
                // Update existing task
                taskData.id = this.currentEditId;
                const response = await fetch(`${this.apiBase}/${this.currentEditId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(taskData)
                });

                if (!response.ok) throw new Error('Failed to update task');
            } else {
                // Create new task
                const response = await fetch(this.apiBase, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(taskData)
                });

                if (!response.ok) throw new Error('Failed to create task');
            }

            this.closeModal();
            this.loadTasks();
        } catch (error) {
            console.error('Error saving task:', error);
            this.showError('Erro ao salvar tarefa');
        }
    }

    async updateTaskStatus(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        try {
            const response = await fetch(`${this.apiBase}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...task,
                    status: newStatus
                })
            });

            if (!response.ok) throw new Error('Failed to update task status');
            
            this.loadTasks();
        } catch (error) {
            console.error('Error updating task status:', error);
            this.showError('Erro ao atualizar status da tarefa');
        }
    }

    async deleteTask(taskId) {
        if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;

        try {
            const response = await fetch(`${this.apiBase}/${taskId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete task');
            
            this.loadTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            this.showError('Erro ao excluir tarefa');
        }
    }

    renderTasks() {
        const todoContainer = document.getElementById('todo-tasks');
        const progressContainer = document.getElementById('progress-tasks');
        const doneContainer = document.getElementById('done-tasks');

        // Clear containers
        todoContainer.innerHTML = '';
        progressContainer.innerHTML = '';
        doneContainer.innerHTML = '';

        // Group tasks by status
        const todoTasks = this.tasks.filter(t => t.status === 0);
        const progressTasks = this.tasks.filter(t => t.status === 1);
        const doneTasks = this.tasks.filter(t => t.status === 2);

        // Render tasks
        todoTasks.forEach(task => todoContainer.appendChild(this.createTaskCard(task)));
        progressTasks.forEach(task => progressContainer.appendChild(this.createTaskCard(task)));
        doneTasks.forEach(task => doneContainer.appendChild(this.createTaskCard(task)));

        // Update counts
        this.updateTaskCounts();
    }

    createTaskCard(task) {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.draggable = true;
        card.dataset.taskId = task.id;

        card.innerHTML = `
            <div class="task-title">${this.escapeHtml(task.title)}</div>
            <div class="task-description">${this.escapeHtml(task.description)}</div>
            <div class="task-actions">
                <button class="task-btn edit-btn" onclick="kanban.editTask(${task.id})">✏️ Editar</button>
                <button class="task-btn delete-btn" onclick="kanban.deleteTask(${task.id})">🗑️ Excluir</button>
            </div>
        `;

        // Add drag event listeners
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('taskId', task.id);
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });

        return card;
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        this.currentEditId = taskId;
        document.getElementById('modalTitle').textContent = 'Editar Tarefa';
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        
        this.openModal();
    }

    openModal() {
        document.getElementById('taskModal').style.display = 'block';
        document.getElementById('taskTitle').focus();
    }

    closeModal() {
        document.getElementById('taskModal').style.display = 'none';
        document.getElementById('taskForm').reset();
        document.getElementById('modalTitle').textContent = 'Nova Tarefa';
        this.currentEditId = null;
    }

    updateTaskCounts() {
        const todoCount = this.tasks.filter(t => t.status === 0).length;
        const progressCount = this.tasks.filter(t => t.status === 1).length;
        const doneCount = this.tasks.filter(t => t.status === 2).length;

        document.querySelector('[data-status="0"] .task-count').textContent = todoCount;
        document.querySelector('[data-status="1"] .task-count').textContent = progressCount;
        document.querySelector('[data-status="2"] .task-count').textContent = doneCount;
    }

    showError(message) {
        // Simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the Kanban board when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.kanban = new KanbanBoard();
});
