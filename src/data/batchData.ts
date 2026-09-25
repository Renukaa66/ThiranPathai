export interface BatchStudent {
  id: string;
  rollNo: string;
  name: string;
  branch: 'CSE' | 'IT' | 'ECE' | 'AI & DS';
  section: string;
  cgpa: number;
  email: string;
  phone: string;
  resumeSnippet: string;
  skills: string[]; // Skill IDs they have
  placementStatus: 'Not Placed' | 'Offer in Hand' | 'Ready for Drives';
}

export const BATCH_STUDENTS: BatchStudent[] = [
  {
    id: 's1',
    rollNo: '21CS001',
    name: 'Aaditya Narayanan',
    branch: 'CSE',
    section: 'A',
    cgpa: 8.8,
    email: 'aaditya.n@college.edu',
    phone: '98401 11001',
    resumeSnippet: 'Proficient in Java, DSA, Spring Boot, MySQL, REST API, Git, Docker basics.',
    skills: ['java', 'dsa', 'oop', 'spring_boot', 'mysql', 'sql', 'rest_api', 'git', 'docker', 'problem_solving', 'communication'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's2',
    rollNo: '21CS014',
    name: 'Abinaya Suresh',
    branch: 'CSE',
    section: 'A',
    cgpa: 9.1,
    email: 'abinaya.s@college.edu',
    phone: '98401 11002',
    resumeSnippet: 'Competitive coder (LeetCode 500+). C++, Java, DSA, System Design, SQL, Linux, Git.',
    skills: ['cpp', 'java', 'dsa', 'oop', 'os_concepts', 'computer_networks', 'sql', 'dbms_concepts', 'git', 'linux', 'problem_solving'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's3',
    rollNo: '21IT005',
    name: 'Bhuvanesh Kannan',
    branch: 'IT',
    section: 'A',
    cgpa: 7.9,
    email: 'bhuvanesh.k@college.edu',
    phone: '98401 11003',
    resumeSnippet: 'Frontend developer: HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Git.',
    skills: ['html_css', 'javascript', 'react', 'tailwind_css', 'git', 'communication', 'teamwork'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's4',
    rollNo: '21IT022',
    name: 'Charumathi Raman',
    branch: 'IT',
    section: 'A',
    cgpa: 8.4,
    email: 'charu.r@college.edu',
    phone: '98401 11004',
    resumeSnippet: 'MERN stack: React, Node.js, Express.js, MongoDB, RESTful services, Git, Postman.',
    skills: ['javascript', 'html_css', 'react', 'node_js', 'express_js', 'mongodb', 'rest_api', 'git', 'teamwork'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's5',
    rollNo: '21EC003',
    name: 'Dinesh Karthik',
    branch: 'ECE',
    section: 'B',
    cgpa: 7.6,
    email: 'dinesh.k@college.edu',
    phone: '98401 11005',
    resumeSnippet: 'Embedded C, Python scripting, IoT hardware, basic MySQL queries, Communication.',
    skills: ['c_programming', 'python', 'sql', 'communication', 'problem_solving'],
    placementStatus: 'Not Placed'
  },
  {
    id: 's6',
    rollNo: '21EC019',
    name: 'Elango Pandian',
    branch: 'ECE',
    section: 'B',
    cgpa: 8.1,
    email: 'elango.p@college.edu',
    phone: '98401 11006',
    resumeSnippet: 'Python, C++, OOP, basic DSA, MySQL, MATLAB, Linux terminal, Teamwork.',
    skills: ['python', 'cpp', 'oop', 'sql', 'linux', 'teamwork', 'communication'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's7',
    rollNo: '21AD002',
    name: 'Fathima Zohra',
    branch: 'AI & DS',
    section: 'A',
    cgpa: 9.0,
    email: 'fathima.z@college.edu',
    phone: '98401 11007',
    resumeSnippet: 'Machine Learning, Scikit-learn, Pandas, NumPy, NLP, Python, PostgreSQL, Statistics.',
    skills: ['python', 'machine_learning', 'data_analysis', 'data_visualization', 'nlp', 'statistics_math', 'postgresql', 'sql', 'git'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's8',
    rollNo: '21AD015',
    name: 'Gowtham Vasan',
    branch: 'AI & DS',
    section: 'A',
    cgpa: 8.3,
    email: 'gowtham.v@college.edu',
    phone: '98401 11008',
    resumeSnippet: 'Python, Deep Learning, PyTorch, Computer Vision, Generative AI, SQL, Git.',
    skills: ['python', 'machine_learning', 'deep_learning', 'pytorch', 'generative_ai', 'sql', 'git'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's9',
    rollNo: '21CS045',
    name: 'Harish Venkatesan',
    branch: 'CSE',
    section: 'B',
    cgpa: 7.4,
    email: 'harish.v@college.edu',
    phone: '98401 11009',
    resumeSnippet: 'C, C++, basic OOP, SQL queries, HTML/CSS, eager to learn.',
    skills: ['c_programming', 'cpp', 'oop', 'sql', 'html_css', 'problem_solving'],
    placementStatus: 'Not Placed'
  },
  {
    id: 's10',
    rollNo: '21CS052',
    name: 'Ishwarya Balan',
    branch: 'CSE',
    section: 'B',
    cgpa: 8.9,
    email: 'ishwariya.b@college.edu',
    phone: '98401 11010',
    resumeSnippet: 'Java, Spring Boot, Microservices, AWS (EC2, S3), Docker, PostgreSQL, REST API, DSA.',
    skills: ['java', 'spring_boot', 'microservices', 'aws', 'docker', 'postgresql', 'sql', 'rest_api', 'dsa', 'oop', 'git'],
    placementStatus: 'Offer in Hand'
  },
  {
    id: 's11',
    rollNo: '21IT033',
    name: 'Jagadeeshwaran M',
    branch: 'IT',
    section: 'B',
    cgpa: 7.8,
    email: 'jagadeesh.m@college.edu',
    phone: '98401 11011',
    resumeSnippet: 'JavaScript, TypeScript, React, Next.js, CSS, MongoDB, Git.',
    skills: ['javascript', 'typescript', 'react', 'next_js', 'html_css', 'mongodb', 'git'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's12',
    rollNo: '21EC035',
    name: 'Kavitha Murugesan',
    branch: 'ECE',
    section: 'A',
    cgpa: 8.5,
    email: 'kavitha.m@college.edu',
    phone: '98401 11012',
    resumeSnippet: 'C++, Python, basic DSA (Arrays, Stacks), DBMS, Computer Networks, Communication.',
    skills: ['cpp', 'python', 'dsa', 'dbms_concepts', 'computer_networks', 'communication', 'problem_solving'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's13',
    rollNo: '21CS060',
    name: 'Lokesh Manikandan',
    branch: 'CSE',
    section: 'A',
    cgpa: 8.2,
    email: 'lokesh.m@college.edu',
    phone: '98401 11013',
    resumeSnippet: 'Java, DSA, DBMS, OS, Computer Networks, SQL, Git, Linux.',
    skills: ['java', 'dsa', 'oop', 'dbms_concepts', 'os_concepts', 'computer_networks', 'sql', 'git', 'linux'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's14',
    rollNo: '21AD029',
    name: 'Madhavan Rajendran',
    branch: 'AI & DS',
    section: 'A',
    cgpa: 7.7,
    email: 'madhavan.r@college.edu',
    phone: '98401 11014',
    resumeSnippet: 'Python, Pandas, Matplotlib, Data Analysis, SQL, Power BI, Teamwork.',
    skills: ['python', 'data_analysis', 'data_visualization', 'sql', 'teamwork', 'communication'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's15',
    rollNo: '21IT048',
    name: 'Nivetha Selvam',
    branch: 'IT',
    section: 'B',
    cgpa: 8.6,
    email: 'nivetha.s@college.edu',
    phone: '98401 11015',
    resumeSnippet: 'Full stack development: React, Node.js, Express, MySQL, REST API, Git, Postman.',
    skills: ['javascript', 'react', 'node_js', 'express_js', 'mysql', 'sql', 'rest_api', 'git', 'communication'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's16',
    rollNo: '21CS077',
    name: 'Praneeth Reddy',
    branch: 'CSE',
    section: 'B',
    cgpa: 8.0,
    email: 'praneeth.r@college.edu',
    phone: '98401 11016',
    resumeSnippet: 'Python, Django, PostgreSQL, REST API, Git, Docker, Linux.',
    skills: ['python', 'django', 'postgresql', 'sql', 'rest_api', 'git', 'docker', 'linux'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's17',
    rollNo: '21EC049',
    name: 'Ramya Krishnan',
    branch: 'ECE',
    section: 'B',
    cgpa: 7.2,
    email: 'ramya.k@college.edu',
    phone: '98401 11017',
    resumeSnippet: 'C programming, Basic Python, Aptitude, Verbal ability, Quick learner.',
    skills: ['c_programming', 'python', 'problem_solving', 'communication'],
    placementStatus: 'Not Placed'
  },
  {
    id: 's18',
    rollNo: '21AD038',
    name: 'Sai Vignesh',
    branch: 'AI & DS',
    section: 'A',
    cgpa: 8.7,
    email: 'sai.vignesh@college.edu',
    phone: '98401 11018',
    resumeSnippet: 'Python, Scikit-learn, TensorFlow, Generative AI (LangChain, Gemini API), Vector DB, Git.',
    skills: ['python', 'machine_learning', 'deep_learning', 'tensorflow', 'generative_ai', 'git', 'problem_solving'],
    placementStatus: 'Ready for Drives'
  },
  {
    id: 's19',
    rollNo: '21CS089',
    name: 'Sneha Chandran',
    branch: 'CSE',
    section: 'A',
    cgpa: 9.2,
    email: 'sneha.c@college.edu',
    phone: '98401 11019',
    resumeSnippet: 'Java, C++, DSA, System Design, Microservices, Spring Boot, AWS, Docker, CI/CD, Git.',
    skills: ['java', 'cpp', 'dsa', 'system_design', 'microservices', 'spring_boot', 'aws', 'docker', 'ci_cd', 'git', 'rest_api', 'sql'],
    placementStatus: 'Offer in Hand'
  },
  {
    id: 's20',
    rollNo: '21IT055',
    name: 'Tharun Kumar',
    branch: 'IT',
    section: 'A',
    cgpa: 7.5,
    email: 'tharun.k@college.edu',
    phone: '98401 11020',
    resumeSnippet: 'HTML, CSS, JavaScript, PHP, MySQL, Apache, Git.',
    skills: ['html_css', 'javascript', 'mysql', 'sql', 'git', 'teamwork'],
    placementStatus: 'Not Placed'
  }
];
