Server Side authentication flow with Next.js and TypeScript.

This uses next-auth "Credentials" provider which uses httpOnly JWT (JWE) token for sessions.

React-query and Jotai is used for automatic accessToken renewal using the refresh token.

Uses axios interceptor "Component" to refresh the accessToken (accessToken expires => 401 => refresh accessToken from server=> update state and retry the failed request(s)) as a fallback if automatic refresh fails.

Server session (states) are managed with react-query (Prefetch the query (session) on the server, dehydrate the cache and rehydrate it on the client) for instant authenticated state upon refreshes.
