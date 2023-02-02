import db from '$lib/db'
import { error } from '@sveltejs/kit'

export const load = async () => {

    const nbProducts = await db.$queryRaw
        `SELECT DISTINCT ean FROM offers`
    const nbRetailers = await db.$queryRaw
        `SELECT DISTINCT retailer FROM offers`
    const nbOffers = await db.$queryRaw
        `SELECT DISTINCT url FROM offers`

    const kpis = {
        nbProducts:     nbProducts.length,
        nbRetailers:    nbRetailers.length,
        nbOffers:       nbOffers.length,
    }

    if (!nbProducts || !nbRetailers || !nbOffers) {
        throw error(404, 'Offers could not be loaded...')
    }
    
    return { kpis }
}