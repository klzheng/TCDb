import { useState } from "react"

export default function SearchBar() {

    // const resetForm = () => {}
    const results = [
        {
            "adult": false,
            "backdrop_path": "/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg",
            "genre_ids": [
                14,
                28,
                35
            ],
            "id": 616037,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Thor: Love and Thunder",
            "overview": "After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.",
            "popularity": 1488.579,
            "poster_path": "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
            "release_date": "2022-07-06",
            "title": "Thor: Love and Thunder",
            "video": false,
            "vote_average": 6.8,
            "vote_count": 4147
        },
        {
            "adult": false,
            "backdrop_path": "/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg",
            "genre_ids": [
                12,
                14,
                28
            ],
            "id": 10195,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Thor",
            "overview": "Against his father Odin's will, The Mighty Thor - a powerful but arrogant warrior god - recklessly reignites an ancient war. Thor is cast down to Earth and forced to live among humans as punishment. Once here, Thor learns what it takes to be a true hero when the most dangerous villain of his world sends the darkest forces of Asgard to invade Earth.",
            "popularity": 143.224,
            "poster_path": "/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg",
            "release_date": "2011-04-21",
            "title": "Thor",
            "video": false,
            "vote_average": 6.8,
            "vote_count": 18852
        },
        {
            "adult": false,
            "backdrop_path": "/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg",
            "genre_ids": [
                28,
                12,
                14,
                878,
                35
            ],
            "id": 284053,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Thor: Ragnarok",
            "overview": "Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the destruction of his home-world and the end of Asgardian civilization, at the hands of a powerful new threat, the ruthless Hela.",
            "popularity": 113.921,
            "poster_path": "/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
            "release_date": "2017-10-24",
            "title": "Thor: Ragnarok",
            "video": false,
            "vote_average": 7.6,
            "vote_count": 18299
        },
        {
            "adult": false,
            "backdrop_path": "/uhYoytlNaq46dG81wLmHqaSuzWu.jpg",
            "genre_ids": [
                28,
                12,
                14
            ],
            "id": 76338,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Thor: The Dark World",
            "overview": "Thor fights to restore order across the cosmos… but an ancient race led by the vengeful Malekith returns to plunge the universe back into darkness. Faced with an enemy that even Odin and Asgard cannot withstand, Thor must embark on his most perilous and personal journey yet, one that will reunite him with Jane Foster and force him to sacrifice everything to save us all.",
            "popularity": 105.76,
            "poster_path": "/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg",
            "release_date": "2013-10-30",
            "title": "Thor: The Dark World",
            "video": false,
            "vote_average": 6.6,
            "vote_count": 15353
        },
        {
            "adult": false,
            "backdrop_path": "/1y6dEBTOzCyJRetN9fOtS0H7Vnx.jpg",
            "genre_ids": [
                28,
                16,
                14,
                878
            ],
            "id": 101907,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Hulk vs. Thor",
            "overview": "For ages, Odin has protected his kingdom of Asgard. But every winter, the All-Father must rest and regain his strength for one week. During this time, all of Asgard's foes (including trolls, giants, dark elves, and demons) try to claim the realm for their own, but they are always stopped by Odin's son, the mighty Thor, albeit with the loss of many brave Asgardian warriors. Loki, god of mischief, has kidnapped Dr. Bruce Banner and brought him to Asgard with the help of Amora, once Thor's lover, now the supervillain known as the Enchantress. Loki makes Banner angry and he changes into the Hulk. The Enchantress then casts a spell over the Hulk which separates Banner from his monstrous alter-ego and grants Loki control over the Hulk's body.",
            "popularity": 23.992,
            "poster_path": "/g3Xba32JckNniqHUobP3UgPq31o.jpg",
            "release_date": "2009-01-27",
            "title": "Hulk vs. Thor",
            "video": false,
            "vote_average": 6.7,
            "vote_count": 186
        },
        {
            "adult": false,
            "backdrop_path": null,
            "genre_ids": [
                99
            ],
            "id": 448363,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Thor: Assembling the Troupe",
            "overview": "A short piece that looks at the casting and subsequent work of Chris Hemsworth, Natalie Portman, and Anthony Hopkins.",
            "popularity": 33.157,
            "poster_path": "/7tgdZEWljiTokgayEmL4SFQuAGu.jpg",
            "release_date": "2011-09-13",
            "title": "Thor: Assembling the Troupe",
            "video": true,
            "vote_average": 7.1,
            "vote_count": 20
        },
        {
            "adult": false,
            "backdrop_path": "/1DkEL3ktujKdbjj7Yh4gscaHC4T.jpg",
            "genre_ids": [
                28,
                14
            ],
            "id": 990593,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Thor: God of Thunder",
            "overview": "Thor’s villainous brother Loki has escaped Asgard to search for Yggdrasil — The Tree of the Nine Realms. The tree holds the power of the Universe, and is secreted away on Earth. With the help of giant wolf god Fenrir, Loki plans to destroy the tree and replant it in his image, giving him dominion over all. Now Thor must follow Loki to Earth to wage an epic battle that will hold the two worlds in its balance.",
            "popularity": 22.624,
            "poster_path": "/e48IJ1KGR0beGD6B5np74OyqcpU.jpg",
            "release_date": "2022-07-08",
            "title": "Thor: God of Thunder",
            "video": false,
            "vote_average": 5.2,
            "vote_count": 9
        },
        {
            "adult": false,
            "backdrop_path": "/yq1Zr8mCVd0jWpoLO4u9RiUB8K7.jpg",
            "genre_ids": [
                35,
                878
            ],
            "id": 413279,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Team Thor",
            "overview": "Discover what Thor was up to during the events of Captain America: Civil War.",
            "popularity": 12.742,
            "poster_path": "/jVSmX89BvsQV2z3wh2IVYVNVw1a.jpg",
            "release_date": "2016-08-28",
            "title": "Team Thor",
            "video": false,
            "vote_average": 7.3,
            "vote_count": 444
        },
        {
            "adult": false,
            "backdrop_path": "/qXJXEWOHmKwBJMoKha9grGm8Nid.jpg",
            "genre_ids": [
                878,
                35,
                14
            ],
            "id": 441829,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Team Thor: Part 2",
            "overview": "A continuation of the documentary spoof of what Thor and his roommate Darryl were up to during the events of \"Captain America: Civil War\". While Cap and Iron Man duke it out, Thor tries to pay Darryl his rent in Asgardian coins.",
            "popularity": 12.567,
            "poster_path": "/9Vt1OLu3BrKy1IQFK3QyzpR1LVm.jpg",
            "release_date": "2017-02-14",
            "title": "Team Thor: Part 2",
            "video": false,
            "vote_average": 7,
            "vote_count": 250
        },
        {
            "adult": false,
            "backdrop_path": "/bOmOKlujruO0fudftYCqxNR6Xd1.jpg",
            "genre_ids": [
                12,
                14,
                10770
            ],
            "id": 63736,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Almighty Thor",
            "overview": "Loki destroys the fortress of Valhalla and steals the Hammer of Invincibility, only the young hero Thor can protect Earth from Armageddon.",
            "popularity": 8.457,
            "poster_path": "/h001wN1ITWOjbMdE2ROHcAPRUfx.jpg",
            "release_date": "2011-05-07",
            "title": "Almighty Thor",
            "video": false,
            "vote_average": 2.8,
            "vote_count": 43
        },
        {
            "backdrop_path": "/t12TuJxUYOjUhYxujR3ZWe2vQ7p.jpg",
            "first_air_date": "2011-03-28",
            "genre_ids": [
                16
            ],
            "id": 61753,
            "media_type": "tv",
            "name": "Thor & Loki: Blood Brothers",
            "origin_country": [
                "US"
            ],
            "original_language": "en",
            "original_name": "Thor & Loki: Blood Brothers",
            "overview": "Inspired by the acclaimed graphic novel from Robert Rodi and Esad Ribic, Marvel Knights Animation's \"Thor & Loki: Blood Brothers\" takes a powerful look inside the minds of Thor & Loki, brothers in the mythical land of Asgard and seemingly forever enemies. But just why does Loki hate his brother Thor? And could it be that this master of mischief isn’t really the villain he’s been branded? Loki's insatiable lust for power and his feud with Thor take on new meaning in this resonant epic.",
            "popularity": 10.116,
            "poster_path": "/tvd33sRfEEf4fBlyqxTI62wY9qF.jpg",
            "vote_average": 7.3,
            "vote_count": 8
        },
        {
            "adult": false,
            "backdrop_path": "/6UwmkaB1mRZ0fo5A79m5XpVA5RK.jpg",
            "genre_ids": [
                16,
                12,
                35,
                10751,
                14
            ],
            "id": 106631,
            "media_type": "movie",
            "original_language": "is",
            "original_title": "Hetjur Valhallar - Þór",
            "overview": "An over confident teen with a magical weapon and a handful of imperfect gods join forces against an evil queen and her army of giants",
            "popularity": 5.821,
            "poster_path": "/6gs0642LLTa5Nl6vUR06ZQ3stTu.jpg",
            "release_date": "2011-10-14",
            "title": "Legends of Valhalla: Thor",
            "video": false,
            "vote_average": 5.2,
            "vote_count": 40
        },
        {
            "adult": false,
            "backdrop_path": null,
            "genre_ids": [

            ],
            "id": 448361,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Thor: Hammer Time",
            "overview": "Audiences are introduced to the history and powers of the difficult-to-pronounce Mjolnir hammer. The piece then examines the importance of getting the design for the movie version absolutely correct.",
            "popularity": 7.064,
            "poster_path": "/qHTdytIatZlT4Dzgb0oZDnukf4y.jpg",
            "release_date": "2011-09-13",
            "title": "Thor: Hammer Time",
            "video": true,
            "vote_average": 7.3,
            "vote_count": 3
        },
        {
            "adult": false,
            "backdrop_path": "/sYtby8VBJnEBG6X9dH3CVIgzQO2.jpg",
            "genre_ids": [
                12,
                16,
                28
            ],
            "id": 63686,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Thor: Tales of Asgard",
            "overview": "Hungry for adventure, Thor secretly embarks on the journey of a lifetime, joined by his loyal brother Loki, whose budding sorcery equips him with just enough magic to conjure up trouble, along with the Warriors Three - a band of boastful travelers reluctant to set sail on any adventure that might actually be dangerous. But what starts out as a harmless treasure hunt quickly turns deadly, and Thor must now prove himself worthy of the destiny he covets by saving Asgard itself.",
            "popularity": 7.404,
            "poster_path": "/nM2rBqEMrAFiNFHXKWOhUgdKK45.jpg",
            "release_date": "2011-05-16",
            "title": "Thor: Tales of Asgard",
            "video": false,
            "vote_average": 6.3,
            "vote_count": 140
        },
        {
            "adult": false,
            "gender": 2,
            "id": 176312,
            "known_for": [
                {
                    "adult": false,
                    "backdrop_path": "/8gdIKyQ587Gdo4XCc99usA1eyA7.jpg",
                    "genre_ids": [
                        12,
                        878
                    ],
                    "id": 329,
                    "media_type": "movie",
                    "original_language": "en",
                    "original_title": "Jurassic Park",
                    "overview": "A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening day, he invites a team of experts and his two eager grandchildren to experience the park and help calm anxious investors. However, the park is anything but amusing as the security systems go off-line and the dinosaurs escape.",
                    "poster_path": "/b1xCNnyrPebIc7EWNZIa6jhb1Ww.jpg",
                    "release_date": "1993-06-11",
                    "title": "Jurassic Park",
                    "video": false,
                    "vote_average": 7.9,
                    "vote_count": 14013
                },
                {
                    "adult": false,
                    "backdrop_path": "/H40nWdJngUc6gtytMAbElm9HOu.jpg",
                    "genre_ids": [
                        18
                    ],
                    "id": 881,
                    "media_type": "movie",
                    "original_language": "en",
                    "original_title": "A Few Good Men",
                    "overview": "When cocky military lawyer Lt. Daniel Kaffee and his co-counsel, Lt. Cmdr. JoAnne Galloway, are assigned to a murder case, they uncover a hazing ritual that could implicate high-ranking officials such as shady Col. Nathan Jessep.",
                    "poster_path": "/rLOk4z9zL1tTukIYV56P94aZXKk.jpg",
                    "release_date": "1992-12-11",
                    "title": "A Few Good Men",
                    "video": false,
                    "vote_average": 7.5,
                    "vote_count": 2865
                },
                {
                    "adult": false,
                    "backdrop_path": "/xr60oCXkfFIqMRJ4YxtMiD53zBy.jpg",
                    "genre_ids": [
                        10752,
                        18,
                        28,
                        36
                    ],
                    "id": 12100,
                    "media_type": "movie",
                    "original_language": "en",
                    "original_title": "Windtalkers",
                    "overview": "Joe Enders is a gung-ho Marine assigned to protect a \"windtalker\" - one of several Navajo Indians who were used to relay messages during World War II because their spoken language was indecipherable to Japanese code breakers.",
                    "poster_path": "/547q4HXlvEcS06lujfb2yzsTP3H.jpg",
                    "release_date": "2002-06-14",
                    "title": "Windtalkers",
                    "video": false,
                    "vote_average": 6.2,
                    "vote_count": 1032
                }
            ],
            "known_for_department": "Acting",
            "media_type": "person",
            "name": "Cameron Thor",
            "popularity": 5.932,
            "profile_path": "/wQgevaL2Ui7h72enUpFceRaJX.jpg"
        },
    ]

    const [hidden, setHidden] = useState(true)

    // sets hidden state to false on focus
    const handleFocus = () => {
        if (results.length) setHidden(false)
    }

    // sets hidden state to true when out of focus
    const handleBlur = () => {
        setHidden(true)
    }

    return (
        <div className="relative text-center my-10 ">
            <input
                id="main-search"
                type="text"
                placeholder="Search for something specific"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-9/12 h-10 rounded-full border-none px-4 text-xl bg-gray-300 outline-none" />
            <button type="submit" className="p-1 mx-2 rounded-full border-none w-10 h-10 bg-gray-300 text-black">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <SearchResults results={results} hidden={hidden} />
        </div>
    )
}


const SearchResults = ({ results, hidden }) => {
    if (hidden) return null
    return (
        <div className="absolute w-9/12 right-14 left-0 top-10 z-10 bg-gray-400 p-2 max-h-96 space-y-2 drop-shadow-lg overflow-auto mx-auto mt-1 text-left rounded-md text-gray-700 border-2 border-gray-500">
            {results.map(result => {
                return (
                    <div key={result.id} className="flex font-karla  rounded bg-gray-300 p-2 hover:bg-slate-200 transition">
                        <img src={"https://image.tmdb.org/t/p/w185" + (result.poster_path || result.backdrop_path || result.profile_path)} alt="Poster" className="w-28 h-32 object-cover rounded" />
                        <div className="flex flex-col content-center w-full px-2 ">
                            <p className="text-lg font-semibold">
                                {(result.title || result.name)}
                            </p>
                            <p className="text-sm line-clamp-4 mt-3 leading-snug">
                                {result.overview}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}