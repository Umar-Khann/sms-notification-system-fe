
# SMS Notification System

A full-stack **SMS Notification System** built with a **React frontend** using **TypeScript**. This project is designed to manage user registration, login, and sending SMS notifications. The application structure follows a modular design pattern for scalability and maintainability.

---

## **Features**
- User Authentication (register, login) using context for state management.
- Display and manage users through a dynamic user table.
- Send SMS notifications to registered users.
- Modular and reusable component structure.
- Environment-based API configuration.

---

## **Project Structure**

```
.
├── README.md                    # Project documentation  
├── package.json                 # Project metadata and dependencies  
├── package-lock.json            # Dependency lock file  
├── public                       # Static public files (HTML, icons, manifest)  
├── src                          # Main application source code  
│   ├── App.tsx                  # Root application component  
│   ├── index.tsx                # Application entry point  
│   ├── components               # Reusable UI components  
│   │   ├── LoginForm.tsx        # User login form component  
│   │   ├── RegisterForm.tsx     # User registration form component  
│   │   └── UserTable.tsx        # User listing table component  
│   ├── context                  # React context for global state management  
│   │   └── AuthContext.tsx      # Authentication context provider  
│   ├── pages                    # Page-level components  
│   │   ├── Auth.tsx             # Authentication page  
│   │   └── Home.tsx             # Home page displaying user data  
│   ├── services                 # API service configurations  
│   │   └── api.ts               # API service for backend communication  
│   ├── styles                   # Application-wide styles and themes  
│   │   └── theme.ts             # Theme configuration for consistent styling  
│   └── types                    # TypeScript types and interfaces  
│       └── index.ts             # Global type definitions  
└── tsconfig.json                # TypeScript configuration file
```

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js and npm installed on your system.

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/sms-notification-system.git
cd sms-notification-system-fe
```

### **3. Environment Configuration**
- The project uses environment variables for API configuration. Copy the provided `.env.example` file and rename it to `.env`, then fill in the required values.

#### .env
```env
REACT_APP_API_BASE_URL=your_backend_url
```

### **4. Install Dependencies**
```bash
npm install
```

### **5. Run the Application**
```bash
npm start
```
- The application will be accessible at `http://localhost:3000`.

---

## **Tech Stack**

### Frontend
- **React** with **TypeScript**
- **Context API** for state management
- **Axios** for API communication

### Development Tools
- **npm** for package management
- **TypeScript** for type-safe development
- **ESLint** and **Prettier** for code linting and formatting

---
