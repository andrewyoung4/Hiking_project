var cheerio = require("cheerio");
var axios = require("axios");

axios.get("https://www.wildlandtrekking.com/blog/").then(function(response) {
  var $ = cheerio.load(response.data);
  var results = [];

  axios.get("https://www.wildlandtrekking.com/blog/").then(function(response) {
    var $ = cheerio.load(response.data);
    $(".rt-holder").each(function(i, element) {
      let img = $(this)
        .children(".rt-img-holder")
        .children("a")
        .children("img")
        .attr("src");
      let link = $(this)
        .children(".rt-img-holder")
        .children("a")
        .attr("href");
      let name = $(this)
        .children(".rt-detail")
        .children(".entry-title")
        .children("a")
        .text();

      const howHard = getDifficulty();

      results.push({
        imageCover: "https://www.wildlandtrekking.com" + img,
        // link: link,
        name: name,
        difficulty: howHard
      });
    });
    // console.log(results);
    callMe(results);
  });
});

function getDifficulty() {
  let returnThis;
  const thisNum = Math.floor(Math.random() * Math.floor(3));
  switch (thisNum) {
    case 0:
      returnThis = "easy";
      break;
    case 1:
      returnThis = "medium";
      break;
    case 2:
      returnThis = "hard";
      break;

    default:
      break;
  }
  return returnThis;
}

function callMe(postThis) {
  axios
    .post("http://localhost:3000/api/v1/hikes/many", {
      hikeArray: postThis
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
