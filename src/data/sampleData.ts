export interface SampleResume {
  id: string;
  name: string;
  degree: string;
  college: string;
  cgpa: number;
  highlight: string;
  rawText: string;
}

export interface SampleJobDescription {
  id: string;
  company: string;
  role: string;
  type: 'Tier-1 Product' | 'Mass/Prime IT' | 'SaaS Leader' | 'Consulting & Cloud';
  ctc: string;
  summary: string;
  rawText: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'arjun_cse',
    name: 'Arjun Sharma',
    degree: 'B.E. Computer Science and Engineering (2025)',
    college: 'PSG College of Technology',
    cgpa: 8.7,
    highlight: 'Enterprise Backend & DSA enthusiast with Spring Boot and AWS experience',
    rawText: `ARJUN SHARMA
Email: arjun.sharma@example.edu | LinkedIn: linkedin.com/in/arjun-sharma-dev | GitHub: github.com/arjun-dev
Phone: +91 98765 43210 | Coimbatore, Tamil Nadu

EDUCATION
B.E. in Computer Science and Engineering | CGPA: 8.7/10.0 (2021 – 2025)
PSG College of Technology, Coimbatore

TECHNICAL SKILLS
• Programming Languages: Java (Core & Advanced), C++, Python, SQL
• Core Computer Science: Data Structures and Algorithms (DSA), Object-Oriented Programming (OOP), DBMS, Operating Systems, Computer Networks
• Frameworks & Web: Spring Boot, RESTful services, Hibernate, JPA, HTML5, CSS3, JavaScript
• Databases: MySQL, PostgreSQL, Redis (Caching)
• Tools & Cloud: Git, GitHub, Docker (Containerization), Linux CLI, AWS (EC2, S3 basics), Postman, Maven
• Soft Skills: Team player, Analytical Problem Solving, Agile Scrum, Good Communication

PROJECTS
1. CampusPlacementHub — Microservices Recruitment Portal (Spring Boot, React, PostgreSQL)
   - Architected backend services with Spring Boot and REST API endpoints for student profiles and interview schedules.
   - Reduced database latency by 35% utilizing Redis in-memory caching for active recruiter job listings.
   - Packaged microservices into Docker containers and set up CI/CD workflows using GitHub Actions.

2. Distributed Key-Value Store (Java, Socket Programming, Multithreading)
   - Implemented thread-safe in-memory cache supporting GET, SET, and DELETE operations with mutex locking.
   - Implemented LRU eviction policy using doubly linked list and hash map in Java.

ACHIEVEMENTS & CERTIFICATIONS
• Solved 450+ problems on LeetCode across Binary Trees, Dynamic Programming, and Graph algorithms.
• Oracle Certified Associate, Java SE 8 Programmer.
• Finalist in Smart India Hackathon (SIH 2024).`
  },
  {
    id: 'priya_ece',
    name: 'Priya Ramakrishnan',
    degree: 'B.Tech Electronics and Communication Engineering (2025)',
    college: 'SSN College of Engineering',
    cgpa: 8.2,
    highlight: 'ECE student transitioning into Software Engineering with Python & Web basics',
    rawText: `PRIYA RAMAKRISHNAN
Email: priya.ramki@example.edu | Chennai, Tamil Nadu
Phone: +91 98451 23456 | GitHub: github.com/priya-ramki

CAREER OBJECTIVE
Enthusiastic Electronics and Communication student with strong analytical foundations seeking a Software Engineer role during campus placements.

EDUCATION
B.Tech in Electronics & Communication Engineering | SSN College of Engineering | CGPA: 8.2 (2021-2025)

SKILLS & COMPETENCIES
• Languages: Python, C Language, Embedded C, SQL basics
• Frontend: HTML, CSS, basic JavaScript
• Database: MySQL relational queries
• Fundamental Concepts: Object-Oriented Programming concepts, Microprocessors, Basic Networking
• Tools: Git, VS Code, MATLAB, Linux terminal
• Professional Skills: Effective Presentation and Communication, Quick Learner, Problem Solving

ACADEMIC PROJECTS
1. Smart IoT Health Monitor (Python, Raspberry Pi, MySQL)
   - Built a patient vitals monitoring system logging sensor telemetry to a MySQL relational database.
   - Built a lightweight Flask web interface to display heartbeat and temperature graphs.

2. Student Attendance Automation System (Python, OpenCV)
   - Implemented face detection script using Python and image processing algorithms.

CO-CURRICULAR
• Placement Committee Student Coordinator for SSN ECE department.
• Participated in college coding hackathons.`
  },
  {
    id: 'karthik_aids',
    name: 'Karthik Nair',
    degree: 'B.Tech Artificial Intelligence and Data Science (2025)',
    college: 'Thiagarajar College of Engineering',
    cgpa: 8.9,
    highlight: 'Data Science & Machine Learning practitioner with NLP, Pandas, and GenAI projects',
    rawText: `KARTHIK NAIR
Madurai, Tamil Nadu | Email: karthik.nair@example.edu | GitHub: github.com/karthik-ai

SUMMARY
Passionate AI & Data Science final-year student with solid background in Machine Learning, Statistical Analysis, and Natural Language Processing.

SKILLS
• Languages: Python, SQL, R
• Machine Learning & AI: Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, Natural Language Processing (NLP), Deep Learning, TensorFlow, Generative AI (LLMs)
• Mathematics: Linear Algebra, Probability, Statistics, Hypothesis Testing
• Databases: PostgreSQL, MongoDB, Vector Databases (ChromaDB)
• Core CS: Data Structures, OOP, Database Management Systems
• Tools: Git, Jupyter Notebooks, Docker basics, Linux

PROJECTS
1. Clinical Note Entity Extractor using NLP & Transformers
   - Fine-tuned transformer models for Named Entity Recognition on medical records with 91% F1 score.
   - Built exploratory data analysis pipeline using Pandas and Seaborn.

2. Autonomous Predictive Maintenance Classifier (Scikit-Learn, FastAPI)
   - Trained Random Forest and XGBoost classifiers predicting equipment breakdown 48 hours in advance.
   - Deployed RESTful API using FastAPI with automated test cases.

PUBLICATIONS & HONORS
• 1st Runner up at National Data Science Hackathon 2024.
• Kaggle 3x Notebooks Expert.`
  },
  {
    id: 'deepa_it',
    name: 'Deepa Venkatesh',
    degree: 'B.Tech Information Technology (2025)',
    college: 'CIT Coimbatore',
    cgpa: 8.5,
    highlight: 'MERN Stack Web Developer with responsive UI and Node.js backend projects',
    rawText: `DEEPA VENKATESH
Coimbatore, India | Email: deepa.v@example.edu | Portfolio: deepa-codes.dev

TECHNICAL PROFILE
• Web Development: React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
• Databases: MongoDB (NoSQL), MySQL, Firebase
• Concepts: REST APIs, State Management (Redux/Zustand), Web Security basics (JWT, Authentication), OOP
• Version Control & Tools: Git, GitHub, Postman, Vite, Vercel
• Interpersonal: Teamwork, Time Management, Agile Sprint Collaboration

KEY PROJECTS
1. DevCollab — Real-time Developer Workspace (React, Node.js, Express, Socket.io, MongoDB)
   - Created full-stack web application for remote code pairing and team chat.
   - Built secure authentication with JWT tokens and bcrypt password hashing.
   - Styled user interface using Tailwind CSS and responsive CSS flexbox/grid.

2. E-Commerce Cart & Checkout Engine (Next.js, TypeScript, Stripe API)
   - Implemented server-side rendered storefront with Next.js and optimized images.
   - Integrated RESTful API webhooks for payment verification.

LEADERSHIP & ACTIVITIES
• Core member, Google Developer Student Clubs (GDSC CIT).
• Organized React 101 workshop for 120+ 2nd-year students.`
  }
];

export const SAMPLE_JOB_DESCRIPTIONS: SampleJobDescription[] = [
  {
    id: 'amazon_sde1',
    company: 'Amazon',
    role: 'Software Development Engineer I (SDE-1)',
    type: 'Tier-1 Product',
    ctc: '₹28 - 44 LPA',
    summary: 'High-bar campus hiring focusing on DSA, OOP, System Scalability, and Java/C++.',
    rawText: `Amazon Software Development Engineer I (SDE 1) — Campus Placement 2025
Location: Bengaluru / Hyderabad / Chennai

Job Description & Team Overview:
Amazon is looking for talented, passionate Software Development Engineers to build large-scale distributed systems that impact hundreds of millions of customers globally.

Required Qualifications & Must-Have Skills:
• Bachelor's or Master's degree in Computer Science, Engineering, or related technical discipline.
• Strong foundation in Data Structures and Algorithms (DSA) including Trees, Graphs, Sorting, and Dynamic Programming.
• Proficiency in at least one modern object-oriented programming language such as Java, C++, or Python.
• Deep understanding of Object-Oriented Programming (OOP) concepts, design patterns, and SOLID principles.
• Solid grasp of Computer Science fundamentals: Operating Systems, Computer Networks, and DBMS.
• Experience designing and consuming RESTful APIs and web services.
• Strong analytical problem solving and debugging capabilities.

Preferred Qualifications & Nice-to-Have Skills:
• Familiarity with Cloud Computing platforms, particularly Amazon Web Services (AWS) services like EC2, S3, or Lambda.
• Experience with Containerization tools such as Docker and Kubernetes.
• Understanding of distributed systems and System Design concepts (caching, load balancing, microservices).
• Working knowledge of relational databases (PostgreSQL, MySQL) and NoSQL stores (Redis, DynamoDB).
• Knowledge of CI/CD pipelines, Git version control, and unit testing practices.
• Excellent communication skills and passion for customer obsession.`
  },
  {
    id: 'zoho_sde',
    company: 'Zoho Corporation',
    role: 'Software Developer (Product Engineering)',
    type: 'SaaS Leader',
    ctc: '₹8.5 - 12 LPA',
    summary: 'Hands-on problem solving, C/Java/C++, data structures, and foundational engineering without reliance on frameworks.',
    rawText: `Zoho Corporation Recruitment Drive — Software Developer
Location: Chennai / Tenkasi / Tirunelveli

About Zoho:
At Zoho, we craft business software from scratch. We look for builders who understand how code works at the memory and algorithmic level.

Mandatory Requirements (Must Have):
• Exceptional problem-solving and coding ability in C, C++, or Java.
• Strong command of Data Structures and Algorithms without using standard template libraries in basic rounds.
• Clear understanding of Object-Oriented Programming (OOP) principles and low-level application design.
• Solid understanding of Database Management Systems (DBMS), SQL queries, and normalization.
• Good verbal and written communication skills and eagerness to learn new tech stacks.

Preferred Skills:
• Exposure to Web Technologies: HTML5, CSS3, JavaScript.
• Knowledge of Operating Systems internals (Processes, Threads, Sockets, Memory management).
• Hands-on experience developing REST APIs and client-server architectures.
• Git version control and collaborative software development.
• Familiarity with Linux environment and command-line utilities.`
  },
  {
    id: 'tcs_digital',
    company: 'Tata Consultancy Services (TCS)',
    role: 'Systems Engineer — TCS Digital / Prime',
    type: 'Mass/Prime IT',
    ctc: '₹7.5 - 9 LPA',
    summary: 'Premium campus hiring track focusing on modern full-stack web, cloud, and core engineering.',
    rawText: `TCS Digital / Prime Campus Hiring
Role: Systems Engineer (Digital Cadre)
Locations: Pan India (Chennai, Bangalore, Hyderabad, Pune, Mumbai)

Role Description:
Join the next-generation digital transformation teams building modern web, cloud, and AI solutions for global enterprise clients.

Required Skills & Minimum Qualifications:
• B.E. / B.Tech / M.E. / M.Tech in CSE / IT / ECE / Circuit branches.
• Hands-on coding proficiency in Python, Java, or C++.
• Strong grasp of Data Structures and Algorithms with clean code etiquette.
• Knowledge of Relational Databases and SQL (MySQL, PostgreSQL).
• Understanding of Web Technologies: HTML, CSS, JavaScript.
• Awareness of Software Engineering lifecycle, Agile methodologies, and Git.
• Excellent verbal communication and presentation skills.

Preferred & Bonus Skills:
• Experience with web frameworks like React.js, Angular, Node.js, or Spring Boot.
• Familiarity with Cloud basics (AWS or Azure or Google Cloud).
• Conceptual understanding of Docker, Microservices, and REST API development.
• Exposure to Machine Learning or Data Analysis using Pandas/NumPy is a strong plus.`
  },
  {
    id: 'deloitte_analyst',
    company: 'Deloitte USI',
    role: 'Associate Analyst — Cloud, Data & Software',
    type: 'Consulting & Cloud',
    ctc: '₹7.6 - 10 LPA',
    summary: 'Consulting tech role focusing on SQL, Python, Cloud (AWS/Azure), Data Pipelines, and Business Communication.',
    rawText: `Deloitte USI — Associate Analyst (Technology Consulting)
Location: Hyderabad / Bengaluru / Gurgaon

Job Overview:
As an Associate Analyst, you will assist enterprise clients in modernizing their data architecture, cloud infrastructure, and enterprise applications.

Must Have Requirements:
• Strong foundation in SQL, relational database design, and complex queries.
• Programming proficiency in Python or Java.
• Sound understanding of DBMS concepts, data normalization, and ACID properties.
• Superb communication skills, interpersonal ability, and executive presentation presence.
• Strong analytical reasoning and aptitude problem-solving skills.
• Willingness to work in cross-functional agile teams.

Nice to Have / Desired Skills:
• Knowledge of Cloud Computing fundamentals (AWS, Microsoft Azure).
• Familiarity with Data Analysis using Pandas, NumPy, or PowerBI/Tableau.
• Understanding of REST APIs and web services integration.
• Familiarity with ETL pipelines and data warehousing concepts.
• Basic exposure to Linux shell scripting and Git version control.`
  }
];
