$(document).ready(()=>{
	console.log('PROFFIEEE PROF PROF')

	$('#update').keyup(()=>{
		$('.inputfields').html('')
		var searchField = $('input#update').val()
		console.log(searchField)
		for (var i = 0; i < searchField; i++) {
			console.log("hoi")
			$('#update').append("<h5> Day " + (i+1) + "</h5><lable> Anything to useful to keep in mind </label><textarea id='area" + (i+1) + "'></textarea>")
		}
	})
})