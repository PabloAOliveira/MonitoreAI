import { prisma } from "../config/prisma.js";
import { checkSiteStatus } from "./siteStatusService.js";

export async function updateSiteStatus(siteId, url) {
  const status = await checkSiteStatus(url);
  await prisma.site.update({
    where: { id: siteId },
    data: { status },
  });

  return status;
}
