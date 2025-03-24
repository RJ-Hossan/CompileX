# 🚀 Compiler Explorer & Visualizer

## 📌 Overview
The **Compiler Explorer & Visualizer** is an **interactive website** designed to **showcase, analyze, and visualize** different aspects of compiler design. This tool provides **real-time lexeme generation, tokenization, expression evaluation, CFG acceptance checking, and predictive parsing**, making it an ideal educational and debugging resource for students, developers, and enthusiasts.

## 🌟 Features & Functionalities

### 1️⃣ Dual Theme Support (Dark & Light Mode) 🌙🔆
- Users can **switch** between **Dark Mode** and **Light Mode**.
- Built using **Tailwind CSS with DaisyUI** for seamless theme toggling.

---

### 2️⃣ Interactive Lexeme Generator & Tokenizer 🛠️
- **Input:** Users enter a code snippet.
- **Output:**
  - The **Lexeme Generator** extracts **words, numbers, operators, and symbols**.
  - The **Tokenizer** categorizes lexemes into **keywords, identifiers, operators, etc.**
- **Visualization:**
  - Structured **table display** of lexemes and tokens.
  - **Color-coded tokens** for easy differentiation.

---

### 3️⃣ Expression Evaluator (Mathematical & Logical) 🔢
- **Input:** Users enter a mathematical or logical expression.
- **Processing:**
  - Breaks the expression into lexemes.
  - Uses **parsing algorithms (Shunting Yard, Recursive Descent)** to evaluate the result.
- **Output:**
  - Step-by-step **evaluation process**.
  - **Final computed result**.

---

### 4️⃣ CFG Acceptance Checker 📜
- **Input:** Users enter a **Context-Free Grammar (CFG)** in **BNF or EBNF format** and provide a **test string**.
- **Processing:**
  - Uses **LL(1) parsing, CYK algorithm**, or other **CFG validation techniques**.
- **Output:**
  - Shows whether the string is **Accepted** or **Rejected**.
  - **Highlights parsing steps dynamically**.

---

### 5️⃣ Predictive Parsing Visualizer (LL(1) Parser) 📊
- **Input:** Users enter a grammar and a test string.
- **Processing:**
  - Constructs **FIRST and FOLLOW sets**.
  - Generates the **parsing table dynamically**.
  - Simulates the **parsing process step by step**.
- **Output:**
  - Displays a real-time **parsing table**.
  - Shows **stack visualization** of how the parser works.
  - Highlights parsing steps **dynamically with animations**.

---

### 6️⃣ Code Playground (Live Compilation & Syntax Highlighting) ⌨️
- Users can **write their own code** in a built-in **code editor**.
- **Syntax highlighting**
- Runs **Lexeme & Tokenization Analysis** in **real-time**.
---

## 🛠️ Tech Stack

### **Frontend:**
- **React.js + Vite** (Fast & lightweight)
- **Tailwind CSS + shadcn-UI** (Modern UI with theme toggling)
- **TypeScript**
---

## 🔥 Additional Features for Future Enhancements
- Support for **multiple parsing techniques (LL, LR, CYK, etc.)**.
- Convert **CFG to equivalent automata (DFA/NFA visualization)**.
- Allow users to **define their own grammars & parsing rules** dynamically.

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository
```bash
 git clone https://github.com/yourusername/compiler-explorer.git
 cd compiler-explorer
```

### 2️⃣ Install Dependencies
```bash
 npm install  # Install frontend dependencies
```

### 3️⃣ Run the Project
```bash
 npm run dev
```

### 4️⃣ Access the Application
Go to: **http://localhost:5005**

---

## 🤝 Contributing
We welcome contributions! Feel free to **fork the repo**, create a **new branch**, and submit a **pull request** with your improvements.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit (`git commit -m 'Added new feature'`).
4. Push the changes (`git push origin feature-branch`).
5. Open a pull request.
---

## 📄 License
This project is licensed under the **MIT License**.
---

## Acknowledgements
A heartfelt thank to **Lovable** for their encouragement and support in building this site using my prompt as well as to ChatGPT for its invaluable assistance in shaping ideas and refining this project.
---

🚀 Happy Coding!

