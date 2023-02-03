import db from '$lib/db'
import { error } from '@sveltejs/kit'
import moment from 'moment'

const getUniqueRetailers = (items) => {
    const uniqueValues = [...new Set(items.map((item) => item.retailer))];
    return uniqueValues;
  };

const parseOffers = (offers) => {
    const results = offers.reduce((acc, item) => {
        const { retailer, date, priceCurrent } = item;

        if (!acc[retailer]) {
            acc[retailer] = [
                {
                    date: date, 
                    priceCurrent: priceCurrent,
                }
            ]
        } else {
            acc[retailer].push(
                {
                    date: date,
                    priceCurrent: priceCurrent,
                }
            )
        }

        return acc
      }, {});

      return results;
}


export const load = async ({ params }) => {
    const offers = await db.offers.findMany({
        where: {
            ean: params.ean
        }
    })

    if (!offers) {
        throw error(404, `No offers found for EAN ${params.ean}`)
    }

    const parsedOffers = parseOffers(offers)

    console.log(parsedOffers)

    return { params, offers, parsedOffers }
}