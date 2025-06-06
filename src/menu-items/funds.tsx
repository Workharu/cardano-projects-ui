import { Money } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// Helper function to create campaign items
const createCampaignItems = (campaigns: Array<{ id: number; title: string }>) => {
  return campaigns.map((campaign) => ({
    id: `campaign-${campaign.id}`,
    title: campaign.title,
    type: 'item' as const,
    url: `/funds/campaign/${campaign.id}`,
    target: false
  }));
};

// Custom SVG Number Icon Component
const FundNumberIcon = ({ number }: { number: number }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#6200EE" />
    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">
      {number}
    </text>
  </svg>
);

// Then use the same icons mapping as above

const icons = {
  fund1: <FundNumberIcon number={1} />,
  fund2: <FundNumberIcon number={2} />,
  fund3: <FundNumberIcon number={3} />,
  fund4: <FundNumberIcon number={4} />,
  fund5: <FundNumberIcon number={5} />,
  fund6: <FundNumberIcon number={6} />,
  fund7: <FundNumberIcon number={7} />,
  fund8: <FundNumberIcon number={8} />,
  fund9: <FundNumberIcon number={9} />,
  fund10: <FundNumberIcon number={10} />,
  fund11: <FundNumberIcon number={11} />,
  fund12: <FundNumberIcon number={12} />,
  fund13: <FundNumberIcon number={13} />,
  fund13_partners: <FundNumberIcon number={13} />, // or use a different icon
  un: Money, // keeping existing icon for UN
  solution_collection: Money, // keeping existing icon for Solution Collection
  catalyst_process_improvements: Money // keeping existing icon
};

// ==============================|| MENU ITEMS - FUNDS ||============================== //

const funds: NavItemType = {
  id: 'funds',
  title: 'Funds',
  type: 'group',
  children: [
    // Fund 1
    {
      id: 'fund-1',
      title: 'Fund 1',
      type: 'item',
      url: '/funds/fund-1',
      target: false
    },

    // Fund 2
    {
      id: 'fund-2',
      title: 'Fund 2',
      type: 'item',
      url: '/funds/fund-2',
      target: false
    },

    // Fund 3
    {
      id: 'fund-3',
      title: 'Fund 3',
      type: 'collapse',
      children: createCampaignItems([
        { id: 234, title: 'F3: DApp creation' },
        { id: 235, title: 'F3: Community choice' },
        { id: 236, title: 'F3: Developer Ecosystem' }
      ])
    },

    // Fund 4
    {
      id: 'fund-4',
      title: 'Fund 4',
      type: 'collapse',
      children: createCampaignItems([
        { id: 238, title: 'F4: Developer ecosystem' },
        { id: 239, title: 'F4: Dapps & Integrations' },
        { id: 240, title: 'F4: Distributed Decision Making' },
        { id: 241, title: 'F4: Proposer Outreach' },
        { id: 242, title: 'F4: Catalyst Value Onboarding' },
        { id: 243, title: 'F4: Local Community Centers' },
        { id: 244, title: 'F4: Fund6 Challenge Setting' }
      ])
    },

    // Fund 5
    {
      id: 'fund-5',
      title: 'Fund 5',
      type: 'collapse',
      children: createCampaignItems([
        { id: 246, title: 'F5: Developer ecosystem' },
        { id: 248, title: 'F5: DApps & Integrations' },
        { id: 249, title: 'F5: Distributed decision making' },
        { id: 250, title: 'F5: Proposer outreach' },
        { id: 251, title: 'F5: Catalyst value onboarding' },
        { id: 252, title: 'F5: Metadata challenge' },
        { id: 253, title: 'F5: Fund7 challenge setting' },
        { id: 254, title: 'F5: Grow Africa, Grow Cardano' },
        { id: 255, title: "F5: Scale-UP Cardano's DeFi Ecosystem" }
      ])
    },

    // Fund 6
    {
      id: 'fund-6',
      title: 'Fund 6',
      type: 'collapse',
      children: createCampaignItems([
        { id: 256, title: 'F6: Developer ecosystem' },
        { id: 259, title: 'F6: DApps & Integrations' },
        { id: 260, title: 'F6: Distributed decision making' },
        { id: 261, title: 'F6: Proposer outreach' },
        { id: 262, title: 'F6: Catalyst value onboarding' },
        { id: 263, title: 'F6: Metadata challenge' },
        { id: 264, title: 'F6: Grow Africa, Grow Cardano' },
        { id: 265, title: "F6: Scale-UP Cardano's DeFi Ecosystem" },
        { id: 266, title: 'F6: Cardano Emerging Threat Alarm' },
        { id: 267, title: 'F6: Multilingual resources' },
        { id: 268, title: 'F6: DeFi and Microlending for Africa' },
        { id: 269, title: 'F6: DLT Entrepreneurship Toolbox' },
        { id: 270, title: 'F6: Partnerships for Global Adoption' },
        { id: 271, title: 'F6: NFT Business models' },
        { id: 272, title: 'F6: Atala PRISM DID Mass-Scale Adoption' },
        { id: 273, title: 'F6: Disaster: When all is at stake' },
        { id: 274, title: "F6: Scale-UP Cardano's Community Hubs" },
        { id: 275, title: 'F6: Improve and Grow Auditability' },
        { id: 276, title: 'F6: Fund7 challenge setting' }
      ])
    },

    // Fund 7
    {
      id: 'fund-7',
      title: 'Fund 7',
      type: 'collapse',
      children: createCampaignItems([
        { id: 302, title: 'F7: Catalyst Natives COTI: Pay with ADA Plug-in' },
        { id: 279, title: "F7: Boosting Cardano's DeFi" },
        { id: 280, title: 'F7: Community Events' },
        { id: 281, title: 'F7: Lobbying for favorable legislation' },
        { id: 282, title: 'F7: Catalyst - Rapid Funding Mechanisms' },
        { id: 283, title: 'F7: DAOs ❤ Cardano' },
        { id: 284, title: 'F7: Connecting Japan/日本 Community' },
        { id: 285, title: 'F7: Disarm cyber disinformation attacks' },
        { id: 286, title: 'F7: DApps & Integrations' },
        { id: 287, title: 'F7: Gamers On-Chained' },
        { id: 288, title: 'F7: Grow Latin America, Grow Cardano' },
        { id: 289, title: "F7: Seeding Cardano's Grassroots DeFi" },
        { id: 290, title: "F7: Scale-UP Cardano's Community Hubs" },
        { id: 291, title: 'F7: New SPO Business Opportunities' },
        { id: 292, title: "F7: Global Sustainable Indep. SPO's" },
        { id: 293, title: 'F7: A.I. & SingularityNet a $5T market' },
        { id: 294, title: 'F7: Miscellaneous Challenge' },
        { id: 295, title: 'F7: Nation Building Dapps' },
        { id: 296, title: 'F7: Mini/Low-Budget Dapps & Integrations' },
        { id: 297, title: 'F7: Open Source Developer Ecosystem' },
        { id: 298, title: 'F7: Multilingual resources' },
        { id: 299, title: 'F7: Improve and Grow Auditability' },
        { id: 300, title: 'F7: Accelerate Decentralized Identity' },
        { id: 301, title: 'F7: Catalyst Accelerator & Mentors' },
        { id: 303, title: 'F7: Fund8 challenge setting' }
      ])
    },

    // Fund 8
    {
      id: 'fund-8',
      title: 'Fund 8',
      type: 'collapse',
      children: createCampaignItems([
        { id: 308, title: 'F8: Developer Ecosystem' },
        { id: 309, title: 'F8: Open Source Development Ecosystem' },
        { id: 310, title: 'F8: Nation Building Dapps' },
        { id: 311, title: 'F8: Cross-Chain Collaboration' },
        { id: 312, title: 'F8: Cardano scaling solutions' },
        { id: 313, title: 'F8: DApps and Integrations' },
        { id: 314, title: "F8: Scale-UP Cardano's Community Hubs" },
        { id: 315, title: 'F8: Gamers On - Chained' },
        { id: 316, title: 'F8: Miscellaneous Challenge' },
        { id: 317, title: 'F8: Grow Africa, Grow Cardano' },
        { id: 318, title: 'F8: Accelerate Decentralized Identity' },
        { id: 319, title: 'F8: Grow East Asia, Grow Cardano' },
        { id: 320, title: 'F8: Business Solutions (B2B & B2C)' },
        { id: 321, title: 'F8: Lobbying for favorable legislation' },
        { id: 322, title: 'F8: Improve and Grow Auditability' },
        { id: 323, title: 'F8: The Great Migration (from Ethereum)' },
        { id: 324, title: 'F8: Open Standards & Interoperability' },
        { id: 325, title: 'F8: New Member Onboarding' },
        { id: 326, title: 'F8: Self-Sovereign Identity' },
        { id: 327, title: 'F8: Film + Media (FAM) creatives unite!' },
        { id: 328, title: 'F8: Community Advisor Improvements' },
        { id: 329, title: 'F8: Grow India, Grow Cardano' },
        { id: 330, title: 'F8: Fund9 challenge setting' }
      ])
    },

    // Fund 9
    {
      id: 'fund-9',
      title: 'Fund 9',
      type: 'collapse',
      children: createCampaignItems([
        { id: 322, title: 'F9: The Great Migration (from Ethereum)' },
        { id: 333, title: 'F9: DAOs <3 Cardano' },
        { id: 334, title: 'F9: Dapps, Products & Integrations' },
        { id: 335, title: 'F9: Legal & Financial Implementations' },
        { id: 336, title: 'F9: Developer Ecosystem' },
        { id: 337, title: 'F9: Cross-Chain Collaboration' },
        { id: 338, title: 'F9: Challenge & Scouted for Students🎓' },
        { id: 339, title: 'F9: Grow Africa, Grow Cardano' },
        { id: 340, title: 'F9: dRep improvement and onboarding' },
        { id: 341, title: 'F9: Grow East Asia, Grow Cardano' },
        { id: 342, title: 'F9: Building (on) Blockfrost' },
        { id: 344, title: 'F9: Catalyst Natives X Cardashift: Demonstrating and monetizing impact' },
        { id: 343, title: 'F9: Fund10 challenge setting' }
      ])
    },

    // Fund 10
    {
      id: 'fund-10',
      title: 'Fund 10',
      type: 'collapse',
      children: createCampaignItems([
        { id: 346, title: 'F10: Development & Infrastructure' },
        { id: 347, title: 'F10: Startups & Onboarding for Students' },
        { id: 348, title: 'F10: Products & Integrations' },
        { id: 349, title: 'F10: OSDE: Open Source Dev Ecosystem' },
        { id: 350, title: 'F10: SPO Tools & Community Projects' },
        { id: 351, title: 'F10: Developer Ecosystem - The Evolution' },
        { id: 352, title: 'F10: DAOs ❤ Cardano' },
        { id: 353, title: 'F10: Atala PRISM: Launch Ecosystem' },
        { id: 354, title: 'F10: dRep improvement and onboarding' },
        { id: 355, title: 'F10: Building on NMKR' },
        { id: 379, title: 'F10: Catalyst Open' },
        { id: 380, title: 'Catalyst Fund Operations' },
        { id: 381, title: 'Catalyst Systems improvements' }
      ])
    },

    // Fund 11
    {
      id: 'fund-11',
      title: 'Fund 11',
      type: 'collapse',
      children: createCampaignItems([
        { id: 404, title: 'Fund11 Cardano Use Cases: Concept' },
        { id: 405, title: 'Fund11 Cardano Use Cases: Solution' },
        { id: 406, title: 'Fund11 Cardano Use Cases: Product' },
        { id: 407, title: 'Fund11 Cardano Open: Developers' },
        { id: 408, title: 'Fund11 Cardano Open: Ecosystem' },
        { id: 409, title: 'Fund11 Catalyst Systems improvements: Discovery' },
        { id: 410, title: 'Fund11 Catalyst Systems improvements: Development' }
      ])
    },

    // Fund 12
    {
      id: 'fund-12',
      title: 'Fund 12',
      type: 'collapse',
      children: createCampaignItems([
        { id: 412, title: 'Cardano Use Cases: Concept' },
        { id: 413, title: 'Cardano Use Cases: MVP' },
        { id: 414, title: 'Cardano Use Cases: Product' },
        { id: 415, title: 'Cardano Open: Developers' },
        { id: 416, title: 'Cardano Open: Ecosystem' },
        { id: 417, title: 'Cardano Partners and Real World Integrations' }
      ])
    },

    // Fund 13
    {
      id: 'fund-13',
      title: 'Fund 13',
      type: 'collapse',
      children: createCampaignItems([
        { id: 422, title: 'F13: Cardano Open: Developers' },
        { id: 423, title: 'F13: Cardano Open: Ecosystem' },
        { id: 424, title: 'F13: Cardano Use Cases: Concept' },
        { id: 425, title: 'F13: Cardano Use Cases: Product' }
      ])
    },

    // Fund 13 Partners
    {
      id: 'fund-13-partners',
      title: 'Fund 13 Partners',
      type: 'collapse',
      children: createCampaignItems([
        { id: 426, title: 'Cardano Partners: Enterprise R&D' },
        { id: 427, title: 'Cardano Partners: Growth & Acceleration' }
      ])
    },

    // Catalyst process improvements
    {
      id: 'catalyst-process-improvements',
      title: 'Catalyst Process Improvements',
      type: 'collapse',
      children: createCampaignItems([{ id: 231, title: 'Project Catalyst Problem Sensing' }])
    },

    // UN
    {
      id: 'un',
      title: 'UN',
      type: 'collapse',
      children: createCampaignItems([{ id: 233, title: 'Blockchain for social good' }])
    },

    // Solution Collection
    {
      id: 'solution-collection',
      title: 'Solution Collection',
      type: 'collapse',
      children: createCampaignItems([{ id: 229, title: 'Example Selected Challenge Campaign' }])
    }
  ]
};

export default funds;
