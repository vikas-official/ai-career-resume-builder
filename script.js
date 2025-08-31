// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Global Variables
let selectedTemplate = 'modern';
let currentUser = {
    name: '',
    email: '',
    skills: [],
    experience: '',
    education: ''
};

// Sample job data - In production, this would come from an API
const sampleJobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions Pvt Ltd",
        location: "Bangalore",
        type: "fulltime",
        experience: "1-3",
        salary: "₹6-10 LPA",
        description: "Looking for a skilled frontend developer with React.js experience to join our dynamic team.",
        tags: ["React", "JavaScript", "CSS", "HTML", "Redux"],
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "Data Analyst Intern",
        company: "Analytics Corp",
        location: "Mumbai",
        type: "internship",
        experience: "fresher",
        salary: "₹15,000/month",
        description: "Internship opportunity for data analysis and visualization with hands-on projects.",
        tags: ["Python", "SQL", "Excel", "Tableau", "Statistics"],
        posted: "1 day ago"
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "StartupXYZ",
        location: "Delhi",
        type: "fulltime",
        experience: "3-5",
        salary: "₹8-15 LPA",
        description: "Join our dynamic team as a full stack developer working on cutting-edge projects.",
        tags: ["Node.js", "React", "MongoDB", "Express", "AWS"],
        posted: "3 days ago"
    },
    {
        id: 4,
        title: "UI/UX Designer",
        company: "Design Studio",
        location: "Pune",
        type: "remote",
        experience: "1-3",
        salary: "₹5-8 LPA",
        description: "Creative UI/UX designer for mobile and web applications with modern design principles.",
        tags: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
        posted: "1 week ago"
    },
    {
        id: 5,
        title: "Python Developer",
        company: "AI Innovations",
        location: "Hyderabad",
        type: "fulltime",
        experience: "1-3",
        salary: "₹7-12 LPA",
        description: "Python developer for AI and machine learning projects with growth opportunities.",
        tags: ["Python", "Django", "Machine Learning", "TensorFlow", "FastAPI"],
        posted: "5 days ago"
    },
    {
        id: 6,
        title: "Digital Marketing Intern",
        company: "Marketing Pro",
        location: "Chennai",
        type: "internship",
        experience: "fresher",
        salary: "₹12,000/month",
        description: "Learn digital marketing strategies including SEO, SEM, and social media marketing.",
        tags: ["SEO", "Google Ads", "Social Media", "Analytics", "Content Marketing"],
        posted: "2 days ago"
    },
    {
        id: 7,
        title: "DevOps Engineer",
        company: "Cloud Systems",
        location: "Bangalore",
        type: "fulltime",
        experience: "3-5",
        salary: "₹10-18 LPA",
        description: "DevOps engineer to manage cloud infrastructure and CI/CD pipelines.",
        tags: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
        posted: "4 days ago"
    },
    {
        id: 8,
        title: "Content Writer",
        company: "Content Hub",
        location: "Remote",
        type: "parttime",
        experience: "1-3",
        salary: "₹20,000-35,000/month",
        description: "Creative content writer for blogs, websites, and marketing materials.",
        tags: ["Content Writing", "SEO Writing", "Research", "WordPress", "Social Media"],
        posted: "1 day ago"
    }
];

// Navigation Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Resume Builder Functions
function selectTemplate(template) {
    selectedTemplate = template;
    document.querySelectorAll('.template').forEach(t => t.classList.remove('selected'));
    document.querySelector(`[data-template="${template}"]`).classList.add('selected');
    
    // If resume is already generated, regenerate with new template
    const resumePreview = document.getElementById('resumePreview');
    if (!resumePreview.querySelector('.preview-placeholder')) {
        generateResume();
    }
}

// Show loading overlay
function showLoading(message = 'AI is working its magic...') {
    const overlay = document.getElementById('loadingOverlay');
    const text = overlay.querySelector('p');
    text.textContent = message;
    overlay.style.display = 'block';
}

// Hide loading overlay
function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// AI-Powered Functions using OpenRouter
async function callAI(prompt, model = 'anthropic/claude-3-haiku') {
    try {
        // In a real application, you would make an API call to OpenRouter
        // For demo purposes, we'll simulate AI responses
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        
        // Simulated AI responses based on prompt keywords
        if (prompt.includes('professional summary')) {
            return generateMockSummary();
        } else if (prompt.includes('skills')) {
            return generateMockSkills();
        } else if (prompt.includes('experience')) {
            return generateMockExperience();
        } else if (prompt.includes('career path')) {
            return generateMockCareerPath();
        } else if (prompt.includes('salary')) {
            return generateMockSalaryInsights();
        } else if (prompt.includes('interview questions')) {
            return generateMockQuestions();
        } else if (prompt.includes('skills assessment')) {
            return generateMockSkillsAssessment();
        }
        
        return "AI response generated successfully!";
    } catch (error) {
        console.error('AI API Error:', error);
        throw new Error('Failed to generate AI response');
    }
}

// Mock AI response generators
function generateMockSummary() {
    const summaries = [
        "Passionate and detail-oriented professional with strong analytical skills and a proven track record of delivering high-quality results. Experienced in collaborative environments with excellent communication abilities.",
        "Dynamic and results-driven individual with expertise in problem-solving and project management. Committed to continuous learning and professional growth with strong technical and interpersonal skills.",
        "Innovative and creative professional with a strong foundation in technology and business. Demonstrated ability to work effectively in fast-paced environments while maintaining attention to detail."
    ];
    return summaries[Math.floor(Math.random() * summaries.length)];
}

function generateMockSkills() {
    const skillSets = [
        "JavaScript, React.js, Node.js, HTML5, CSS3, MongoDB, Express.js, Git, Responsive Design, RESTful APIs",
        "Python, Django, Flask, PostgreSQL, MySQL, Data Analysis, Machine Learning, Pandas, NumPy, Scikit-learn",
        "Java, Spring Boot, Hibernate, MySQL, RESTful Services, Microservices, Docker, Kubernetes, AWS, Jenkins"
    ];
    return skillSets[Math.floor(Math.random() * skillSets.length)];
}

function generateMockExperience() {
    return `Enhanced work experience with quantified achievements:

• Developed and maintained responsive web applications using modern frameworks, resulting in 25% improved user engagement
• Collaborated with cross-functional teams of 5+ members to deliver projects 15% ahead of schedule
• Implemented best practices for code quality and testing, reducing bugs by 30%
• Participated in agile development processes and contributed to sprint planning and retrospectives
• Mentored junior developers and conducted code reviews to maintain high coding standards`;
}

function generateMockCareerPath() {
    return `
    <div class="career-path-content">
        <h3>🎯 Recommended Career Paths</h3>
        
        <div class="career-option">
            <h4>1. Full Stack Developer</h4>
            <p><strong>Growth Potential:</strong> High demand, excellent salary progression</p>
            <p><strong>Required Skills:</strong> JavaScript, React/Angular, Node.js, Databases</p>
            <p><strong>Salary Range:</strong> ₹6-25 LPA (based on experience)</p>
            <p><strong>Next Steps:</strong> Build portfolio projects, contribute to open source</p>
        </div>
        
        <div class="career-option">
            <h4>2. Data Scientist</h4>
            <p><strong>Growth Potential:</strong> Rapidly growing field with AI/ML focus</p>
            <p><strong>Required Skills:</strong> Python, Statistics, Machine Learning, SQL</p>
            <p><strong>Salary Range:</strong> ₹8-30 LPA (based on experience)</p>
            <p><strong>Next Steps:</strong> Complete data science certifications, work on ML projects</p>
        </div>
        
        <div class="career-option">
            <h4>3. Product Manager</h4>
            <p><strong>Growth Potential:</strong> Leadership role with strategic impact</p>
            <p><strong>Required Skills:</strong> Product Strategy, Analytics, Communication</p>
            <p><strong>Salary Range:</strong> ₹10-35 LPA (based on experience)</p>
            <p><strong>Next Steps:</strong> Gain product management experience, learn analytics tools</p>
        </div>
    </div>`;
}

function generateMockSalaryInsights() {
    return `
    <div class="salary-insights-content">
        <h3>💰 Salary Insights for Your Profile</h3>
        
        <div class="salary-table">
            <h4>City-wise Salary Comparison</h4>
            <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                <tr style="background: #f8f9fa;">
                    <th style="padding: 0.5rem; border: 1px solid #ddd;">City</th>
                    <th style="padding: 0.5rem; border: 1px solid #ddd;">Entry Level</th>
                    <th style="padding: 0.5rem; border: 1px solid #ddd;">Mid Level</th>
                    <th style="padding: 0.5rem; border: 1px solid #ddd;">Senior Level</th>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">Bangalore</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">₹6-10 LPA</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">₹12-20 LPA</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">₹25-40 LPA</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">Mumbai</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">₹7-12 LPA</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">₹15-25 LPA</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">₹30-50 LPA</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">Delhi</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">₹6-11 LPA</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">₹13-22 LPA</td>
                    <td style="padding: 0.5rem; border: 1px solid #ddd;">₹28-45 LPA</td>
                </tr>
            </table>
        </div>
        
        <div class="salary-tips">
            <h4>💡 Tips to Increase Your Earning Potential</h4>
            <ul style="margin: 1rem 0; padding-left: 2rem;">
                <li>Develop in-demand skills like AI/ML, Cloud Computing, or Data Science</li>
                <li>Contribute to open-source projects to showcase your abilities</li>
                <li>Obtain relevant certifications from recognized platforms</li>
                <li>Build a strong professional network through LinkedIn and tech events</li>
                <li>Consider remote opportunities for higher-paying international roles</li>
            </ul>
        </div>
    </div>`;
}

function generateMockQuestions() {
    const questions = [
        {
            question: "Tell me about yourself and your background.",
            tips: "Focus on professional experience, key skills, and career goals. Keep it concise and relevant to the role.",
            importance: "This is often the first question and sets the tone for the interview."
        },
        {
            question: "What are your greatest strengths?",
            tips: "Choose strengths relevant to the job and provide specific examples of how you've demonstrated them.",
            importance: "Shows self-awareness and ability to contribute to the role."
        },
        {
            question: "Describe a challenging project you worked on.",
            tips: "Use the STAR method (Situation, Task, Action, Result) to structure your response.",
            importance: "Demonstrates problem-solving skills and ability to handle challenges."
        },
        {
            question: "Where do you see yourself in 5 years?",
            tips: "Show ambition while aligning your goals with the company's growth opportunities.",
            importance: "Assesses long-term commitment and career planning."
        },
        {
            question: "Why do you want to work for our company?",
            tips: "Research the company thoroughly and mention specific aspects that attract you.",
            importance: "Shows genuine interest and preparation for the interview."
        }
    ];
    
    return questions.map(q => `
        <div class="question-item">
            <h4>Q: ${q.question}</h4>
            <p><strong>Key Points:</strong> ${q.tips}</p>
            <p><strong>Why Important:</strong> ${q.importance}</p>
        </div>
    `).join('');
}

function generateMockSkillsAssessment() {
    return `
    <div class="skills-assessment-content">
        <h3>🧠 Your Skills Assessment Results</h3>
        
        <div class="assessment-section">
            <h4>💪 Your Strengths</h4>
            <ul style="margin: 1rem 0; padding-left: 2rem;">
                <li>Strong technical foundation in programming languages</li>
                <li>Good problem-solving and analytical thinking abilities</li>
                <li>Effective communication and teamwork skills</li>
                <li>Adaptability to new technologies and learning agility</li>
            </ul>
        </div>
        
        <div class="assessment-section">
            <h4>🎯 Areas for Improvement</h4>
            <ul style="margin: 1rem 0; padding-left: 2rem;">
                <li>Advanced system design and architecture knowledge</li>
                <li>Leadership and project management experience</li>
                <li>Industry-specific domain knowledge</li>
                <li>Advanced data structures and algorithms</li>
            </ul>
        </div>
        
        <div class="assessment-section">
            <h4>📚 Recommended Learning Path</h4>
            <ol style="margin: 1rem 0; padding-left: 2rem;">
                <li>Complete advanced courses in your primary technology stack</li>
                <li>Work on real-world projects to gain practical experience</li>
                <li>Contribute to open-source projects in your field</li>
                <li>Attend tech meetups and conferences for networking</li>
                <li>Consider pursuing relevant certifications</li>
            </ol>
        </div>
        
        <div class="assessment-section">
            <h4>📈 Market Demand Analysis</h4>
            <p>Your skill set is in high demand in the current market. Focus on:</p>
            <ul style="margin: 1rem 0; padding-left: 2rem;">
                <li>Cloud technologies (AWS, Azure, GCP)</li>
                <li>DevOps and CI/CD practices</li>
                <li>Modern frameworks and libraries</li>
                <li>Data science and machine learning basics</li>
            </ul>
        </div>
    </div>`;
}

// AI Function Implementations
async function generateAISummary() {
    const name = document.getElementById('fullName').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    
    if (!name || !skills) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill in your name and skills first',
            confirmButtonColor: '#667eea'
        });
        return;
    }

    const button = event.target;
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Generating...';
    button.disabled = true;

    try {
        showLoading('Generating professional summary...');
        const summary = await callAI(`Create a professional summary for: ${name}, Skills: ${skills}, Experience: ${experience}`);
        document.getElementById('summary').value = summary;
        
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'AI summary generated successfully!',
            confirmButtonColor: '#667eea'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to generate summary. Please try again.',
            confirmButtonColor: '#667eea'
        });
    } finally {
        hideLoading();
        button.textContent = originalText;
        button.disabled = false;
    }
}

async function suggestSkills() {
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    
    const button = event.target;
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Suggesting...';
    button.disabled = true;

    try {
        showLoading('Analyzing and suggesting skills...');
        const skills = await callAI(`Suggest skills for: Experience: ${experience}, Education: ${education}`);
        document.getElementById('skills').value = skills;
        
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Skills suggested successfully!',
            confirmButtonColor: '#667eea'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to suggest skills. Please try again.',
            confirmButtonColor: '#667eea'
        });
    } finally {
        hideLoading();
        button.textContent = originalText;
        button.disabled = false;
    }
}

async function enhanceExperience() {
    const experience = document.getElementById('experience').value;
    
    if (!experience.trim()) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please enter your experience first',
            confirmButtonColor: '#667eea'
        });
        return;
    }

    const button = event.target;
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Enhancing...';
    button.disabled = true;

    try {
        showLoading('Enhancing your experience description...');
        const enhancedExperience = await callAI(`Enhance this experience: ${experience}`);
        document.getElementById('experience').value = enhancedExperience;
        
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Experience enhanced successfully!',
            confirmButtonColor: '#667eea'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to enhance experience. Please try again.',
            confirmButtonColor: '#667eea'
        });
    } finally {
        hideLoading();
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Resume Generation
function generateResume() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        certifications: document.getElementById('certifications').value
    };

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Required Fields',
            text: 'Please fill in your name, email, and phone number',
            confirmButtonColor: '#667eea'
        });
        return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Email',
            text: 'Please enter a valid email address',
            confirmButtonColor: '#667eea'
        });
        return;
    }

    const resumeHTML = generateResumeHTML(formData, selectedTemplate);
    document.getElementById('resumePreview').innerHTML = resumeHTML;
    document.getElementById('previewActions').style.display = 'flex';
    
    // Save to localStorage
    saveFormData();
    
    Swal.fire({
        icon: 'success',
        title: 'Resume Generated!',
        text: 'Your resume has been generated successfully!',
        confirmButtonColor: '#667eea'
    });
}

function generateResumeHTML(data, template) {
    const templates = {
        modern: `
            <div class="resume-modern">
                <div class="resume-header">
                    <h1>${data.fullName}</h1>
                    <div class="contact-info">
                        <p><i class="fas fa-envelope"></i> ${data.email}</p>
                        <p><i class="fas fa-phone"></i> ${data.phone}</p>
                        ${data.location ? `<p><i class="fas fa-map-marker-alt"></i> ${data.location}</p>` : ''}
                    </div>
                </div>
                ${data.summary ? `<div class="resume-section">
                    <h2>Professional Summary</h2>
                    <p>${data.summary}</p>
                </div>` : ''}
                ${data.skills ? `<div class="resume-section">
                    <h2>Skills</h2>
                    <p>${data.skills}</p>
                </div>` : ''}
                ${data.experience ? `<div class="resume-section">
                    <h2>Experience</h2>
                    <div style="white-space: pre-line;">${data.experience}</div>
                </div>` : ''}
                ${data.education ? `<div class="resume-section">
                    <h2>Education</h2>
                    <p>${data.education}</p>
                </div>` : ''}
                ${data.certifications ? `<div class="resume-section">
                    <h2>Certifications</h2>
                    <p>${data.certifications}</p>
                </div>` : ''}
            </div>
        `,
        classic: `
            <div class="resume-classic">
                <div class="resume-header text-center">
                    <h1>${data.fullName}</h1>
                    <p>${data.email} | ${data.phone}${data.location ? ` | ${data.location}` : ''}</p>
                </div>
                <hr style="margin: 1.5rem 0;">
                ${data.summary ? `<div class="resume-section">
                    <h3>PROFESSIONAL SUMMARY</h3>
                    <p>${data.summary}</p>
                </div>` : ''}
                ${data.skills ? `<div class="resume-section">
                    <h3>SKILLS</h3>
                    <p>${data.skills}</p>
                </div>` : ''}
                ${data.experience ? `<div class="resume-section">
                    <h3>EXPERIENCE</h3>
                    <div style="white-space: pre-line;">${data.experience}</div>
                </div>` : ''}
                ${data.education ? `<div class="resume-section">
                    <h3>EDUCATION</h3>
                    <p>${data.education}</p>
                </div>` : ''}
                ${data.certifications ? `<div class="resume-section">
                    <h3>CERTIFICATIONS</h3>
                    <p>${data.certifications}</p>
                </div>` : ''}
            </div>
        `,
        creative: `
            <div class="resume-creative">
                <div class="resume-header">
                    <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">${data.fullName}</h1>
                    <div style="display: flex; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
                        <span><i class="fas fa-envelope"></i> ${data.email}</span>
                        <span><i class="fas fa-phone"></i> ${data.phone}</span>
                        ${data.location ? `<span><i class="fas fa-map-marker-alt"></i> ${data.location}</span>` : ''}
                    </div>
                </div>
                ${data.summary ? `<div class="resume-section" style="margin-bottom: 2rem;">
                    <h2 style="border-bottom: 2px solid white; padding-bottom: 0.5rem;">About Me</h2>
                    <p style="margin-top: 1rem;">${data.summary}</p>
                </div>` : ''}
                ${data.skills ? `<div class="resume-section" style="margin-bottom: 2rem;">
                    <h2 style="border-bottom: 2px solid white; padding-bottom: 0.5rem;">Skills</h2>
                    <p style="margin-top: 1rem;">${data.skills}</p>
                </div>` : ''}
                ${data.experience ? `<div class="resume-section" style="margin-bottom: 2rem;">
                    <h2 style="border-bottom: 2px solid white; padding-bottom: 0.5rem;">Experience</h2>
                    <div style="margin-top: 1rem; white-space: pre-line;">${data.experience}</div>
                </div>` : ''}
                ${data.education ? `<div class="resume-section" style="margin-bottom: 2rem;">
                    <h2 style="border-bottom: 2px solid white; padding-bottom: 0.5rem;">Education</h2>
                    <p style="margin-top: 1rem;">${data.education}</p>
                </div>` : ''}
                ${data.certifications ? `<div class="resume-section">
                    <h2 style="border-bottom: 2px solid white; padding-bottom: 0.5rem;">Certifications</h2>
                    <p style="margin-top: 1rem;">${data.certifications}</p>
                </div>` : ''}
            </div>
        `,
        minimal: `
            <div class="resume-minimal">
                <div class="resume-header">
                    <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem;">${data.fullName}</h1>
                    <div style="color: #666; margin-bottom: 2rem;">
                        ${data.email} • ${data.phone}${data.location ? ` • ${data.location}` : ''}
                    </div>
                </div>
                ${data.summary ? `<div class="resume-section">
                    <h2 style="font-size: 1.2rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">Summary</h2>
                    <p style="margin-bottom: 1.5rem;">${data.summary}</p>
                </div>` : ''}
                ${data.skills ? `<div class="resume-section">
                    <h2 style="font-size: 1.2rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">Skills</h2>
                    <p style="margin-bottom: 1.5rem;">${data.skills}</p>
                </div>` : ''}
                ${data.experience ? `<div class="resume-section">
                    <h2 style="font-size: 1.2rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">Experience</h2>
                    <div style="margin-bottom: 1.5rem; white-space: pre-line;">${data.experience}</div>
                </div>` : ''}
                ${data.education ? `<div class="resume-section">
                    <h2 style="font-size: 1.2rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">Education</h2>
                    <p style="margin-bottom: 1.5rem;">${data.education}</p>
                </div>` : ''}
                ${data.certifications ? `<div class="resume-section">
                    <h2 style="font-size: 1.2rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">Certifications</h2>
                    <p>${data.certifications}</p>
                </div>` : ''}
            </div>
        `
    };

    return templates[template] || templates.modern;
}

// Download Resume as PDF
function downloadResume() {
    const element = document.getElementById('resumePreview');
    const fullName = document.getElementById('fullName').value || 'Resume';
    
    showLoading('Generating PDF...');
    
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`${fullName.replace(/\s+/g, '_')}_Resume.pdf`);
        hideLoading();
        
        Swal.fire({
            icon: 'success',
            title: 'Downloaded!',
            text: 'Your resume has been downloaded successfully!',
            confirmButtonColor: '#667eea'
        });
    }).catch(error => {
        hideLoading();
        Swal.fire({
            icon: 'error',
            title: 'Download Failed',
            text: 'Failed to download resume. Please try again.',
            confirmButtonColor: '#667eea'
        });
    });
}

// Share Resume
function shareResume() {
    if (navigator.share) {
        navigator.share({
            title: 'My Resume - CareerBoost',
            text: 'Check out my resume created with CareerBoost AI Resume Builder',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Link Copied!',
                text: 'Resume link copied to clipboard',
                confirmButtonColor: '#667eea'
            });
        });
    }
}

// Clear Form
function clearForm() {
    Swal.fire({
        title: 'Clear Form?',
        text: 'This will clear all form data. Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#667eea',
        confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelectorAll('.resume-form input, .resume-form textarea').forEach(field => {
                field.value = '';
            });
            document.getElementById('resumePreview').innerHTML = `
                <div class="preview-placeholder">
                    <i class="fas fa-file-alt"></i>
                    <p>Resume preview will appear here</p>
                    <small>Fill the form and click "Generate Resume"</small>
                </div>
            `;
            document.getElementById('previewActions').style.display = 'none';
            localStorage.removeItem('resumeFormData');
            
            Swal.fire({
                icon: 'success',
                title: 'Cleared!',
                text: 'Form has been cleared successfully.',
                confirmButtonColor: '#667eea'
            });
        }
    });
}

// Career Guidance Functions
async function startSkillsAssessment() {
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    
    if (!skills && !experience) {
        Swal.fire({
            icon: 'info',
            title: 'Need More Information',
            text: 'Please fill in your skills or experience first in the resume builder',
            confirmButtonColor: '#667eea'
        });
        return;
    }

    try {
        showLoading('Analyzing your skills...');
        const assessment = await callAI(`skills assessment for: ${skills}, ${experience}`);
        document.getElementById('skillsAssessment').innerHTML = assessment;
        document.getElementById('skillsModal').style.display = 'block';
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to generate assessment. Please try again.',
            confirmButtonColor: '#667eea'
        });
    } finally {
        hideLoading();
    }
}

async function getCareerPath() {
    const skills = document.getElementById('skills').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    
    if (!skills && !education && !experience) {
        Swal.fire({
            icon: 'info',
            title: 'Need More Information',
            text: 'Please fill in your skills, education, or experience first',
            confirmButtonColor: '#667eea'
        });
        return;
    }

    try {
        showLoading('Analyzing career paths...');
        const careerPaths = await callAI(`career path for: ${skills}, ${education}, ${experience}`);
        document.getElementById('careerRecommendations').innerHTML = careerPaths;
        document.getElementById('careerModal').style.display = 'block';
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to generate career recommendations. Please try again.',
            confirmButtonColor: '#667eea'
        });
    } finally {
        hideLoading();
    }
}

async function getSalaryInsights() {
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    
    if (!skills && !experience) {
        Swal.fire({
            icon: 'info',
            title: 'Need More Information',
            text: 'Please fill in your skills or experience first',
            confirmButtonColor: '#667eea'
        });
        return;
    }

    try {
        showLoading('Fetching salary insights...');
        const salaryData = await callAI(`salary insights for: ${skills}, ${experience}`);
        document.getElementById('salaryInsights').innerHTML = salaryData;
        document.getElementById('salaryModal').style.display = 'block';
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to generate salary insights. Please try again.',
            confirmButtonColor: '#667eea'
        });
    } finally {
        hideLoading();
    }
}

async function getSkillRecommendations() {
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    
    try {
        showLoading('Generating skill recommendations...');
        const recommendations = `
        <div class="skill-recommendations-content">
            <h3>🎯 Recommended Skills to Learn</h3>
            
            <div class="skill-category">
                <h4>🔥 High-Demand Technical Skills</h4>
                <ul style="margin: 1rem 0; padding-left: 2rem;">
                    <li><strong>Cloud Computing:</strong> AWS, Azure, Google Cloud Platform</li>
                    <li><strong>DevOps:</strong> Docker, Kubernetes, Jenkins, CI/CD</li>
                    <li><strong>Data Science:</strong> Python, R, Machine Learning, AI</li>
                    <li><strong>Cybersecurity:</strong> Ethical Hacking, Security Analysis</li>
                    <li><strong>Mobile Development:</strong> React Native, Flutter, Swift</li>
                </ul>
            </div>
            
            <div class="skill-category">
                <h4>💼 Essential Soft Skills</h4>
                <ul style="margin: 1rem 0; padding-left: 2rem;">
                    <li>Leadership and Team Management</li>
                    <li>Communication and Presentation</li>
                    <li>Project Management (Agile, Scrum)</li>
                    <li>Problem-solving and Critical Thinking</li>
                    <li>Adaptability and Learning Agility</li>
                </ul>
            </div>
            
            <div class="skill-category">
                <h4>📈 Emerging Technologies</h4>
                <ul style="margin: 1rem 0; padding-left: 2rem;">
                    <li>Artificial Intelligence and Machine Learning</li>
                    <li>Blockchain and Cryptocurrency</li>
                    <li>Internet of Things (IoT)</li>
                    <li>Augmented Reality (AR) / Virtual Reality (VR)</li>
                    <li>Quantum Computing</li>
                </ul>
            </div>
            
            <div class="learning-resources">
                <h4>📚 Recommended Learning Platforms</h4>
                <ul style="margin: 1rem 0; padding-left: 2rem;">
                    <li>Coursera - University courses and specializations</li>
                    <li>Udemy - Practical, hands-on courses</li>
                    <li>Pluralsight - Technology-focused learning</li>
                    <li>LinkedIn Learning - Professional development</li>
                    <li>freeCodeCamp - Free coding bootcamp</li>
                </ul>
            </div>
        </div>`;
        
        document.getElementById('skillRecommendationsContent').innerHTML = recommendations;
        document.getElementById('skillRecommendationsModal').style.display = 'block';
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to generate skill recommendations. Please try again.',
            confirmButtonColor: '#667eea'
        });
    } finally {
        hideLoading();
    }
}

// Job Search Functions
function searchJobs() {
    const searchTerm = document.getElementById('jobSearch').value.toLowerCase();
    const location = document.getElementById('jobLocation').value;
    const jobType = document.getElementById('jobType').value;
    const experienceLevel = document.getElementById('experienceLevel').value;
    
    let filteredJobs = [...sampleJobs];
    
    // Filter by search term
    if (searchTerm) {
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // Filter by location
    if (location) {
        filteredJobs = filteredJobs.filter(job => 
            job.location.toLowerCase().includes(location.toLowerCase())
        );
    }
    
    // Filter by job type
    if (jobType) {
        filteredJobs = filteredJobs.filter(job => job.type === jobType);
    }
    
    // Filter by experience level
    if (experienceLevel) {
        filteredJobs = filteredJobs.filter(job => job.experience === experienceLevel);
    }
    
    displayJobs(filteredJobs);
}

function displayJobs(jobs) {
    const jobListings = document.getElementById('jobListings');
    
    if (jobs.length === 0) {
        jobListings.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    jobListings.innerHTML = jobs.map(job => `
        <div class="job-card" data-aos="fade-up">
            <div class="job-header">
                <div>
                    <div class="job-title">${job.title}</div>
                    <div class="job-company">${job.company}</div>
                </div>
                <div class="job-salary">${job.salary}</div>
            </div>
            <div class="job-details">
                <span class="job-tag"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span class="job-tag"><i class="fas fa-clock"></i> ${job.type}</span>
                <span class="job-tag"><i class="fas fa-user-tie"></i> ${job.experience}</span>
                <span class="job-tag"><i class="fas fa-calendar"></i> ${job.posted}</span>
            </div>
            <div class="job-description">${job.description}</div>
            <div class="job-details">
                ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
            </div>
            <div class="job-actions">
                <button class="btn-primary" onclick="applyJob(${job.id}, '${job.title}', '${job.company}')">
                    <i class="fas fa-paper-plane"></i> Apply Now
                </button>
                <button class="btn-secondary" onclick="saveJob(${job.id})">
                    <i class="fas fa-bookmark"></i> Save
                </button>
            </div>
        </div>
    `).join('');
    
    // Re-initialize AOS for new elements
    AOS.refresh();
}

function applyJob(jobId, title, company) {
    Swal.fire({
        title: 'Apply for Job',
        html: `
            <div style="text-align: left;">
                <p><strong>Position:</strong> ${title}</p>
                <p><strong>Company:</strong> ${company}</p>
                <br>
                <p>Ready to apply for this position?</p>
            </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#667eea',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '<i class="fas fa-paper-plane"></i> Yes, Apply!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Simulate application process
            showLoading('Submitting your application...');
            setTimeout(() => {
                hideLoading();
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted!',
                    text: 'Your application has been submitted successfully. The company will contact you soon.',
                    confirmButtonColor: '#667eea'
                });
            }, 2000);
        }
    });
}

function saveJob(jobId) {
    // Get saved jobs from localStorage
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    if (savedJobs.includes(jobId)) {
        Swal.fire({
            icon: 'info',
            title: 'Already Saved',
            text: 'This job is already in your saved list',
            confirmButtonColor: '#667eea'
        });
        return;
    }
    
    savedJobs.push(jobId);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    
    Swal.fire({
        icon: 'success',
        title: 'Job Saved!',
        text: 'Job has been added to your saved list',
        confirmButtonColor: '#667eea'
    });
}

function loadMoreJobs() {
    // In a real application, this would load more jobs from an API
    Swal.fire({
        icon: 'info',
        title: 'No More Jobs',
        text: 'You have seen all available jobs. Check back later for new opportunities!',
        confirmButtonColor: '#667eea'
    });
}

// Interview Preparation Functions
async function generateQuestions() {
    const category = document.getElementById('questionCategory').value;
    const jobRole = document.getElementById('jobRole').value;
    
    const button = event.target;
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Generating...';
    button.disabled = true;

    try {
        showLoading('Generating interview questions...');
        const questions = await callAI(`interview questions for ${category} ${jobRole}`);
        document.getElementById('questionsList').innerHTML = questions;
    } catch (error) {
        document.getElementById('questionsList').innerHTML = '<p>Failed to generate questions. Please try again.</p>';
    } finally {
        hideLoading();
        button.textContent = originalText;
        button.disabled = false;
    }
}

function startMockInterview() {
    Swal.fire({
        title: 'Mock Interview Simulator',
        html: `
            <div style="text-align: left;">
                <p>🎥 <strong>Mock Interview Features:</strong></p>
                <ul style="margin: 1rem 0; padding-left: 2rem;">
                    <li>AI-powered question generation</li>
                    <li>Real-time feedback on answers</li>
                    <li>Body language analysis</li>
                    <li>Speaking pace evaluation</li>
                    <li>Confidence scoring</li>
                </ul>
                <p><em>Note: This feature requires camera and microphone access.</em></p>
            </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#667eea',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '<i class="fas fa-video"></i> Start Interview',
        cancelButtonText: 'Maybe Later'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'info',
                title: 'Coming Soon!',
                text: 'Mock interview simulator will be available in the next update.',
                confirmButtonColor: '#667eea'
            });
        }
    });
}

// Modal Functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Auto-save form data to localStorage
function saveFormData() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        certifications: document.getElementById('certifications').value,
        selectedTemplate: selectedTemplate
    };
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        Object.keys(formData).forEach(key => {
            if (key === 'selectedTemplate') {
                selectTemplate(formData[key]);
            } else {
                const element = document.getElementById(key);
                if (element) {
                    element.value = formData[key];
                }
            }
        });
    }
}

// Auto-save on input change
document.addEventListener('input', function(e) {
    if (e.target.closest('.resume-form')) {
        saveFormData();
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Load sample jobs on page load
    searchJobs();
    
    // Load saved form data
    loadFormData();
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    }
    
    // Select default template
    selectTemplate('modern');
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save form data
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveFormData();
        Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: 'Form data saved successfully',
            timer: 1500,
            showConfirmButton: false
        });
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Add installation prompt for PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button or banner
    const installBanner = document.createElement('div');
    installBanner.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; background: #667eea; color: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1000;">
            <p style="margin: 0 0 0.5rem 0;">Install CareerBoost App</p>
            <button onclick="installApp()" style="background: white; color: #667eea; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Install</button>
            <button onclick="this.parentElement.remove()" style="background: transparent; color: white; border: 1px solid white; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; margin-left: 0.5rem;">Later</button>
        </div>
    `;
    document.body.appendChild(installBanner);
});

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        });
    }
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData) {
    // In production, integrate with Google Analytics or other analytics service
    console.log('Event tracked:', eventName, eventData);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // In production, send error reports to monitoring service
});

// Performance monitoring
window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    trackEvent('page_load_time', { duration: loadTime });
});