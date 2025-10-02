// Banco de dados simples simulado
let database = {
    users: [
        { id: 1, email: 'admin@nutrimuscle.com', password: '123456', name: 'Administrador' },
        { id: 2, email: 'user@nutrimuscle.com', password: 'password', name: 'Usuário Teste' }
    ],
    currentUser: null,
    forms: [],
    recipes: [
        { id: 1, title: 'Smoothie Verde', ingredients: ['Espinafre', 'Banana', 'Maçã'], category: 'Bebidas' },
        { id: 2, title: 'Salada Proteica', ingredients: ['Frango', 'Quinoa', 'Brócolis'], category: 'Pratos' },
        { id: 3, title: 'Bowl de Açaí', ingredients: ['Açaí', 'Granola', 'Frutas'], category: 'Sobremesas' }
    ]
};

// Elementos DOM
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');
const loginForm = document.getElementById('loginForm');
const passwordToggle = document.getElementById('passwordToggle');
const forgotPasswordLink = document.getElementById('forgotPassword');

// Estado da aplicação
let currentSection = 'loginSection';
let isMenuOpen = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserAvatars();
    loadRecipeCards();
    showSection('loginSection');
});

// Configuração dos event listeners
function setupEventListeners() {
    // Menu toggle
    menuToggle.addEventListener('click', toggleMenu);
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            closeMenu();
        });
    });
    
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Password toggle
    passwordToggle.addEventListener('click', togglePasswordVisibility);
    
    // Forgot password
    forgotPasswordLink.addEventListener('click', handleForgotPassword);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
    
    // User avatars click events
    setupUserAvatarEvents();
    
    // Contact circles click events
    setupContactCircleEvents();
    
    // Recipe cards click events
    setupRecipeCardEvents();
}

// Inicialização da aplicação
function initializeApp() {
    console.log('Nutrimuscle App Initialized');
    
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('nutrimuscle_user');
    if (savedUser) {
        database.currentUser = JSON.parse(savedUser);
        updateUIForLoggedUser();
    }
    
    // Carregar dados salvos
    const savedForms = localStorage.getItem('nutrimuscle_forms');
    if (savedForms) {
        database.forms = JSON.parse(savedForms);
    }
}

// Navegação entre seções
function showSection(sectionId) {
    // Esconder todas as seções
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Atualizar conteúdo específico da seção
        updateSectionContent(sectionId);
    }
}

// Atualizar conteúdo específico de cada seção
function updateSectionContent(sectionId) {
    switch(sectionId) {
        case 'usersSection':
            updateUsersDisplay();
            break;
        case 'formSection':
            updateFormSection();
            break;
        case 'contactSection':
            updateContactSection();
            break;
        case 'recipeSection':
            updateRecipeSection();
            break;
    }
}

// Menu toggle functionality
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    isMenuOpen = false;
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
}

// Login functionality
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validação básica
    if (!email || !password) {
        showAlert('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Verificar credenciais
    const user = database.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        database.currentUser = user;
        localStorage.setItem('nutrimuscle_user', JSON.stringify(user));
        showAlert(`Bem-vindo, ${user.name}!`, 'success');
        updateUIForLoggedUser();
        showSection('usersSection');
    } else {
        showAlert('Email ou senha incorretos.', 'error');
    }
}

// Password visibility toggle
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    passwordToggle.textContent = type === 'password' ? '👁' : '🙈';
}

// Forgot password functionality
function handleForgotPassword(e) {
    e.preventDefault();
    const email = prompt('Digite seu email para recuperação de senha:');
    
    if (email) {
        const user = database.users.find(u => u.email === email);
        if (user) {
            showAlert(`Instruções de recuperação enviadas para ${email}`, 'success');
        } else {
            showAlert('Email não encontrado.', 'error');
        }
    }
}

// Update UI for logged user
function updateUIForLoggedUser() {
    if (database.currentUser) {
        // Adicionar indicador de usuário logado
        const header = document.querySelector('.header');
        let userIndicator = header.querySelector('.user-indicator');
        
        if (!userIndicator) {
            userIndicator = document.createElement('div');
            userIndicator.className = 'user-indicator';
            userIndicator.innerHTML = `
                <span>Olá, ${database.currentUser.name}</span>
                <button onclick="logout()" class="logout-btn">Sair</button>
            `;
            header.appendChild(userIndicator);
        }
    }
}

// Logout functionality
function logout() {
    database.currentUser = null;
    localStorage.removeItem('nutrimuscle_user');
    
    // Remover indicador de usuário
    const userIndicator = document.querySelector('.user-indicator');
    if (userIndicator) {
        userIndicator.remove();
    }
    
    showAlert('Logout realizado com sucesso!', 'success');
    showSection('loginSection');
}

// User avatars functionality
function loadUserAvatars() {
    const userAvatars = document.querySelectorAll('.user-avatar');
    userAvatars.forEach((avatar, index) => {
        avatar.setAttribute('data-user-id', index + 1);
        avatar.title = `Usuário ${index + 1}`;
    });
}

function setupUserAvatarEvents() {
    const userAvatars = document.querySelectorAll('.user-avatar');
    userAvatars.forEach(avatar => {
        avatar.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            showUserDetails(userId);
        });
    });
}

function showUserDetails(userId) {
    const userInfo = {
        1: { name: 'Ana Silva', specialty: 'Nutrição Esportiva', experience: '5 anos' },
        2: { name: 'Carlos Santos', specialty: 'Dieta Vegana', experience: '3 anos' },
        3: { name: 'Maria Oliveira', specialty: 'Nutrição Clínica', experience: '8 anos' },
        4: { name: 'João Costa', specialty: 'Suplementação', experience: '4 anos' },
        5: { name: 'Lucia Ferreira', specialty: 'Nutrição Infantil', experience: '6 anos' },
        6: { name: 'Pedro Almeida', specialty: 'Emagrecimento', experience: '7 anos' },
        7: { name: 'Sofia Rodrigues', specialty: 'Nutrição Geriátrica', experience: '9 anos' },
        8: { name: 'Rafael Lima', specialty: 'Nutrição Funcional', experience: '2 anos' }
    };
    
    const user = userInfo[userId];
    if (user) {
        showAlert(`${user.name}\nEspecialidade: ${user.specialty}\nExperiência: ${user.experience}`, 'info');
    }
}

function updateUsersDisplay() {
    // Adicionar animação aos avatares
    const userAvatars = document.querySelectorAll('.user-avatar');
    userAvatars.forEach((avatar, index) => {
        setTimeout(() => {
            avatar.style.animation = 'fadeInScale 0.5s ease forwards';
        }, index * 100);
    });
}

// Contact functionality
function setupContactCircleEvents() {
    const contactCircles = document.querySelectorAll('.contact-circle');
    contactCircles.forEach((circle, index) => {
        circle.addEventListener('click', function() {
            showContactInfo(index + 1);
        });
    });
}

function showContactInfo(contactId) {
    const contacts = {
        1: { type: 'WhatsApp', info: '(11) 99999-9999' },
        2: { type: 'Email', info: 'contato@nutrimuscle.com' },
        3: { type: 'Instagram', info: '@nutrimuscle' },
        4: { type: 'Facebook', info: '/nutrimuscle' },
        5: { type: 'Telefone', info: '(11) 3333-3333' },
        6: { type: 'Endereço', info: 'Rua das Vitaminas, 123' },
        7: { type: 'Horário', info: 'Seg-Sex: 8h-18h' },
        8: { type: 'Site', info: 'www.nutrimuscle.com' }
    };
    
    const contact = contacts[contactId];
    if (contact) {
        showAlert(`${contact.type}\n${contact.info}`, 'info');
    }
}

function updateContactSection() {
    // Adicionar animação às nuvens
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        cloud.style.animation = 'float 3s ease-in-out infinite';
    });
}

// Recipe functionality
function loadRecipeCards() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach((card, index) => {
        if (database.recipes[index]) {
            card.setAttribute('data-recipe-id', database.recipes[index].id);
            card.title = database.recipes[index].title;
        }
    });
}

function setupRecipeCardEvents() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.addEventListener('click', function() {
            const recipeId = this.getAttribute('data-recipe-id');
            showRecipeDetails(recipeId);
        });
    });
}

function showRecipeDetails(recipeId) {
    const recipe = database.recipes.find(r => r.id == recipeId);
    if (recipe) {
        showAlert(`${recipe.title}\nCategoria: ${recipe.category}\nIngredientes: ${recipe.ingredients.join(', ')}`, 'info');
    }
}

function updateRecipeSection() {
    // Adicionar conteúdo às linhas do formulário de receitas
    const recipeLines = document.querySelectorAll('.recipe-line');
    const placeholders = [
        'Nome da receita...',
        'Ingredientes principais...',
        'Modo de preparo...',
        'Tempo de preparo...',
        'Categoria...'
    ];
    
    recipeLines.forEach((line, index) => {
        if (placeholders[index]) {
            line.setAttribute('data-placeholder', placeholders[index]);
        }
    });
}

// Form functionality
function updateFormSection() {
    const formLines = document.querySelectorAll('.form-line');
    const formData = [
        'Nome completo',
        'Email',
        'Telefone',
        'Idade',
        'Peso atual',
        'Altura',
        'Objetivo',
        'Observações'
    ];
    
    formLines.forEach((line, index) => {
        if (formData[index]) {
            line.setAttribute('data-field', formData[index]);
            line.addEventListener('click', function() {
                editFormField(index, formData[index]);
            });
        }
    });
}

function editFormField(index, fieldName) {
    const value = prompt(`Digite ${fieldName}:`);
    if (value) {
        const formLines = document.querySelectorAll('.form-line');
        formLines[index].style.background = '#9acd32';
        formLines[index].setAttribute('data-value', value);
        
        // Salvar no banco de dados
        if (!database.forms[0]) {
            database.forms[0] = {};
        }
        database.forms[0][fieldName] = value;
        localStorage.setItem('nutrimuscle_forms', JSON.stringify(database.forms));
        
        showAlert(`${fieldName} salvo com sucesso!`, 'success');
    }
}

// Alert system
function showAlert(message, type = 'info') {
    // Remover alert anterior se existir
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-message">${message.replace(/\n/g, '<br>')}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// CSS para alerts (adicionado dinamicamente)
const alertStyles = `
    .custom-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
    }
    
    .alert-success {
        background: linear-gradient(135deg, #9acd32, #7cfc00);
        border: 2px solid #556b2f;
    }
    
    .alert-error {
        background: linear-gradient(135deg, #ff6b6b, #ff5252);
        border: 2px solid #d32f2f;
    }
    
    .alert-info {
        background: linear-gradient(135deg, #64b5f6, #42a5f5);
        border: 2px solid #1976d2;
    }
    
    .alert-content {
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    
    .alert-message {
        color: #fff;
        font-weight: bold;
        flex: 1;
        margin-right: 10px;
    }
    
    .alert-close {
        background: none;
        border: none;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .user-indicator {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #556b2f;
        font-weight: bold;
    }
    
    .logout-btn {
        background: #556b2f;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9rem;
    }
    
    .logout-btn:hover {
        background: #6b8e23;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = alertStyles;
document.head.appendChild(styleSheet);

// Utility functions
function saveToLocalStorage(key, data) {
    localStorage.setItem(`nutrimuscle_${key}`, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(`nutrimuscle_${key}`);
    return data ? JSON.parse(data) : null;
}

// Export functions for global access
window.logout = logout;
window.showAlert = showAlert;

