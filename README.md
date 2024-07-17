<h1>Todo List Application</h1>

<p>This is a simple Todo List application built using React and Material-UI. It allows users to add, edit, delete, and manage their tasks with different statuses: ongoing, done, and dropped.</p>

<h2>Features</h2>
<ul>
    <li>Add new todos</li>
    <li>Edit existing todos (when ongoing)</li>
    <li>Mark todos as done</li>
    <li>Drop and retrieve todos</li>
    <li>Remove todos permanently</li>
    <li>Persistent data using localStorage</li>
    <li>Swipe functionality for navigation between different statuses</li>
</ul>

<h2>Technologies Used</h2>
<ul>
    <li>React</li>
    <li>Material-UI</li>
</ul>

<h2>Setup Instructions</h2>

<h3>Prerequisites</h3>
<p>Make sure you have the following installed on your machine:</p>
<ul>
    <li>Node.js (v14 or above)</li>
    <li>npm (v6 or above) or yarn (v1.22 or above)</li>
</ul>

<h3>Installation</h3>
<ol>
    <li>
        <strong>Clone the Repository</strong>
        <pre><code>git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app</code></pre>
    </li>
    <li>
        <strong>Install Dependencies</strong>
        <p>Using npm:</p>
        <pre><code>npm install</code></pre>
        <p>Or using yarn:</p>
        <pre><code>yarn install</code></pre>
    </li>
</ol>

<h3>Running the Application</h3>
<p>To start the development server, run:</p>
<p>Using npm:</p>
<pre><code>npm start</code></pre>
<p>Or using yarn:</p>
<pre><code>yarn start</code></pre>
<p>The application will be available at <a href="http://localhost:3000">http://localhost:3000</a>.</p>

<h3>Building for Production</h3>
<p>To build the application for production, run:</p>
<p>Using npm:</p>
<pre><code>npm run build</code></pre>
<p>Or using yarn:</p>
<pre><code>yarn build</code></pre>
<p>The optimized build will be output to the <code>build</code> directory.</p>

<h3>Deployment</h3>
<p>The application can be deployed to any static site hosting service, such as GitHub Pages, Vercel, Netlify, etc.</p>

<h2>Project Structure</h2>
<pre><code>todo-list-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── TodoContainer.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
</code></pre>

<h2>Usage</h2>
<ol>
    <li><strong>Adding Todos</strong>: Enter your task in the input field and click the "+" button or press "Enter" to add a newtodo.</li>
    <li><strong>Editing Todos</strong>: Click the "Edit" button next to an ongoing todo to edit its text. Save the changes byclicking the "Save" button.</li>
    <li><strong>Marking Todos as Done</strong>: Click the "Check" button next to an ongoing todo to mark it as done.</li>
    <li><strong>Dropping and Retrieving Todos</strong>: Click the "Close" button next to an ongoing todo to drop it. Retrieve adropped todo by clicking the "Redo" button.</li>
    <li><strong>Removing Todos</strong>: Click the "Delete" button next to a done or dropped todo to remove it permanently.</li>
</ol>

<h2>Contributing</h2>
<p>Contributions are welcome! Please open an issue or submit a pull request for any bugs or improvements.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

<h2>Acknowledgements</h2>
<ul>
    <li><a href="https://reactjs.org/">React</a></li>
    <li><a href="https://mui.com/">Material-UI</a></li>
</ul>