// Data from Flutter App
const AppData = {
    mainModules: [
        {
            id: 'student',
            title: 'Student Management',
            icon: 'school',
            subtitle: 'Manage all student activities',
            subModulesCount: 20,
            aiFeaturesCount: 8,
            color: '#302780',
            subModules: [
                { name: 'Student Registration', icon: 'person_add' },
                { name: 'Student Profile', icon: 'badge' },
                { name: 'Academic Records', icon: 'school' },
                { name: 'Enrollment Management', icon: 'how_to_reg' },
                { name: 'Student Attendance', icon: 'event_available' },
                { name: 'Grade Management', icon: 'grade' },
                { name: 'Student Portal', icon: 'dashboard' },
                { name: 'Parent Portal', icon: 'family_restroom' },
                { name: 'Student Documents', icon: 'folder' },
                { name: 'Fee Management', icon: 'payments' },
                { name: 'Scholarship Management', icon: 'card_giftcard' },
                { name: 'Student Complaints', icon: 'report_problem' },
                { name: 'Student Feedback', icon: 'feedback' },
                { name: 'Alumni Management', icon: 'groups' },
                { name: 'Student Analytics', icon: 'analytics' },
                { name: 'Disciplinary Records', icon: 'gavel' },
                { name: 'Health Records', icon: 'local_hospital' },
                { name: 'Student ID Cards', icon: 'credit_card' },
                { name: 'Transfer Management', icon: 'swap_horiz' },
                { name: 'Student Reports', icon: 'summarize' }
            ]
        },
        {
            id: 'faculty',
            title: 'Faculty Management',
            icon: 'person_pin',
            subtitle: 'Tools for teaching staff',
            subModulesCount: 14,
            aiFeaturesCount: 5,
            color: '#018137',
            subModules: [
                { name: 'Faculty Profile', icon: 'account_circle' },
                { name: 'Course Assignment', icon: 'assignment' },
                { name: 'Class Schedule', icon: 'schedule' },
                { name: 'Attendance Tracking', icon: 'fact_check' },
                { name: 'Grade Entry', icon: 'edit_note' },
                { name: 'Faculty Portal', icon: 'dashboard' },
                { name: 'Teaching Load', icon: 'work' },
                { name: 'Faculty Documents', icon: 'description' },
                { name: 'Performance Review', icon: 'rate_review' },
                { name: 'Faculty Training', icon: 'school' },
                { name: 'Leave Management', icon: 'event_busy' },
                { name: 'Faculty Analytics', icon: 'insights' },
                { name: 'Research Publications', icon: 'article' },
                { name: 'Faculty Reports', icon: 'assessment' }
            ]
        },
        {
            id: 'admin',
            title: 'Admin Management',
            icon: 'admin_panel_settings',
            subtitle: 'University administration hub',
            subModulesCount: 12,
            aiFeaturesCount: 4,
            color: '#1E5A7D',
            subModules: [
                { name: 'User Management', icon: 'manage_accounts' },
                { name: 'Role Management', icon: 'security' },
                { name: 'System Settings', icon: 'settings' },
                { name: 'Department Management', icon: 'corporate_fare' },
                { name: 'Program Management', icon: 'category' },
                { name: 'Academic Calendar', icon: 'calendar_month' },
                { name: 'Notifications', icon: 'notifications' },
                { name: 'Announcements', icon: 'campaign' },
                { name: 'Backup & Restore', icon: 'backup' },
                { name: 'Audit Logs', icon: 'history' },
                { name: 'System Reports', icon: 'bar_chart' },
                { name: 'Data Import/Export', icon: 'import_export' }
            ]
        },
        {
            id: 'hr',
            title: 'HR & Staff Management',
            icon: 'groups',
            subtitle: 'Human resource operations',
            subModulesCount: 8,
            aiFeaturesCount: 3,
            color: '#6B2D5C',
            subModules: [
                { name: 'Employee Records', icon: 'badge' },
                { name: 'Recruitment', icon: 'person_search' },
                { name: 'Payroll Management', icon: 'payments' },
                { name: 'Leave Management', icon: 'event_busy' },
                { name: 'Performance Appraisal', icon: 'star_rate' },
                { name: 'Training & Development', icon: 'model_training' },
                { name: 'Staff Attendance', icon: 'how_to_reg' },
                { name: 'HR Reports', icon: 'summarize' }
            ]
        },
        {
            id: 'finance',
            title: 'Finance Management',
            icon: 'account_balance_wallet',
            subtitle: 'Financial operations & reports',
            subModulesCount: 7,
            aiFeaturesCount: 2,
            color: '#1A5F7A',
            subModules: [
                { name: 'Fee Collection', icon: 'payment' },
                { name: 'Expense Management', icon: 'receipt_long' },
                { name: 'Budget Planning', icon: 'account_balance' },
                { name: 'Financial Reports', icon: 'assessment' },
                { name: 'Invoice Management', icon: 'receipt' },
                { name: 'Vendor Management', icon: 'store' },
                { name: 'Audit Trail', icon: 'verified' }
            ]
        },
        {
            id: 'library',
            title: 'Library Management',
            icon: 'local_library',
            subtitle: 'Smart library operations',
            subModulesCount: 7,
            aiFeaturesCount: 2,
            color: '#8B1A1A',
            subModules: [
                { name: 'Book Catalog', icon: 'menu_book' },
                { name: 'Issue & Return', icon: 'sync_alt' },
                { name: 'Member Management', icon: 'card_membership' },
                { name: 'Digital Library', icon: 'cloud' },
                { name: 'Fine Management', icon: 'money' },
                { name: 'Library Reports', icon: 'summarize' },
                { name: 'Book Reservation', icon: 'bookmark' }
            ]
        },
        {
            id: 'attendance',
            title: 'Attendance Module',
            icon: 'how_to_reg',
            subtitle: 'Track & manage attendance',
            subModulesCount: 6,
            aiFeaturesCount: 3,
            color: '#0F6B3E',
            subModules: [
                { name: 'Mark Attendance', icon: 'check_circle' },
                { name: 'Attendance Reports', icon: 'assessment' },
                { name: 'Leave Requests', icon: 'event_busy' },
                { name: 'Biometric Integration', icon: 'fingerprint' },
                { name: 'Attendance Analytics', icon: 'insights' },
                { name: 'Attendance Alerts', icon: 'notifications_active' }
            ]
        },
        {
            id: 'placement',
            title: 'Placement & Career',
            icon: 'work_outline',
            subtitle: 'Career readiness & placements',
            subModulesCount: 6,
            aiFeaturesCount: 3,
            color: '#5B2C6F',
            subModules: [
                { name: 'Job Postings', icon: 'work' },
                { name: 'Company Management', icon: 'business' },
                { name: 'Student Resume', icon: 'description' },
                { name: 'Interview Scheduling', icon: 'event' },
                { name: 'Placement Reports', icon: 'bar_chart' },
                { name: 'Career Counseling', icon: 'support_agent' }
            ]
        },
        {
            id: 'research',
            title: 'Research Management',
            icon: 'biotech',
            subtitle: 'Research projects & publications',
            subModulesCount: 6,
            aiFeaturesCount: 2,
            color: '#0F5B78',
            subModules: [
                { name: 'Research Projects', icon: 'science' },
                { name: 'Publications', icon: 'article' },
                { name: 'Grants Management', icon: 'monetization_on' },
                { name: 'Research Collaboration', icon: 'group_work' },
                { name: 'Patent Management', icon: 'verified_user' },
                { name: 'Research Reports', icon: 'summarize' }
            ]
        },
        {
            id: 'timetable',
            title: 'Timetable & Scheduling',
            icon: 'table_view',
            subtitle: 'Smart scheduling system',
            subModulesCount: 6,
            aiFeaturesCount: 2,
            color: '#6B4423',
            subModules: [
                { name: 'Class Timetable', icon: 'schedule' },
                { name: 'Exam Timetable', icon: 'event_note' },
                { name: 'Room Allocation', icon: 'meeting_room' },
                { name: 'Faculty Schedule', icon: 'person_pin_circle' },
                { name: 'Timetable Conflicts', icon: 'warning' },
                { name: 'Schedule Reports', icon: 'calendar_today' }
            ]
        },
        {
            id: 'qa',
            title: 'Quality Assurance',
            icon: 'verified',
            subtitle: 'Accreditation & quality control',
            subModulesCount: 6,
            aiFeaturesCount: 2,
            color: '#1A5F7A',
            subModules: [
                { name: 'NCAAA Compliance', icon: 'task_alt' },
                { name: 'ABET Compliance', icon: 'verified' },
                { name: 'Course Reports', icon: 'description' },
                { name: 'Program Reports', icon: 'folder_open' },
                { name: 'KPI Tracking', icon: 'trending_up' },
                { name: 'QA Reports', icon: 'assessment' }
            ]
        },
        {
            id: 'hostel',
            title: 'Hostel Management',
            icon: 'hotel',
            subtitle: 'Residential & hostel services',
            subModulesCount: 6,
            aiFeaturesCount: 2,
            color: '#6B1A5E',
            subModules: [
                { name: 'Room Allocation', icon: 'bed' },
                { name: 'Hostel Fees', icon: 'payment' },
                { name: 'Visitor Management', icon: 'people' },
                { name: 'Mess Management', icon: 'restaurant' },
                { name: 'Maintenance Requests', icon: 'build' },
                { name: 'Hostel Reports', icon: 'summarize' }
            ]
        }
    ],

    homeAIFeatures: [
        { title: 'Predictive Analytics', icon: 'insights', description: 'Forecast university trends' },
        { title: 'AI Chatbot Assistant', icon: 'smart_toy', description: 'Help in every module' },
        { title: 'AI-Generated Reports', icon: 'summarize', description: 'Instant intelligent reports' },
        { title: 'Smart Notifications', icon: 'notifications_active', description: 'Context-aware alerts' },
        { title: 'AI Recommendation', icon: 'recommend', description: 'Personalized suggestions' },
        { title: 'Natural Language Search', icon: 'manage_search', description: 'Search in plain English' },
        { title: 'AI Risk Detection', icon: 'gpp_bad', description: 'Proactive risk alerts' },
        { title: 'Performance Analysis', icon: 'bar_chart', description: 'Deep performance insights' },
        { title: 'Voice Assistant', icon: 'mic', description: 'Hands-free university control' },
        { title: 'Student Success Predictor', icon: 'emoji_events', description: 'Predict student outcomes' },
        { title: 'AI Timetable Generator', icon: 'auto_fix_high', description: 'Optimal schedule creation' },
        { title: 'Exam Monitoring AI', icon: 'visibility', description: 'Smart invigilation system' },
        { title: 'AI Attendance Prediction', icon: 'how_to_reg', description: 'Forecast attendance patterns' },
        { title: 'AI Auto Grading', icon: 'grading', description: 'Intelligent assessment grading' },
        { title: 'AI Resume Analyzer', icon: 'find_in_page', description: 'Smart CV evaluation tool' },
        { title: 'AI Career Guidance', icon: 'explore', description: 'AI-powered career coaching' },
        { title: 'AI Research Summarizer', icon: 'auto_stories', description: 'Instant paper summaries' },
        { title: 'AI Fraud Detection', icon: 'shield', description: 'Real-time fraud prevention' },
        { title: 'AI Smart Complaint', icon: 'report_problem', description: 'Intelligent ticket routing' },
        { title: 'Face Recognition', icon: 'face', description: 'Biometric identification' },
        { title: 'AI Learning Paths', icon: 'schema', description: 'Personalized study journeys' },
        { title: 'AI Virtual Advisor', icon: 'support_agent', description: 'Your digital academic guide' },
        { title: 'AI Performance Heatmaps', icon: 'grid_view', description: 'Visual performance analytics' },
        { title: 'AI Campus Insights', icon: 'location_city', description: 'Smart campus intelligence' }
    ],

    qaStandards: [
        {
            name: 'NCAAA',
            logo: 'ncaaa.png',
            color: '#1A3A6B',
            items: [
                'Mission and Goals',
                'Program Outcomes',
                'Course Outcomes',
                'CLO-PLO Mapping',
                'Program Specification',
                'Course Specifications',
                'Assessment Plan',
                'Assessment Rubrics',
                'Course Reports (CR)',
                'Annual Program Report',
                'Key Performance Indicators',
                'Continuous Quality Improvement'
            ]
        },
        {
            name: 'ABET',
            logo: 'abet.webp',
            color: '#8B1A1A',
            items: [
                'Program Educational Objectives',
                'Student Outcome',
                'Performance Indicator',
                'Curriculum Map',
                'Course Syllabi',
                'Assessment Plan',
                'Assessment Rubrics',
                'Course Portfolios',
                'Continuous Quality Improvement',
                'Industry Advisory Board',
                'Faculty Curriculum Vitae',
                'Self-Study Report'
            ]
        }
    ]
};
