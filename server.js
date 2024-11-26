const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))
// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})
// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))
// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
// POST route for Mad Lib
server.post('/ITC_505_Labs/ITC-Lab_007/', (req, res) => {
    const { noun, verb, adjective, pluralNoun, adverb } = req.body;
    if (!noun || !verb || !adjective || !pluralNoun || !adverb) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields.</p>
            <a href="/ITC_505_Labs/ITC-Lab_007/">Go Back to Form</a>
        `);
        return;
    }
    const madLib = `
        A long time ago, there was a ${adjective} ${noun}.
        Every so often, it would ${verb} with some ${pluralNoun} ${adverb}.
        It was quite the day!
    `;
    res.send(`
        <h1>Your Mad Lib</h1>
        <p>${madLib}</p>
        <a href="/ITC_505_Labs/ITC-Lab_007/">Create Another Mad Lib</a>
    `);
});
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}
server.listen(port, () => console.log('Ready on localhost!'))