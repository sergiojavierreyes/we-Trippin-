$(document).ready(()=>{
	console.log('DOM DOM DOM DOOOOOM')
	$('.collapsible').collapsible();



	$('.upload1').click((e)=>{
		e.preventDefault()
		$(this).siblings('.formStuff')

		var inputName = []

		var amount = $('.inputName').length
			console.log("doei")
			inputName.push($('').val())

		console.log(amount)


		var inputFile = $('.inputFile').val()

		console.log(inputName)  

		$.post('/dailyThoughts', {
			inputFile: inputFile,
			inputName: inputName
		}, (data)=>{

		})
	})

	


})


// button that has a class upload
// this.


