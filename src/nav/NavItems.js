export const navItems = [
  {
    name: "Home",
    link: "/",
    children: [
      { name: "About", hashLink: "/about", link: "/about" },
      { name: "Creatives", hashLink: "#creatives", link: "/creatives" },
      { name: "Resources", hashLink: "#mentors", link: "/mentoring-resources" },
      { name: "Jobs", hashLink: "#jobs", link: "/creative-jobs" },
      {
        name: "Spotlight",
        hashLink: "#spotlight",
        link: "/spotlighting-creatives",
      },
      { name: "Agencies", hashLink: "#agencies", link: "/agencies" },
      {
        name: "Publications",
        hashLink: "#publications",
        link: "/publication-resources",
      },
      { name: "Cities", hashLink: "#cities", link: "/creative-jobs" },
      { name: "Feedback", hashLink: "#feedback", link: "/contact" },
    ],
  },
  { name: "Jobs", link: "/creative-jobs", mobile: true },
  { name: "Creatives", link: "/creatives", auth: true },
  { name: "The Lounge", link: "/community", roles: ["admin", "creative"], restrictedMessage: 'Please login as a Creative to access' },
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
  { name: "Logout", link: "/logout", mobile: true },
];
