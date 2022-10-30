Server Side authentication flow with Next.js.

This uses next-auth "Credentials" provider which uses httpOnly JWT (JWE) token for sessions.

React-query and Jotai is used for automatic accesToken renewal using the refresh token.

Uses axios interceptor "Component" to refresh accessToken (accessToken expires => 401 => refresh accessToken => update state => retry the failed request(s)) as a fallback if automatic refresh fails or is disabled.

Server session (states) are managed with react-query (Prefetch the query on the server, dehydrate the cache and rehydrate it on the client) for instant authenticated state upon refreshes.
