// PART 1 ---- create Event listener for click button

$("#buttonSearch").on("click", function(){
  //0.0) Clear previous search result
  $("#resultsTarget").empty();
  // 0.25) initialize variables for search
  var searchTerm, numberRecords, startYear, endYear;
  const NYT_URL = "http://www.nytimes.com/"; // used to build images
  // CREATE API KEY;
  var API_key = NYT_API.key; // >> api-key
  var API_value = NYT_API.value; // >> try to guess what this will be :)
  // console.log(API_key + "=" + API_value);
  var API_key_value = API_key + "=" + API_value;


  // 0.5) Validate FORM - required text in search!
  // need to have at least searchTerm --> or it will break!
  // TO DO

  // 1) get content from the form
  searchTerm = $("#searchTerm").val();
  numberRecords = $("#numberRecords :selected").text().trim();
  startYear = $("#startYear").val();
  endYear = $("#endYear").val();

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
      var title, snippetText, date, articleURL, multimediaArray, thumbnailURL;
      // set variables
      title = article.headline.main;
      // snippetText = article.lead_paragraph;
      snippetText = article.snippet;
      date = article.pub_date;
      articleURL = article.web_url;
      multimediaArray = article.multimedia;
      thumbnailURL = undefined; // assume its not there first

      // TESTING
      // console.log(title + "\n " + snippetText + "\n " + date + "\n " + articleURL);
      // debugger
      // console.log(typeof date);
      // console.log(article);
      // debugger


    // 3) Create all the data into DOM values
    // var articleWrapper = $("<div>").addClass("article-wrapper");
    // articleWrapper.append( $("<h4>").text(title) )
    //               .append( $("<p>").text(snippetText) )
    //               .append( $("<p>").text(date) )
    //               .append( $("<a>").attr("href", url)
    //                                .attr("target", "_blank")
    //                                .html("<p>Read More</p>") );
    // 3a) create the wrapper for the article
    var articleWrapper = $("<div>").addClass("media");
    // 3b) check to see if article has a thumbnail image to addClass
    // and make the DOM if it exists
    if (multimediaArray.length !== 0){
      // assume now there is content here
      // loop through the array
      multimediaArray.forEach(function(media){
        if (media.subtype === "thumbnail"){
          // console.log(this); // window!!
          // console.log(media);
          // debugger;
          thumbnailURL = media.url;
        }
      }) // exits forEach loop
    }
    // 3b) cont. check to see if there is a thumbnailURL
    if (thumbnailURL){
      var mediaObject = $("<div>").addClass("media-left")
                                  .append( $("<img>")
                                    .addClass("media-object")
                                    .attr("src", NYT_URL + thumbnailURL)
                                  );
                                  // .append( $("<a>").attr("href", articleURL) )
      articleWrapper.append(mediaObject);
    }



    // 3c) Get the main contents of the article
    var mediaBody = $("<div>").addClass("media-body")
                  .append( $("<h4>").addClass("media-heading").text(title) )
                  .append( $("<p>").text(snippetText) )
                  .append( $("<p>").text(date) )
                  .append( $("<a>").attr("href", articleURL)
                                   .attr("target", "_blank")
                                   .html("<p>Read More</p>") );
    articleWrapper.append(mediaBody);

    // 4) append to the resultsContainer
    resultsContainer.append(articleWrapper);

    }); // closes forEach

    //5) update the DOM with the results Container;
    $("#resultsTarget").append(resultsContainer);

  }) //closes .done() promise
  .fail(function(error){
    // console.log(error);
    $("#resultsTarget").append( $("<h4>").text("Sorry, could not load data.") );
  })

});


// PART 2 --- create Event listener for clear button
$("#buttonClear").on("click", function(){
  // test to see if I can get the
  // console.log( $("#numberRecords") );
  // $("#numberRecords")

  // var test = document.querySelector("#numberRecords");
  // // var test = $("#numberRecords");
  // console.log(test.selectedIndex); // returns the index the user selected
  // var index = test.selectedIndex;
  // var foo = test[index].innerHTML;
  // // var foo = test[index].html();
  // var foo = parseInt(foo);
  // console.log(typeof foo);

  // jQUERY !!!
  // var selected = $("#numberRecords :selected").text().trim();
  // var selected = $("#numberRecords").children("option").filter(":selected").text();
  // console.log( typeof parseInt(selected) );
  // console.log( typeof selected );
  // console.log( selected );


});
