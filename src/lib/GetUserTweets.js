import needle from 'needle';
import { bearerToken } from '../assets/env/api';

// this is the ID for @TwitterDev
const userId = "2244994945";
const url = `https://api.twitter.com/2/users/${userId}/tweets`;


const GetUserTweets = async () => {
    let userTweets = [];
    // we request the author_id expansion so that we can print out the user name later
    let params = {
        "max_results": 100,
        "tweet.fields": "created_at",
        "expansions": "author_id"
    }
    //contentLength = Buffer.byteLength(rBody, 'utf-8');
    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${bearerToken}`,
            'Content-Type' : 'application/json; charset=UTF=8',
        }
    }
    let hasNextPage = true;
    let nextToken = null;
    let userName;
    console.log("Retrieving Tweets...");

    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            userName = resp.includes.users[0].username;
            if (resp.data) {
                userTweets.push.apply(userTweets, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }
    console.dir(userTweets, {
        depth: null
    });
    console.log(`Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`);
}

const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }
    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log('meee');
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}

export default GetUserTweets;