$(document).ready(function(){
	console.log('DOM DOM DOM DOOOOOM')
	$('.newday').click(function(){
	$("#header ul").append(dayForm)
	})
	$('.removeday').click(function(){
		$( "#header ul" ).remove( ":contains('First')" );
	})
});

for ( i = 0 ; i < day.length ; i++)
var dayForm = '<li><div class="collapsible-header">Day</div><div class="collapsible-body"><form action="/dailyPlan" method="post"><label>Anything useful to keep in mind</label><textarea id="#textarea1" class="materialize-textarea"></textarea><input type="submit"></input><div id="map"><input type="button", value="Delete", onclick="Deletemarkers()")</input></div></form></div></li>'