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
	})

	
	$('#update2').click((e)=>{
		e.preventDefault()

		var newDay = []

		var amount = $('.inputfields').children().length/2
		for (var i = 0; i < amount; i++) {
			console.log("doei")
			newDay.push($('#area' + [i+1]).val())
		}

		console.log(newDay)
		$.post('/addDays', {data: newDay}, (data)=>{
			})
	})
})
