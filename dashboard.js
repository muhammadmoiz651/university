// Dashboard Script
let currentView = 'dashboard'; // 'dashboard', 'module', or 'submodule'
let currentModule = null;
let currentSubModule = null;

document.addEventListener('DOMContentLoaded', function() {
    // Load Dashboard Modules
    loadDashboardModules();
    
    // Load Quick Access Menu
    loadQuickAccessMenu();
    
    // Sidebar Toggle for all screen sizes
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const dashboardBody = document.querySelector('.dashboard-body');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            dashboardBody.classList.toggle('sidebar-open');
            
            // Toggle dashboard main margin for desktop
            if (window.innerWidth > 1024) {
                if (sidebar.classList.contains('active')) {
                    dashboardMain.style.marginLeft = '0';
                    dashboardMain.style.width = '100%';
                } else {
                    dashboardMain.style.marginLeft = '280px';
                    dashboardMain.style.width = 'calc(100% - 280px)';
                }
            }
        });
    }
    
    // Close sidebar when clicking outside on mobile/tablet
    if (dashboardBody && sidebar) {
        dashboardBody.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                if (sidebar.classList.contains('active') && 
                    !sidebar.contains(e.target) && 
                    !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                    dashboardBody.classList.remove('sidebar-open');
                }
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            // Desktop: remove mobile classes
            dashboardBody.classList.remove('sidebar-open');
            if (!sidebar.classList.contains('active')) {
                dashboardMain.style.marginLeft = '280px';
                dashboardMain.style.width = 'calc(100% - 280px)';
            }
        } else {
            // Mobile/Tablet: reset to default
            if (!sidebar.classList.contains('active')) {
                dashboardMain.style.marginLeft = '0';
                dashboardMain.style.width = '100%';
            }
        }
    });
    
    // Logo Click - Go to Home
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.style.cursor = 'pointer';
        navBrand.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Sidebar Menu Items Click Handler
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li a');
    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle different sidebar options
            if (href === '#dashboard') {
                e.preventDefault();
                loadDashboardModules();
            } else if (href === '#modules') {
                e.preventDefault();
                showAllModules();
            } else if (href === '#ai-features') {
                e.preventDefault();
                showAIFeatures();
            } else if (href === '#profile') {
                e.preventDefault();
                handleQuickAccess('profile');
            } else if (href === '#settings') {
                e.preventDefault();
                handleQuickAccess('settings');
            } else if (href === '#help') {
                e.preventDefault();
                handleQuickAccess('help');
            } else {
                // For sub-module links, prevent default but let the onclick handler work
                e.preventDefault();
            }
            
            // Remove active class from all items
            sidebarMenuItems.forEach(link => {
                link.parentElement.classList.remove('active');
            });
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                dashboardBody.classList.remove('sidebar-open');
            }
        });
    });
    
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
            } else if (currentView === 'module') {
                const submoduleCards = document.querySelectorAll('.submodule-card-full');
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
    currentModule = null;
    currentSubModule = null;
    
    // Show sidebar and remove fullscreen
    const sidebar = document.querySelector('.sidebar');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    if (sidebar) {
        sidebar.style.display = 'block';
    }
    
    if (dashboardMain) {
        dashboardMain.classList.remove('fullscreen');
    }
    
    // Update section header
    const sectionHeader = document.querySelector('.section-header-dash');
    sectionHeader.innerHTML = `
        <div>
            <span class="material-icons section-icon">apps</span>
            <h2>University Core Modules</h2>
        </div>
    `;
    
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

function openSubModule(moduleId, subModuleName, subModuleIcon) {
    // Map sub-module names to their HTML files
    const subModuleFiles = {
        'NCAAA Compliance': 'submodules/ncaaa-compliance.html',
        'ABET Compliance': 'submodules/abet-compliance.html',
        'Course Reports': 'submodules/course-reports.html',
        'Program Reports': 'submodules/program-reports.html',
        'KPI Tracking': 'submodules/kpi-tracking.html',
        'QA Reports': 'submodules/qa-reports.html'
    };
    
    // Check if sub-module has a dedicated page
    if (subModuleFiles[subModuleName]) {
        window.location.href = subModuleFiles[subModuleName];
        return;
    }
    
    // Otherwise show the dynamic content (for modules without dedicated pages yet)
    const module = AppData.mainModules.find(m => m.id === moduleId);
    if (!module) return;
    
    currentView = 'submodule';
    currentSubModule = { name: subModuleName, icon: subModuleIcon };
    
    // Hide sidebar and expand main content to full screen
    const sidebar = document.querySelector('.sidebar');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    if (sidebar) {
        sidebar.style.display = 'none';
    }
    
    if (dashboardMain) {
        dashboardMain.classList.add('fullscreen');
    }
    
    // Update section header with breadcrumb
    const sectionHeader = document.querySelector('.section-header-dash');
    sectionHeader.innerHTML = `
        <div>
            <button class="back-btn" onclick="closeSubModule('${moduleId}')">
                <span class="material-icons">arrow_back</span>
            </button>
            <span class="material-icons section-icon" style="color: ${module.color};">${subModuleIcon}</span>
            <div>
                <h2>${subModuleName}</h2>
                <p class="module-subtitle">${module.title} > ${subModuleName}</p>
            </div>
        </div>
    `;
    
    // Load sub-module content
    const container = document.getElementById('dashboardModules');
    container.innerHTML = `
        <div class="submodule-content">
            <div class="submodule-hero" style="background: linear-gradient(135deg, ${module.color} 0%, ${adjustColor(module.color, -20)} 100%);">
                <div class="submodule-hero-content">
                    <div class="submodule-hero-icon">
                        <span class="material-icons">${subModuleIcon}</span>
                    </div>
                    <h1>${subModuleName}</h1>
                    <p>Complete management system for ${subModuleName.toLowerCase()}</p>
                    <p style="margin-top: 16px; font-size: 14px; opacity: 0.8;">
                        <em>Note: Dedicated page for this module is under development</em>
                    </p>
                </div>
            </div>
            
            <div class="submodule-features">
                <h3>Quick Actions</h3>
                <div class="quick-actions-grid">
                    <div class="action-card" style="border-color: ${module.color};">
                        <span class="material-icons" style="color: ${module.color};">add_circle</span>
                        <span>Add New</span>
                    </div>
                    <div class="action-card" style="border-color: ${module.color};">
                        <span class="material-icons" style="color: ${module.color};">search</span>
                        <span>Search</span>
                    </div>
                    <div class="action-card" style="border-color: ${module.color};">
                        <span class="material-icons" style="color: ${module.color};">filter_list</span>
                        <span>Filter</span>
                    </div>
                    <div class="action-card" style="border-color: ${module.color};">
                        <span class="material-icons" style="color: ${module.color};">download</span>
                        <span>Export</span>
                    </div>
                    <div class="action-card" style="border-color: ${module.color};">
                        <span class="material-icons" style="color: ${module.color};">upload</span>
                        <span>Import</span>
                    </div>
                    <div class="action-card" style="border-color: ${module.color};">
                        <span class="material-icons" style="color: ${module.color};">settings</span>
                        <span>Settings</span>
                    </div>
                </div>
            </div>
            
            <div class="submodule-stats-section">
                <h3>Overview Statistics</h3>
                <div class="stats-cards-grid">
                    <div class="stat-card" style="border-left: 4px solid ${module.color};">
                        <div class="stat-icon" style="background: ${module.color}20;">
                            <span class="material-icons" style="color: ${module.color};">trending_up</span>
                        </div>
                        <div class="stat-info">
                            <h4>Total Records</h4>
                            <p class="stat-number">1,234</p>
                        </div>
                    </div>
                    <div class="stat-card" style="border-left: 4px solid ${module.color};">
                        <div class="stat-icon" style="background: ${module.color}20;">
                            <span class="material-icons" style="color: ${module.color};">check_circle</span>
                        </div>
                        <div class="stat-info">
                            <h4>Active</h4>
                            <p class="stat-number">987</p>
                        </div>
                    </div>
                    <div class="stat-card" style="border-left: 4px solid ${module.color};">
                        <div class="stat-icon" style="background: ${module.color}20;">
                            <span class="material-icons" style="color: ${module.color};">pending</span>
                        </div>
                        <div class="stat-info">
                            <h4>Pending</h4>
                            <p class="stat-number">156</p>
                        </div>
                    </div>
                    <div class="stat-card" style="border-left: 4px solid ${module.color};">
                        <div class="stat-icon" style="background: ${module.color}20;">
                            <span class="material-icons" style="color: ${module.color};">psychology</span>
                        </div>
                        <div class="stat-info">
                            <h4>AI Insights</h4>
                            <p class="stat-number">24</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="submodule-table-section">
                <div class="table-header">
                    <h3>Recent Activity</h3>
                    <button class="view-all-btn" style="background: ${module.color};">
                        View All
                        <span class="material-icons">arrow_forward</span>
                    </button>
                </div>
                <div class="data-table">
                    <div class="table-placeholder">
                        <span class="material-icons" style="color: ${module.color};">table_chart</span>
                        <p>Data table will be displayed here</p>
                        <small>This is a placeholder for the actual data implementation</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function closeSubModule(moduleId) {
    // Show sidebar and restore main content
    const sidebar = document.querySelector('.sidebar');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    if (sidebar) {
        sidebar.style.display = 'block';
    }
    
    if (dashboardMain) {
        dashboardMain.classList.remove('fullscreen');
    }
    
    // Go back to module view
    openModule(moduleId);
}

function openModule(moduleId) {
    // Map module IDs to their HTML files
    const moduleFiles = {
        'student': 'modules/student-management.html',
        'faculty': 'modules/faculty-management.html',
        'admin': 'modules/admin-management.html',
        'hr': 'modules/hr-management.html',
        'finance': 'modules/finance-management.html',
        'library': 'modules/library-management.html',
        'attendance': 'modules/attendance-module.html',
        'placement': 'modules/placement-career.html',
        'research': 'modules/research-management.html',
        'timetable': 'modules/timetable-scheduling.html',
        'qa': 'modules/quality-assurance.html',
        'hostel': 'modules/hostel-management.html'
    };
    
    // Check if module has a dedicated page
    if (moduleFiles[moduleId]) {
        window.location.href = moduleFiles[moduleId];
        return;
    }
    
    // Otherwise show dynamic content (for modules without dedicated pages yet)
    const module = AppData.mainModules.find(m => m.id === moduleId);
    if (!module) return;
    
    currentView = 'module';
    currentModule = module;
    currentSubModule = null;
    
    // Ensure sidebar is visible and remove fullscreen
    const sidebar = document.querySelector('.sidebar');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    if (sidebar) {
        sidebar.style.display = 'block';
    }
    
    if (dashboardMain) {
        dashboardMain.classList.remove('fullscreen');
    }
    
    // Update sidebar with sub-modules
    updateSidebarForModule(module);
    
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
                <div class="submodule-card-full" onclick="openSubModule('${module.id}', '${sub.name}', '${sub.icon}')" style="border-color: ${module.color};">
                    <div class="submodule-icon" style="background: ${module.color};">
                        <span class="material-icons">${sub.icon}</span>
                    </div>
                    <span class="submodule-name">${sub.name}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function updateSidebarForModule(module) {
    const quickAccessMenu = document.getElementById('quickAccessMenu');
    if (!quickAccessMenu) return;
    
    // Update sidebar title
    const sidebarSection = quickAccessMenu.closest('.sidebar-section');
    if (sidebarSection) {
        const heading = sidebarSection.querySelector('h3');
        if (heading) heading.textContent = 'Sub-Modules';
    }
    
    // Show first 8 sub-modules in sidebar
    const subModulesToShow = module.subModules.slice(0, 8);
    quickAccessMenu.innerHTML = subModulesToShow.map(sub => `
        <li>
            <a href="#" onclick="event.preventDefault(); openSubModule('${module.id}', '${sub.name}', '${sub.icon}');">
                <span class="material-icons">${sub.icon}</span>
                <span>${sub.name}</span>
            </a>
        </li>
    `).join('');
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    const clamp = (val) => Math.min(Math.max(val, 0), 255);
    const num = parseInt(color.replace('#', ''), 16);
    const r = clamp((num >> 16) + amount);
    const g = clamp(((num >> 8) & 0x00FF) + amount);
    const b = clamp((num & 0x0000FF) + amount);
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// Handler for sidebar main menu options
function showAllModules() {
    const sidebar = document.querySelector('.sidebar');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    // Ensure sidebar is visible and remove fullscreen
    if (sidebar) {
        sidebar.style.display = 'block';
    }
    
    if (dashboardMain) {
        dashboardMain.classList.remove('fullscreen');
    }
    
    loadDashboardModules();
}

function showAIFeatures() {
    const sidebar = document.querySelector('.sidebar');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    if (sidebar) {
        sidebar.style.display = 'none';
    }
    
    if (dashboardMain) {
        dashboardMain.classList.add('fullscreen');
    }
    
    currentView = 'ai-features';
    
    const sectionHeader = document.querySelector('.section-header-dash');
    sectionHeader.innerHTML = `
        <div>
            <button class="back-btn" onclick="loadDashboardModules()">
                <span class="material-icons">arrow_back</span>
            </button>
            <span class="material-icons section-icon" style="color: #302780;">psychology</span>
            <div>
                <h2>AI-Powered Features</h2>
                <p class="module-subtitle">Explore all AI capabilities across the platform</p>
            </div>
        </div>
    `;
    
    const container = document.getElementById('dashboardModules');
    container.innerHTML = `
        <div class="ai-features-container" style="padding: 40px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-bottom: 40px;">
                <div class="ai-feature-card" style="background: white; border-radius: 12px; padding: 30px; border-left: 4px solid #302780;">
                    <div class="ai-feature-icon" style="background: linear-gradient(135deg, #302780 0%, #4A3FA0 100%); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <span class="material-icons" style="color: white; font-size: 32px;">auto_awesome</span>
                    </div>
                    <h3 style="color: #302780; margin-bottom: 10px;">Smart Recommendations</h3>
                    <p style="color: #666; margin-bottom: 15px;">Personalized course, career, and learning path suggestions based on your academic performance and interests.</p>
                    <div style="background: #f0f4ff; padding: 12px; border-radius: 8px; font-size: 13px; color: #302780; font-weight: 600;\">Accuracy: 92%</div>
                </div>
                
                <div class="ai-feature-card" style="background: white; border-radius: 12px; padding: 30px; border-left: 4px solid #018137;">
                    <div class="ai-feature-icon" style="background: linear-gradient(135deg, #018137 0%, #02A347 100%); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <span class="material-icons" style="color: white; font-size: 32px;">insights</span>
                    </div>
                    <h3 style="color: #302780; margin-bottom: 10px;\">Predictive Analytics</h3>
                    <p style="color: #666; margin-bottom: 15px;\">Analyze academic trends, predict student performance, and identify at-risk students for early intervention.</p>
                    <div style="background: #f0f4ff; padding: 12px; border-radius: 8px; font-size: 13px; color: #018137; font-weight: 600;\">15,234 Predictions Made</div>
                </div>
                
                <div class="ai-feature-card" style="background: white; border-radius: 12px; padding: 30px; border-left: 4px solid #D32F2F;">
                    <div class="ai-feature-icon" style="background: linear-gradient(135deg, #D32F2F 0%, #F44336 100%); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <span class="material-icons" style="color: white; font-size: 32px;\">smart_toy</span>
                    </div>
                    <h3 style="color: #302780; margin-bottom: 10px;\">AI Assistant</h3>
                    <p style="color: #666; margin-bottom: 15px;\">24/7 intelligent chatbot that answers questions about courses, fees, attendance, and general inquiries.</p>
                    <div style="background: #f0f4ff; padding: 12px; border-radius: 8px; font-size: 13px; color: #D32F2F; font-weight: 600;\">98% Query Resolution</div>
                </div>
                
                <div class="ai-feature-card" style="background: white; border-radius: 12px; padding: 30px; border-left: 4px solid #FF6F00;">
                    <div class="ai-feature-icon" style="background: linear-gradient(135deg, #FF6F00 0%, #FF9100 100%); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <span class="material-icons" style="color: white; font-size: 32px;\">schedule</span>
                    </div>
                    <h3 style="color: #302780; margin-bottom: 10px;\">Smart Scheduling</h3>
                    <p style="color: #666; margin-bottom: 15px;\">AI-optimized timetables to minimize conflicts, balance workload, and maximize learning efficiency.</p>
                    <div style="background: #f0f4ff; padding: 12px; border-radius: 8px; font-size: 13px; color: #FF6F00; font-weight: 600;\">Zero Schedule Conflicts</div>
                </div>
                
                <div class="ai-feature-card" style="background: white; border-radius: 12px; padding: 30px; border-left: 4px solid #6B2D5C;">
                    <div class="ai-feature-icon" style="background: linear-gradient(135deg, #6B2D5C 0%, #8B3D7C 100%); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <span class="material-icons" style="color: white; font-size: 32px;\">trending_up</span>
                    </div>
                    <h3 style="color: #302780; margin-bottom: 10px;\">Performance Analytics</h3>
                    <p style="color: #666; margin-bottom: 15px;\">Deep insights into your academic progress with real-time reports, GPA trends, and comparative analytics.</p>
                    <div style="background: #f0f4ff; padding: 12px; border-radius: 8px; font-size: 13px; color: #6B2D5C; font-weight: 600;\">Real-time Updates</div>
                </div>
                
                <div class="ai-feature-card" style="background: white; border-radius: 12px; padding: 30px; border-left: 4px solid #1A5F7A;">
                    <div class="ai-feature-icon" style="background: linear-gradient(135deg, #1A5F7A 0%, #2A7F9A 100%); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <span class="material-icons" style="color: white; font-size: 32px;\">notifications</span>
                    </div>
                    <h3 style="color: #302780; margin-bottom: 10px;\">Smart Notifications</h3>
                    <p style="color: #666; margin-bottom: 15px;\">Intelligent alerts prioritized by importance, sent at optimal times so you never miss critical updates.</p>
                    <div style="background: #f0f4ff; padding: 12px; border-radius: 8px; font-size: 13px; color: #1A5F7A; font-weight: 600;\">45,892 Notifications Delivered</div>
                </div>
                
                <div class="ai-feature-card" style="background: white; border-radius: 12px; padding: 30px; border-left: 4px solid #0F6B3E;">
                    <div class="ai-feature-icon" style="background: linear-gradient(135deg, #0F6B3E 0%, #1F8B5E 100%); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <span class="material-icons" style="color: white; font-size: 32px;\">directions_bus</span>
                    </div>
                    <h3 style="color: #302780; margin-bottom: 10px;\">Smart Placement</h3>
                    <p style="color: #666; margin-bottom: 15px;\">AI-powered job matching system that connects you with the best career opportunities based on your profile.</p>
                    <div style="background: #f0f4ff; padding: 12px; border-radius: 8px; font-size: 13px; color: #0F6B3E; font-weight: 600;\">2,456 Placements</div>
                </div>
            </div>
            
            <div style="background: white; border-radius: 12px; padding: 40px; border-left: 4px solid #302780;\">
                <h2 style="color: #302780; margin-bottom: 30px;\">Key AI Metrics</h2>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;\">
                    <div style="text-align: center; padding: 20px; background: #f0f4ff; border-radius: 8px;\">
                        <p style="color: #302780; font-size: 32px; font-weight: 700; margin: 0;\">94%</p>
                        <p style="color: #666; font-size: 14px; margin: 8px 0 0 0;\">Overall Accuracy</p>
                    </div>
                    <div style="text-align: center; padding: 20px; background: #f0f4ff; border-radius: 8px;\">
                        <p style="color: #302780; font-size: 32px; font-weight: 700; margin: 0;\">24/7</p>
                        <p style="color: #666; font-size: 14px; margin: 8px 0 0 0;\">Availability</p>
                    </div>
                    <div style="text-align: center; padding: 20px; background: #f0f4ff; border-radius: 8px;\">
                        <p style="color: #302780; font-size: 32px; font-weight: 700; margin: 0;\">1.2M+</p>
                        <p style="color: #666; font-size: 14px; margin: 8px 0 0 0;\">Queries Processed</p>
                    </div>
                    <div style="text-align: center; padding: 20px; background: #f0f4ff; border-radius: 8px;\">
                        <p style="color: #302780; font-size: 32px; font-weight: 700; margin: 0;\">12.5K+</p>
                        <p style="color: #666; font-size: 14px; margin: 8px 0 0 0;\">Active Users</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleQuickAccess(option) {
    const sidebar = document.querySelector('.sidebar');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    if (sidebar) {
        sidebar.style.display = 'none';
    }
    
    if (dashboardMain) {
        dashboardMain.classList.add('fullscreen');
    }
    
    switch(option) {
        case 'profile':
            currentView = 'profile';
            const sectionHeader = document.querySelector('.section-header-dash');
            sectionHeader.innerHTML = `
                <div>
                    <button class="back-btn" onclick="loadDashboardModules()">
                        <span class="material-icons">arrow_back</span>
                    </button>
                    <span class="material-icons section-icon" style="color: #302780;">person</span>
                    <div>
                        <h2>User Profile</h2>
                        <p class="module-subtitle">Manage your account settings and information</p>
                    </div>
                </div>
            `;
            
            const container = document.getElementById('dashboardModules');
            container.innerHTML = `
                <div class="profile-container" style="padding: 40px;">
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px; background: white; border-radius: 12px; padding: 40px;">
                        <div style="text-align: center;">
                            <img src="https://ui-avatars.com/api/?name=John+Doe&background=302780&color=fff&size=150" alt="Profile" style="border-radius: 12px; width: 200px; height: 200px; margin-bottom: 20px;">
                            <h3 style="margin: 15px 0 5px 0; color: #302780; font-size: 24px;">John Doe</h3>
                            <p style="color: #666; margin: 0; font-size: 16px;">Student</p>
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                                <p style="color: #666; font-size: 13px; margin: 5px 0;"><strong>Enrollment Date:</strong> Aug 2022</p>
                                <p style="color: #666; font-size: 13px; margin: 5px 0;"><strong>Status:</strong> Active</p>
                                <p style="color: #666; font-size: 13px; margin: 5px 0;"><strong>GPA:</strong> 3.85/4.0</p>
                            </div>
                        </div>
                        
                        <div>
                            <h2 style="color: #302780; margin-bottom: 30px;">Profile Information</h2>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                                <div>
                                    <label style="display: block; color: #666; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Email</label>
                                    <p style="margin: 0; color: #302780; font-weight: 500; font-size: 16px;">john.doe@university.edu</p>
                                </div>
                                <div>
                                    <label style="display: block; color: #666; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Student ID</label>
                                    <p style="margin: 0; color: #302780; font-weight: 500; font-size: 16px;">STU-2024-001234</p>
                                </div>
                                <div>
                                    <label style="display: block; color: #666; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Department</label>
                                    <p style="margin: 0; color: #302780; font-weight: 500; font-size: 16px;">Computer Science</p>
                                </div>
                                <div>
                                    <label style="display: block; color: #666; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Semester</label>
                                    <p style="margin: 0; color: #302780; font-weight: 500; font-size: 16px;">4th Semester (2024)</p>
                                </div>
                                <div>
                                    <label style="display: block; color: #666; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Phone</label>
                                    <p style="margin: 0; color: #302780; font-weight: 500; font-size: 16px;">+92-334-5678901</p>
                                </div>
                                <div>
                                    <label style="display: block; color: #666; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Address</label>
                                    <p style="margin: 0; color: #302780; font-weight: 500; font-size: 16px;">Karachi, Pakistan</p>
                                </div>
                            </div>
                            <button style="width: 100%; padding: 14px; background: #302780; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 40px; font-size: 16px;" onclick="alert('Edit profile functionality coming soon!')">Edit Profile</button>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'settings':
            currentView = 'settings';
            const headerSettings = document.querySelector('.section-header-dash');
            headerSettings.innerHTML = `
                <div>
                    <button class="back-btn" onclick="loadDashboardModules()">
                        <span class="material-icons">arrow_back</span>
                    </button>
                    <span class="material-icons section-icon" style="color: #302780;">settings</span>
                    <div>
                        <h2>Settings</h2>
                        <p class="module-subtitle">Configure your preferences and system settings</p>
                    </div>
                </div>
            `;
            
            const containerSettings = document.getElementById('dashboardModules');
            containerSettings.innerHTML = `
                <div class="settings-container" style="padding: 40px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                        <div style="background: white; border-radius: 12px; padding: 40px;">
                            <h3 style="margin-top: 0; color: #302780; font-size: 20px; margin-bottom: 25px;">Notification Settings</h3>
                            <label style="display: flex; align-items: center; margin-bottom: 18px; cursor: pointer; font-size: 16px;">
                                <input type="checkbox" checked style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                                <span>Email Notifications</span>
                            </label>
                            <label style="display: flex; align-items: center; margin-bottom: 18px; cursor: pointer; font-size: 16px;">
                                <input type="checkbox" checked style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                                <span>SMS Alerts</span>
                            </label>
                            <label style="display: flex; align-items: center; margin-bottom: 18px; cursor: pointer; font-size: 16px;">
                                <input type="checkbox" checked style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                                <span>In-App Notifications</span>
                            </label>
                            <label style="display: flex; align-items: center; margin-bottom: 30px; cursor: pointer; font-size: 16px;">
                                <input type="checkbox" style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                                <span>Push Notifications</span>
                            </label>
                        </div>
                        
                        <div style="background: white; border-radius: 12px; padding: 40px;">
                            <h3 style="margin-top: 0; color: #302780; font-size: 20px; margin-bottom: 25px;">Display & Theme</h3>
                            <div style="margin-bottom: 25px;">
                                <p style="color: #666; font-size: 14px; font-weight: 600; margin-bottom: 12px; text-transform: uppercase;">Theme</p>
                                <label style="display: flex; align-items: center; margin-bottom: 12px; cursor: pointer; font-size: 16px;">
                                    <input type="radio" name="theme" checked style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                                    <span>Light Mode</span>
                                </label>
                                <label style="display: flex; align-items: center; cursor: pointer; font-size: 16px;">
                                    <input type="radio" name="theme" style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                                    <span>Dark Mode</span>
                                </label>
                            </div>
                            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 25px 0;">
                            <div>
                                <p style="color: #666; font-size: 14px; font-weight: 600; margin-bottom: 12px; text-transform: uppercase;">Language</p>
                                <select style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                                    <option>English (US)</option>
                                    <option>Urdu</option>
                                    <option>Spanish</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button style="width: 100%; padding: 14px; background: #302780; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 30px; font-size: 16px;" onclick="alert('Settings saved successfully!')">Save Settings</button>
                </div>
            `;
            break;
            
        case 'help':
            currentView = 'help';
            const headerHelp = document.querySelector('.section-header-dash');
            headerHelp.innerHTML = `
                <div>
                    <button class="back-btn" onclick="loadDashboardModules()">
                        <span class="material-icons">arrow_back</span>
                    </button>
                    <span class="material-icons section-icon" style="color: #302780;">help</span>
                    <div>
                        <h2>Help & Support</h2>
                        <p class="module-subtitle">Get help with using XAI EDUTHON</p>
                    </div>
                </div>
            `;
            
            const containerHelp = document.getElementById('dashboardModules');
            containerHelp.innerHTML = `
                <div class="help-container" style="padding: 40px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
                        <div style="background: white; border-radius: 12px; padding: 40px;">
                            <h3 style="margin-top: 0; color: #302780; font-size: 20px; margin-bottom: 25px;">Frequently Asked Questions</h3>
                            <div style="margin-bottom: 25px;">
                                <h4 style="color: #302780; margin-bottom: 8px; font-size: 16px;">How do I reset my password?</h4>
                                <p style="color: #666; margin: 0; line-height: 1.6;">Visit the login page and click 'Forgot Password'. You'll receive a reset link via email within 5 minutes.</p>
                            </div>
                            <div style="margin-bottom: 25px;">
                                <h4 style="color: #302780; margin-bottom: 8px; font-size: 16px;">How do I download my transcript?</h4>
                                <p style="color: #666; margin: 0; line-height: 1.6;">Go to Student Management → Result & Transcript. Click on 'Download Official Transcript'.</p>
                            </div>
                            <div style="margin-bottom: 25px;">
                                <h4 style="color: #302780; margin-bottom: 8px; font-size: 16px;">How can I update my profile?</h4>
                                <p style="color: #666; margin: 0; line-height: 1.6;">Click on your Profile from the sidebar menu. Edit your information and click Save.</p>
                            </div>
                            <div style="margin-bottom: 25px;">
                                <h4 style="color: #302780; margin-bottom: 8px; font-size: 16px;">Where is my data stored?</h4>
                                <p style="color: #666; margin: 0; line-height: 1.6;">Your data is encrypted and stored securely on our servers in compliance with university policies.</p>
                            </div>
                            <div>
                                <h4 style="color: #302780; margin-bottom: 8px; font-size: 16px;">Is my payment information secure?</h4>
                                <p style="color: #666; margin: 0; line-height: 1.6;">Yes, all transactions are encrypted using bank-level security protocols.</p>
                            </div>
                        </div>
                        
                        <div style="background: white; border-radius: 12px; padding: 40px;">
                            <h3 style="margin-top: 0; color: #302780; font-size: 20px; margin-bottom: 25px;">Contact Support</h3>
                            <div style="background: #f0f4ff; border-left: 4px solid #302780; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                                <p style="color: #666; margin: 8px 0; font-size: 15px;"><strong style="color: #302780;">Email:</strong> support@university.edu</p>
                                <p style="color: #666; margin: 8px 0; font-size: 15px;"><strong style="color: #302780;">Phone:</strong> +92-300-1234567</p>
                                <p style="color: #666; margin: 8px 0; font-size: 15px;"><strong style="color: #302780;">Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
                            </div>
                            <h4 style="color: #302780; margin-bottom: 15px; font-size: 16px;">Response Times</h4>
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                                <p style="color: #666; margin: 8px 0; font-size: 14px;">• <strong>Email:</strong> 24 hours response time</p>
                                <p style="color: #666; margin: 8px 0; font-size: 14px;">• <strong>Chat:</strong> 2 hours response time</p>
                                <p style="color: #666; margin: 8px 0; font-size: 14px;">• <strong>Phone:</strong> Immediate (during business hours)</p>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                <button style="padding: 12px; background: #302780; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 15px;" onclick="alert('Opening chat with support agent...')">Chat Now</button>
                                <button style="padding: 12px; background: white; color: #302780; border: 2px solid #302780; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 15px;" onclick="window.location.href='mailto:support@university.edu'">Send Email</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
}
