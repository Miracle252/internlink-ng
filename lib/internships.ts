export type Internship = {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    duration: string;
    requirements: string[];
  };
  
  export const internships: Internship[] = [
    {
      id: "1",
      title: "Software Engineering Intern",
      company: "Tech Company",
      location: "Lagos",
      type: "SIWES",
      description:
        "Gain practical experience working on real software projects with a technology team.",
      duration: "3 - 6 months",
      requirements: [
        "Currently studying Computer Science or a related field",
        "Basic knowledge of programming",
        "Willingness to learn",
        "Good communication skills",
      ],
    },
    {
      id: "2",
      title: "UI/UX Design Intern",
      company: "Creative Studio",
      location: "Lagos",
      type: "Internship",
      description:
        "Work with designers to create user-friendly digital experiences and interfaces.",
      duration: "3 months",
      requirements: [
        "Interest in UI/UX design",
        "Basic knowledge of Figma",
        "Understanding of user-centered design",
        "Strong attention to detail",
      ],
    },
    {
      id: "3",
      title: "Data Analyst Intern",
      company: "Fintech Company",
      location: "Remote",
      type: "SIWES",
      description:
        "Learn how businesses use data to make decisions while working with real datasets.",
      duration: "4 months",
      requirements: [
        "Currently studying Computer Science, Statistics, Mathematics, or related field",
        "Basic Excel knowledge",
        "Interest in data analysis",
        "Analytical thinking",
      ],
    },
  ];