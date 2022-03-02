const mongoose = require('mongoose')
const Team = require('./models/team')
const User = require('./models/user')
const passport = require('passport')

const Schema = mongoose.Schema


mongoose.connect('mongodb://localhost:27017/soccer-score')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const registerAdmin = async () => {
    const admin = new User({ email: 'admin@admin.com', username: 'admin' })
    const registeredAdmin = await User.register(admin, 'admin')
    return registeredAdmin._id
}

const getInitialValues = (adminId) => {
    const lorem = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas autem repellat tempore amet consequuntur earum doloribus natus dignissimos dolore doloremque similique eos pariatur quibusdam corporis, quasi numquam placeat porro expedita! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis architecto aliquam itaque ullam repellendus cum quas aspernatur culpa harum, possimus eius? Nostrum officia amet ad quaerat explicabo ducimus asperiores similique. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam perspiciatis autem assumenda cupiditate odit eius id harum dolorum ducimus dolore commodi voluptates optio molestias inventore minus maiores voluptas, iusto recusandae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eius accusamus ipsum harum atque voluptates amet voluptatem soluta quasi, quidem quia fugit ullam possimus, consequuntur quisquam fuga dolor repellendus libero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, est! Magni repellendus sit minus dolorem totam quia architecto maiores nulla nisi. Ex dolore error labore eveniet velit praesentium repudiandae ut!'
    return [
        {
            title: 'Real Madrid',
            country: 'Spain',
            description: lorem,
            crest: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/300px-Real_Madrid_CF.svg.png',
            year: 1902,
            championsLeague: 13,
            author: adminId

        },
        {
            title: 'Barcelona',
            country: 'Spain',
            description: lorem,
            crest: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/360px-FC_Barcelona_%28crest%29.svg.png',
            year: 1899,
            championsLeague: 5,
            author: adminId

        },
        {
            title: 'Manchester United',
            country: 'England',
            description: lorem,
            crest: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/360px-Manchester_United_FC_crest.svg.png',
            year: 1902,
            championsLeague: 3,
            author: adminId

        },
        {
            title: 'Paris Saint-Germain',
            country: 'France',
            description: lorem,
            crest: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/360px-Paris_Saint-Germain_F.C..svg.png',
            year: 1970,
            championsLeague: 0,
            author: adminId

        },
        {
            title: 'Bayern Munich',
            country: 'Germany',
            description: lorem,
            crest: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/360px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
            year: 1900,
            championsLeague: 6,
            author: adminId

        }]
}

const seed = async () => {
    await Team.deleteMany({})
    await User.deleteOne({ username: 'admin' })

    const adminId = await registerAdmin()
    const initialValues = getInitialValues(adminId)
    await Team.insertMany(initialValues)

}

seed().then(console.log('done'))