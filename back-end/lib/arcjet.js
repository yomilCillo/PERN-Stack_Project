//import necessary library
import arcjet,{ tokenBucket,shield, detectBot} from "@arcjet/node";
import "dotenv/config";

//initialize arcjet
export const arcjetClient = arcjet({

    key: process.env.ARCJET_KEY, // Arcjet API key from .env file
    characteristics: ["ip.src"],
    rules:[
        //SHIELD PROTECT YOUR APP FROM COMMON ATTACKS
        shield({mode:"LIVE"}),

        //RATE LIMITING TO PREVENT ABUSE
        tokenBucket({
            capacity: 10, // Maximum number of requests allowed
            refillRate: 5, // Number of requests to refill per second
            interval: 10, // Interval in milliseconds for refilling
            mode: "LIVE"
        }),

        //DETECT BOTS AND ALLOW ONLY SEARCH ENGINES
        detectBot({
            mode:"LIVE",

            //BLOCK ALL BOTS EXCEPT SEARCH ENGINES
            allow:[
                "CATEGORY:SEARCH_ENGINE"

            ]
        })
    ]
});