import { d as db } from "../../../../chunks/db.js";
import { r as redirect, e as error } from "../../../../chunks/index.js";
const parseOffers = (offers) => {
  const results = offers.reduce((acc, item) => {
    const { retailer, date, priceCurrent } = item;
    if (!acc[retailer]) {
      acc[retailer] = [
        {
          date,
          priceCurrent
        }
      ];
    } else {
      acc[retailer].push(
        {
          date,
          priceCurrent
        }
      );
    }
    return acc;
  }, {});
  return results;
};
const load = async ({ locals, params }) => {
  if (!locals.session) {
    throw redirect(303, "/login");
  }
  const offers = await db.offers.findMany({
    where: {
      ean: params.ean
    }
  });
  if (!offers) {
    throw error(404, `No offers found for EAN ${params.ean}`);
  }
  const parsedOffers = parseOffers(offers);
  return { params, offers, parsedOffers };
};
export {
  load
};
