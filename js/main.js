//pseudocode
//need to make an ajax request with http://www.freecodecamp.com/stories/hotStories
//would like to get just the most recent 50 stories
//want to track these items per story
// result._id: just for internal tracking
// result.headline: to display
// result.link: to link to
// result.storyLink: to parse for the discussion page
// result.upvotes: bonus 

//data model


//helper function
//given a story's native storyLink, parses the string to the format necessary to create a FreeCodeCamp discussion page link
function parseDiscussLink(str) {
  //TODO
  var strAr = str.split(' ');
  return strAr.join('-');  
}

var stories = [];
var requestUrl = 'http://www.freecodecamp.com/stories/hotStories';

var jqxhr = $.ajax({
  url: requestUrl,
  dataType: 'json'
}).
done(function(result) {
  
  for (var i = 0; i < 50; i++) {
    var storyObj = {};
    var discussPrefix = 'http://www.freecodecamp.com/news/';

    storyObj.id = result[i]._id;
    storyObj.headline = result[i].headline;
    storyObj.link = result[i].link;
    //need helper function to parse
    storyObj.discussLink = discussPrefix + parseDiscussLink(result[i].storyLink);
    storyObj.upvotes = result[i].rank;
    
    stories.push(storyObj);
  }
}).
error(function(error) {
  console.log('error: ' + error);    
}).
always(function() {
  console.log(stories);
  //console.log(stories[0]);
  //console.log(stories[49]);
});