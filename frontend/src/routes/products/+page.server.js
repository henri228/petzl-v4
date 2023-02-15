import db from '$lib/db'
import { error, redirect } from '@sveltejs/kit'
import moment from 'moment'
import _ from 'lodash'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

import fs from 'fs'
import path from 'path'

const deleteScreenshotDirectory = () => {
    const dirPath = path.join('./static', 'screenshot')
    if(fs.existsSync(dirPath)){
        fs.rmdir(dirPath, { recursive: true }, (err) => {
            if(err) throw err;
        })
    }
    
}


const aggregateOffers = (offers) => {
    const results = offers.reduce((acc, item) => {
        const { ean, name, priceMap, priceCurrent } = item;

        if (!acc[ean]) {
            if (priceCurrent > 0) {
                acc[ean] = {
                    retailer: 1,
                    name,
                    priceMap,
                    pricesCurrent: [
                        priceCurrent
                    ]
                }
            }

        } else {
            acc[ean].retailer += 1
            if (priceCurrent > 0) {
                acc[ean].pricesCurrent.push(priceCurrent)
            }
        }

        return acc;
    }, {})

    return results
}

const parseKpis = (products) => {
    let productsOverview = [];
    for (let item in products) {
        const pricesCurrentWithoutZeroes = products[item].pricesCurrent.filter(
            (value) => value != 0
        );

        const product = {
            id: (item + ' ' + products[item].name).toLowerCase(),
            ean: item,
            name: products[item].name,
            nbRetailers: products[item].retailer,
            priceMap: products[item].priceMap,
            priceMin: _.min(pricesCurrentWithoutZeroes),
            priceMax: _.max(pricesCurrentWithoutZeroes),
            discountMax:
                _.min(pricesCurrentWithoutZeroes) / products[item].priceMap - 1,
            discountAvg:
                _.mean(pricesCurrentWithoutZeroes) / products[item].priceMap - 1,
        };

        productsOverview.push(product);
    }

    return productsOverview;
}

export const load = async (event) => {
    const { session } = await getSupabase(event)
    if (!session) {
        throw redirect(303, '/login')
    }

    const offers = await db.offers.findMany({
        where: {
            date: moment().format()
        }
    })


    if (!offers) {
        throw error(404, 'No offers found.')
    }

    deleteScreenshotDirectory()

    const aggregatedOffers = aggregateOffers(offers)
    const kpis = parseKpis(aggregatedOffers)

    return { kpis, offers }
}