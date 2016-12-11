// PART 1 ---- create Event listener for click button

$("#buttonSearch").on("click", function(){
  // 0) initialize variables for search
  var searchTerm, numberRecords, startYear, endYear;
  // CREATE API KEY;

  // 0.5) Validate FORM - required text in search!
  // need to have at least searchTerm --> or it will break!
  // TO DO

  // 1) get content from the form
  searchTerm = $("#searchTerm").text();
  searchTerm = "Computer Science"; // TESTING

  numberRecords = $("#numberRecords").text();
  startYear = $("#startYear").text();
  endYear = $("#endYear").text();


  // 2) build search query
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  queryURL += "q=" + searchTerm;
  queryURL += "&" + API_KEY;


  // 3) Make Ajax call
  $.ajax({
    url: queryURL,
    method: "GET",
  })
  .done(function(response){
    console.log(response);
  })


});

// PART 2 --- create Event listener for clear button
$("#buttonClear").on("click", function(){

});
