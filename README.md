# Komune

## See the App!
[Deployed Link](https://komune.netlify.app/)

## App Logo
![Komune Logo]

## Description
Komune es una plataforma que conecta profesionales con clientes para ofrecer servicios de manera eficiente. Los usuarios pueden buscar servicios, intercambiarlos, contactar a otros profesionales... Ah, y es complentamente gratis.

## Repositorios
- [Client Repo](https://github.com/emxgrz/komune-client)
- [Server Repo](https://github.com/emxgrz/komune-server)

---

## Technologies, Libraries & APIs used
- HTML, CSS, JavaScript
- React, React Router
- Bootstrap
- Axios
- Node.js, Express
- MongoDB, Mongoose
- JWT para autenticación
- API propia para gestionar trabajos y usuarios

---

## Backlog Functionalities
- Filtro avanzado por habilidades y ubicación para la búsqueda de profesionales.
- Sistema de mensajes en tiempo real entre clientes y profesionales.
- Panel de administración para gestionar trabajos y usuarios.

---

## Client Structure

### User Stories

1. **404 Error**: Como usuario, quiero ver una página 404 personalizada si accedo a una página inexistente.
2. **500 Error**: Como usuario, quiero ver una página de error cuando ocurra un problema del servidor.
3. **Homepage**: Como usuario, quiero acceder a la página principal para ver de qué trata la aplicación y poder iniciar sesión o registrarme.
4. **Signup**: Como usuario, quiero registrarme en la página para poder ver y solicitar servicios.
5. **Login**: Como usuario, quiero iniciar sesión en la página para gestionar mi cuenta.
6. **Logout**: Como usuario, quiero cerrar sesión para asegurarme de que nadie más acceda a mi cuenta.
7. **Servicios list**: Como usuario, quiero ver todos los servicios disponibles para elegir cuál me interesa.
8. **Crear servicios**: Como profesional, quiero crear un servicio para ofrecerlo a los clientes.
9. **Dejar reseñas**: Como cliente, quiero dejar reseñas a los profesionales después de completar un trabajo.

---

## Client Routes

| **Path**                                      | **Page**                   | **Components**                  | **Behavior**                                                                                 |
|-----------------------------------------------|----------------------------|---------------------------------|----------------------------------------------------------------------------------------------|
| `/`                                           | EnterPage                  | EnterPage                      | Página de bienvenida que se muestra al cargar la aplicación por primera vez.                 |
| `/signup`                                     | Signup                     | Signup                         | Formulario para registrarse en la plataforma.                                                 |
| `/login`                                      | Login                      | Login                          | Formulario para iniciar sesión en la plataforma.                                              |
| `/our-mission`                                | OurMission                 | OurMission                     | Página que explica la misión de la aplicación.                                                 |
| `/my-page/:userId`                            | ProfilePage (Privado)       | ProfilePage                    | Página de perfil del usuario, solo accesible con sesión iniciada.                             |
| `/edit-page/:userId`                          | UpdateProfile (Privado)     | UpdateProfile                  | Página para que el usuario edite su perfil.                                                   |
| `/profiles/:userId`                           | ProfilePage                | ProfilePage                    | Muestra el perfil de un usuario específico.                                                   |
| `/search`                                     | SearchPage (Privado)        | SearchPage                     | Página de búsqueda de trabajos o profesionales.                                               |
| `/home`                                       | HomePage (Privado)          | HomePage                       | Página principal accesible tras iniciar sesión.                                               |
| `/work/:id`                                   | WorkDetails (Privado)       | WorkDetails                    | Muestra los detalles de un trabajo específico.                                                |
| `/work-form`                                  | CreateWorkForm (Privado)    | CreateWorkForm                 | Formulario para que los profesionales creen un nuevo servicio.                                |
| `/review/:id`                                 | ReviewDetails (Privado)     | ReviewDetails                  | Muestra los detalles de una reseña específica.                                                |
| `/review-form/:transactionId/:userId`         | CreateReviewForm (Privado)  | CreateReviewForm               | Formulario para que un cliente cree una reseña de un trabajo completado.                      |
| `/my-transactions`                            | TransactionPage (Privado)   | TransactionPage                | Muestra todas las transacciones de un usuario.                                                |
| `/transaction/:id`                            | TransactionDetails (Privado)| TransactionDetails             | Muestra los detalles de una transacción específica.                                           |
| `/transaction-form/:userId/:workId`           | CreateTransactionForm (Privado) | CreateTransactionForm       | Formulario para crear una nueva transacción entre un cliente y un profesional.                |
| `/error`                                      | ErrorPage                  | ErrorPage                      | Muestra una página de error cuando ocurre un problema en el servidor (500).                   |
| `/*`                                          | Error404                   | Error404                       | Muestra una página 404 personalizada cuando la URL no existe.                                 |

---

## Other Components

- **Navbar**: Barra de navegación con enlaces para inicio de sesión, registro y perfil.
- **Footer**: Pie de página con enlaces a redes sociales y derechos de autor.

---

## Links

- **Figma**: (https://www.figma.com/board/nvxFaWYpB1RfofWy0cIddx/komune?node-id=0-1&node-type=canvas&t=qNq1yoAWN2nvh4S1-0)
- **Slides**: [Presentation Slides](https://slides.com/ejemplo)

---

## Collaborators

- **Developer: Emma Martínez García

---

## Project Links

- **Client Repo**: [Komune Client Repo](https://github.com/tu-usuario/komune-client)
- **Server Repo**: [Komune Server Repo](https://github.com/tu-usuario/komune-server)
- **Deploy Link**: [Live Komune App](https://komune.netlify.app/)
