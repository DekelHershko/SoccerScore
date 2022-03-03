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
            images: [
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346130/SoccerScore/realmadrid4_vmebnz.png',
                    filename: 'real madrid 1'
                },
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346130/SoccerScore/realmadrid3_qope6w.jpg',
                    filename: 'real madrid 2'
                },
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346130/SoccerScore/realmadrid1_uz7azy.jpg',
                    filename: 'real madrid 3'
                },
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346130/SoccerScore/realmadrid2_xiw8bw.jpg',
                    filename: 'real madrid 4'
                }
            ],
            year: 1902,
            championsLeague: 13,
            author: adminId

        },
        {
            title: 'Barcelona',
            country: 'Spain',
            description: lorem,
            images: [
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346129/SoccerScore/barca1_auyayo.png',
                    filename: 'barca 1'
                },
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346129/SoccerScore/barca2_wnxtk5.jpg',
                    filename: 'barca 2'
                }
            ],
            year: 1899,
            championsLeague: 5,
            author: adminId

        },
        {
            title: 'Manchester United',
            country: 'England',
            description: lorem,
            images: [
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346130/SoccerScore/united1_v6v6ly.png',
                    filename: 'man united 1'
                },
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346130/SoccerScore/united2_d61gbh.jpg',
                    filename: 'man united 2'
                }
            ],
            year: 1902,
            championsLeague: 3,
            author: adminId

        },
        {
            title: 'Paris Saint-Germain',
            country: 'France',
            description: lorem,
            images: [
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346129/SoccerScore/psg1_guaaoy.jpg',
                    filename: 'psg 1'
                }
            ],
            year: 1970,
            championsLeague: 0,
            author: adminId

        },
        {
            title: 'Bayern Munich',
            country: 'Germany',
            description: lorem,
            images: [
                {
                    url: 'https://res.cloudinary.com/dv6y7ojk1/image/upload/v1646346129/SoccerScore/bayern1_qqx5io.png',
                    filename: 'bayern 1'
                }
            ],
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