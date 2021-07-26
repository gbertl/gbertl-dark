import img from "../assets/img";

const items = [
  {
    id: 1,
    categories: ["html-css"],
    thumbnail: img.archmove1,
    screenshots: [img.archmove1, img.archmove2],
    title: "Arch Move",
    description: `Converted <a href='https://www.figma.com/file/bPXoHMcjOkFyxR3McYJRZQ/Archmove---Architech-Marketplace?node-id=1%3A2' target='_blank'>this</a> figma design to HTML. Built with custom vanillaJS components. Source code at <a href="https://github.com/gilbertlc/archmove" target='_blank'>https://github.com/gilbertlc/archmove</a>`,
    created: "2021",
    technologies: ["HTML5", "CSS3 (SASS)", "JavaScript (ES6)"],
    role: ["Front-End"],
    url: "https://gilbertlc.github.io/archmove/",
  },
  {
    id: 2,
    categories: ["html-css", "react"],
    thumbnail: img.portfolio1,
    screenshots: [img.portfolio1, img.portfolio2, img.portfolio3],
    title: "Personal Portfolio",
    description:
      "Built a portfolio website to showcase my recent projects. I've used React, styled and animate it with CSS, and VanillaJS for building modal, slider, pagination, etc. You can check out the link to my source code below.",
    created: "2021",
    technologies: ["HTML", "CSS (preprocessed w/ SASS)", "JavaScript", "React"],
    role: ["Front-End"],
    url: "https://github.com/gilbertlc/gilbert-portfolio",
  },
  {
    id: 3,
    categories: ["bootstrap", "full-stack"],
    thumbnail: img.diliDashboard,
    screenshots: [
      img.diliDashboard,
      img.diliResidents,
      img.diliEvents,
      img.diliCertificates,
    ],
    title: "Dili Management System",
    description:
      "DMS is a system for collecting, sorting, retrieving and processing information of the residents in barangay which is used, or desired, by one of more managers, in the performance of their duties. This is our thesis back in college, we were consist of 3 individuals and I am the lead developer and designer of this project.",
    created: "2017",
    technologies: ["HTML", "CSS", "jQuery", "Bootstrap", "Django", "MySQL"],
    role: ["Front-End", "Back-End"],
  },
  {
    id: 4,
    categories: ["bootstrap", "full-stack"],
    thumbnail: img.sjnhsLogin,
    screenshots: [
      img.sjnhsLogin,
      img.sjnhsVote,
      img.sjnhsResults,
      img.sjnhsStudents,
      img.sjnhsCandidates,
    ],
    title: "SJNHS Voting System",
    description:
      "Built a voting system for a local secondary school for a client's thesis as well as help them write a documentation for it. I used Bootstrap for styling and PHP in the back-end.",
    created: "2017",
    technologies: ["HTML", "CSS", "jQuery", "Bootstrap", "PHP", "MySQL"],
    role: ["Front-End", "Back-End"],
  },
];

export default items;
