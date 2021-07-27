import img from "../assets/img";

let items = [
  {
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
    categories: ["html-css", "react"],
    thumbnail: img.portfolio1,
    screenshots: [img.portfolio1, img.portfolio2, img.portfolio3],
    title: "Personal Portfolio",
    description:
      "Built a portfolio website to showcase my recent projects. I've used React, styled and animate it with CSS, and VanillaJS for building modal, slider, pagination, etc. You can check out the link to my source code below.",
    created: "2021",
    technologies: [
      "HTML5",
      "CSS3 (preprocessed w/ SASS)",
      "Vanilla JavaScript",
      "React",
      "Firebase",
    ],
    role: ["Front-End"],
    url: "https://github.com/gilbertlc/gilbert-portfolio",
  },
  {
    categories: ["react", "full-stack"],
    thumbnail: img.amazonclone1,
    screenshots: [
      img.amazonclone1,
      img.amazonclone2,
      img.amazonclone3,
      img.amazonclone4,
    ],
    title: "Amazon Clone",
    description:
      "A working simple amazon clone built with react, firebase, and stripe. Inspired from <a href='https://www.youtube.com/watch?v=RDV3Z1KCBvo' target='_blank'>Let's Build a Full-Stack AMAZON Clone with REACT JS for Beginners (Full E-Comm Store in 8 Hrs) 2021</a>.",
    created: "2021",
    technologies: ["React", "Firebase", "StripeJS"],
    role: ["Front-End", "Back-End"],
    url: "https://clone-1e474.web.app/",
  },
  {
    categories: ["react", "full-stack"],
    thumbnail: img.netflixclone2,
    screenshots: [
      img.netflixclone1,
      img.netflixclone2,
      img.netflixclone3,
      img.netflixclone4,
    ],
    title: "Netflix Clone",
    description:
      "A simple netflix clone built with react, firebase, and stripe. Inspired from <a href='https://www.youtube.com/watch?v=CLMo0W7mTVo&list=PLf16UKl7nR5DaxECWIwHr82oXtQWgI4Ri' target='_blank'>NETFLIX REACT.JS 5-Day Challenge</a>.",
    created: "2021",
    technologies: ["React", "Firebase", "StripeJS"],
    role: ["Front-End", "Back-End"],
    url: "https://netflixclone-d2648.web.app/",
  },
  {
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
    technologies: ["jQuery", "Bootstrap", "Django", "MySQL"],
    role: ["Front-End", "Back-End"],
  },
  {
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
    technologies: ["jQuery", "Bootstrap", "PHP", "MySQL"],
    role: ["Front-End", "Back-End"],
  },
];

items = items.map((item, index) => ({...item, id: index}));

export default items;
