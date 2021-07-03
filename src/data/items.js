import img from "../assets/img";

const items = [
  {
    categories: ["front-end"],
    thumbnail: img.archmove1,
    screenshots: [
      img.archmove1,
      img.archmove2,
      img.archmove3,
      img.archmove4,
      img.archmove5,
      img.archmove6,
    ],
    title: "Arch Move",
    description: "Built a landing page from client's Figma file to HTML/CSS.",
    created: "2021",
    technologies: ["HTML5", "CSS3 - preprocessed with SASS", "JavaScript"],
    role: ["Front-End", "Figma to HTML"],
    url: "https://archmove-gilbertlc.vercel.app/",
  },
  {
    categories: ["front-end"],
    thumbnail: img.portfolioLanding,
    screenshots: [img.portfolioLanding],
    title: "Personal Portfolio",
    description: `
    Built with custom VanillaJS and written entirely on HTML, 
    CSS and React. This website is a showcase of my recent projects as a
    Front-End & Back-End Web Developer.
    <br />
    <br />
    The idea behind this project was to create a showcase of
    everything I've worked on in the past few years. Inspired from
    <a
      href="https://www.youtube.com/watch?v=nAHc42DKpuI"
      target="_blank"
    >
      this
    </a>
    portfolio design by Upvesh. Implemented it on my own way, added
    custom hover effects, custom components, etc. I used BEM in
    naming CSS classes for maintainability. Made utility classes for
    paddings. margins, etc to DRY out the stylesheet. Then
    preprocessed it with SASS and organized styles using 7-1
    pattern. Finally, to avoid code duplication I extract bits of
    code that do the same thing into a function in my JavaScript.
    You can check out the link to my source code below.
    `,
    created: "2021",
    technologies: [
      "HTML5",
      "CSS3 - preprocessed with SASS",
      "JavaScript",
      "React",
    ],
    role: ["Front-End"],
    url: "https://github.com/gilbertlc/portfolio",
  },
  {
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
      "A college student asked me to build a voting system for their thesis. I used native PHP for the backend and Bootstrap for styling.",
    created: "2017",
    technologies: ["HTML", "CSS", "jQuery", "Bootstrap", "PHP", "MySQL"],
    role: ["Front-End", "Back-End"],
  },
  {
    categories: ["front-end", "back-end", "personal"],
    thumbnail: img.pigly1,
    screenshots: [img.pigly1, img.pigly2, img.pigly3],
    title: "Pigly",
    description:
      "Built a url shortener using Ruby on Rails in the back-end. Gifs are from giphy & tenor.",
    created: "2018",
    technologies: ["HTML5", "CSS3", "SCSS", "JavaScript", "Ruby on Rails"],
    role: ["Front-End", "Back-End"],
    url: "https://pig-ly.herokuapp.com/",
  },
  {
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
    technologies: ["HTML5", "CSS3", "SCSS", "JavaScript", "Ruby on Rails"],
    role: ["Front-End", "Back-End"],
    url: "https://stormy-earth-93721.herokuapp.com/",
  },
];

export default items;
