// AI Quiz Generator with Groq API Integration
const GROQ_API_KEY = 'gsk_LFp1BhkjxfmLeL6Ded32WGdyb3FYNDtSmvlzj004uyvftj6KMZNYYE';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

class AIQuizGenerator {
    constructor() {
        this.isOpen = false;
        this.quizConfig = {
            subject: '',
            numQuestions: 5,
            difficulty: 'medium'
        };
        this.init();
    }

    init() {
        this.createQuizUI();
        this.attachEventListeners();
    }

    createQuizUI() {
        const quizHTML = `
            <!-- AI Quiz Generator Floating Button -->
            <div class="ai-quiz-container">
                <button class="ai-quiz-toggle" id="aiQuizToggle">
                    <span class="material-icons">psychology</span>
                    <span class="quiz-badge">AI</span>
                </button>

                <!-- Quiz Generator Window -->
                <div class="ai-quiz-window" id="aiQuizWindow">
                    <div class="quiz-header">
                        <div class="quiz-header-left">
                            <button class="quiz-back" id="quizBack">
                                <span class="material-icons">arrow_back</span>
                            </button>
                            <div class="quiz-info">
                                <h3>AI Quiz Generator</h3>
                                <p>Powered by Gemini AI</p>
                            </div>
                        </div>
                        <button class="quiz-ai-badge">
                            <span class="material-icons">auto_awesome</span>
                            AI
                        </button>
                    </div>

                    <div class="quiz-content" id="quizContent">
                        <!-- Generate Quiz Card -->
                        <div class="generate-quiz-card">
                            <h2>Generate AI Quiz</h2>
                            <p>Configure your quiz and let Gemini AI generate intelligent questions instantly.</p>
                            <div class="quiz-features">
                                <span class="feature-badge">
                                    <span class="material-icons">check_circle</span>
                                    MCQs
                                </span>
                                <span class="feature-badge">
                                    <span class="material-icons">auto_awesome</span>
                                    AI Generated
                                </span>
                                <span class="feature-badge">
                                    <span class="material-icons">bolt</span>
                                    Instant
                                </span>
                            </div>
                        </div>

                        <!-- Choose Subject -->
                        <div class="quiz-section">
                            <div class="section-header">
                                <span class="material-icons">book</span>
                                <h4>Choose Subject</h4>
                            </div>
                            <div class="subject-grid">
                                <button class="subject-btn" data-subject="Artificial Intelligence">Artificial Intelligence</button>
                                <button class="subject-btn" data-subject="Data Structures">Data Structures</button>
                                <button class="subject-btn" data-subject="Computer Networks">Computer Networks</button>
                                <button class="subject-btn" data-subject="Database Systems">Database Systems</button>
                                <button class="subject-btn" data-subject="Operating Systems">Operating Systems</button>
                                <button class="subject-btn" data-subject="Software Engineering">Software Engineering</button>
                                <button class="subject-btn" data-subject="Mathematics">Mathematics</button>
                                <button class="subject-btn" data-subject="Physics">Physics</button>
                                <button class="subject-btn" data-subject="Chemistry">Chemistry</button>
                                <button class="subject-btn" data-subject="Biology">Biology</button>
                                <button class="subject-btn" data-subject="Economics">Economics</button>
                                <button class="subject-btn" data-subject="Business Management">Business Management</button>
                            </div>
                        </div>

                        <!-- Number of Questions -->
                        <div class="quiz-section">
                            <div class="section-header">
                                <span class="material-icons">format_list_numbered</span>
                                <h4>Number of Questions</h4>
                            </div>
                            <div class="questions-grid">
                                <button class="question-btn active" data-num="5">
                                    <span class="num">5</span>
                                    <span class="label">Qs</span>
                                </button>
                                <button class="question-btn" data-num="10">
                                    <span class="num">10</span>
                                    <span class="label">Qs</span>
                                </button>
                                <button class="question-btn" data-num="15">
                                    <span class="num">15</span>
                                    <span class="label">Qs</span>
                                </button>
                                <button class="question-btn" data-num="20">
                                    <span class="num">20</span>
                                    <span class="label">Qs</span>
                                </button>
                            </div>
                        </div>

                        <!-- Difficulty Level -->
                        <div class="quiz-section">
                            <div class="section-header">
                                <span class="material-icons">speed</span>
                                <h4>Difficulty Level</h4>
                            </div>
                            <div class="difficulty-grid">
                                <button class="difficulty-btn" data-difficulty="easy">
                                    <span class="material-icons">sentiment_satisfied</span>
                                    <span>Easy</span>
                                </button>
                                <button class="difficulty-btn active" data-difficulty="medium">
                                    <span class="material-icons">sentiment_neutral</span>
                                    <span>Medium</span>
                                </button>
                                <button class="difficulty-btn" data-difficulty="hard">
                                    <span class="material-icons">sentiment_very_dissatisfied</span>
                                    <span>Hard</span>
                                </button>
                            </div>
                        </div>

                        <!-- Generate Button -->
                        <button class="generate-btn" id="generateQuizBtn">
                            <span class="material-icons">auto_awesome</span>
                            <span>Generate & Start Quiz</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', quizHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('aiQuizToggle');
        const backBtn = document.getElementById('quizBack');
        const generateBtn = document.getElementById('generateQuizBtn');
        const subjectBtns = document.querySelectorAll('.subject-btn');
        const questionBtns = document.querySelectorAll('.question-btn');
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');

        // Toggle button - only attach once
        if (toggleBtn && !toggleBtn.hasAttribute('data-listener')) {
            toggleBtn.addEventListener('click', () => this.toggleQuiz());
            toggleBtn.setAttribute('data-listener', 'true');
        }
        
        // Back button - close quiz window
        if (backBtn && !backBtn.hasAttribute('data-listener')) {
            backBtn.addEventListener('click', () => {
                const quizWindow = document.getElementById('aiQuizWindow');
                quizWindow.classList.remove('fullscreen');
                this.toggleQuiz(); // Close the quiz window
            });
            backBtn.setAttribute('data-listener', 'true');
        }
        
        // Generate button
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateQuiz());
        }

        // Subject selection
        subjectBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                subjectBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.quizConfig.subject = btn.getAttribute('data-subject');
            });
        });

        // Number of questions
        questionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                questionBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.quizConfig.numQuestions = parseInt(btn.getAttribute('data-num'));
            });
        });

        // Difficulty level
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                difficultyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.quizConfig.difficulty = btn.getAttribute('data-difficulty');
            });
        });
    }

    toggleQuiz() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('aiQuizWindow');
        const toggle = document.getElementById('aiQuizToggle');
        
        if (this.isOpen) {
            window.classList.add('active');
            toggle.classList.add('active');
        } else {
            window.classList.remove('active');
            toggle.classList.remove('active');
        }
    }

    showInitialScreen() {
        // Reset quiz config
        this.quizConfig = {
            subject: '',
            numQuestions: 5,
            difficulty: 'medium'
        };
        
        const quizContent = document.getElementById('quizContent');
        quizContent.innerHTML = `
            <!-- Generate Quiz Card -->
            <div class="generate-quiz-card">
                <h2>Generate AI Quiz</h2>
                <p>Configure your quiz and let Gemini AI generate intelligent questions instantly.</p>
                <div class="quiz-features">
                    <span class="feature-badge">
                        <span class="material-icons">check_circle</span>
                        MCQs
                    </span>
                    <span class="feature-badge">
                        <span class="material-icons">auto_awesome</span>
                        AI Generated
                    </span>
                    <span class="feature-badge">
                        <span class="material-icons">bolt</span>
                        Instant
                    </span>
                </div>
            </div>

            <!-- Choose Subject -->
            <div class="quiz-section">
                <div class="section-header">
                    <span class="material-icons">book</span>
                    <h4>Choose Subject</h4>
                </div>
                <div class="subject-grid">
                    <button class="subject-btn" data-subject="Artificial Intelligence">Artificial Intelligence</button>
                    <button class="subject-btn" data-subject="Data Structures">Data Structures</button>
                    <button class="subject-btn" data-subject="Computer Networks">Computer Networks</button>
                    <button class="subject-btn" data-subject="Database Systems">Database Systems</button>
                    <button class="subject-btn" data-subject="Operating Systems">Operating Systems</button>
                    <button class="subject-btn" data-subject="Software Engineering">Software Engineering</button>
                    <button class="subject-btn" data-subject="Mathematics">Mathematics</button>
                    <button class="subject-btn" data-subject="Physics">Physics</button>
                    <button class="subject-btn" data-subject="Chemistry">Chemistry</button>
                    <button class="subject-btn" data-subject="Biology">Biology</button>
                    <button class="subject-btn" data-subject="Economics">Economics</button>
                    <button class="subject-btn" data-subject="Business Management">Business Management</button>
                </div>
            </div>

            <!-- Number of Questions -->
            <div class="quiz-section">
                <div class="section-header">
                    <span class="material-icons">format_list_numbered</span>
                    <h4>Number of Questions</h4>
                </div>
                <div class="questions-grid">
                    <button class="question-btn active" data-num="5">
                        <span class="num">5</span>
                        <span class="label">Qs</span>
                    </button>
                    <button class="question-btn" data-num="10">
                        <span class="num">10</span>
                        <span class="label">Qs</span>
                    </button>
                    <button class="question-btn" data-num="15">
                        <span class="num">15</span>
                        <span class="label">Qs</span>
                    </button>
                    <button class="question-btn" data-num="20">
                        <span class="num">20</span>
                        <span class="label">Qs</span>
                    </button>
                </div>
            </div>

            <!-- Difficulty Level -->
            <div class="quiz-section">
                <div class="section-header">
                    <span class="material-icons">speed</span>
                    <h4>Difficulty Level</h4>
                </div>
                <div class="difficulty-grid">
                    <button class="difficulty-btn" data-difficulty="easy">
                        <span class="material-icons">sentiment_satisfied</span>
                        <span>Easy</span>
                    </button>
                    <button class="difficulty-btn active" data-difficulty="medium">
                        <span class="material-icons">sentiment_neutral</span>
                        <span>Medium</span>
                    </button>
                    <button class="difficulty-btn" data-difficulty="hard">
                        <span class="material-icons">sentiment_very_dissatisfied</span>
                        <span>Hard</span>
                    </button>
                </div>
            </div>

            <!-- Generate Button -->
            <button class="generate-btn" id="generateQuizBtn">
                <span class="material-icons">auto_awesome</span>
                <span>Generate & Start Quiz</span>
            </button>
        `;
        
        // Re-attach event listeners for the new elements
        this.attachConfigEventListeners();
    }
    
    attachConfigEventListeners() {
        const generateBtn = document.getElementById('generateQuizBtn');
        const subjectBtns = document.querySelectorAll('.subject-btn');
        const questionBtns = document.querySelectorAll('.question-btn');
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');

        // Generate button
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateQuiz());
        }

        // Subject selection
        subjectBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                subjectBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.quizConfig.subject = btn.getAttribute('data-subject');
                console.log('Subject selected:', this.quizConfig.subject);
            });
        });

        // Number of questions
        questionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                questionBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.quizConfig.numQuestions = parseInt(btn.getAttribute('data-num'));
                console.log('Number of questions:', this.quizConfig.numQuestions);
            });
        });

        // Difficulty level
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                difficultyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.quizConfig.difficulty = btn.getAttribute('data-difficulty');
                console.log('Difficulty:', this.quizConfig.difficulty);
            });
        });
    }

    async generateQuiz() {
        if (!this.quizConfig.subject) {
            alert('Please select a subject first!');
            return;
        }

        const generateBtn = document.getElementById('generateQuizBtn');
        const originalHTML = generateBtn.innerHTML;
        
        // Show loading state
        generateBtn.disabled = true;
        generateBtn.innerHTML = `
            <span class="material-icons rotating">sync</span>
            <span>Generating Quiz...</span>
        `;

        try {
            const quizText = await this.callGroqAPI();
            console.log('Generated Quiz:', quizText);
            
            // Parse quiz questions
            const questions = this.parseQuizQuestions(quizText);
            
            // Show quiz screen
            this.showQuizScreen(questions);
            
        } catch (error) {
            console.error('Quiz Generation Error:', error);
            generateBtn.innerHTML = `
                <span class="material-icons">error</span>
                <span>Error! Try Again</span>
            `;
            
            setTimeout(() => {
                generateBtn.disabled = false;
                generateBtn.innerHTML = originalHTML;
            }, 2000);
        }
    }

    parseQuizQuestions(quizText) {
        const questions = [];
        const questionBlocks = quizText.split(/Q:|Question \d+:/i).filter(q => q.trim());
        
        questionBlocks.forEach((block, index) => {
            const lines = block.trim().split('\n').filter(l => l.trim());
            if (lines.length < 5) return;
            
            const question = lines[0].trim();
            const options = [];
            let correctAnswer = '';
            
            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed.match(/^[A-D]\)/)) {
                    options.push(trimmed);
                } else if (trimmed.toLowerCase().includes('correct:')) {
                    correctAnswer = trimmed.split(':')[1].trim().toUpperCase();
                }
            });
            
            if (question && options.length === 4) {
                questions.push({
                    id: index + 1,
                    question,
                    options,
                    correctAnswer: correctAnswer || 'A'
                });
            }
        });
        
        return questions.slice(0, this.quizConfig.numQuestions);
    }

    showQuizScreen(questions) {
        this.currentQuestions = questions;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        
        // Enable fullscreen mode
        const quizWindow = document.getElementById('aiQuizWindow');
        quizWindow.classList.add('fullscreen');
        
        const quizContent = document.getElementById('quizContent');
        quizContent.innerHTML = `
            <!-- Quiz Progress -->
            <div class="quiz-progress-bar">
                <div class="progress-fill" id="progressFill" style="width: 0%"></div>
            </div>
            <div class="quiz-progress-text">
                <span>Question <span id="currentQ">1</span> of ${questions.length}</span>
                <span id="quizTimer">00:00</span>
            </div>

            <!-- Question Card -->
            <div class="question-card" id="questionCard">
                <!-- Will be populated by showQuestion() -->
            </div>

            <!-- Navigation Buttons -->
            <div class="quiz-navigation">
                <button class="quiz-nav-btn secondary" id="prevBtn" disabled>
                    <span class="material-icons">arrow_back</span>
                    Previous
                </button>
                <button class="quiz-nav-btn primary" id="nextBtn">
                    Next
                    <span class="material-icons">arrow_forward</span>
                </button>
            </div>
        `;
        
        this.showQuestion();
        this.startTimer();
        this.attachQuizEventListeners();
    }

    showQuestion() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        const questionCard = document.getElementById('questionCard');
        
        questionCard.innerHTML = `
            <div class="question-header">
                <span class="question-number">Question ${question.id}</span>
                <span class="question-badge">${this.quizConfig.difficulty}</span>
            </div>
            <h3 class="question-text">${question.question}</h3>
            <div class="options-grid">
                ${question.options.map((option, index) => `
                    <button class="option-btn" data-option="${String.fromCharCode(65 + index)}">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option.substring(3)}</span>
                        <span class="option-check material-icons">check_circle</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.currentQuestions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('currentQ').textContent = this.currentQuestionIndex + 1;
        
        // Restore previous answer if exists
        if (this.userAnswers[this.currentQuestionIndex]) {
            const selectedOption = this.userAnswers[this.currentQuestionIndex];
            const optionBtn = questionCard.querySelector(`[data-option="${selectedOption}"]`);
            if (optionBtn) optionBtn.classList.add('selected');
        }
        
        // Update navigation buttons
        document.getElementById('prevBtn').disabled = this.currentQuestionIndex === 0;
        const nextBtn = document.getElementById('nextBtn');
        if (this.currentQuestionIndex === this.currentQuestions.length - 1) {
            nextBtn.innerHTML = `
                <span class="material-icons">check_circle</span>
                Submit Quiz
            `;
            nextBtn.classList.add('submit');
        } else {
            nextBtn.innerHTML = `
                Next
                <span class="material-icons">arrow_forward</span>
            `;
            nextBtn.classList.remove('submit');
        }
    }

    attachQuizEventListeners() {
        const questionCard = document.getElementById('questionCard');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Option selection
        questionCard.addEventListener('click', (e) => {
            const optionBtn = e.target.closest('.option-btn');
            if (!optionBtn) return;
            
            // Remove previous selection
            questionCard.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add new selection
            optionBtn.classList.add('selected');
            this.userAnswers[this.currentQuestionIndex] = optionBtn.getAttribute('data-option');
        });
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                this.showQuestion();
            }
        });
        
        // Next/Submit button
        nextBtn.addEventListener('click', () => {
            if (!this.userAnswers[this.currentQuestionIndex]) {
                alert('Please select an answer before proceeding!');
                return;
            }
            
            if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
                this.currentQuestionIndex++;
                this.showQuestion();
            } else {
                this.submitQuiz();
            }
        });
    }

    startTimer() {
        this.quizStartTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.quizStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            const timerEl = document.getElementById('quizTimer');
            if (timerEl) {
                timerEl.textContent = `${minutes}:${seconds}`;
            }
        }, 1000);
    }

    submitQuiz() {
        clearInterval(this.timerInterval);
        
        // Calculate score
        this.score = 0;
        this.currentQuestions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correctAnswer) {
                this.score++;
            }
        });
        
        this.showResults();
    }

    showResults() {
        const percentage = Math.round((this.score / this.currentQuestions.length) * 100);
        // Get timer value if it exists, otherwise use stored value
        const timerElement = document.getElementById('quizTimer');
        const timeTaken = timerElement ? timerElement.textContent : (this.timeTaken || '00:00');
        
        // Store time taken for future reference
        if (timerElement) {
            this.timeTaken = timerElement.textContent;
        }
        
        const quizContent = document.getElementById('quizContent');
        quizContent.innerHTML = `
            <div class="results-container">
                <div class="results-icon">
                    <span class="material-icons">${percentage >= 70 ? 'emoji_events' : percentage >= 50 ? 'sentiment_satisfied' : 'sentiment_dissatisfied'}</span>
                </div>
                <h2 class="results-title">${percentage >= 70 ? 'Excellent!' : percentage >= 50 ? 'Good Job!' : 'Keep Practicing!'}</h2>
                <p class="results-subtitle">You've completed the quiz</p>
                
                <div class="results-stats">
                    <div class="result-stat">
                        <span class="stat-value">${this.score}/${this.currentQuestions.length}</span>
                        <span class="stat-label">Correct Answers</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-value">${percentage}%</span>
                        <span class="stat-label">Score</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-value">${timeTaken}</span>
                        <span class="stat-label">Time Taken</span>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="results-btn primary" id="reviewBtn">
                        <span class="material-icons">visibility</span>
                        Review Answers
                    </button>
                    <button class="results-btn secondary" id="retakeBtn">
                        <span class="material-icons">refresh</span>
                        Take New Quiz
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('reviewBtn').addEventListener('click', () => this.showReview());
        document.getElementById('retakeBtn').addEventListener('click', () => this.resetQuiz());
    }

    showReview() {
        const quizContent = document.getElementById('quizContent');
        quizContent.innerHTML = `
            <div class="review-container">
                <div class="review-header">
                    <button class="quiz-back" id="backToResults">
                        <span class="material-icons">arrow_back</span>
                    </button>
                    <h3>Review Answers</h3>
                </div>
                <div class="review-questions">
                    ${this.currentQuestions.map((question, index) => {
                        const userAnswer = this.userAnswers[index];
                        const isCorrect = userAnswer === question.correctAnswer;
                        return `
                            <div class="review-question ${isCorrect ? 'correct' : 'incorrect'}">
                                <div class="review-question-header">
                                    <span class="review-number">Question ${index + 1}</span>
                                    <span class="review-status material-icons">${isCorrect ? 'check_circle' : 'cancel'}</span>
                                </div>
                                <p class="review-question-text">${question.question}</p>
                                <div class="review-options">
                                    ${question.options.map((option, optIndex) => {
                                        const optionLetter = String.fromCharCode(65 + optIndex);
                                        const isUserAnswer = optionLetter === userAnswer;
                                        const isCorrectAnswer = optionLetter === question.correctAnswer;
                                        return `
                                            <div class="review-option ${isCorrectAnswer ? 'correct-answer' : ''} ${isUserAnswer && !isCorrect ? 'wrong-answer' : ''}">
                                                <span class="option-letter">${optionLetter}</span>
                                                <span>${option.substring(3)}</span>
                                                ${isCorrectAnswer ? '<span class="material-icons">check</span>' : ''}
                                                ${isUserAnswer && !isCorrect ? '<span class="material-icons">close</span>' : ''}
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            const backToResultsBtn = document.getElementById('backToResults');
            if (backToResultsBtn) {
                backToResultsBtn.addEventListener('click', () => {
                    console.log('Back to results clicked');
                    this.showResults();
                });
            } else {
                console.error('backToResults button not found');
            }
        }, 0);
    }

    resetQuiz() {
        const quizWindow = document.getElementById('aiQuizWindow');
        quizWindow.classList.remove('fullscreen');
        const quizContent = document.getElementById('quizContent');
        quizContent.innerHTML = ''; // Clear content
        this.showInitialScreen(); // Show initial config screen
    }

    async callGroqAPI() {
        const prompt = `Generate ${this.quizConfig.numQuestions} multiple choice questions about ${this.quizConfig.subject} at ${this.quizConfig.difficulty} difficulty level. 
        
        Format each question as:
        Q: [Question]
        A) [Option A]
        B) [Option B]
        C) [Option C]
        D) [Option D]
        Correct: [A/B/C/D]
        
        Make questions educational and relevant to university students.`;

        try {
            const response = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'mixtral-8x7b-32768',
                    messages: [
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 2000
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error Details:', errorData);
                
                // If 401, API key is invalid - use demo mode
                if (response.status === 401) {
                    console.warn('API Key invalid or expired. Using demo mode.');
                    return this.generateDemoQuiz();
                }
                
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Groq API Error:', error);
            // Fallback to demo mode
            return this.generateDemoQuiz();
        }
    }

    generateDemoQuiz() {
        // Demo quiz for when API is not available
        const demoQuizzes = {
            'Artificial Intelligence': `Q: What is the primary goal of Artificial Intelligence?
A) To replace human workers
B) To create systems that can perform tasks requiring human intelligence
C) To make computers faster
D) To reduce software costs
Correct: B

Q: Which of the following is a type of machine learning?
A) Supervised Learning
B) Random Learning
C) Fixed Learning
D) Static Learning
Correct: A

Q: What does NLP stand for in AI?
A) New Language Processing
B) Natural Language Processing
C) Neural Language Programming
D) Network Language Protocol
Correct: B

Q: Which algorithm is commonly used for classification tasks?
A) Linear Regression
B) Decision Trees
C) Bubble Sort
D) Quick Sort
Correct: B

Q: What is a neural network inspired by?
A) Computer circuits
B) Human brain
C) Mathematical equations
D) Database systems
Correct: B`,
            
            'Data Structures': `Q: What is the time complexity of binary search?
A) O(n)
B) O(log n)
C) O(n²)
D) O(1)
Correct: B

Q: Which data structure uses LIFO principle?
A) Queue
B) Stack
C) Array
D) Tree
Correct: B

Q: What is the worst-case time complexity of Quick Sort?
A) O(n log n)
B) O(n)
C) O(n²)
D) O(log n)
Correct: C

Q: Which data structure is best for implementing a priority queue?
A) Array
B) Linked List
C) Heap
D) Stack
Correct: C

Q: What is a complete binary tree?
A) A tree with all nodes having two children
B) A tree where all levels are filled except possibly the last
C) A tree with only one node
D) A tree with no children
Correct: B`
        };

        const subject = this.quizConfig.subject;
        const demoQuiz = demoQuizzes[subject] || demoQuizzes['Artificial Intelligence'];
        
        // Return only the requested number of questions
        const questions = demoQuiz.split('\n\n');
        return questions.slice(0, this.quizConfig.numQuestions).join('\n\n');
    }
}

// Initialize quiz generator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AIQuizGenerator();
});


class AIChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.attachEventListeners();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <!-- AI Chatbot Floating Button -->
            <div class="ai-chatbot-container">
                <button class="ai-chatbot-toggle" id="aiChatbotToggle">
                    <span class="material-icons">smart_toy</span>
                    <span class="chatbot-badge">AI</span>
                </button>

                <!-- Chatbot Window -->
                <div class="ai-chatbot-window" id="aiChatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-header-left">
                            <div class="chatbot-avatar">
                                <span class="material-icons">psychology</span>
                            </div>
                            <div class="chatbot-info">
                                <h3>XAI Assistant</h3>
                                <p class="chatbot-status">
                                    <span class="status-dot"></span>
                                    Powered by Grok AI
                                </p>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbotClose">
                            <span class="material-icons">close</span>
                        </button>
                    </div>

                    <div class="chatbot-messages" id="chatbotMessages">
                        <div class="chatbot-welcome">
                            <div class="welcome-icon">
                                <span class="material-icons">waving_hand</span>
                            </div>
                            <h4>Welcome to XAI EDUTHON!</h4>
                            <p>I'm your AI assistant powered by Grok. Ask me anything about:</p>
                            <div class="welcome-suggestions">
                                <button class="suggestion-btn" data-message="What modules are available?">
                                    <span class="material-icons">apps</span>
                                    Available Modules
                                </button>
                                <button class="suggestion-btn" data-message="Tell me about AI features">
                                    <span class="material-icons">psychology</span>
                                    AI Features
                                </button>
                                <button class="suggestion-btn" data-message="How do I register for courses?">
                                    <span class="material-icons">school</span>
                                    Course Registration
                                </button>
                                <button class="suggestion-btn" data-message="What are the QA standards?">
                                    <span class="material-icons">verified</span>
                                    QA Standards
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="chatbot-input-container">
                        <div class="chatbot-input-wrapper">
                            <input 
                                type="text" 
                                class="chatbot-input" 
                                id="chatbotInput" 
                                placeholder="Ask me anything..."
                                autocomplete="off"
                            />
                            <button class="chatbot-send" id="chatbotSend">
                                <span class="material-icons">send</span>
                            </button>
                        </div>
                        <div class="chatbot-footer-text">
                            <span class="material-icons">info</span>
                            AI can make mistakes. Verify important information.
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('aiChatbotToggle');
        const closeBtn = document.getElementById('chatbotClose');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');
        const suggestionBtns = document.querySelectorAll('.suggestion-btn');

        toggleBtn.addEventListener('click', () => this.toggleChatbot());
        closeBtn.addEventListener('click', () => this.toggleChatbot());
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                input.value = message;
                this.sendMessage();
            });
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('aiChatbotWindow');
        const toggle = document.getElementById('aiChatbotToggle');
        
        if (this.isOpen) {
            window.classList.add('active');
            toggle.classList.add('active');
        } else {
            window.classList.remove('active');
            toggle.classList.remove('active');
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to UI
        this.addMessageToUI(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Call Grok API
            const response = await this.callGrokAPI(message);
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Add AI response to UI
            this.addMessageToUI(response, 'ai');
        } catch (error) {
            console.error('Grok API Error:', error);
            this.removeTypingIndicator();
            this.addMessageToUI('Sorry, I encountered an error. Please try again.', 'ai');
        }
    }

    async callGrokAPI(userMessage) {
        const systemPrompt = `You are an AI assistant for XAI EDUTHON, a comprehensive university management system. 
        You help students, faculty, and staff with information about:
        - 12 core modules (Student, Faculty, Admin, HR, Finance, Library, Attendance, Placement, Research, Timetable, QA, Hostel)
        - AI-powered features (Predictive Analytics, Smart Recommendations, AI Chatbot, etc.)
        - QA Standards (NCAAA and ABET compliance)
        - Course registration, fee submission, attendance tracking
        - General university operations
        
        Be helpful, concise, and friendly. Provide accurate information about the platform.`;

        const response = await fetch(GROK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'grok-beta',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    addMessageToUI(message, type) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const welcomeMsg = messagesContainer.querySelector('.chatbot-welcome');
        
        // Remove welcome message on first user message
        if (welcomeMsg && type === 'user') {
            welcomeMsg.remove();
        }

        const messageHTML = `
            <div class="chatbot-message ${type}">
                ${type === 'ai' ? `
                    <div class="message-avatar">
                        <span class="material-icons">psychology</span>
                    </div>
                ` : ''}
                <div class="message-content">
                    <p>${this.formatMessage(message)}</p>
                    <span class="message-time">${this.getCurrentTime()}</span>
                </div>
                ${type === 'user' ? `
                    <div class="message-avatar user">
                        <span class="material-icons">person</span>
                    </div>
                ` : ''}
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingHTML = `
            <div class="chatbot-message ai typing-indicator" id="typingIndicator">
                <div class="message-avatar">
                    <span class="material-icons">psychology</span>
                </div>
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    formatMessage(message) {
        // Convert markdown-style formatting to HTML
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
}

// Initialize chatbot when DOM is ready (DISABLED - Only Quiz Generator is active)
// document.addEventListener('DOMContentLoaded', () => {
//     // Check if we're on index page (not dashboard)
//     if (!document.querySelector('.dashboard-body')) {
//         new AIChatbot();
//     }
// });
