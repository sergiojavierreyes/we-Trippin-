$(document).ready(function(){
	console.log('DOM DOM DOM DOOOOOM')

	$('#update').keyup(function(){
		var searchField = $('#update').val()
		var day= 'Day'
		console.log(searchField)

		// $.post('/dailyPlan', {data: searchField}, function(data){
		// 	console.log(data)
		// 	$('#searchbar').empty();
		// 		console.log()
		// 		$('#searchbar').append('<h5>' + day + '</h5>''<lable> Anything to useful to keep in mind </label>''<textarea id="textarea1"></textarea>')
		// })
	})
});
