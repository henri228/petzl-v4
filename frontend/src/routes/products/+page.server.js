import db from '$lib/db'
import { error } from '@sveltejs/kit'
import moment from 'moment'


const aggregateOffers = (offers) => {
    const results = offers.reduce((acc, item) => {
        const { ean, name, priceMap, priceCurrent } = item;

        if (!acc[ean]) {
            acc[ean] = {
                retailer: 1,
                name,
                priceMap,
                pricesCurrent: [
                    priceCurrent
                ]
            }
        } else {
            acc[ean].retailer += 1
            acc[ean].pricesCurrent.push(priceCurrent)
        }

        return acc;
    }, {})

    return results
}


export const load = async () => {

    const offers = await db.offers.findMany({
        where: {
            date: moment().format()
        }
    })

    if (!offers) {
        throw error(404, 'No offers found.')
    }

    const results = aggregateOffers(offers)

    return results
}