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
var stories = [];
var requestUrl = 'http://www.freecodecamp.com/stories/hotStories';

//helper function
//given a story's native storyLink, parses the string to the format necessary to create a FreeCodeCamp discussion page link
function parseDiscussLink(str) {
  //TODO
  var strAr = str.split(' ');
  return strAr.join('-');  
}

function displayStories(storyObj) {

  var winWidth = document.body.clientWidth;
  console.log('winWidth: ' + winWidth);
  var imgWidth = (winWidth * (0.8) * 0.3);
  console.log('imgWidth: ' + imgWidth);

  var main = document.querySelector('main');
  var article = document.createElement('article');

  // var img = document.createElement('img');
  // img.src = storyObj.img;
  // img.alt = 'story graphic';

  imgWidth = storyObj.image.naturalWidth;
  imgHeight = storyObj.image.naturalHeight;
  console.log('imgWidth: ' + imgWidth);
  console.log('imgHeight: ' + imgHeight);

  var a = document.createElement('a');
  a.setAttribute('href', storyObj.link);
  a.setAttribute('target', '_blank');
  a.setAttribute('class', 'story-logo');
  //a.setAttribute('class', 'story-link');
  if (storyObj.image.length > 0) {
    a.innerHTML = "<img src='" + storyObj.image + "' alt='story graphic'>";
  } else {
//TODO, this only works for desktop
//how to fix this for responsive
    a.innerHTML = "<img src='http://p-hold.com/310/226' alt='story graphic'>";
  }
  article.appendChild(a);

  var a2 = document.createElement('a');
  a2.setAttribute('href', storyObj.link);
  a2.setAttribute('target', '_blank');
  a2.setAttribute('class', 'story-link');
  a2.innerText = storyObj.headline;

  var h3 = document.createElement('h3');
  h3.appendChild(a2);
  article.appendChild(a2);

  var p = document.createElement('p');
  p.setAttribute('class', 'story');
  var a3 = document.createElement('a');
  a3.setAttribute('href',  storyObj.discussLink);
  a3.setAttribute('target', '_blank');
  a3.setAttribute('class', 'button');
  a3.innerText = 'Discuss';
  p.appendChild(a3);
  console.log(p);

  var span = document.createElement('span');
  span.innerText = storyObj.upvotes + ' points';
  p.appendChild(span)

  article.appendChild(p);
  //article.appendChild(p2);
  main.appendChild(article);
  //main.setAttribute();

}


var jqxhr = $.ajax({
  url: requestUrl,
  dataType: 'json'
}).
done(function(result) {
  
  for (var i = 0; i < 50; i++) {
    var storyObj = {};
    var discussPrefix = 'http://www.freecodecamp.com/news/';

    storyObj.id = result[i]._id;
    storyObj.image = result[i].image;
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
  //console.log(stories);
  stories.forEach(function(story) {
    displayStories(story);
  });
});