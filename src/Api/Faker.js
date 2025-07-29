// mockData.js
import { faker } from "@faker-js/faker";

const statuses = ["Draft", "Scheduled", "Active", "Completed", "Cancelled"];
const channels = ["Email", "Social Media", "Display", "SMS", "Search"];

export const generateMockCampaigns = (count = 100) => {
  return Array.from({ length: count }).map((_, i) => {
    const impressions = faker.number.int({ min: 1000, max: 100000 });
    const clicks = faker.number.int({ min: 50, max: impressions });
    const spent = faker.finance.amount(100, 100000, 2);
    const budget = faker.finance.amount(
      Number(spent),
      Number(spent) + 20000,
      2
    );

    return {
      campaignId: `${1000 + i}`,
      campaignName: faker.company.catchPhrase(),
      clientName: faker.company.name(),
      startDate: faker.date.past().toLocaleDateString(),
      endDate: faker.date.future().toLocaleDateString(),
      status: faker.helpers.arrayElement(statuses),
      budget: Number(budget),
      spent: Number(spent),
      impressions,
      clicks,
      conversionRate: Number(((clicks / impressions) * 100).toFixed(2)),
      channel: faker.helpers.arrayElement(channels),
      manager: faker.person.fullName(),
      thumbnail: faker.image.avatarGitHub(),
      lastModified: faker.date.recent().toLocaleDateString(),
    };
  });
};
