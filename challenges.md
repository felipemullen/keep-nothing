# Challenges

## Next.js server side static generation

Problem: categories were not showing up.
Reason: During the build, there were no categories in the db, so nextjs saw an empty collection and built a static page with no categories.
Solution: Populate the db first, and then build the app. There is no need to make the categories dynamic because they are not likely to change often.
Details: Next.js has a feature called [server side static generation](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) that allows you to fetch data from an api and build a static page at build time. This is great for SEO and performance. However, if the data you are fetching is dynamic, you need to tell nextjs to not build a static page, but instead to build a dynamic page that fetches the data at runtime. This is done by using the `fallback` property in `getStaticPaths` and `getStaticProps`. If `fallback` is set to `true`, then nextjs will build a static page for each path in `getStaticPaths` and fetch the data at runtime. If `fallback` is set to `false`, then nextjs will build a static page for each path in `getStaticPaths` and fetch the data at build time. If `fallback` is set to `blocking`, then nextjs will build a static page for each path in `getStaticPaths` and fetch the data at runtime, but the page will not be served until the data is fetched. This is useful for pages that are not visited often, but need to be SEO friendly. In this case, I set `fallback` to `true` because I want the categories to be fetched at runtime, but I also want the page to be SEO friendly.

## 400 error when retrieving uploaded images

https://stackoverflow.com/questions/77440044/next-js-400-bad-request-after-trying-to-access-just-uploaded-image/77581419#77581419

Problem: Images uploaded by the users show the error `⨯ The requested resource isn't a valid image for /_i/f7e5c4f31c368fc46057fd55bf8c066c.jpeg received text/html; charset=utf-8` on the server side, and respond with a 400 status to the client
Reason:
Solution: Add `Content-Type: image/jpeg` to the headers of the image response