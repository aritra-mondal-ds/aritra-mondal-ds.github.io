import { Experience, Education } from "@/types";

export const experiencesData: Experience[] = [
  {
    id: "amadeus",
    role: "Data Scientist (Apprentice)",
    company: "Amadeus",
    location: "Nice / Sophia Antipolis & Remote, France",
    period: "Aug 2023 – Sep 2024",
    type: "Apprenticeship",
    summary:
      "Core contributor to production machine learning and distributed data pipelines for airline revenue management and passenger demand forecasting at global travel tech leader Amadeus.",
    achievements: [
      "Engineered and deployed production machine learning pipelines for airline demand forecasting running on distributed AWS EMR clusters and Amazon S3.",
      "Accelerated ETL batch processing performance by 35% by re-architecting and migrating legacy PySpark workflows to native Scala, eliminating JVM-Python IPC overhead.",
      "Constructed automated CI/CD workflows using Jenkins and robust Bash automation, standardizing testing and deploying reproducible pipeline artifacts.",
      "Engineered scalable feature pipelines over large structured datasets formatted in Parquet, feeding high-throughput downstream machine learning and predictive models.",
    ],
    technologies: [
      "Apache Spark",
      "Scala",
      "PySpark",
      "AWS EMR",
      "AWS S3",
      "Parquet",
      "Jenkins",
      "Bash",
      "Python",
    ],
    logoText: "1A",
  },
  {
    id: "jungleworks",
    role: "Android Developer (Intern)",
    company: "Jungleworks",
    location: "Chandigarh, India",
    period: "Nov 2020 – Apr 2021",
    type: "Internship",
    summary:
      "Engineered native mobile client software and backend REST API integrations with an emphasis on code stability and defensive programming.",
    achievements: [
      "Developed modular Android applications utilizing Java and Kotlin, ensuring smooth lifecycle handling and responsive UI rendering.",
      "Integrated RESTful API endpoints for asynchronous client-server communications with robust offline caching and error resilience.",
      "Instituted systematic testing, unit test cases, and debugging workflows that eliminated core crash vectors and elevated app store stability metrics.",
    ],
    technologies: ["Java", "Kotlin", "Android SDK", "REST APIs", "Git", "JUnit"],
    logoText: "JW",
  },
];

export const educationData: Education[] = [
  {
    id: "dsti",
    degree: "Applied MSc in Data Science & Artificial Intelligence",
    institution: "Data ScienceTech Institute (DSTI)",
    location: "Sophia Antipolis / Paris, France",
    period: "2022 – 2024",
    honors: "First Class / Summa Cum Laude (Félicitations du Jury)",
    frenchEquivalent: "Diplôme Grade de Master / Bac+5 Équivalent",
    description:
      "Elite French professional postgraduate curriculum in advanced machine learning, distributed computing, and cloud architectures. Completed concurrently with a 1-year corporate apprenticeship at Amadeus.",
    skillsGained: [
      "Distributed Big Data Systems (Spark, Hadoop)",
      "Deep Learning & Statistical Modeling",
      "Cloud Architectures (AWS, Azure)",
      "MLOps & Production Engineering",
      "Graph Analytics (Neo4j)",
    ],
  },
  {
    id: "northumbria",
    degree: "BSc (Hons) Computer Security",
    institution: "Northumbria University",
    location: "Newcastle upon Tyne, United Kingdom",
    period: "2017 – 2020",
    honors: "Honours Degree",
    frenchEquivalent: "Bac+3 Équivalent (Licence d'Informatique / Sécurité)",
    description:
      "Deep technical foundation in operating systems internals, computer networks, cryptography, secure systems design, and defensive threat analysis.",
    skillsGained: [
      "Network Protocols & Telemetry (TCP/IP, UDP, ICMP)",
      "Intrusion Detection Systems (SNORT)",
      "Applied Cryptography & PKI",
      "Database Systems & SQL Optimization",
      "Linux Kernel & Shell Architecture",
    ],
  },
];
