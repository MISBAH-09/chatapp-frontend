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
git clone https://github.com/MISBAH-09/chatapp-frontend
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
http://localhost:5173
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

## 🌐 Frontend API Integration

The **ChatApp Frontend** communicates with the backend via **REST APIs** and **WebSockets** to handle authentication, user management, conversations, and real-time messaging.

All API calls are made using **Axios services** and authenticated requests use a **JWT token** attached via an interceptor.

---

## 👤 User Management (Frontend Usage)

These endpoints are consumed by the frontend to handle user authentication and profile-related operations.

| Method | Endpoint          | Used In Frontend For                          | Auth Required |
| :----- | :---------------- | :-------------------------------------------- | :------------ |
| `POST` | `/signup/`        | Registering a new user (Signup / Invite flow) | ❌ No          |
| `POST` | `/login/`         | User login and token generation               | ❌ No          |
| `GET`  | `/get/`           | Fetching logged-in user profile               | ✅ Yes         |
| `PUT`  | `/update/`        | Updating user profile details                 | ✅ Yes         |
| `GET`  | `/fetchallusers/` | Listing all users (excluding current user)    | ✅ Yes  
| `GET`  | `/getbyid/`       | Gettong the logged in user for the header data| ✅ Yes         |
| `POST` | `/addbyemail/`    | Inviting a new user via email                 | ❌ No          |

📌 **Frontend Files Involved**

* `Pages/login.jsx`
* `Pages/inviteuser.jsx`
* `services/userService.jsx`
* `interceptors/auth_interceptor.jsx`

---

## 💬 Conversations & Messaging (Frontend Usage)

These APIs power the chat UI, conversation list, and message operations.

| Method | Endpoint                    | Used In Frontend For                         | Auth Required |
| :----- | :-------------------------- | :------------------------------------------- | :------------ |
| `POST` | `/getConversation/`         | Opening or creating a chat with another user | ✅ Yes         |
| `GET`  | `/getAllConversations/`     | Displaying conversation list in sidebar      | ✅ Yes         |
| `POST` | `/sendMessage/`             | Sending messages (text/media)                | ✅ Yes         |
| `POST` | `/getConversationMessages/` | Loading messages for selected conversation   | ✅ Yes         |
| `POST` | `/delete_message/`          | Deleting a sent message                      | ✅ Yes         |
| `PUT`  | `/update-message/`          | Editing a previously sent text message       | ✅ Yes         |

📌 **Frontend Files Involved**

* `components/chatarea.jsx`
* `components/chatbar.jsx`
* `services/messageservices.jsx`
* `Pages/chat.jsx`

---

## 🔌 WebSocket Integration (Frontend)

The frontend uses **a single global WebSocket connection** to receive real-time updates across the application.

### WebSocket Endpoint

```
ws://127.0.0.1:8000/ws/global/?token=<USER_TOKEN>
```

* The token is passed as a **query parameter**
* Connection is established once and shared using **React Context**

📌 **Frontend File**

* `contexts/SocketContext.jsx`

---

## 📤 Client → Server WebSocket Events

These events are emitted by the frontend to interact with real-time messaging.

| Event Type           | Payload Example                                                                                          |
| :------------------- | :------------------------------------------------------------------------------------------------------- |
| `join_conversation`  | `{ "type": "join_conversation", "conversation_id": 123 }`                                                |
| `leave_conversation` | `{ "type": "leave_conversation", "conversation_id": 123 }`                                               |
| `chat_message`       | `{ "type": "chat_message", "conversation_id": 123, "msg_type": "text", "body": "Hello", "media": null }` |

📌 Used when:

* Opening a chat
* Leaving a conversation
* Sending messages in real time

---

## 📥 Server → Client WebSocket Events

These events are **listened to by the frontend** to update the UI instantly.

| Event Type             | Used In Frontend For                     |
| :--------------------- | :--------------------------------------- |
| `chat_message_event`   | Appending new messages to active chat    |
| `global_message_event` | Showing notifications for inactive chats |
| `connected_users`      | Displaying online users                  |

📌 **Frontend Behavior**

* Active chat updates instantly
* Background conversations trigger toast notifications
* Online users list updates in real time

---

## ⚙️ How Frontend Manages Real-Time State

* **SocketContext** keeps a single global WebSocket connection
* **Axios Interceptors** attach auth tokens automatically
* **React State & Effects** sync API data with socket events
* **Toast notifications** alert users of new messages



## Author

👤 ** Misbah Sehar**

* Website: https://github.com/MISBAH-09
* Github: [@https:\/\/github.com\/MISBAH-09](https://github.com/https:\/\/github.com\/MISBAH-09)