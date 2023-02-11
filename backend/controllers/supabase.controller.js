const { supabase } = require('../config/supabase.config');

const createOffer = async (offers) => {

    const { error } = await supabase
        .from('offers')
        .upsert(offers, { onConflict: 'offerId' })
        .select();

    if (error) {
        console.log(error);
    } else {
        console.log(`${offers[0].date} - ${offers.length} offers successfully added`);
    }
}

const countUniqueEAN = async () => {
    const query = await supabase
        .from('offers')
        .select('ean')
    console.log(query);
}

module.exports = {
    createOffer,
    countUniqueEAN,
}