/**
 * To use the application, please create a copy of this and rename it 'vars.ts'.
 * You sould fill in the config with the desired values
 */
export const config = {
    db: {
        testURI: `mongodb://<YOUR_USERNAME>:<YOUR_PASSWORD>@ds131601.mlab.com:31601/uniscrape_test`
    },
    google: {
        "web": {
            "client_id": "<CLIENT_ID>.apps.googleusercontent.com",
            "project_id": "<PROJECT_ID>",
            "auth_uri": "<AUTH_URI>",
            "token_uri": "<TOKEN_URI>",
            "auth_provider_x509_cert_url": "<CERT_PROVIDER>",
            "client_secret": "<CLIENT_SECRET>",
            "javascript_origins": [
                // "http[s]://example.com:port"
            ]
        }
    }
}