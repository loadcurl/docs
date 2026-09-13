// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Get started',
      collapsible: false,
      items: ['tutorial/intro', 'tutorial/getting-started'],
    },
    {
      type: 'category',
      label: 'Testing',
      collapsible: false,
      items: ['tutorial/domains', 'tutorial/report-card', 'tutorial/dashboard'],
    },
    {
      type: 'category',
      label: 'Workspace',
      collapsible: false,
      items: ['tutorial/organisation-management'],
    },
    {
      type: 'category',
      label: 'Plan & credits',
      collapsible: false,
      items: ['tutorial/billing'],
    },
    {
      type: 'category',
      label: 'Help',
      collapsible: false,
      items: ['tutorial/faq'],
    },
  ],
};

export default sidebars;
