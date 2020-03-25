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

      results.push({
        imageCover: "https://www.wildlandtrekking.com" + img,
        // link: link,
        name: name,
        difficulty: "medium"
      });
    });
    callMe(results);
  });
});

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
