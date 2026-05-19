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
    // #endregion
    // #region Games and Toys
    // #endregion
    // #region Web People
    // #endregion
    // #region Assets (Textures)
    // #endregion
    // #region Assets (Audio)
    // #endregion
    // #region Assets (Images)
    // #endregion
    // #region Assets (Various)
    // #endregion
    // #region Tabletop
    // #endregion
    // #region Webshops
    // #endregion
    // #region Neat Stuff
    // #endregion
};

for (const [key, value] of Object.entries(websites)) {
    console.log(`${key}: ${value.url} // ${value.desc} // ${value.cat}`);

    let newEntry = entryNode.cloneNode(true);
    let newLink = newEntry.querySelector("a");
    let newDesc = newEntry.querySelector(".dropdown-content");

    newLink.href = value.url;
    newLink.innerHTML = key;
    newDesc.innerHTML = value.desc;

    value.cat.appendChild(newEntry);
  }