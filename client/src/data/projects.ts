export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  solution: string;
  github: string;
  live: string;
  accent: string;
};

export const projects: Project[] = [


  {
    id: 1,
    title: "Real Estate Website",
    category: "FRONTEND / WEB DESIGN",
    description:
      "A responsive real estate website displaying houses for sale, lands for sale, and houses for rent with prices and locations.",
    technologies: ["HTML", "CSS"],
    features: [
      "House sale listings",
      "Land sale listings",
      "House rental listings",
      "Property price information",
      "Property location information",
      "Responsive website layout"
    ],
    solution:
      "The website provides a simple and clear interface for displaying real estate properties. HTML and CSS are used to organize property categories, prices, locations and listing information.",
    github: "https://github.com/SafeekAbdullah/Property-expert",
    live: "https://propertyexpertsales.vercel.app/",
    accent: "#00D4FF"
  },
  {
    id: 2,
    title: "E-Commerce Website for Clothing Store",
    category: "FULL-STACK / E-COMMERCE",
    description:
      "A full-stack men's clothing e-commerce website with product browsing, user authentication, shopping cart, online payment, Cash on Delivery, and stock management.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    features: [
      "User registration and login",
      "Product browsing and product details",
      "Shopping cart",
      "Cash on Delivery",
      "Online payment",
      "Stock management",
      "Automatic stock reduction after orders",
      "Admin product management"
    ],
    solution:
      "The system combines a responsive frontend with PHP and MySQL to provide a complete e-commerce workflow. Customers can browse products, add items to the cart and place orders, while administrators can manage products and stock.",
    github: "https://github.com/SafeekAbdullah/lookatme-dress-point",
    live: "look@me.com",
    accent: "#D4FF00"
  },
  {
    id: 3,
    title: "Student Management System",
    category: "PHP / MYSQL",
    description:
      "A PHP and MySQL based system for managing student registration, teacher registration, and subject-wise teacher assignments.",
    technologies: ["PHP", "MySQL"],
    features: [
      "Student registration",
      "Student details management",
      "Teacher registration",
      "Subject management",
      "Subject-wise teacher assignment",
      "Add and remove teacher assignments"
    ],
    solution:
      "The system uses PHP for application logic and MySQL for storing student, teacher and subject information. It simplifies the management of academic records and teacher-subject assignments.",
    github: "https://github.com/SafeekAbdullah/Property-expert",
    live: "students.com",
    accent: "#7C5CFF"
  }
  
];

export default projects;