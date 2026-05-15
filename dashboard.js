// Dashboard Script
let currentView = 'dashboard'; // 'dashboard' or 'module'
let currentModule = null;

document.addEventListener('DOMContentLoaded', function() {
    // Load Dashboard Modules
    loadDashboardModules();
    
    // Load Quick Access Menu
    loadQuickAccessMenu();
    
    // Sidebar Toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            if (currentView === 'dashboard') {
                const moduleCards = document.querySelectorAll('.module-card-dash');
                moduleCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    if (title.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else {
                const submoduleCards = document.querySelectorAll('.submodule-card');
                submoduleCards.forEach(card => {
                    const title = card.textContent.toLowerCase();
                    if (title.includes(searchTerm)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }
});

function loadDashboardModules() {
    const container = document.getElementById('dashboardModules');
    if (!container) return;
    
    currentView = 'dashboard';
    
    container.innerHTML = AppData.mainModules.map(module => `
        <div class="module-card-dash" onclick="openModule('${module.id}')" style="background: ${module.color};">
            <div class="module-header-dash">
                <div class="module-icon-dash">
                    <span class="material-icons">${module.icon}</span>
                </div>
                <div class="module-info-dash">
                    <h3>${module.title}</h3>
                    <p>${module.subtitle}</p>
                </div>
            </div>
            <div class="module-stats-dash">
                <div class="stat-badge-dash">
                    <span class="material-icons">apps</span>
                    <span>${module.subModulesCount} Features</span>
                </div>
                <div class="stat-badge-dash">
                    <span class="material-icons">psychology</span>
                    <span>${module.aiFeaturesCount} AI</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadQuickAccessMenu() {
    const container = document.getElementById('quickAccessMenu');
    if (!container) return;
    
    const quickAccess = [
        { title: 'Dashboard', icon: 'dashboard', link: '#dashboard' },
        { title: 'Profile', icon: 'person', link: '#profile' },
        { title: 'Settings', icon: 'settings', link: '#settings' },
        { title: 'Help', icon: 'help', link: '#help' }
    ];
    
    container.innerHTML = quickAccess.map(item => `
        <li>
            <a href="${item.link}">
                <span class="material-icons">${item.icon}</span>
                <span>${item.title}</span>
            </a>
        </li>
    `).join('');
}

function openModule(moduleId) {
    const module = AppData.mainModules.find(m => m.id === moduleId);
    if (!module) return;
    
    currentView = 'module';
    currentModule = module;
    
    // Update section header
    const sectionHeader = document.querySelector('.section-header-dash');
    sectionHeader.innerHTML = `
        <div>
            <button class="back-btn" onclick="loadDashboardModules()">
                <span class="material-icons">arrow_back</span>
            </button>
            <span class="material-icons section-icon" style="color: ${module.color};">${module.icon}</span>
            <div>
                <h2>${module.title}</h2>
                <p class="module-subtitle">${module.subtitle}</p>
            </div>
        </div>
    `;
    
    // Load sub-modules
    const container = document.getElementById('dashboardModules');
    container.innerHTML = `
        <div class="submodules-grid-full">
            ${module.subModules.map(sub => `
                <div class="submodule-card-full" onclick="openSubModule('${module.id}', '${sub.name}')" style="border-color: ${module.color};">
                    <div class="submodule-icon" style="background: ${module.color};">
                        <span class="material-icons">${sub.icon}</span>
                    </div>
                    <span class="submodule-name">${sub.name}</span>
                    <span class="material-icons arrow-icon" style="color: ${module.color};">arrow_forward</span>
                </div>
            `).join('')}
        </div>
    `;
}

function openSubModule(moduleId, subModuleName) {
    alert(`Opening ${subModuleName}...\nThis will be implemented with full functionality.`);
}
