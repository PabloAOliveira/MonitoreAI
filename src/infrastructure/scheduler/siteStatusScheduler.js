import cron from "node-cron";
import { prisma } from "../../config/prisma.js";
import { checkSiteStatus } from "../../application/siteStatusService.js";
import { sendWhatsappAlert } from "../services/whatsAppService.js";
import { sendEmailAlert } from "../services/emailService.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const sites = await prisma.site.findMany({ include: { user: true } });

  for (const site of sites) {
    if (
      !site.lastCheckedAt ||
      (now - site.lastCheckedAt) / 60000 >= site.interval
    ) {
      const status = await checkSiteStatus(site.url);

      if (site.status !== "offline" && status === "offline") {
        if (site.user.whatsapp) {
          try {
            await sendWhatsappAlert(
              site.user.whatsapp,
              `Alerta: Seu site ${site.url} está OFFLINE!`
            );
          } catch (error) {
            console.error(error);
          }
        }
        if (site.user.email) {
          try {
            await sendEmailAlert(
              site.user.email,
              "Alerta: Seu site está OFFLINE!",
              `Seu site ${site.url} está OFFLINE!`
            );
          } catch (error) {
            console.error(error);
          }
        }
      }

      if (site.status === "offline" && status === "online") {
        if (site.user.whatsapp) {
          try {
            await sendWhatsappAlert(
              site.user.whatsapp,
              `Recuperação: Seu site ${site.url} voltou a ficar ONLINE!`
            );
          } catch (error) {
            console.error(error);
          }
        }
        if (site.user.email) {
          try {
            await sendEmailAlert(
              site.user.email,
              "Recuperação: Seu site voltou a ficar ONLINE!",
              `Seu site ${site.url} voltou a ficar ONLINE!`
            );
          } catch (error) {
            console.error(error);
          }
        }
      }

      await prisma.site.update({
        where: { id: site.id },
        data: { status, lastCheckedAt: now },
      });
    }
  }
});
