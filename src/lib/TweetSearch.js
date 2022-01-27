import needle from 'needle';
import { bearerToken } from '../assets/env/api';

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest() {

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': 'from:twitterdev -is:retweet',
        'tweet.fields': 'author_id'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${bearerToken}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

const TweetSearch = async () => {

    try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        
    }
};
export default TweetSearch;