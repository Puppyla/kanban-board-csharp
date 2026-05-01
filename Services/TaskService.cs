namespace KanbanBoard.Services
{
    public class TaskService
    {
        private static List<Models.TaskItem> _tasks = new List<Models.TaskItem>();
        private static int _nextId = 1;

        public TaskService()
        {
            // Initialize with sample data if empty
            if (!_tasks.Any())
            {
                _tasks.AddRange(new[]
                {
                    new Models.TaskItem { Id = _nextId++, Title = "Exemplo de Tarefa 1", Description = "Esta é uma tarefa de exemplo", Status = Models.TaskStatus.ToDo, CreatedAt = DateTime.Now },
                    new Models.TaskItem { Id = _nextId++, Title = "Exemplo de Tarefa 2", Description = "Tarefa em andamento", Status = Models.TaskStatus.InProgress, CreatedAt = DateTime.Now },
                    new Models.TaskItem { Id = _nextId++, Title = "Exemplo de Tarefa 3", Description = "Tarefa concluída", Status = Models.TaskStatus.Done, CreatedAt = DateTime.Now }
                });
            }
        }

        public List<Models.TaskItem> GetAllTasks()
        {
            return _tasks.OrderBy(t => t.Status).ThenBy(t => t.Id).ToList();
        }

        public Models.TaskItem? GetTaskById(int id)
        {
            return _tasks.FirstOrDefault(t => t.Id == id);
        }

        public Models.TaskItem CreateTask(Models.TaskItem task)
        {
            task.Id = _nextId++;
            task.CreatedAt = DateTime.Now;
            task.Status = Models.TaskStatus.ToDo;
            _tasks.Add(task);
            return task;
        }

        public bool UpdateTask(int id, Models.TaskItem task)
        {
            var existingTask = _tasks.FirstOrDefault(t => t.Id == id);
            if (existingTask == null) return false;

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.Status = task.Status;
            existingTask.UpdatedAt = DateTime.Now;

            return true;
        }

        public bool DeleteTask(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return false;

            _tasks.Remove(task);
            return true;
        }
    }
}
