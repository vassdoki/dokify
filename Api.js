import {encode} from 'base-64';

export default {
    async getToken() {
        const clientId = "3690b67496974a4099c3137ed6910a86";
        const clientSecret = "d4637f70126a4c0b8bec962da5456cd0";
        const base64credential = encode(`${clientId}:${clientSecret}`);
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'Authorization': `Basic ${base64credential}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        if (res.ok) {
            try {
              const json = await res.json();
              return json.access_token;
            } catch(e) {
                console.log(e);
                throw "could not parse response json " + e;
            }
        }
        throw 'token request was not ok';
    }
}