import db from '$lib/db'
import { error, redirect } from '@sveltejs/kit'

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


export const load = async ({ locals, params }) => {

    if(!locals.session){
        throw redirect(303, '/login')
    }
    
    const offers = await db.offers.findMany({
        where: {
            ean: params.ean
        }
    })

    if (!offers) {
        throw error(404, `No offers found for EAN ${params.ean}`)
    }

    const parsedOffers = parseOffers(offers)

    return { params, offers, parsedOffers }
}