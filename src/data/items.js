import img from "../assets/img";

const items = [
  {
    id: 1,
    categories: ["front-end"],
    thumbnail: img.archmove1,
    screenshots: [img.archmove1],
    title: "Arch Move",
    description:
      "Help client build his landing page by converting his Figma design to HTML, CSS, and JavaScript.",
    created: "2021",
    technologies: ["HTML", "CSS", "JavaScript"],
    role: ["Front-End"],
    url: "https://archmove-gilbertlc.vercel.app/",
  },
  {
    id: 2,
    categories: ["front-end"],
    thumbnail: img.portfolio1,
    screenshots: [img.portfolio1, img.portfolio2, img.portfolio3],
    title: "Personal Portfolio",
    description:
      "Built a portfolio website to showcase my recent projects as a front-end web developer. I've used React, styled and animate it with CSS (used SASS to organized it), and custom VanillaJS for building modal, slider, pagination, navigation, etc. You can check out the link to my source code below",
    created: "2021",
    technologies: ["HTML", "CSS", "SCSS", "JavaScript", "React"],
    role: ["Front-End"],
    url: "https://github.com/gilbertlc/portfolio",
  },
  {
    id: 3,
    categories: ["front-end", "back-end"],
    thumbnail: img.diliDashboard,
    screenshots: [
      img.diliDashboard,
      img.diliResidents,
      img.diliEvents,
      img.diliCertificates,
    ],
    title: "Barangay Dili System",
    description:
      "The system stored residents' data in the barangay for officials and admins to view, and manage. This is our thesis back in college, we were consist of 3 individuals and I am the lead developer and designer of this project.",
    created: "2017",
    technologies: [
      "HTML",
      "CSS",
      "jQuery",
      "Bootstrap",
      "Python",
      "Django",
      "MySQL",
      "Google Maps API",
    ],
    role: ["Front-End", "Back-End"],
  },
  {
    id: 4,
    categories: ["front-end", "back-end"],
    thumbnail: img.sjnhsLogin,
    screenshots: [
      img.sjnhsLogin,
      img.sjnhsResults,
      img.sjnhsStudents,
      img.sjnhsCandidates,
      img.sjnhsVote,
    ],
    title: "SJNHS Voting System",
    description:
      "Help client with their thesis by building a voting system for a local secondary school as well as help them write a documentation for it. Built with PHP in the back-end and Bootstrap for styling.",
    created: "2017",
    technologies: ["HTML", "CSS", "jQuery", "Bootstrap", "PHP", "MySQL"],
    role: ["Front-End", "Back-End"],
  },
  {
    id: 5,
    categories: ["front-end", "back-end", "personal"],
    thumbnail: img.pigly1,
    screenshots: [img.pigly1, img.pigly2, img.pigly3],
    title: "Pigly",
    description: "Built a url shortener using Ruby on Rails in the back-end.",
    created: "2018",
    technologies: ["HTML", "CSS", "SCSS", "JavaScript", "Ruby on Rails"],
    role: ["Front-End", "Back-End"],
    url: "https://pig-ly.herokuapp.com/",
  },
  {
    id: 6,
    categories: ["front-end", "back-end", "personal"],
    thumbnail: img.booking1,
    screenshots: [
      img.booking1,
      img.booking2,
      img.booking3,
      img.booking4,
      img.booking5,
      img.booking6,
    ],
    title: "Online Booking Form",
    description: `Built an online booking form using Ruby on Rails in the back-end. It has cool features like email notification (for client, and admin), admin panel (with filters, scopes, etc) and more. Still a bit rough around the edges but all important features are implemented. You can check out the admin panel at <a href='https://stormy-earth-93721.herokuapp.com/admin' target='_blank'>https://stormy-earth-93721.herokuapp.com/admin</a> and use 'admin@example.com', 'password' for credentials.`,
    created: "2018",
    technologies: ["HTML", "CSS", "SCSS", "JavaScript", "Ruby on Rails"],
    role: ["Front-End", "Back-End"],
    url: "https://stormy-earth-93721.herokuapp.com/",
  },
];

export default items;
