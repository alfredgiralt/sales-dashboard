import { PrismaClient } from "@prisma/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

let prisma: PrismaClient;

if (url && authToken) {
  // Dynamic imports to avoid issues when packages aren't available
  const { PrismaLibSql } = require("@prisma/adapter-libsql");
  const { createClient } = require("@libsql/client");
  const libsql = createClient({ url, authToken });
  const adapter = new PrismaLibSql(libsql);
  // @ts-ignore - adapter type mismatch between versions
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient();
}

async function main() {
  await prisma.opportunity.deleteMany();
  await prisma.account.deleteMany();

  const accounts = [
    { name: "Jakala", category: "Digital Consultancies", owner: "Alfred", strategicRelevance: "High", mainContact: "Carlos Méndez", contactRole: "Head of Data", contactEmail: "carlos.mendez@jakala.com" },
    { name: "Alkemy Iberia", category: "Digital Consultancies", owner: "Alfred", strategicRelevance: "Medium", mainContact: "Laura Ruiz", contactRole: "Managing Director", contactEmail: "laura.ruiz@alkemy.com" },
    { name: "Making Science", category: "Digital Consultancies", owner: "Alfred", strategicRelevance: "High", mainContact: "Pedro Navarro", contactRole: "VP of Innovation", contactEmail: "pedro.navarro@makingscience.com" },
    { name: "T2ó ONE", category: "Digital Consultancies", owner: "Alfred", strategicRelevance: "Medium", mainContact: "Ana García", contactRole: "Commercial Director", contactEmail: "ana.garcia@t2o.com" },
    { name: "Gobierno de España", category: "Public Sector", owner: "Alfred", strategicRelevance: "High", mainContact: "Marta López", contactRole: "Innovation Director", contactEmail: "marta.lopez@gobierno.es" },
    { name: "Netflix", category: "Media / Platforms", owner: "Alfred", strategicRelevance: "High", mainContact: "James Chen", contactRole: "Data Science Lead", contactEmail: "jchen@netflix.com" },
    { name: "Amazon", category: "Media / Platforms", owner: "Alfred", strategicRelevance: "High", mainContact: "Sarah Williams", contactRole: "Advertising Analytics Manager", contactEmail: "swilliams@amazon.com" },
    { name: "Fluzo", category: "Blue Sky / Strategic Opportunities", owner: "Alfred", strategicRelevance: "Medium", mainContact: "Diego Fernández", contactRole: "CEO", contactEmail: "diego@fluzo.com" },
    { name: "Smartme", category: "Blue Sky / Strategic Opportunities", owner: "Alfred", strategicRelevance: "Medium", mainContact: "Irene Molina", contactRole: "Head of Partnerships", contactEmail: "irene@smartme.com" },
    { name: "L'Oréal", category: "Blue Sky / Strategic Opportunities", owner: "Alfred", strategicRelevance: "High", mainContact: "Marie Dupont", contactRole: "Digital Transformation Director", contactEmail: "mdupont@loreal.com" },
    { name: "IKI Media", category: "Blue Sky / Strategic Opportunities", owner: "Alfred", strategicRelevance: "Low", mainContact: "Tomás Reyes", contactRole: "Founder", contactEmail: "tomas@ikimedia.com" },
    { name: "Apple Tree", category: "Blue Sky / Strategic Opportunities", owner: "Alfred", strategicRelevance: "Medium", mainContact: "Cristina Vega", contactRole: "Strategy Lead", contactEmail: "cvega@appletree.com" },
    { name: "Influencia", category: "Blue Sky / Strategic Opportunities", owner: "Alfred", strategicRelevance: "Low", mainContact: "Roberto Salas", contactRole: "Managing Partner", contactEmail: "rsalas@influencia.com" },
    { name: "Keepers", category: "Blue Sky / Strategic Opportunities", owner: "Alfred", strategicRelevance: "Low", mainContact: "Elena Torres", contactRole: "Co-Founder", contactEmail: "elena@keepers.io" },
  ];

  const createdAccounts: Record<string, string> = {};
  for (const acc of accounts) {
    const created = await prisma.account.create({ data: acc });
    createdAccounts[acc.name] = created.id;
  }

  const today = new Date();
  const daysAgo = (n: number) => new Date(today.getTime() - n * 86400000);
  const daysFromNow = (n: number) => new Date(today.getTime() + n * 86400000);

  const opportunities = [
    {
      name: "Jakala — Data Analytics Partnership",
      accountId: createdAccounts["Jakala"],
      owner: "Alfred", status: "Discovery", priority: "High",
      estimatedValue: 120000, probabilityOfClose: 40,
      expectedCloseHorizon: "This quarter", strategicRelevance: "High",
      mainContact: "Carlos Méndez",
      nextStep: "Schedule technical deep-dive meeting",
      nextStepDueDate: daysFromNow(3),
      lastInteractionDate: daysAgo(5),
      mainRisk: "Internal technical resistance", riskType: "Internal technical resistance", riskLevel: "Medium",
      riskDescription: "Their internal data team may see us as competition",
      mitigationAction: "Position as complementary capability, not replacement",
    },
    {
      name: "Alkemy Iberia — Campaign Measurement",
      accountId: createdAccounts["Alkemy Iberia"],
      owner: "Alfred", status: "Exploration", priority: "Medium",
      estimatedValue: 60000, probabilityOfClose: 20,
      expectedCloseHorizon: "Next quarter", strategicRelevance: "Medium",
      mainContact: "Laura Ruiz",
      nextStep: "Send capabilities deck",
      nextStepDueDate: daysFromNow(5),
      lastInteractionDate: daysAgo(12),
      mainRisk: "Low urgency", riskType: "Low urgency", riskLevel: "Low",
      riskDescription: "No immediate budget pressure", mitigationAction: "Create urgency with market insights",
    },
    {
      name: "Making Science — Audience Intelligence",
      accountId: createdAccounts["Making Science"],
      owner: "Alfred", status: "Proposal", priority: "High",
      estimatedValue: 150000, probabilityOfClose: 60,
      expectedCloseHorizon: "This quarter", strategicRelevance: "High",
      mainContact: "Pedro Navarro",
      nextStep: "Revise proposal based on client feedback",
      nextStepDueDate: daysAgo(2),
      lastInteractionDate: daysAgo(8),
      mainRisk: "Collaboration model undefined", riskType: "Collaboration model undefined", riskLevel: "Medium",
      riskDescription: "Still deciding between license and managed service model",
      mitigationAction: "Prepare comparison of both models with pricing",
    },
    {
      name: "T2ó ONE — Attribution Modeling",
      accountId: createdAccounts["T2ó ONE"],
      owner: "Alfred", status: "Exploration", priority: "Medium",
      estimatedValue: 45000, probabilityOfClose: 15,
      expectedCloseHorizon: "Next quarter", strategicRelevance: "Medium",
      mainContact: "Ana García",
      nextStep: "Follow up after initial meeting",
      nextStepDueDate: daysFromNow(7),
      lastInteractionDate: daysAgo(20),
      mainRisk: "Partial client interest", riskType: "Partial client interest", riskLevel: "Low",
      riskDescription: "Interest is exploratory, no defined project yet", mitigationAction: "Identify a quick-win pilot use case",
    },
    {
      name: "Gobierno de España — Turespaña",
      accountId: createdAccounts["Gobierno de España"],
      owner: "Alfred", status: "Discovery", priority: "High",
      estimatedValue: 200000, probabilityOfClose: 30,
      expectedCloseHorizon: "This quarter", strategicRelevance: "High",
      mainContact: "Marta López",
      nextStep: "Prepare public-sector-adapted proposal",
      nextStepDueDate: daysFromNow(2),
      lastInteractionDate: daysAgo(10),
      mainRisk: "Procurement complexity", riskType: "Procurement complexity", riskLevel: "High",
      riskDescription: "Public procurement process can be very slow and requires specific documentation",
      mitigationAction: "Engage with procurement advisor, prepare compliance docs early",
    },
    {
      name: "Gobierno de España — Loterías y Apuestas del Estado",
      accountId: createdAccounts["Gobierno de España"],
      owner: "Alfred", status: "New lead", priority: "Medium",
      estimatedValue: 80000, probabilityOfClose: 10,
      expectedCloseHorizon: "Later", strategicRelevance: "Medium",
      mainContact: "Marta López",
      nextStep: "Request introductory meeting through existing contact",
      nextStepDueDate: daysFromNow(10),
      lastInteractionDate: daysAgo(30),
      mainRisk: "No clear decision-maker", riskType: "No clear decision-maker", riskLevel: "Medium",
      riskDescription: "Unclear who owns the analytics budget", mitigationAction: "Map stakeholders through Marta's network",
    },
    {
      name: "Netflix — Content Performance Analytics",
      accountId: createdAccounts["Netflix"],
      owner: "Alfred", status: "Exploration", priority: "High",
      estimatedValue: 250000, probabilityOfClose: 15,
      expectedCloseHorizon: "Next quarter", strategicRelevance: "High",
      mainContact: "James Chen",
      nextStep: "Prepare tailored demo for content analytics use case",
      nextStepDueDate: daysFromNow(8),
      lastInteractionDate: daysAgo(15),
      mainRisk: "Data access dependency", riskType: "Data access dependency", riskLevel: "High",
      riskDescription: "Depends on access to internal content performance data which is heavily restricted",
      mitigationAction: "Propose proof-of-concept with publicly available data first",
    },
    {
      name: "Amazon — Advertising Effectiveness",
      accountId: createdAccounts["Amazon"],
      owner: "Alfred", status: "New lead", priority: "Medium",
      estimatedValue: 180000, probabilityOfClose: 10,
      expectedCloseHorizon: "Later", strategicRelevance: "High",
      mainContact: "Sarah Williams",
      nextStep: "Send introductory email with relevant case studies",
      nextStepDueDate: daysAgo(5),
      lastInteractionDate: daysAgo(35),
      mainRisk: "Too many opportunities open", riskType: "Too many opportunities open", riskLevel: "Medium",
      riskDescription: "We may not have capacity to pursue this seriously right now",
      mitigationAction: "Prioritize other accounts first, keep warm relationship",
      blocked: true,
      blockerDescription: "No internal capacity to pursue actively until Q3",
    },
    {
      name: "Fluzo — Cross-Media Measurement",
      accountId: createdAccounts["Fluzo"],
      owner: "Alfred", status: "Discovery", priority: "Medium",
      estimatedValue: 75000, probabilityOfClose: 35,
      expectedCloseHorizon: "This quarter", strategicRelevance: "Medium",
      mainContact: "Diego Fernández",
      nextStep: "Schedule follow-up to discuss integration approach",
      nextStepDueDate: daysFromNow(4),
      lastInteractionDate: daysAgo(7),
      mainRisk: "Technical capacity constraint", riskType: "Technical capacity constraint", riskLevel: "Low",
      riskDescription: "Integration may require more dev resources than expected",
      mitigationAction: "Scope integration work early to size the effort",
    },
    {
      name: "Smartme — Panel Data Partnership",
      accountId: createdAccounts["Smartme"],
      owner: "Alfred", status: "Validation / First Project", priority: "Medium",
      estimatedValue: 50000, probabilityOfClose: 50,
      expectedCloseHorizon: "This quarter", strategicRelevance: "Medium",
      mainContact: "Irene Molina",
      nextStep: "Deliver pilot results and schedule review",
      nextStepDueDate: daysFromNow(6),
      lastInteractionDate: daysAgo(3),
      mainRisk: "Timing risk", riskType: "Timing risk", riskLevel: "Low",
      riskDescription: "Pilot timeline depends on their data delivery schedule",
      mitigationAction: "Set clear milestone dates in the pilot agreement",
    },
    {
      name: "L'Oréal — Brand Lift Measurement",
      accountId: createdAccounts["L'Oréal"],
      owner: "Alfred", status: "Exploration", priority: "High",
      estimatedValue: 180000, probabilityOfClose: 20,
      expectedCloseHorizon: "Next quarter", strategicRelevance: "High",
      mainContact: "Marie Dupont",
      nextStep: "Prepare beauty industry case study",
      nextStepDueDate: daysFromNow(12),
      lastInteractionDate: daysAgo(18),
      mainRisk: "No clear decision-maker", riskType: "No clear decision-maker", riskLevel: "Medium",
      riskDescription: "Multiple stakeholders across digital, media, and brand teams",
      mitigationAction: "Identify the budget owner through Marie",
    },
    {
      name: "IKI Media — Content Analytics",
      accountId: createdAccounts["IKI Media"],
      owner: "Alfred", status: "New lead", priority: "Low",
      estimatedValue: 25000, probabilityOfClose: 10,
      expectedCloseHorizon: "Later", strategicRelevance: "Low",
      mainContact: "Tomás Reyes",
      nextStep: "Send introductory email",
      nextStepDueDate: daysFromNow(14),
      lastInteractionDate: daysAgo(40),
      riskLevel: "Low",
    },
    {
      name: "Apple Tree — PR Effectiveness",
      accountId: createdAccounts["Apple Tree"],
      owner: "Alfred", status: "Exploration", priority: "Medium",
      estimatedValue: 55000, probabilityOfClose: 20,
      expectedCloseHorizon: "Next quarter", strategicRelevance: "Medium",
      mainContact: "Cristina Vega",
      nextStep: "Send proposal outline after discovery call",
      nextStepDueDate: daysFromNow(5),
      lastInteractionDate: daysAgo(9),
      mainRisk: "Collaboration model undefined", riskType: "Collaboration model undefined", riskLevel: "Low",
      riskDescription: "Unclear if they want a one-off project or ongoing service",
      mitigationAction: "Present both options in the proposal",
    },
    {
      name: "Influencia — Audience Insights",
      accountId: createdAccounts["Influencia"],
      owner: "Alfred", status: "New lead", priority: "Low",
      estimatedValue: 30000, probabilityOfClose: 5,
      expectedCloseHorizon: "Unknown", strategicRelevance: "Low",
      mainContact: "Roberto Salas",
      nextStep: "Initial outreach",
      nextStepDueDate: daysFromNow(20),
      lastInteractionDate: daysAgo(45),
      riskLevel: "Low",
    },
    {
      name: "Keepers — Loyalty Analytics",
      accountId: createdAccounts["Keepers"],
      owner: "Alfred", status: "New lead", priority: "Low",
      estimatedValue: 20000, probabilityOfClose: 5,
      expectedCloseHorizon: "Unknown", strategicRelevance: "Low",
      mainContact: "Elena Torres",
      nextStep: "Research their product before reaching out",
      nextStepDueDate: daysFromNow(15),
      lastInteractionDate: daysAgo(50),
      riskLevel: "Low",
    },
  ];

  for (const opp of opportunities) {
    const weightedValue = opp.estimatedValue * (opp.probabilityOfClose / 100);
    await prisma.opportunity.create({
      data: { ...opp, weightedValue },
    });
  }

  console.log("Seed data created successfully!");
  console.log(`  ${accounts.length} accounts`);
  console.log(`  ${opportunities.length} opportunities`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
