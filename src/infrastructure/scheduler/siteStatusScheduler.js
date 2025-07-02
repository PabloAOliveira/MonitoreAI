import cron from "node-cron";
import { prisma } from "../../config/prisma.js";
import { checkSiteStatus } from "../../application/siteStatusService.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const sites = await prisma.site.findMany();

  for (const site of sites) {
    if (
      !site.lastCheckedAt ||
      (now - site.lastCheckedAt) / 60000 >= site.interval
    ) {
      const status = await checkSiteStatus(site.url);
      await prisma.site.update({
        where: { id: site.id },
        data: { status, lastCheckedAt: now },
      });
      console.log(
        `Status do site ${
          site.url
        } atualizado para ${status} em ${now.toISOString()}`
      );
    }
  }
});
