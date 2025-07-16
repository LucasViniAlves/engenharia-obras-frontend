# 🏗️ Sistema Civil

Sistema web completo para **gerenciamento de obras** na área de **engenharia civil**, com foco em controle de materiais, mão de obra, cálculo de BDI, e organização de projetos.

---

## 📌 Descrição

O **Sistema Civil** é uma aplicação fullstack desenvolvida com .NET 8 e React, projetada para auxiliar empresas e engenheiros no gerenciamento de suas obras, otimizando o controle de recursos e promovendo maior organização e economia.

---

## 🚀 Tecnologias Utilizadas

### Backend:
- ✅ [.NET 8](https://dotnet.microsoft.com/en-us/)
- ✅ Entity Framework Core
- ✅ JWT Authentication
- ✅ ASP.NET Core Web API
- ✅ Versionamento de API

### Frontend:
- ✅ React
- ✅ TypeScript
- ✅ Bootstrap
- ✅ Axios
- ✅ React Hot Toast

---

## ⚙️ Funcionalidades Principais

- 🔹 Cadastro e edição de **obras**
- 🔹 Controle de **materiais**
- 🔹 Cadastro de **mão de obra**
- 🔹 Cálculo automático de **BDI**
- 🔹 Associação de **materiais a obras**
- 🔹 Sistema de **login e cadastro** de usuários
- 🔹 **Validação de acesso** com tokens JWT
- 🔹 Interface moderna e responsiva com Bootstrap

---

## 🧑‍💻 Como Executar o Projeto

### Pré-requisitos:
- Node.js (recomendado: 18+)
- .NET SDK 8
- SQL Server (ou outro banco configurado)
- Gerenciador de pacotes (npm ou yarn)

  
```bash
### Backend (.NET):
cd EngenhariaObrasApi
dotnet restore
dotnet ef database update
dotnet run

### Frontend:
cd engenharia-obras-frontend
npm install
npm run dev

