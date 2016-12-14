$(document).ready(()=>{
	console.log('DOM DOM DOM DOOOOOM')

	$('#update').keyup(()=>{
		$('.inputfields').html('')
		var searchField = $('#update').val()
		console.log(searchField)

		for (var i = 0; i < searchField; i++) {
			console.log("hoi")
			$('.inputfields').append("<h5> Day " + (i+1) + "</h5><lable> Anything to useful to keep in mind </label><textarea id='area" + (i+1) + "'></textarea>")
		}
		// $.post('/addDays', {data: searchField}, (data)=>{
		// 	$('#update').each(()=>{
		// 		var extraDay = '<h5>' + day + '</h5><lable> Anything to useful to keep in mind </label><textarea id="textarea1"></textarea>'
		// 		$('form').append(extraDay)
		// 	})
		// })
	})
});
