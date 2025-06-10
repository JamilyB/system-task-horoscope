# 🔮 Task Horoscope

Sistema web que permite **agendar tarefas** e receber **previsões astrológicas** personalizadas via integração com a API externa **Horoscope-AI**.

---

##  Funcionalidades

- 📅 Agendamento de tarefas
- ✨ Previsões diárias por signo (API Horoscope-AI)


## Tecnologias utilizadas

| Camada          | Tecnologia   |
|-----------------|--------------|
| Frontend        | React        |
| Backend         | Spring Boot  |
| API Externa     | Horoscope-AI |
| Banco de dados  | PostegreSQL  |
| Deploy          | Render       |

---

## Acesse o projeto

[Clique aqui para acessar no Render](https://system-task-horoscope-frontend.onrender.com/)

---

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/JamilyB/task-horoscope.git

# Acesse o diretório do frontend
cd task-horoscope/frontend
npm install
npm run dev

# Em outra aba/terminal, acesse o backend
cd ../backend
./mvnw spring-boot:run
