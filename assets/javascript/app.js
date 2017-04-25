$(document).ready(function() {

var options = ["pokemon", "minions", "spongebob"];


// To Call the displayGif() function by clicking on the gifBtn button.
$(document).on("click", ".getGif", displayGif);

// Adding Buttons function.

function addButtons(){

	$(".btnsArea").empty();

		for (var i = 0; i<options.length; i++) {
		var gifBtn = $("<button>");
		gifBtn.html(options[i]);
		gifBtn.addClass("getGif btn btn-info");
		gifBtn.attr("anime-name", options[i]);
		$(".btnsArea").append(gifBtn);
		
	}
}

// button to get the input value from the input area and add new button.

$(".submitBtn").click(function(event){
	event.preventDefault();
	var inputVal = $(".addNew").val().trim();
	options.push(inputVal);
	// console.log(options);
	addButtons();

});

//Adding new gif by clicking button.
function displayGif(){


		$(".gifsArea").empty();

		var animeName = $(this).attr("anime-name");
		console.log(animeName);

		var searchUrl = "https://api.giphy.com/v1/stickers/search?q="+animeName+"&limit=10&api_key=dc6zaTOxFJmzC"

		$.ajax({
		url: searchUrl,
		method: "GET"
		}).done(function(response){
		console.log(response);

    //Adding Gifs loop.
		for (var i = 0; i < response.data.length; i++) {

			var gifImg = $("<img>");
			gifImg.addClass("gif-image ");
   		gifImg.attr("src", response.data[i].images.fixed_height_small_still.url);
   		gifImg.attr("alt", animeName);
   		gifImg.attr("status", "still");
   		gifImg.attr("status-still", response.data[i].images.fixed_height_small_still.url);
   		gifImg.attr("status-move", response.data[i].images.fixed_height_small.url);
   		captionDiv = $('<div class="caption">' );
   		captionDiv.html("<p> Rating: "+response.data[i].rating);

			//Styling Divs.
			var div2 = $("<div class='div2 col-sm-6 col-md-4'>");
			var div3 = $("<div class='thumbnail'>");
			div2.html(div3);
   		div3.append(gifImg);
   		div3.append(captionDiv);
   		$(".gifsArea").append(div2);
		}
 		moveStop();
		});
}

// Gif moving and stop function.
function moveStop(){
	$(".gif-image").click(function(){

		var gifStatus = $(this).attr("status");
		if (gifStatus==="still") {

			$(this).attr("status", "move");
			var moveUrl = $(this).attr("status-move")
			$(this).attr("src", moveUrl);

		}
		else{

			$(this).attr("status", "still");
			var stillUrl = $(this).attr("status-still")
			$(this).attr("src", stillUrl);

		}
	});
}





addButtons();

});
