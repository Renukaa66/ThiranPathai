export interface SkillDefinition {
  id: string;
  name: string;
  category: 
    | 'Programming Languages'
    | 'Web & Frameworks'
    | 'Databases & Storage'
    | 'Cloud & DevOps'
    | 'Core CS & DSA'
    | 'AI, ML & Data'
    | 'System Design & APIs'
    | 'Soft Skills & Aptitude';
  aliases: string[];
  prerequisites: string[];
  estimatedHours: number;
  importanceWeight: number; // 1.0 (standard) to 1.5 (high priority in campus placements)
  resources: {
    title: string;
    url: string;
    type: 'docs' | 'youtube' | 'interactive' | 'course';
  }[];
  description: string;
}

export const SKILLS_DATASET: SkillDefinition[] = [
  // --- PROGRAMMING LANGUAGES ---
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    aliases: ['python3', 'py', 'python programming', 'python scripting'],
    prerequisites: [],
    estimatedHours: 25,
    importanceWeight: 1.4,
    resources: [
      { title: 'Python Official Documentation & Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'docs' },
      { title: 'Python for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', type: 'youtube' }
    ],
    description: 'High-level, versatile language widely used in AI, scripting, backend, and data science.'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Programming Languages',
    aliases: ['java8', 'java11', 'java17', 'core java', 'java programming', 'jdk'],
    prerequisites: ['oop'],
    estimatedHours: 35,
    importanceWeight: 1.5,
    resources: [
      { title: 'Oracle Java Documentation', url: 'https://dev.java/', type: 'docs' },
      { title: 'Java Full Course for Beginners', url: 'https://www.youtube.com/watch?v=A74TOX803D0', type: 'youtube' }
    ],
    description: 'Object-oriented language fundamental to enterprise systems, Android, and campus placement drives.'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming Languages',
    aliases: ['c/c++', 'cpp', 'modern c++', 'stl', 'c plus plus'],
    prerequisites: ['c_programming'],
    estimatedHours: 40,
    importanceWeight: 1.4,
    resources: [
      { title: 'cppreference.com', url: 'https://en.cppreference.com/w/', type: 'docs' },
      { title: 'C++ Programming Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y', type: 'youtube' }
    ],
    description: 'High-performance compiled language favored for competitive programming, DSA rounds, and system software.'
  },
  {
    id: 'c_programming',
    name: 'C Language',
    category: 'Programming Languages',
    aliases: ['c programming', 'ansi c', 'c language', 'embedded c'],
    prerequisites: [],
    estimatedHours: 25,
    importanceWeight: 1.2,
    resources: [
      { title: 'C Programming Absolute Beginner Guide', url: 'https://www.learn-c.org/', type: 'interactive' },
      { title: 'C Programming Full Course', url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0', type: 'youtube' }
    ],
    description: 'Procedural foundational language teaching memory management, pointers, and CPU-level computing.'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming Languages',
    aliases: ['js', 'es6', 'ecmascript', 'modern javascript', 'vanilla js'],
    prerequisites: ['html_css'],
    estimatedHours: 30,
    importanceWeight: 1.4,
    resources: [
      { title: 'MDN Web Docs: JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', type: 'docs' },
      { title: 'javascript.info - Modern JavaScript', url: 'https://javascript.info/', type: 'interactive' }
    ],
    description: 'The ubiquitous language of the web, powering frontend browsers and Node.js servers.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Programming Languages',
    aliases: ['ts', 'typescript language', 'typed js'],
    prerequisites: ['javascript'],
    estimatedHours: 20,
    importanceWeight: 1.3,
    resources: [
      { title: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'docs' },
      { title: 'TypeScript Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=d56mG7DezGs', type: 'youtube' }
    ],
    description: 'Typed superset of JavaScript providing static type safety for large-scale enterprise codebases.'
  },
  {
    id: 'c_sharp',
    name: 'C#',
    category: 'Programming Languages',
    aliases: ['csharp', 'c#.net', 'c sharp'],
    prerequisites: ['oop'],
    estimatedHours: 30,
    importanceWeight: 1.2,
    resources: [
      { title: 'Microsoft C# Documentation', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/', type: 'docs' }
    ],
    description: 'Modern, object-oriented language for .NET enterprise systems and game development.'
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Databases & Storage',
    aliases: ['structured query language', 'relational queries', 'sql queries', 'complex queries', 'joins', 'stored procedures'],
    prerequisites: ['dbms_concepts'],
    estimatedHours: 25,
    importanceWeight: 1.5,
    resources: [
      { title: 'SQLZoo Interactive Tutorials', url: 'https://sqlzoo.net/', type: 'interactive' },
      { title: 'Khan Academy SQL Course', url: 'https://www.khanacademy.org/computing/computer-programming/sql', type: 'course' }
    ],
    description: 'Universal language for relational data modeling, query optimization, joins, and transactions.'
  },

  // --- CORE CS & DSA ---
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'Core CS & DSA',
    aliases: ['data structures', 'algorithms', 'dsa', 'data structures and algorithms', 'problem solving', 'competitive programming', 'leetcode'],
    prerequisites: ['cpp'], // or python/java
    estimatedHours: 60,
    importanceWeight: 1.5,
    resources: [
      { title: 'NeetCode Roadmap & DSA Solutions', url: 'https://neetcode.io/roadmap', type: 'interactive' },
      { title: 'Striver A2Z DSA Sheet (takeUforward)', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', type: 'interactive' },
      { title: 'MIT OpenCourseWare: Introduction to Algorithms', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/', type: 'course' }
    ],
    description: 'Arrays, LinkedLists, Trees, Graphs, Dynamic Programming, and algorithmic analysis (Big O).'
  },
  {
    id: 'oop',
    name: 'Object Oriented Programming (OOP)',
    category: 'Core CS & DSA',
    aliases: ['oops', 'oop', 'object-oriented programming', 'encapsulation', 'polymorphism', 'inheritance', 'abstraction', 'solid principles'],
    prerequisites: ['c_programming'],
    estimatedHours: 20,
    importanceWeight: 1.5,
    resources: [
      { title: 'OOP Concepts in Depth (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/', type: 'docs' },
      { title: 'Design Patterns & SOLID in 1 Hour', url: 'https://www.youtube.com/watch?v=tv-_1er1mWI', type: 'youtube' }
    ],
    description: 'Core paradigm behind industrial software: encapsulation, polymorphism, inheritance, abstraction, and SOLID.'
  },
  {
    id: 'dbms_concepts',
    name: 'DBMS & RDBMS Fundamentals',
    category: 'Core CS & DSA',
    aliases: ['dbms', 'rdbms', 'database management systems', 'acid properties', 'normalization', 'indexing', 'transactions'],
    prerequisites: [],
    estimatedHours: 20,
    importanceWeight: 1.4,
    resources: [
      { title: 'DBMS Full Course (Gate Smashers)', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8C436wpFyC36lK45Z', type: 'youtube' }
    ],
    description: 'Relational database architecture, ACID transactions, ER models, indexing, B-trees, and normalization (1NF-BCNF).'
  },
  {
    id: 'os_concepts',
    name: 'Operating Systems Concepts',
    category: 'Core CS & DSA',
    aliases: ['os', 'operating systems', 'process management', 'threads', 'deadlocks', 'memory management', 'paging', 'virtual memory'],
    prerequisites: ['c_programming'],
    estimatedHours: 25,
    importanceWeight: 1.4,
    resources: [
      { title: 'OSTEP: Operating Systems Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', type: 'docs' },
      { title: 'Operating Systems Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdPv8', type: 'youtube' }
    ],
    description: 'Processes, concurrency, multithreading, mutex/semaphores, CPU scheduling, virtual memory, and file systems.'
  },
  {
    id: 'computer_networks',
    name: 'Computer Networks',
    category: 'Core CS & DSA',
    aliases: ['cn', 'computer networks', 'tcp/ip', 'osi model', 'dns', 'http', 'https', 'sockets', 'udp', 'routing protocols'],
    prerequisites: [],
    estimatedHours: 25,
    importanceWeight: 1.4,
    resources: [
      { title: 'Computer Networking: A Top-Down Approach Notes', url: 'https://gaia.cs.umass.edu/kurose_ross/', type: 'docs' },
      { title: 'Computer Networks Playlist by Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_', type: 'youtube' }
    ],
    description: 'TCP/IP stack, OSI 7-layer model, HTTP/HTTPS, DNS resolution, sockets, subnetting, and congestion control.'
  },
  {
    id: 'system_design',
    name: 'System Design Basics',
    category: 'System Design & APIs',
    aliases: ['system design', 'low level design', 'lld', 'hld', 'high level design', 'scalability', 'load balancing', 'caching', 'sharding'],
    prerequisites: ['dbms_concepts', 'computer_networks', 'oop'],
    estimatedHours: 35,
    importanceWeight: 1.3,
    resources: [
      { title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer', type: 'docs' },
      { title: 'Grokking the System Design Interview Guide', url: 'https://www.youtube.com/watch?v=m8Icp_Cid5o', type: 'youtube' }
    ],
    description: 'Architecting scalable applications with microservices, CDNs, message brokers, caching (Redis), and load balancers.'
  },

  // --- WEB & FRAMEWORKS ---
  {
    id: 'html_css',
    name: 'HTML5 & CSS3',
    category: 'Web & Frameworks',
    aliases: ['html', 'html5', 'css', 'css3', 'responsive design', 'flexbox', 'css grid'],
    prerequisites: [],
    estimatedHours: 15,
    importanceWeight: 1.2,
    resources: [
      { title: 'MDN Web Docs HTML & CSS', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', type: 'docs' },
      { title: 'Responsive Web Design (freeCodeCamp)', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', type: 'interactive' }
    ],
    description: 'Semantic markup, styling, modern responsive CSS layouts, Flexbox, and Grid.'
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Web & Frameworks',
    aliases: ['react', 'reactjs', 'react.js', 'react hooks', 'react frontend', 'jsx'],
    prerequisites: ['javascript', 'html_css'],
    estimatedHours: 30,
    importanceWeight: 1.5,
    resources: [
      { title: 'React Official Documentation', url: 'https://react.dev/', type: 'docs' },
      { title: 'React Full Course for Beginners', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', type: 'youtube' }
    ],
    description: 'Component-based UI library with reactive state hooks, virtual DOM, and rich ecosystem.'
  },
  {
    id: 'node_js',
    name: 'Node.js',
    category: 'Web & Frameworks',
    aliases: ['nodejs', 'node', 'node.js runtime', 'server-side javascript'],
    prerequisites: ['javascript'],
    estimatedHours: 25,
    importanceWeight: 1.4,
    resources: [
      { title: 'Node.js Official Documentation', url: 'https://nodejs.org/en/docs', type: 'docs' },
      { title: 'Node.js and Express Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', type: 'youtube' }
    ],
    description: 'Asynchronous event-driven JavaScript server runtime powered by Chrome V8 engine.'
  },
  {
    id: 'express_js',
    name: 'Express.js',
    category: 'Web & Frameworks',
    aliases: ['express', 'expressjs', 'express.js', 'express framework'],
    prerequisites: ['node_js'],
    estimatedHours: 15,
    importanceWeight: 1.3,
    resources: [
      { title: 'Express.js Getting Started Guide', url: 'https://expressjs.com/', type: 'docs' }
    ],
    description: 'Minimalist, flexible Node.js web application framework for routing and middleware.'
  },
  {
    id: 'spring_boot',
    name: 'Spring Boot',
    category: 'Web & Frameworks',
    aliases: ['springboot', 'spring boot', 'spring framework', 'spring mvc', 'spring data jpa', 'spring security'],
    prerequisites: ['java', 'oop', 'sql'],
    estimatedHours: 40,
    importanceWeight: 1.5,
    resources: [
      { title: 'Spring Boot Official Quickstart', url: 'https://spring.io/quickstart', type: 'docs' },
      { title: 'Spring Boot Tutorial for Beginners (Telusko)', url: 'https://www.youtube.com/watch?v=35EQXmHKZYs', type: 'youtube' }
    ],
    description: 'Industry-standard enterprise Java framework for microservices, dependency injection, and REST controllers.'
  },
  {
    id: 'django',
    name: 'Django',
    category: 'Web & Frameworks',
    aliases: ['django framework', 'django rest framework', 'drf', 'python django'],
    prerequisites: ['python', 'sql'],
    estimatedHours: 30,
    importanceWeight: 1.3,
    resources: [
      { title: 'Django Official Documentation', url: 'https://docs.djangoproject.com/en/stable/', type: 'docs' }
    ],
    description: 'Batteries-included Python web framework with built-in ORM, admin panel, and authentication.'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Web & Frameworks',
    aliases: ['fast api', 'fastapi framework', 'pydantic apis', 'async python web'],
    prerequisites: ['python'],
    estimatedHours: 20,
    importanceWeight: 1.3,
    resources: [
      { title: 'FastAPI Official Documentation', url: 'https://fastapi.tiangolo.com/', type: 'docs' }
    ],
    description: 'High-performance, async Python web framework for building APIs with automatic OpenAPI docs.'
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'Web & Frameworks',
    aliases: ['angularjs', 'angular 2+', 'angular framework', 'ng'],
    prerequisites: ['typescript', 'html_css'],
    estimatedHours: 35,
    importanceWeight: 1.2,
    resources: [
      { title: 'Angular Official Documentation', url: 'https://angular.dev/', type: 'docs' }
    ],
    description: 'Comprehensive enterprise frontend framework by Google featuring two-way binding and RxJS.'
  },
  {
    id: 'next_js',
    name: 'Next.js',
    category: 'Web & Frameworks',
    aliases: ['nextjs', 'next.js', 'server side rendering', 'ssr', 'react server components'],
    prerequisites: ['react'],
    estimatedHours: 25,
    importanceWeight: 1.3,
    resources: [
      { title: 'Next.js Learn Interactive Course', url: 'https://nextjs.org/learn', type: 'interactive' }
    ],
    description: 'The React framework for the Web with Server-Side Rendering (SSR), SSG, and file-based routing.'
  },
  {
    id: 'tailwind_css',
    name: 'Tailwind CSS',
    category: 'Web & Frameworks',
    aliases: ['tailwindcss', 'tailwind', 'utility-first css'],
    prerequisites: ['html_css'],
    estimatedHours: 15,
    importanceWeight: 1.2,
    resources: [
      { title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs', type: 'docs' }
    ],
    description: 'Utility-first CSS framework for rapidly building modern, responsive user interfaces.'
  },

  // --- SYSTEM DESIGN & APIS ---
  {
    id: 'rest_api',
    name: 'RESTful API Design',
    category: 'System Design & APIs',
    aliases: [
      'rest api',
      'restful services',
      'restful apis',
      'rest endpoints',
      'restful web services',
      'rest architecture',
      'api design',
      'web services',
      'http methods'
    ],
    prerequisites: ['computer_networks'],
    estimatedHours: 20,
    importanceWeight: 1.5,
    resources: [
      { title: 'RESTful API Design Guide', url: 'https://restfulapi.net/', type: 'docs' },
      { title: 'APIs for Beginners - How to use an API', url: 'https://www.youtube.com/watch?v=GZvSYJ29con', type: 'youtube' }
    ],
    description: 'Designing stateless HTTP APIs with proper verbs (GET, POST, PUT, DELETE), status codes, and JSON schemas.'
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'System Design & APIs',
    aliases: ['graph ql', 'graphql api', 'apollo client', 'graphql schema'],
    prerequisites: ['rest_api'],
    estimatedHours: 20,
    importanceWeight: 1.2,
    resources: [
      { title: 'GraphQL Official Introduction', url: 'https://graphql.org/learn/', type: 'docs' }
    ],
    description: 'Query language for APIs letting clients request exactly the data attributes they need.'
  },
  {
    id: 'microservices',
    name: 'Microservices Architecture',
    category: 'System Design & APIs',
    aliases: ['microservices', 'micro-service', 'distributed systems', 'service oriented architecture', 'soa', 'api gateway'],
    prerequisites: ['rest_api', 'docker'],
    estimatedHours: 30,
    importanceWeight: 1.4,
    resources: [
      { title: 'Microservices.io Pattern Guide', url: 'https://microservices.io/', type: 'docs' }
    ],
    description: 'Decomposing large monolithic applications into independently deployable, loosely coupled services.'
  },

  // --- DATABASES & STORAGE ---
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Databases & Storage',
    aliases: ['postgres', 'postgresql database', 'pgsql'],
    prerequisites: ['sql'],
    estimatedHours: 20,
    importanceWeight: 1.4,
    resources: [
      { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'interactive' }
    ],
    description: 'Advanced open-source object-relational database with complex queries, JSONB, and concurrency.'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Databases & Storage',
    aliases: ['mysql database', 'mysql rdbms', 'innodb'],
    prerequisites: ['sql'],
    estimatedHours: 20,
    importanceWeight: 1.4,
    resources: [
      { title: 'MySQL Documentation & Tutorial', url: 'https://dev.mysql.com/doc/', type: 'docs' }
    ],
    description: 'Widely deployed open-source relational database powering LAMP stack and web services.'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Databases & Storage',
    aliases: ['mongo', 'mongodb database', 'nosql', 'document database', 'mongoose', 'bson'],
    prerequisites: ['dbms_concepts'],
    estimatedHours: 20,
    importanceWeight: 1.4,
    resources: [
      { title: 'MongoDB University Free Courses', url: 'https://learn.mongodb.com/', type: 'course' },
      { title: 'MongoDB Crash Course (Web Dev Simplified)', url: 'https://www.youtube.com/watch?v=ofme2o29ngU', type: 'youtube' }
    ],
    description: 'Leading document-based NoSQL database using JSON-like schemas for flexible data models.'
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'Databases & Storage',
    aliases: ['redis cache', 'in-memory data store', 'key-value store', 'redis pub/sub', 'caching'],
    prerequisites: ['dbms_concepts'],
    estimatedHours: 15,
    importanceWeight: 1.3,
    resources: [
      { title: 'Redis University & Official Docs', url: 'https://redis.io/docs/', type: 'docs' }
    ],
    description: 'In-memory key-value data structure store used as a cache, message broker, and streaming engine.'
  },

  // --- CLOUD & DEVOPS ---
  {
    id: 'linux',
    name: 'Linux / Unix CLI',
    category: 'Cloud & DevOps',
    aliases: ['linux', 'unix', 'bash', 'shell scripting', 'cli', 'terminal', 'ubuntu', 'linux administration'],
    prerequisites: [],
    estimatedHours: 20,
    importanceWeight: 1.4,
    resources: [
      { title: 'Linux Journey (Interactive)', url: 'https://linuxjourney.com/', type: 'interactive' },
      { title: 'Linux Command Line Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=ZtqBQ68cfJc', type: 'youtube' }
    ],
    description: 'Command line operations, file permissions, process inspection, SSH, and shell scripting.'
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Cloud & DevOps',
    aliases: ['git', 'github', 'version control', 'git branching', 'pull requests', 'gitlab', 'vcs'],
    prerequisites: [],
    estimatedHours: 15,
    importanceWeight: 1.5,
    resources: [
      { title: 'Pro Git Book (Free)', url: 'https://git-scm.com/book/en/v2', type: 'docs' },
      { title: 'Git and GitHub for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', type: 'youtube' }
    ],
    description: 'Distributed version control, merge conflict resolution, pull request collaboration, and commit history.'
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    category: 'Cloud & DevOps',
    aliases: ['docker', 'containerization', 'containers', 'dockerfile', 'docker-compose', 'container management'],
    prerequisites: ['linux'],
    estimatedHours: 25,
    importanceWeight: 1.4,
    resources: [
      { title: 'Docker Official Getting Started', url: 'https://docs.docker.com/get-started/', type: 'docs' },
      { title: 'Docker Tutorial for Beginners (TechWorld with Nana)', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', type: 'youtube' }
    ],
    description: 'Packaging applications and dependencies into standardized containers for consistent execution across environments.'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes (K8s)',
    category: 'Cloud & DevOps',
    aliases: ['k8s', 'kubernetes', 'container orchestration', 'pods', 'k8s clusters'],
    prerequisites: ['docker', 'computer_networks'],
    estimatedHours: 35,
    importanceWeight: 1.2,
    resources: [
      { title: 'Kubernetes Basics Official Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', type: 'docs' }
    ],
    description: 'Automated container deployment, scaling, rolling updates, and cluster management.'
  },
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    category: 'Cloud & DevOps',
    aliases: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloud computing', 'aws cloud', 'iam'],
    prerequisites: ['linux', 'computer_networks'],
    estimatedHours: 35,
    importanceWeight: 1.4,
    resources: [
      { title: 'AWS Skill Builder Free Tier Training', url: 'https://explore.skillbuilder.aws/', type: 'course' },
      { title: 'AWS Certified Cloud Practitioner Training (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=SOTamWNgDKc', type: 'youtube' }
    ],
    description: 'Leading cloud platform: EC2 compute, S3 object storage, Lambda serverless, IAM security, and RDS.'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'Cloud & DevOps',
    aliases: ['azure', 'microsoft azure', 'azure cloud', 'azure devops', 'azure vm'],
    prerequisites: ['linux', 'computer_networks'],
    estimatedHours: 30,
    importanceWeight: 1.2,
    resources: [
      { title: 'Microsoft Learn Azure Fundamentals AZ-900', url: 'https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/', type: 'course' }
    ],
    description: 'Microsoft cloud services ecosystem for enterprise hosting, identity, and container workloads.'
  },
  {
    id: 'ci_cd',
    name: 'CI/CD Pipelines',
    category: 'Cloud & DevOps',
    aliases: ['ci/cd', 'continuous integration', 'continuous delivery', 'github actions', 'jenkins', 'devops pipeline'],
    prerequisites: ['git', 'docker'],
    estimatedHours: 20,
    importanceWeight: 1.3,
    resources: [
      { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', type: 'docs' }
    ],
    description: 'Automating build, test, lint, and deployment workflows triggered on git commits.'
  },

  // --- AI, ML & DATA ---
  {
    id: 'machine_learning',
    name: 'Machine Learning',
    category: 'AI, ML & Data',
    aliases: ['machine learning', 'ml', 'supervised learning', 'unsupervised learning', 'scikit-learn', 'classification', 'regression', 'clustering'],
    prerequisites: ['python', 'statistics_math'],
    estimatedHours: 40,
    importanceWeight: 1.4,
    resources: [
      { title: 'Andrew Ng Machine Learning Specialization (Coursera/DeepLearning.AI)', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'course' },
      { title: 'Scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'docs' }
    ],
    description: 'Algorithms that learn patterns from data: linear models, decision trees, random forests, and SVMs.'
  },
  {
    id: 'deep_learning',
    name: 'Deep Learning & Neural Networks',
    category: 'AI, ML & Data',
    aliases: ['deep learning', 'dl', 'neural networks', 'ann', 'cnn', 'rnn', 'lstm', 'transformers'],
    prerequisites: ['machine_learning'],
    estimatedHours: 45,
    importanceWeight: 1.3,
    resources: [
      { title: 'DeepLearning.AI Specialization', url: 'https://www.deeplearning.ai/courses/deep-learning-specialization/', type: 'course' },
      { title: 'MIT 6.S191 Introduction to Deep Learning', url: 'http://introtodeeplearning.com/', type: 'youtube' }
    ],
    description: 'Multi-layer artificial neural networks, backpropagation, convolutional networks, and transformer architectures.'
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI, ML & Data',
    aliases: ['pytorch', 'torch', 'tensors', 'torchvision', 'deep learning with pytorch'],
    prerequisites: ['python', 'deep_learning'],
    estimatedHours: 30,
    importanceWeight: 1.3,
    resources: [
      { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/', type: 'docs' }
    ],
    description: 'Pythonic dynamic deep learning framework widely used in research and production AI.'
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow / Keras',
    category: 'AI, ML & Data',
    aliases: ['tensorflow', 'tf', 'keras', 'tf2', 'tensorflow lite'],
    prerequisites: ['python', 'deep_learning'],
    estimatedHours: 30,
    importanceWeight: 1.2,
    resources: [
      { title: 'TensorFlow Core Tutorials', url: 'https://www.tensorflow.org/tutorials', type: 'docs' }
    ],
    description: 'End-to-end open-source machine learning platform developed by Google.'
  },
  {
    id: 'data_analysis',
    name: 'Data Analysis (Pandas & NumPy)',
    category: 'AI, ML & Data',
    aliases: ['pandas', 'numpy', 'data analysis', 'data manipulation', 'data wrangling', 'eda', 'exploratory data analysis'],
    prerequisites: ['python'],
    estimatedHours: 25,
    importanceWeight: 1.4,
    resources: [
      { title: '10 Minutes to pandas', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', type: 'docs' },
      { title: 'Python for Data Analysis Book Material', url: 'https://wesmckinney.com/book/', type: 'docs' }
    ],
    description: 'Vectorized computing with NumPy arrays and tabular data manipulation with Pandas DataFrames.'
  },
  {
    id: 'data_visualization',
    name: 'Data Visualization (Matplotlib & Seaborn)',
    category: 'AI, ML & Data',
    aliases: ['matplotlib', 'seaborn', 'data visualization', 'tableau', 'power bi', 'plotting', 'charts'],
    prerequisites: ['python', 'data_analysis'],
    estimatedHours: 15,
    importanceWeight: 1.2,
    resources: [
      { title: 'Matplotlib User Guide', url: 'https://matplotlib.org/stable/users/index.html', type: 'docs' }
    ],
    description: 'Visual storytelling: scatter plots, histograms, heatmaps, bar charts, and business intelligence dashboards.'
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing (NLP)',
    category: 'AI, ML & Data',
    aliases: ['nlp', 'natural language processing', 'spacy', 'nltk', 'text processing', 'tokenization', 'named entity recognition', 'sentiment analysis', 'llm'],
    prerequisites: ['machine_learning'],
    estimatedHours: 30,
    importanceWeight: 1.3,
    resources: [
      { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course/', type: 'interactive' },
      { title: 'spaCy 101: Everything you need to know', url: 'https://spacy.io/usage/spacy-101', type: 'docs' }
    ],
    description: 'Computational linguistics, vector text representations, tokenization, embeddings, and Transformer LLMs.'
  },
  {
    id: 'generative_ai',
    name: 'Generative AI & LLMs',
    category: 'AI, ML & Data',
    aliases: ['genai', 'generative ai', 'prompt engineering', 'langchain', 'rag', 'vector databases', 'gemini api', 'openai api'],
    prerequisites: ['python', 'nlp'],
    estimatedHours: 25,
    importanceWeight: 1.4,
    resources: [
      { title: 'Google Cloud Generative AI Learning Path', url: 'https://www.cloudskillsboost.google/journeys/118', type: 'course' },
      { title: 'LangChain Documentation & Quickstart', url: 'https://python.langchain.com/docs/get_started/introduction', type: 'docs' }
    ],
    description: 'Building retrieval-augmented generation (RAG) agents, semantic vector search, and LLM application engineering.'
  },
  {
    id: 'statistics_math',
    name: 'Probability, Statistics & Linear Algebra',
    category: 'AI, ML & Data',
    aliases: ['statistics', 'probability', 'linear algebra', 'multivariable calculus', 'hypothesis testing', 'matrix operations'],
    prerequisites: [],
    estimatedHours: 30,
    importanceWeight: 1.3,
    resources: [
      { title: '3Blue1Brown: Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', type: 'youtube' },
      { title: 'Khan Academy Statistics and Probability', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'course' }
    ],
    description: 'Foundations for Machine Learning, model evaluation, confidence intervals, eigenvalues, and vectors.'
  },

  // --- SOFT SKILLS & APTITUDE ---
  {
    id: 'communication',
    name: 'Verbal & Written Communication',
    category: 'Soft Skills & Aptitude',
    aliases: ['communication skills', 'verbal communication', 'written communication', 'presentation skills', 'interpersonal skills', 'english communication'],
    prerequisites: [],
    estimatedHours: 15,
    importanceWeight: 1.5,
    resources: [
      { title: 'Effective Communication for Engineers', url: 'https://www.youtube.com/watch?v=8mG530s9B3U', type: 'youtube' }
    ],
    description: 'Articulating technical thoughts clearly during HR interviews, group discussions, and daily standups.'
  },
  {
    id: 'problem_solving',
    name: 'Analytical Problem Solving',
    category: 'Soft Skills & Aptitude',
    aliases: ['problem solving', 'analytical skills', 'critical thinking', 'logical reasoning', 'quantitative aptitude', 'puzzles'],
    prerequisites: [],
    estimatedHours: 30,
    importanceWeight: 1.5,
    resources: [
      { title: 'IndiaBIX Quantitative Aptitude & Logical Reasoning', url: 'https://www.indiabix.com/', type: 'interactive' }
    ],
    description: 'Quantitative aptitude, speed math, logical deduction, and structured thinking for campus placement online tests.'
  },
  {
    id: 'teamwork',
    name: 'Teamwork & Collaboration',
    category: 'Soft Skills & Aptitude',
    aliases: ['team player', 'teamwork', 'collaboration', 'agile', 'scrum', 'cross-functional collaboration'],
    prerequisites: [],
    estimatedHours: 10,
    importanceWeight: 1.3,
    resources: [
      { title: 'Atlassian Agile Coach & Scrum Guide', url: 'https://www.atlassian.com/agile', type: 'docs' }
    ],
    description: 'Sprint planning, peer code reviews, active listening, and working harmoniously in sprint teams.'
  },
  {
    id: 'unit_testing',
    name: 'Unit Testing & TDD',
    category: 'Core CS & DSA',
    aliases: ['unit testing', 'testing', 'tdd', 'test driven development', 'jest', 'junit', 'pytest', 'integration testing', 'mocking'],
    prerequisites: ['oop'],
    estimatedHours: 15,
    importanceWeight: 1.3,
    resources: [
      { title: 'Jest Testing Framework Docs', url: 'https://jestjs.io/docs/getting-started', type: 'docs' },
      { title: 'JUnit 5 User Guide', url: 'https://junit.org/junit5/docs/current/user-guide/', type: 'docs' }
    ],
    description: 'Writing unit tests, assertions, mocks, and adhering to test-driven development best practices.'
  },
  {
    id: 'web_security',
    name: 'Web Security & Auth (JWT/OAuth)',
    category: 'System Design & APIs',
    aliases: ['security', 'web security', 'owasp', 'jwt', 'json web tokens', 'oauth', 'oauth2', 'authentication', 'authorization', 'cors', 'csrf', 'xss'],
    prerequisites: ['computer_networks', 'rest_api'],
    estimatedHours: 20,
    importanceWeight: 1.4,
    resources: [
      { title: 'OWASP Top 10 Security Vulnerabilities', url: 'https://owasp.org/www-project-top-ten/', type: 'docs' }
    ],
    description: 'Protecting web apps against XSS/CSRF, managing tokens (JWT), cookies, and OAuth authentication flows.'
  },
  {
    id: 'message_queues',
    name: 'Message Queues (Kafka & RabbitMQ)',
    category: 'System Design & APIs',
    aliases: ['kafka', 'apache kafka', 'rabbitmq', 'message queue', 'pub/sub', 'event driven', 'event-driven architecture', 'asynchronous messaging'],
    prerequisites: ['system_design'],
    estimatedHours: 25,
    importanceWeight: 1.3,
    resources: [
      { title: 'Apache Kafka Quickstart', url: 'https://kafka.apache.org/quickstart', type: 'docs' }
    ],
    description: 'Decoupled asynchronous event streaming and publish-subscribe messaging across distributed nodes.'
  },
  {
    id: 'mobile_dev',
    name: 'Mobile App Development (Flutter/React Native)',
    category: 'Web & Frameworks',
    aliases: ['mobile development', 'flutter', 'react native', 'android app', 'ios app', 'dart', 'cross-platform mobile'],
    prerequisites: ['javascript', 'oop'],
    estimatedHours: 35,
    importanceWeight: 1.2,
    resources: [
      { title: 'Flutter Official Documentation', url: 'https://docs.flutter.dev/', type: 'docs' }
    ],
    description: 'Building cross-platform mobile apps for Android and iOS using Flutter/Dart or React Native.'
  },
  {
    id: 'cloud_data_engineering',
    name: 'Data Engineering & ETL',
    category: 'AI, ML & Data',
    aliases: ['data engineering', 'etl', 'data pipelines', 'bigquery', 'snowflake', 'spark', 'apache spark', 'data warehouse'],
    prerequisites: ['sql', 'python'],
    estimatedHours: 35,
    importanceWeight: 1.3,
    resources: [
      { title: 'Data Engineering Zoomcamp (Free)', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp', type: 'course' }
    ],
    description: 'Extract, Transform, and Load (ETL) pipelines, data lakehouses, and big data processing with Apache Spark.'
  }
];

// Quick index lookup map
export const SKILLS_MAP = new Map<string, SkillDefinition>(
  SKILLS_DATASET.map(skill => [skill.id, skill])
);
