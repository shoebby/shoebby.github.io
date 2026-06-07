const entryNode = document.querySelector(".entry");

const cats = {
    tools:              document.querySelector("div[name='tools']"),
    games:              document.querySelector("div[name='games']"),
    people:             document.querySelector("div[name='people']"),
    assets_textures:    document.querySelector("div[name='assets_textures']"),
    assets_audio:       document.querySelector("div[name='assets_audio']"),
    assets_images:      document.querySelector("div[name='assets_images']"),
    assets_various:     document.querySelector("div[name='assets_various']"),
    tabletop:           document.querySelector("div[name='tabletop']"),
    shop:               document.querySelector("div[name='shop']"),
    neat:               document.querySelector("div[name='neat']"),
}

const websites = {
    // #region Tools
    "Litterbox": {
        url: 'https://litterbox.catbox.moe/',
        desc: "Place for quick temporary uploads, ignore diddy ahh.",
        cat: cats.tools
    },
    "Catbox": {
        url: 'https://catbox.moe/',
        desc: "Places for quick permanent uploads, ignore diddy ahh.",
        cat: cats.tools
    },
    "Poline": {
        url: 'https://meodai.github.io/poline/',
        desc: "An enigmatic color palette generator, harnessing the mystical witchcraft of polar coordinates! It's neat to have a color palette tool that isn't based on lame color science, but rather early-20th century esoterica.",
        cat: cats.tools
    },
    "NormalMap Online": {
        url: 'https://cpetry.github.io/NormalMap-Online/',
        desc: "Tool that does what it says on the box. Quick and web-based, perfect for me and you!",
        cat: cats.tools
    },
    "TextureGenerator Online": {
        url: 'https://cpetry.github.io/TextureGenerator-Online/',
        desc: "Tool that does what it says on the box. Quick and web-based, perfect for me and you!",
        cat: cats.tools
    },
    "Graphviz Online": {
        url: 'https://dreampuf.github.io/GraphvizOnline/',
        desc: "Quite simply a web-based way of using GraphViz. Very useful, mostly thanks to the immediate feedback.",
        cat: cats.tools
    },
    "Cobalt.Tools": {
        url: 'https://cobalt.tools/',
        desc: "Quite simply a web-based way of using GraphViz. Very useful, mostly thanks to the immediate feedback.",
        cat: cats.tools
    },
    "The HP-GL Reference Guide": {
        url: 'https://www.isoplotec.co.jp/HPGL/eHPGL.htm#-',
        desc: "Nice reference for using HPGL pen plotters. Pen plotters are cool!!! There's also an article on my master's course's wiki that dives into them a bit, but I don't think I should link that :3c",
        cat: cats.tools
    },
    "cooltext.com": {
        url: 'https://cooltext.com/',
        desc: "The classic cool text generator... Hell yeah!!!",
        cat: cats.tools
    },
    "onionring.js": {
        url: 'https://garlic.garden/onionring/',
        desc: "Has kind of become the webring script of choice for making a durable webring, I still need to try it for myself but I heard that it rocks.",
        cat: cats.tools
    },
    "Floor Plan Creator": {
        url: 'https://floorplancreator.net/',
        desc: "Useful for planning out home renovation stuff, currently using it to plan out a remodelling of our storage room.",
        cat: cats.tools
    },
    "Webamp": {
        url: 'https://webamp.org/',
        desc: "Winamp in your browser, works great and is very cool!",
        cat: cats.tools
    },
    "X3DOM": {
        url: 'https://www.x3dom.org/',
        desc: "Instant 3D the HTML way! I love this stuff so much.",
        cat: cats.tools
    },
    "Sheet Sites": {
        url: 'https://ambient.institute/i/sheets/',
        desc: "Google Sheet-based website maker, possibly useful for a lightweight solution of media-tracking.",
        cat: cats.tools
    },
    "Fate/Grand Order Wiki": {
        url: 'https://grandorder.gamepress.gg/',
        desc: "My strange addiction is collecting .jpegs of moe-ified historical figures...",
        cat: cats.tools
    },
    "sci-hub": {
        url: 'https://sci-hub.se/',
        desc: "Free and unrestricted access to scientific papers, so far has had everything I wanted to look up. The web3/crypto shit is a bit ick though but not unsurprising given the political overlap.",
        cat: cats.tools
    },
    "BeepBox": {
        url: 'https://www.beepbox.co/',
        desc: "Ever wanted to make a little diddy on the webnet? It's literally so easy and fun!",
        cat: cats.tools
    },
    // #endregion
    
    // #region Games and Toys
    "Windows93": {
        url: 'https://www.windows93.net/',
        desc: "Accidentally ripped these people off with VisunovOS, I hope it can approach how awesome it is...",
        cat: cats.games
    },
    "Kanoguti Soft - No.11": {
        url: 'https://kanoguti93.neocities.org/main_page/soft/list-11',
        desc: "Yummy softwares to nibble on mmmmm...",
        cat: cats.games
    },
    "Aesthetic Computer": {
        url: 'https://aesthetic.computer/',
        desc: "A faux-command-line web-OS housing chats and toys alike, very compelling...!",
        cat: cats.games
    },
    "Katie's Picture Day!": {
        url: 'https://kate-bagenzo.github.io/katey-cam/',
        desc: "Using the webcam for making neat dithered pictures, quick n easy n fun!",
        cat: cats.games
    },
    "Game Saien": {
        url: 'https://en.gamesaien.com/',
        desc: "A Japanese HTML5 game developer or studio, not sure, my favourite of theirs is Fruit Box.",
        cat: cats.games
    },
    "suikagame.com": {
        url: 'https://suikagame.com/',
        desc: "A free web ripoff of Suika Game, which is also a ripoff of a Chinese browser game. It came full circle and I think that's beautiful.",
        cat: cats.games
    },
    "Nitrome": {
        url: 'https://www.nitrome.com/',
        desc: "A British indie game development studio. I've been playing their games since forever, probably since the site's inception. My favourite game from them is Skywire.",
        cat: cats.games
    },
    "Patatap": {
        url: 'https://patatap.com/',
        desc: "An audiovisual soundboard kind of thing. Works on desktop, but works <i>better</i> on a touchscreen!",
        cat: cats.games
    },
    "beepbox.co": {
        url: 'https://www.beepbox.co/',
        desc: "A web instrument, the parameters of which are saved in the URL, making sharing very easy. Really cool project!",
        cat: cats.games
    },
    "17776": {
        url: 'https://www.sbnation.com/a/17776-football',
        desc: "A sort of multi-media browser-based visual novel...? All-time great narrative experience either way, go read it.",
        cat: cats.games
    },
    "The Yume Nikki Online Project": {
        url: 'https://ynoproject.net/',
        desc: "Lets you play Yume Nikki and its many fangames in a sort of browser MMO way, it's basically Habbo Hotel.",
        cat: cats.games
    },
    "laingame.net": {
        url: 'https://laingame.net/',
        desc: "Aims to reproduce the Serial Experiments Lain PS2 game in web form; good game, good project, no notes.",
        cat: cats.games
    },
    "Lvllvl": {
        url: 'https://lvllvl.com/',
        desc: "Converts pictures into pictures made out of character sets. ALso lets you paint with them.",
        cat: cats.games
    },
    "Entrance or Exit": {
        url: 'https://entranceorexit.net/',
        desc: "Roamable online exhibition type thing, very cool, very neat.",
        cat: cats.games
    },
    "The Death Generator": {
        url: 'https://deathgenerator.com/#gallery',
        desc: "Generator for fake videogame screenshots, great for misinformation and reaction images :3",
        cat: cats.games
    },
    // #endregion
    
    // #region Web People
    "Everest Pipkin": {
        url: 'https://everest-pipkin.com/',
        desc: "Has a bunch of games, projects, drawings, writings, resources, tools; ton of cool stuff.",
        cat: cats.people
    },
    "lyra.horse": {
        url: 'https://lyra.horse/',
        desc: "Incredible projects such as the Antonymph Audiovisual Experience and CSS-Clicker, and some neat tools like Arrupted.",
        cat: cats.people
    },
    "heckscaper.com": {
        url: 'https://heckscaper.com/',
        desc: "Home of HALLEY LABS, great tune-craft resources and music.",
        cat: cats.people
    },
    "sabrin.party": {
        url: 'https://sabrin.party/',
        desc: "Simply iconic and inspiring, violently personal just as it should be.",
        cat: cats.people
    },
    "Maia Arson Crimew": {
        url: 'https://maia.crimew.gay/',
        desc: "Holy Fucking Bingle!!!",
        cat: cats.people
    },
    "Beau Jean": {
        url: 'https://beaujean.neocities.org/',
        desc: "Beautiful website full of heart.",
        cat: cats.people
    },
    "Melonking": {
        url: 'https://melonking.net/',
        desc: "Extremely inspiring world of projects and other silliness!",
        cat: cats.people
    },
    "Constraint Systems": {
        url: 'https://constraint.systems/',
        desc: "A collection of alt tools for making and editing images/text, made by Grant Custer.",
        cat: cats.people
    },
    "awawawa.world": {
        url: 'https://awawawa.world/',
        desc: "Cute and fun website of artist/musician j! Especially like the roamable <i>virtual world</i>.",
        cat: cats.people
    },
    "crow-queen.com": {
        url: 'https://crow-queen.com/',
        desc: "Came across this website through a picmix of Lain, and she has a ton of glitter graphics on this page as well. Also, just an all-around incredible website that closely reflects its owner, love that!!",
        cat: cats.people
    },
    "Raphael Bottura": {
        url: 'https://raphaelbottura.com/',
        desc: "Web tool maker/creative coder, in the direction of graphics and print. Need to check their stuff out a bit more but the stuff I did see is incredible.",
        cat: cats.people
    },
    // #endregion
    
    // #region Assets (Textures)
    "TextureTown": {
        url: 'https://textures.neocities.org/',
        desc: "A wonderful Neocities website that hosts a ton of textures (3867 of them, as of writing) and even has a bunch of preview functionality!",
        cat: cats.assets_textures
    },
    "SketchUp Texture Club": {
        url: 'https://www.sketchuptextureclub.com/',
        desc: "A ton of hi-res photo textures, including architectural features, materials, nature elements, and backgrounds & landscapes.<br>They're extremely well-categorized, and although maps and higher resolutions are paywalled, this is only 13 euros a year and they still have a ton of freebies. They also use '^-^' in their donation page so you know the money is in the right hands.",
        cat: cats.assets_textures
    },
    "Texturer": {
        url: 'http://texturer.com/',
        desc: "A big variety of free textures free to use for personal and commercial purposes. I like to scale them down for PSX texturework.",
        cat: cats.assets_textures
    },
    "textures.com": {
        url: 'https://www.textures.com/',
        desc: "They have a big library of high quality, seamless PBR materials. Their pricing scheme is a bit evil though; when you subscribe you get an amount of credits per month, but unused credits don't stack and disappear when your sub ends.",
        cat: cats.assets_textures
    },
    "GRSites Textures": {
        url: 'https://archive.org/details/grsites-textures/',
        desc: "This internet archive item is, as far as I know, all that remains of GRSites' many resources. They also had stuff like fonts and neat tools like a logo maker, really sad that they shut down ;-;",
        cat: cats.assets_textures
    },
    "Texturelabs": {
        url: 'https://texturelabs.org/',
        desc: "A ton of free textures. Also some tutorials and tools but they're centered around Adobe products like Photoshop and After Effects.",
        cat: cats.assets_textures
    },
    "Seamless-Pixels": {
        url: 'https://seamless-pixels.blogspot.com/',
        desc: "Blogspot page with a ton of photo textures, you can either manually download them or get a big pack with all of them prepacked for $14.99.",
        cat: cats.assets_textures
    },
    // #endregion
    
    // #region Assets (Audio)
    "Freesound.org": {
        url: 'https://freesound.org/',
        desc: "Has... uh... free sounds.",
        cat: cats.assets_audio
    },
    "The Mod Archive": {
        url: 'https://modarchive.org/',
        desc: "Hosts a ton of modules and an active forum of trackers; They're great!",
        cat: cats.assets_audio
    },
    "Free Music Archive": {
        url: 'https://freemusicarchive.org/home',
        desc: "Archives... free music...",
        cat: cats.assets_audio
    },
    "TK's Free Sound FX": {
        url: 'https://taira-komori.jpn.org/freesounden.html',
        desc: "A collection of free (game) sound effects created by the goat Taira Komori.",
        cat: cats.assets_audio
    },
    "Rhythm Lab": {
        url: 'https://rhythm-lab.com/',
        desc: "All-time breakbeat bundles.",
        cat: cats.assets_audio
    },
    "Mobygratis": {
        url: 'https://mobygratis.com/',
        desc: "No chuds, no meat and dairy promotion!",
        cat: cats.assets_audio
    },
    "DiscMaster": {
        url: 'https://discmaster.textfiles.com/',
        desc: "Cool index site that contains manu many computer files pulled from archive.org, especially neat for music and SFX!",
        cat: cats.assets_audio
    },
    "DOVA-SYNDROME": {
        url: 'https://dova-s.jp/EN/',
        desc: "Japanese royalty free background music and sound effects! Perfect for visual novels.",
        cat: cats.assets_audio
    },
    // #endregion
    
    // #region Assets (Images)
    "HNCGFF": {
        url: 'https://www.hurtnullifiedcatgirlsfor.fun/',
        desc: "Pictures, primarily for VN backgrounds, nice!",
        cat: cats.assets_images
    },
    "Pexels": {
        url: 'https://www.pexels.com/',
        desc: "Free stock photos and videos, I'm pretty sure this is where a lot of slop-producers get their random stock footage from, which is funny to me.",
        cat: cats.assets_images
    },
    "ICONS8": {
        url: 'https://icons8.com/',
        desc: "Primarily deals in icons in a variety of filetypes, their other stuff can safely be ignored, it's a bit shit and may be AI generated.",
        cat: cats.assets_images
    },
    "BLKMARKET": {
        url: 'https://beta.blkmarket.com/',
        desc: "Sells really cool fonts and illustrations. Sadly they, like textures.com, have a shitty subscription pricing scheme, but they do have a small selection of free stuff.",
        cat: cats.assets_images
    },
    "GifCities": {
        url: 'https://gifcities.org/',
        desc: "GIFCities bitch GIF GIF cities bitch (you can look up GIFs here that were scraped and preserved by the wayback machine).",
        cat: cats.assets_images
    },
    "99GIF SHOP": {
        url: 'https://99gifshop.neocities.org/',
        desc: "More of a -curated- collection of GIFs, moreso part of the web1.0 revival movement.",
        cat: cats.assets_images
    },
    "artwork.neocities.org": {
        url: 'https://artwork.neocities.org/',
        desc: "Soooooo many pictures, sooooo cute!! Graphics section contains such a crazy amount of assets, perfect for toylike websites.",
        cat: cats.assets_images
    },
    // #endregion
    
    // #region Assets (Various)
    "3D.sk": {
        url: 'https://www.3d.sk/',
        desc: "Has photo scan, 3D, and 2D assets of humans! A bunch of them are free, and they include things such as unwrapped face textures, (retopo'd) head and body scans, and reference photos.",
        cat: cats.assets_various
    },
    "OpenGameArt.org": {
        url: 'https://opengameart.org/',
        desc: "A ton of free assets for game development, stuff like textures, models, sounds, fonts... Make sure to credit as is proper.",
        cat: cats.assets_various
    },
    "The CC Search Portal": {
        url: 'https://search.creativecommons.org/',
        desc: "Basically a Creative Commons search engine that automatically directs you to material that has a CC license on different platforms, such as YouTube or Flickr.",
        cat: cats.assets_various
    },
    "Pixabay": {
        url: 'https://pixabay.com/',
        desc: "Royalty-free (vector) images, videos, music, sound effects, and GIFs.",
        cat: cats.assets_various
    },
    "The VG Resource": {
        url: 'https://www.vg-resource.com/',
        desc: "A wiki/forum dedicated to creating and ripping video-game content, including sprites, models, textures, and sounds from all sorts of games and console eras. They're fun to use as placeholders.",
        cat: cats.assets_various
    },
    // #endregion
    
    // #region Tabletop
    "Fantasy Name Generators": {
        url: 'https://www.fantasynamegenerators.com/',
        desc: "A website ran by a person known as Emily, who has hosted hundreds of name generators for over a decade. It has been an incredible resource for me, both for generating names and general inspiration.",
        cat: cats.tabletop
    },
    "Kate Monk's Onomastikon": {
        url: 'https://tekeli.li/onomastikon/',
        desc: "A dictionary of real-world names. It also features a lot of the history behind these names. I used it a lot for the naming in one of my settings which was heavily inspired by Finnish folklore.",
        cat: cats.tabletop
    },
    "World Anvil": {
        url: 'https://www.worldanvil.com/',
        desc: "A website I used for ages to write articles about my homebrewed-to-shit DnD 5e campaign.<br>Reason I'm not using it anymore is mostly due to pricy subscription and a lack of running TTRPG games.",
        cat: cats.tabletop
    },
    "The Alignment System": {
        url: 'https://easydamus.com/alignment.html',
        desc: "A website that aims to explain the alignment system in a human-parseable way, moderately impossible but I appreciate the effort and have used it in the past to introduce new players to this heavily vibes-based system.",
        cat: cats.tabletop
    },
    "Donjon": {
        url: 'https://donjon.bin.sh/',
        desc: "Features a ton of generators, the main one of which I used being their dungeon generators. There's clearly a lot of love behind this site and it has existed for ages. Buy them a coffee!",
        cat: cats.tabletop
    },
    "Vulgarlang": {
        url: 'https://www.vulgarlang.com/',
        desc: "A fantasy language generator. Very useful to create a basis for things like naming and individual words to sprinkle into roleplay when, for instance, a character doesn't know a certain word in 'common'.",
        cat: cats.tabletop
    },
    "Watabou's Procgen Arcana": {
        url: 'https://watabou.github.io/index.html',
        desc: "Tools to procedurally generate spaces of varying scale. I especially got a lot of use out of the city generator.",
        cat: cats.tabletop
    },
    "Armoria": {
        url: 'https://azgaar.github.io/Armoria/',
        desc: "An incredible tool for procedurally generating and designing coats of arms and other armorial bearings.",
        cat: cats.tabletop
    },
    "Art of MTG": {
        url: 'https://www.artofmtg.com/',
        desc: "Compiles hi-res card art made for the Magic: the Gathering TCG. I've often used these pieces for inspiration when trying to come up with characters, locations, and encounters. Fuck WotC though.",
        cat: cats.tabletop
    },
    // #endregion
    
    // #region Webshops
    "Dragonheart": {
        url: 'https://www.dragonheart.nl/',
        desc: "Dutch armorer, apparently sells some top of the line stuff and also is very cool.",
        cat: cats.shop
    },
    "Jack of Dice": {
        url: 'https://jackofdice.nl/',
        desc: "A Dutch TTRPG seller, specializing in dice. They also sell handmade leather pouches!",
        cat: cats.shop
    },
    "The Queen Ring": {
        url: 'https://thequeenring.com/',
        desc: "A Dutch seller of everything chainmail, including materials, tools, instructions, etc.",
        cat: cats.shop
    },
    "Gutterscotch": {
        url: 'https://gutterscotch.shop/',
        desc: "SICK chokers, need one so bad...",
        cat: cats.shop
    },
    "Hobby Link Japan": {
        url: 'https://www.hlj.com/',
        desc: "Go-to for importing Japanese plastic.",
        cat: cats.shop
    },
    "Archonia": {
        url: 'https://www.archonia.com/nl-be/',
        desc: "Dutch weeb seller, they deliver to my local manga shop who I prefer to support tbh...",
        cat: cats.shop
    },
    "Thomann": {
        url: 'https://www.thomann.de/intl/index.html',
        desc: "Instruments!!! And such other wonderful musical things!!!",
        cat: cats.shop
    },
    "IAm8Bit": {
        url: 'https://www.iam8bit.com/',
        desc: "Game merch, also some cool OST releases.",
        cat: cats.shop
    },
    "FanGamer": {
        url: 'https://www.fangamer.eu/',
        desc: "ALSO game merch, I specifically love their plushies.",
        cat: cats.shop
    },
    "Grailed": {
        url: 'https://www.grailed.com/',
        desc: "Game merch, I specifically love their plushies and such things.",
        cat: cats.shop
    },
    "Mindfactory.de": {
        url: 'https://www.mindfactory.de/',
        desc: "German webshops are always cheaper and it's so fucked up.",
        cat: cats.shop
    },
    "Spelspul": {
        url: 'https://www.spelspul.nl/nl/',
        desc: "Dutch seller of boardgames and boardgame supplies, very useful for prototyping.",
        cat: cats.shop
    },
    "Cosplayshop": {
        url: 'https://cosplayshop.be/en/',
        desc: "Belgian cosplay supply store, stuff like foam for making props and armor.",
        cat: cats.shop
    },
    "Boomsma": {
        url: 'https://www.boomsma.nl/',
        desc: "Leatherworking supply store in Den Bosch, awesome stuff but god it's so expensive.",
        cat: cats.shop
    },
    "Tjin's International Foodstore": {
        url: 'https://www.tjinstoko.eu/nl/',
        desc: "They got damn near everything, very useful for some very specific recipes!",
        cat: cats.shop
    },
    "Devil Inspired": {
        url: 'https://www.devilinspired.com/',
        desc: "Western JFashion seller, for cheaper options use a Bhiner/Taobao seller's services!",
        cat: cats.shop
    },
    "Glitzy Wonderland": {
        url: 'https://glitzywonderland.com/',
        desc: "Western JFashion seller, for cheaper options use a Bhiner/Taobao seller's services!",
        cat: cats.shop
    },
    "Betsy Johnson": {
        url: 'https://www.tattydevine.com/',
        desc: "Adorable jewelry, chunky, lotsa bling, extravagant and over the top. So cool!",
        cat: cats.shop
    },
    "Anthony Wang": {
        url: 'https://shopanthonywang.com/',
        desc: "Beautiful platform sneakers, finally also in my size!",
        cat: cats.shop
    },
    "Minga London": {
        url: 'https://eu.mingalondon.com/',
        desc: "Really pretty fashion brand, their sustainability rating is quite mid though.",
        cat: cats.shop
    },
    "Better World Books": {
        url: 'https://www.betterworldbooks.com/',
        desc: "My go-to source of books besides local bookstores, since Amazon bought and killed Book Depository. Still breaks my heart.",
        cat: cats.shop
    },
    // #endregion
    
    // #region Neat Stuff
    "32bit.cafe": {
        url: 'https://32bit.cafe/',
        desc: "Great source of knowledge on web-crafts, and a pretty healthy forum too!",
        cat: cats.neat
    },
    "Render96": {
        url: 'https://github.com/Render96/Render96Wiki/wiki',
        desc: "The render96 project, where they hunt down and present info on the texture and sound libraries Nintendo used in the creation of Super Mario 64's assets. Also a bunch of fun trivia!",
        cat: cats.neat
    },
    "Bawden Brothers Inc. Master Craft Homes": {
        url: 'https://archive.org/details/BawdenBrothersIncMasterCraftHomes0001/page/n5/mode/1up',
        desc: "A folder for American homes from 1935, good layout inspo and generally a wonderful bit of history. Homes folders in general are super neat and a lot of them can be found on the internet archive.",
        cat: cats.neat
    },
    "Earthbound Battle Background JS": {
        url: 'https://www.gjtorikian.com/Earthbound-Battle-Backgrounds-JS/',
        desc: "Combine Earthbound background layers to create neat GIFs!",
        cat: cats.neat
    },
    "Catlike Coding": {
        url: 'https://catlikecoding.com/',
        desc: "Tutorials by Jasper Flick, has been THE resource of learning Unity for me, and now also Godot.<br>Written tutorials are great and there should be more of them.",
        cat: cats.neat
    },
    "The Game UI Database": {
        url: 'https://www.gameuidatabase.com/',
        desc: "Compiled sets of screengrabs and GIFs of game interfaces to be used as reference.",
        cat: cats.neat
    },
    "Interface In Game": {
        url: 'https://interfaceingame.com/',
        desc: "Compiled sets of screengrabs and GIFs of game interfaces to be used as reference.",
        cat: cats.neat
    },
    "Wikioo": {
        url: 'https://wikioo.org/en/',
        desc: "A database of art. More browseable than Wikipedia, tightly categorized, and with some cool history about the pieces and artists. Good narrative inspo and fun to put in games as props.",
        cat: cats.neat
    },
    "Gamedevmap": {
        url: 'https://gamedevmap.com/',
        desc: "Aims to map out gamedev organizations on a living map, it's kinda neat.",
        cat: cats.neat
    },
    "Dataviz Inspiration": {
        url: 'https://www.dataviz-inspiration.com/',
        desc: "Lists cool data visualization projects, nicely categorized according to chart type.",
        cat: cats.neat
    },
    "GNOD": {
        url: 'https://www.gnod.com/',
        desc: "A sort of discovery-oriented search engine, currently supporting music, products, art, literature, and movies.<br>It can give recommendations for them based on your likes, or you can browse a sort of web where similar artists and such are grouped together.",
        cat: cats.neat
    },
    "Yarn": {
        url: 'https://getyarn.io/',
        desc: "Lets you look up words and sentences and spits out clips from movies and shows where that word or sentence is spoken. Fun for editing!",
        cat: cats.neat
    },
    "Unicode Index": {
        url: 'http://xahlee.info/comp/unicode_index.html',
        desc: "Project by Xah Lee, lists all(?) unicode characters. Xah Lee is an interesting character and his website is an incredible feat in and of itself; the web equivalent of a massive dusty tome.",
        cat: cats.neat
    },
    "The Web Design Museum": {
        url: 'https://www.webdesignmuseum.org/',
        desc: "An exhibit of old websites. My favourites include the Cartoon Network and 99rooms websites.",
        cat: cats.neat
    },
    "what the fuck should i listen to right now.com": {
        url: 'https://whatthefuckshouldilistentorightnow.com/',
        desc: "A question I ask myself often...",
        cat: cats.neat
    },
    "Noclip": {
        url: 'https://noclip.website/',
        desc: "Lets you freely explore various game environments, good for inspo and reference.",
        cat: cats.neat
    },
    "9/11 in Realtime": {
        url: 'https://911realtime.org/',
        desc: "Experience the American TV and news cycle on and around the 11th of September, 2001. Made to be educational material, RFK Jr. could use it.",
        cat: cats.neat
    },
    "The Apartment Webring": {
        url: 'https://darkosparko.nekoweb.org/webrings%2Fapartments-webring/apartment-webring-main.html',
        desc: "The most intriguing webring I've found so far.",
        cat: cats.neat
    },
    "Steve's Old Computer Museum": {
        url: 'https://oldcomputers.net/',
        desc: "Computer museum of someone called Steve. Incredibly in-depth and interesting to scroll through.",
        cat: cats.neat
    },
    "Good On You": {
        url: 'https://directory.goodonyou.eco/',
        desc: "Fashion and makeup sustainability directory, rates and categorizes different brands. Wish they had a way to look up different -styles- of fashion but it works fine.",
        cat: cats.neat
    },
    "Bookmarklets": {
        url: 'https://poeticweb.com/bookmarklets/',
        desc: "Bookmarklets are these tiny scripts you can run from your bookmarks bar, and this website contains a number of examples.",
        cat: cats.neat
    },
    // #endregion
};

for (const [key, value] of Object.entries(websites)) {
    console.log(`${key}: ${value.url} // ${value.desc} // ${value.cat}`);

    let newEntry = entryNode.cloneNode(true);
    let newLink = newEntry.querySelector("a");
    let newDesc = newEntry.querySelector(".dropdown-content");

    newEntry.style.display = "";
    newLink.href = value.url;
    newLink.innerHTML = key;
    newDesc.innerHTML = value.desc;

    value.cat.appendChild(newEntry);
  }