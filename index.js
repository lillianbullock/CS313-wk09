const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/calculate', mailCalc)
    //.get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function mailCalc(req, res) {
    console.log("Calculating...");

    const weight = req.query.weight;
    const type = req.query.type;

    console.log("weight: " + weight);
    console.log("type: " + type);

    var price = "err";
    var name = "err";

    // these numbers calculated in cents
    if (type == "stamped") {
        price = calcStamped(weight);
        name = "Letters (Stamped)";
    } else if (type == "metred") {
        price = calcMetred(weight);
        name = "Letters (Metered)";
    } else if (type == "large") {
        price = calcLarge(weight);
        name = "Large Envelopes (Flats)";
    } else if (type == "parcel") {
        price = calcParcel(weight);
        name = "First-Class Package Service—Retail";
    } 
    // else stays with default

    if (!isNaN(price)) {
        price /= 100;  // convert to dollars
    }

    console.log("Price: " + price);

    const params = {
        weight: weight,
        name: name,
        price: price
    };

    res.render("calculate", params);
}

/************************************************
 * These numbers calculated in cents
 * Parcel prices based on zone 8, which includes
 * Idaho
 * 
 */
function calcStamped(weight) {
    if (weight >= 3.5) {
        // if envelope over 3.5 oz counts as large 
        return calcLarge(weight); 
    } 
    // else
    return 55 + (Math.floor(weight) * 15);
}

function calcMetred(weight) {
    if (weight >= 3.5) {
        // if envelope over 3.5 oz counts as large 
        return calcLarge(weight); 
    } 
    // else
    return 50 + (Math.floor(weight) * 15);
}

function calcLarge(weight) {
    if (weight >= 13) {
        return "Invalid: too heavy"; 
    } 
    // else
    return 100 + (Math.floor(weight) * 15);
}

function calcParcel(weight) {
    if (weight >= 13) {
        return "Invalid: too heavy"; 
    } 

    if (weight < 4) {
        return 406;
    } else if (weight < 8) {
        return 481;
    } else if (weight < 12) {
        return 566;
    } 
    else return 627;
}