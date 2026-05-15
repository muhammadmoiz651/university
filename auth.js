// Authentication Script
document.addEventListener('DOMContentLoaded', function() {
    // Password Toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = 'visibility';
            } else {
                input.type = 'password';
                this.textContent = 'visibility_off';
            }
        });
    });
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate login
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        });
    }
    
    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Simulate signup
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        });
    }
});
