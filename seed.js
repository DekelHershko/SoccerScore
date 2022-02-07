const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Team = require('./models/team')

mongoose.connect('mongodb://localhost:27017/soccer-score')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const initialValue = [
    {
        title: 'Real Madrid',
        country: 'Spain',
        crest: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/300px-Real_Madrid_CF.svg.png',
        year: 1902,
        championsLeague: 13

    },
    {
        title: 'Barcelona',
        country: 'Spain',
        crest: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/360px-FC_Barcelona_%28crest%29.svg.png',
        year: 1899,
        championsLeague: 5

    },
    {
        title: 'Manchester United',
        country: 'England',
        crest: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/360px-Manchester_United_FC_crest.svg.png',
        year: 1902,
        championsLeague: 3

    },
    {
        title: 'Paris Saint-Germain',
        country: 'France',
        crest: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/360px-Paris_Saint-Germain_F.C..svg.png',
        year: 1970,
        championsLeague: 0

    },
    {
        title: 'Bayern Munich',
        country: 'Germany',
        crest: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/360px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
        year: 1900,
        championsLeague: 6

    }]

const seed = async () => {
    await Team.deleteMany({})
    await Team.insertMany(initialValue)

}

seed().then(console.log('done'))