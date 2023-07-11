//import axios from "axios";


// get artworks from Art Institute of Chicago API:
async function getSearchResults(word){
    let artworkIds = [];
    let iiifUrlConfig;
    let searchResults = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${word}`)
        .then(res => res.json())
        .then(info => {
            info.data.forEach(item => artworkIds.push(item.id));
            iiifUrlConfig = info.config.iiif_url;
        });
    return {artworkIds, iiifUrlConfig};
};

async function getCompleteArtworkInfo(results){
    // Create endpoints: 
    let endpoint = "https://api.artic.edu/api/v1/artworks?ids=";
    await results.then(obj => {
        let {artworkIds} = obj;
        endpoint += artworkIds.toString();
    });
    let info = [];
    // Get:
    await fetch(endpoint).then(res => res.json())
        .then(item => {
            item.data.forEach(item => {
                info.push(item);
            })
        });
    return info;
};

async function getImagesSrc(artworkInfo, results){
    console.log(artworkInfo)
    let imageIdArr = [];
    await artworkInfo.then(info => {
        console.log(info)
        info.forEach(artwork => imageIdArr.push(artwork.image_id));
    });
    // "https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg"
    // Create image src:
    let iiifUrlConfig;
    await results.then(item => {
        iiifUrlConfig = item.iiifUrlConfig
    });
    for (let i in imageIdArr) {
        imageIdArr[i] = `${iiifUrlConfig}/${imageIdArr[i]}/full/843,/0/default.jpg`
    };
    return imageIdArr;
};

async function searchArtworksFromExternalAPI(word){
    try {
        // Get results brief Info:
        let results = await getSearchResults(word);
        // Get complete Info:
        let artworkInfo = await getCompleteArtworkInfo(results);  
        //Get images src:
        let imgSrcArr = await getImagesSrc(artworkInfo, results);
        // Set response
        let artworksDetails = [];
        for(let i=0; i<artworkInfo.length; i++){
            artworksDetails.push({"info": artworkInfo[i], "img": imgSrcArr[i]});
        }

        return artworksDetails;
    } catch (error){
        console.log(`Error: ${error}`)
    }
}




module.exports = {
    searchArtworksFromExternalAPI
}