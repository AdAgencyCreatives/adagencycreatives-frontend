export const navItems = [
  {
    name: "Home",
    link: "/",
    children: [
      { name: "About", hashLink: "/about", link: "/about" },
      { name: "Creatives", hashLink: "#creatives", link: "/creatives" },
      {
        name: "Spotlight",
        hashLink: "#spotlight",
        link: "/spotlighting-creatives",
      },
      { name: "Jobs", hashLink: "#jobs", link: "/creative-jobs" },
      { name: "Cities", hashLink: "#cities", link: "/creative-jobs" },
      { name: "Agencies", hashLink: "#agencies", link: "/agencies" },
      { name: "Mentors", hashLink: "#mentors", link: "/mentoring-resources" },
      {
        name: "Publications",
        hashLink: "#publications",
        link: "/publication-resources",
      },
      { name: "Feedback", hashLink: "#feedback", link: "/contact" },
    ],
  },
  { name: "Creatives", link: "/creatives", auth: true },
  { name: "The Lounge", link: "/community", roles: ["admin", "creative"], restrictedMessage: 'Please login as Creative to access' },
  {
    name: "Agencies",
    link: "/agencies",
    roles_children: ["admin"],
    children: [
      { name: "Advisor", hashLink: "agencies/advisor", link: "/agencies/advisor" },
      { name: "Recruiter", hashLink: "agencies/recruiter", link: "/agencies/recruiter" },
    ],
  },
  { name: "Contact", link: "/contact" },
];
