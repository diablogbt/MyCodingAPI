const express = require('express');
const fs = require('fs');
const app = express();
// const port = process.env.PORT || port;
const port = 8080;
// const www = process.env.WWW || './';
// app.use(express.static(www));
// console.log(`serving ${www}`);
// app.get('*', (req, res) => {
//     res.sendFile(`index.html`, { root: www });
// });

let tracks = JSON.parse(fs.readFileSync('tracks.json'));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// apis
app.get('/all_tracks', (req, res) => {
    console.log('income get all request')
    res.send(tracks)
});

app.post('/track', (req, res) => {
    let id = req.query.id;
    console.log(`income post request with id = ${id}`);
    
    let trackObj = tracks[id];
    trackObj = (trackObj)? trackObj: 'TrackNotFoundError';

    res.send(trackObj);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
