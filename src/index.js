import app from "./app/index.js"
/*
$ HTTP_PORT = 3002 npm run dev
*/
const HTTP_PORT = process.env.HTTP_PORT || 3005

app.listen(HTTP_PORT, console.log(`\n🐝Running [ App ] at http://localhost:${HTTP_PORT} ... 🏃`))
