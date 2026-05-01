# 📋 Quadro Kanban - Controle de Tarefas

Um sistema simples de gerenciamento de tarefas usando metodologia Kanban com backend em C# (ASP.NET Core) e frontend web responsivo.

## 🚀 Funcionalidades

- **✅ CRUD Completo**: Criar, ler, atualizar e excluir tarefas
- **🎯 Três Status Kanban**: A Fazer, Em Progresso, Concluído
- **🖱️ Drag & Drop**: Arrastar e soltar tarefas entre colunas
- **📱 Interface Responsiva**: Funciona em desktop e mobile
- **🎨 Design Moderno**: Interface limpa e intuitiva
- **⚡ Tempo Real**: Atualizações instantâneas via API

## 🛠️ Tecnologias

### Backend
- **C#** com ASP.NET Core 8.0
- **RESTful API** com endpoints completos
- **CORS** configurado para comunicação frontend
- **Swagger** para documentação da API

### Frontend
- **HTML5**, **CSS3**, **JavaScript Vanilla**
- **Drag & Drop API** nativa
- **Design Responsivo** com CSS Grid
- **Animações** e transições suaves

## 📋 Estrutura do Projeto

```
control_tarefa/
├── KanbanBoard.csproj          # Arquivo de projeto C#
├── Program.cs                  # Configuração da aplicação
├── Models/
│   └── TaskItem.cs            # Modelo de dados da tarefa
├── Services/
│   └── TaskService.cs         # Lógica de negócio
├── Controllers/
│   └── TaskController.cs      # Controller da API
├── wwwroot/
│   ├── index.html             # Página principal
│   ├── css/
│   │   └── style.css          # Estilos CSS
│   └── js/
│       └── app.js             # Lógica frontend
└── README.md                  # Este arquivo
```

## 🏃‍♂️ Como Executar

### Pré-requisitos
- .NET 8.0 SDK instalado

### Passos

1. **Navegar para o diretório do projeto:**
   ```bash
   cd control_tarefa
   ```

2. **Restaurar dependências:**
   ```bash
   dotnet restore
   ```

3. **Executar a aplicação:**
   ```bash
   dotnet run
   ```

4. **Acessar a aplicação:**
   - Interface Web: `http://localhost:5000`
   - API Documentation (Swagger): `http://localhost:5000/swagger`

## 📡 API Endpoints

### Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/task` | Listar todas as tarefas |
| GET | `/api/task/{id}` | Obter tarefa específica |
| POST | `/api/task` | Criar nova tarefa |
| PUT | `/api/task/{id}` | Atualizar tarefa existente |
| DELETE | `/api/task/{id}` | Excluir tarefa |

### Modelo de Dados

```json
{
  "id": 1,
  "title": "Título da Tarefa",
  "description": "Descrição detalhada",
  "status": 0,
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": null
}
```

### Status Possíveis
- `0`: A Fazer (ToDo)
- `1`: Em Progresso (InProgress)  
- `2`: Concluído (Done)

## 🎯 Como Usar

1. **Criar Tarefa**: Clique no botão "➕ Nova Tarefa"
2. **Editar Tarefa**: Clique no botão "✏️ Editar" em qualquer tarefa
3. **Mover Tarefa**: Arraste e solte a tarefa entre as colunas
4. **Excluir Tarefa**: Clique no botão "🗑️ Excluir" em qualquer tarefa

## 🔧 Personalização

### Adicionar Novas Funcionalidades
- Modifique `TaskService.cs` para adicionar lógica de negócio
- Atualize `TaskController.cs` para novos endpoints
- Estenda `app.js` para funcionalidades frontend
- Personalize `style.css` para alterar o visual

### Persistência de Dados
Atualmente os dados são armazenados em memória. Para persistência:
- Adicione Entity Framework Core
- Configure um banco de dados (SQL Server, PostgreSQL, etc.)
- Modifique `TaskService.cs` para usar o DbContext

## 🐛 Solução de Problemas

### Porta em Uso
Se a porta 5000 estiver ocupada, o .NET automaticamente usará a próxima porta disponível (5001, 5002, etc.).

### CORS Issues
O CORS está configurado para aceitar qualquer origem. Em produção, restrinja às origens específicas.

### Problemas com Drag & Drop
Certifique-se de usar um navegador moderno que suporte a Drag & Drop API.

## 📝 Licença

Este projeto é open-source e disponível para uso e modificação.

---

**Desenvolvido com ❤️ usando C# e tecnologias web modernas**
