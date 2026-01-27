# Welcome to chatapp-frontend 👋

> A modern React-based frontend for **ChatApp**, a real-time chat application that allows users to communicate seamlessly with socket-based messaging.
This project is basically the frontend part of project https://github.com/MISBAH-09/ChatApp 

## **Project Structure**

```

CHATAPP-FRONTEND/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── chatarea.jsx
│   │   ├── chatbar.jsx
│   │   ├── header.jsx
│   │   ├── helpermethods.jsx
│   │   ├── newuser.jsx
│   │   └── sidebar.jsx
│   ├── contexts/
│   │   └── SocketContext.jsx
│   ├── interceptors/
│   │   └── auth_interceptor.jsx
│   ├── Pages/
│   │   ├── chat.jsx
│   │   ├── inviteuser.jsx
│   │   └── login.jsx
│   ├── services/
│   │   ├── messageservices.jsx
│   │   └── userService.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx

````

---

## **Features**

- Real-time chat with WebSocket integration.
- User authentication and authorization.
- Invite users to chat.
- Modular React components for easy maintenance.
- Custom hooks and context for socket management.
- Responsive and clean UI.

---

## **Installation**

1. Clone the repository:
```bash
git clone <frontend-repo-url>
````

2. Navigate to the frontend folder:

```bash
cd CHATAPP-FRONTEND
```

3. Install dependencies:

```bash
npm install
```

---

## **Usage**

1. Start the development server:

```bash
npm start
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

3. Make sure the backend server for ChatApp is running to enable real-time chat.

---

## **Services & Contexts**

* **SocketContext.jsx**: Provides a global socket connection for real-time messaging.
* **auth_interceptor.jsx**: Handles API authentication tokens.
* **messageservices.jsx & userService.jsx**: API services for messages and users.

---

## **Components**

* **ChatArea.jsx**: Displays messages for active conversation.
* **ChatBar.jsx**: Input area for sending messages.
* **Header.jsx & Sidebar.jsx**: Navigation and layout components.
* **NewUser.jsx**: Component for adding new users.
* **HelperMethods.jsx**: Utility functions (e.g., formatting, converting media).

---

## **Pages**

* **Chat.jsx**: Main chat interface.
* **InviteUser.jsx**: Page to invite users to conversations.
* **Login.jsx**: Authentication page for users.

---

## **Styling**

* Uses `index.css` for global styles.
* You can integrate Tailwind or other CSS frameworks if needed.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Commit: `git commit -m "Description of changes"`.
5. Push: `git push origin feature-name`.
6. Create a pull request.

---

## **License**

MIT License. See `LICENSE` file for details.

---

```

---

This README includes:  

- **Project description**  
- **Frontend folder structure**  
- **Features, installation, usage**  
- **Explanation of components, pages, and services**  
- **Contributing guidelines and license**  

## Author

👤 ** Misbah Sehar**

* Website: https://github.com/MISBAH-09
* Github: [@https:\/\/github.com\/MISBAH-09](https://github.com/https:\/\/github.com\/MISBAH-09)