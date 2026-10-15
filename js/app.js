// ========================================
// LIFE DASHBOARD APP - Main Application Logic
// ========================================

// ========================================
// STATE MANAGEMENT & INITIALIZATION
// ========================================

// Application State
const AppState = {
    userName: localStorage.getItem('userName') || null,
    theme: localStorage.getItem('theme') || 'light',
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    links: JSON.parse(localStorage.getItem('links')) || [],
    timerInterval: null,
    timerSeconds: 25 * 60, // 25 minutes in seconds
    timerRunning: false
};

// ========================================
// DOM ELEMENT REFERENCES
// ========================================

// Theme
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Greeting & DateTime
const greetingText = document.getElementById('greetingText');
const editNameBtn = document.getElementById('editNameBtn');
const currentTime = document.getElementById('currentTime');
const currentDate = document.getElementById('currentDate');

// Timer
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Todo List
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoEmptyState = document.getElementById('todoEmptyState');

// Quick Links
const linksForm = document.getElementById('linksForm');
const linkNameInput = document.getElementById('linkName');
const linkUrlInput = document.getElementById('linkUrl');
const linksContainer = document.getElementById('linksContainer');
const linksEmptyState = document.getElementById('linksEmptyState');

// Modal
const nameModal = document.getElementById('nameModal');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const cancelNameBtn = document.getElementById('cancelNameBtn');

// ========================================
// INITIALIZATION - App Startup
// ========================================

function initializeApp() {
    // Apply saved theme
    applyTheme(AppState.theme);
    
    // Check if user name exists, if not show modal
    if (!AppState.userName) {
        showNameModal();
    }
    
    // Update greeting and datetime
    updateGreeting();
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second
    
    // Render saved data
    renderTodos();
    renderLinks();
    
    // Set up event listeners
    setupEventListeners();
}

// ========================================
// EVENT LISTENERS SETUP
// ========================================

function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Name editing
    editNameBtn.addEventListener('click', showNameModal);
    nameForm.addEventListener('submit', handleNameSubmit);
    cancelNameBtn.addEventListener('click', hideNameModal);
    nameModal.addEventListener('click', (e) => {
        if (e.target === nameModal) hideNameModal();
    });
    
    // Timer controls
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Todo list
    todoForm.addEventListener('submit', handleTodoSubmit);
    
    // Quick links
    linksForm.addEventListener('submit', handleLinkSubmit);
}

// ========================================
// THEME MANAGEMENT
// ========================================

function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    applyTheme(AppState.theme);
    localStorage.setItem('theme', AppState.theme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ========================================
// GREETING & DATE/TIME DISPLAY
// ========================================

function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good Evening';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon';
    }
    
    const name = AppState.userName || 'Friend';
    greetingText.textContent = `${greeting}, ${name}`;
}

function updateDateTime() {
    const now = new Date();
    
    // Format time with leading zeros
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTime.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
}

// ========================================
// NAME MODAL MANAGEMENT
// ========================================

function showNameModal() {
    nameModal.classList.add('active');
    nameInput.value = AppState.userName || '';
    // Small delay to ensure modal is visible before focusing
    setTimeout(() => nameInput.focus(), 100);
}

function hideNameModal() {
    nameModal.classList.remove('active');
    nameInput.value = '';
}

function handleNameSubmit(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    
    if (name) {
        AppState.userName = name;
        localStorage.setItem('userName', name);
        updateGreeting();
        hideNameModal();
    }
}

// ========================================
// FOCUS TIMER (POMODORO)
// ========================================

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(AppState.timerSeconds);
}

function startTimer() {
    if (AppState.timerRunning) return;
    
    AppState.timerRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    AppState.timerInterval = setInterval(() => {
        AppState.timerSeconds--;
        updateTimerDisplay();
        
        // Timer completed
        if (AppState.timerSeconds <= 0) {
            pauseTimer();
            alert('🎉 Pomodoro session complete! Time for a break!');
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    if (!AppState.timerRunning) return;
    
    AppState.timerRunning = false;
    clearInterval(AppState.timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    pauseTimer();
    AppState.timerSeconds = 25 * 60;
    updateTimerDisplay();
}

// ========================================
// TODO LIST MANAGEMENT
// ========================================

function handleTodoSubmit(e) {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    
    if (!taskText) return;
    
    // Check for duplicate tasks (Challenge #3)
    const isDuplicate = AppState.todos.some(
        todo => todo.text.toLowerCase() === taskText.toLowerCase()
    );
    
    if (isDuplicate) {
        alert('⚠️ This task already exists! Please enter a different task.');
        return;
    }
    
    // Create new todo
    const newTodo = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    AppState.todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(AppState.todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    
    if (AppState.todos.length === 0) {
        todoEmptyState.classList.remove('hidden');
        return;
    }
    
    todoEmptyState.classList.add('hidden');
    
    AppState.todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <div class="todo-actions">
                <button class="todo-btn edit-btn" onclick="editTodo(${todo.id})" title="Edit task">✏️</button>
                <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})" title="Delete task">🗑️</button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
}

function toggleTodo(id) {
    const todo = AppState.todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function editTodo(id) {
    const todo = AppState.todos.find(t => t.id === id);
    if (!todo) return;
    
    const newText = prompt('Edit your task:', todo.text);
    if (newText === null || newText.trim() === '') return;
    
    const trimmedText = newText.trim();
    
    // Check for duplicates (excluding current task)
    const isDuplicate = AppState.todos.some(
        t => t.id !== id && t.text.toLowerCase() === trimmedText.toLowerCase()
    );
    
    if (isDuplicate) {
        alert('⚠️ This task already exists! Please enter a different task.');
        return;
    }
    
    todo.text = trimmedText;
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        AppState.todos = AppState.todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
    }
}

// ========================================
// QUICK LINKS MANAGEMENT
// ========================================

function handleLinkSubmit(e) {
    e.preventDefault();
    const name = linkNameInput.value.trim();
    const url = linkUrlInput.value.trim();
    
    if (!name || !url) return;
    
    // Validate URL format
    if (!isValidUrl(url)) {
        alert('⚠️ Please enter a valid URL (e.g., https://example.com)');
        return;
    }
    
    // Create new link
    const newLink = {
        id: Date.now(),
        name: name,
        url: url
    };
    
    AppState.links.push(newLink);
    saveLinks();
    renderLinks();
    
    // Reset form
    linkNameInput.value = '';
    linkUrlInput.value = '';
    linkNameInput.focus();
}

function saveLinks() {
    localStorage.setItem('links', JSON.stringify(AppState.links));
}

function renderLinks() {
    linksContainer.innerHTML = '';
    
    if (AppState.links.length === 0) {
        linksEmptyState.classList.remove('hidden');
        return;
    }
    
    linksEmptyState.classList.add('hidden');
    
    AppState.links.forEach(link => {
        const badge = document.createElement('a');
        badge.className = 'link-badge';
        badge.href = link.url;
        badge.target = '_blank';
        badge.rel = 'noopener noreferrer';
        badge.title = link.url;
        
        badge.innerHTML = `
            <span class="link-name">${escapeHtml(link.name)}</span>
            <button 
                class="link-remove" 
                onclick="event.preventDefault(); removeLink(${link.id})"
                title="Remove link"
            >×</button>
        `;
        
        linksContainer.appendChild(badge);
    });
}

function removeLink(id) {
    if (confirm('Remove this link?')) {
        AppState.links = AppState.links.filter(l => l.id !== id);
        saveLinks();
        renderLinks();
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// START THE APPLICATION
// ========================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
