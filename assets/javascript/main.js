//
// $(document).ready(function(){
//   var test = $("<div class='test'>");
//     test.append( $("<p>hi</p>"));
//     test.prepend( $("<h4>before</h4>") );
//   $("h2").append(test);
// });

// PART 1 ---- create Event listener for click button

$("#buttonSearch").on("click", function(){
  // 0) initialize variables for search
  var searchTerm, numberRecords, startYear, endYear;
  // CREATE API KEY;
  var API_key = NYT_API.key; // >> api-key
  var API_value = NYT_API.value; // >> try to guess what this will be :)
  // console.log(API_key + "=" + API_value);
  var API_key_value = API_key + "=" + API_value;


  // 0.5) Validate FORM - required text in search!
  // need to have at least searchTerm --> or it will break!
  // TO DO

  // 1) get content from the form
  searchTerm = $("#searchTerm").text();
  searchTerm = "Breast Cancer"; // TESTING
  numberRecords = $("#numberRecords").text();
  startYear = $("#startYear").text();
  endYear = $("#endYear").text();


  // 2) build search query
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  queryURL += "q=" + searchTerm;
  queryURL += "&" + API_key_value;


  // 3) Make Ajax call
  $.ajax({
    url: queryURL,
    method: "GET",
  })
  .done(function(object){
    var articlesArray = object.response.docs; // gets an array of articles
    // 1) create a target div to append each article to!
    var resultsContainer = $("<div>");
    // 2) loop through the array of articles & get key data
    articlesArray.forEach(function(article){
      // initialize variables
      var title, snippetText, date, url;
      // set variables
      title = article.headline.main;
      // snippetText = article.lead_paragraph;
      snippetText = article.snippet;
      date = article.pub_date;
      url = article.web_url;

      // TESTING
      // console.log(title + "\n " + snippetText + "\n " + date + "\n " + url);
      // debugger
      // console.log(typeof date);
      // debugger

    // 3) Create all the data into DOM values
    var articleWrapper = $("<div>").addClass("article-wrapper");
    articleWrapper.append( $("<h4>").text(title) )
                  .append( $("<p>").text(snippetText) )
                  .append( $("<p>").text(date) )
                  .append( $("<a>").attr("href", url)
                                   .attr("target", "_blank")
                                   .html("<p>Read More</p>") );

    // 4) append to the resultsContainer
    resultsContainer.append(articleWrapper);

    }); // closes forEach

    //5) update the DOM with the results Container;
    $("body").append(resultsContainer);

  }) //closes .done() promise


});

// PART 2 --- create Event listener for clear button
$("#buttonClear").on("click", function(){

});
