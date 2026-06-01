// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      collapsible: false,
      items: [
        'tutorial/intro',
        'tutorial/getting-started',
        'tutorial/report-card',
        'tutorial/threshold-alerts',
        'tutorial/scenario-builder',
        'tutorial/cicd-integration',
        'tutorial/organisation-management',
        'tutorial/faq',
      ],
    },
  ],
};

export default sidebars;
