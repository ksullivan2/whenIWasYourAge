//mock events

var EventsList = {};


for (var i = 1900; i <= 2016; i++){
	var year = i.toString();
	EventsList[year] = ["Event 1 in "+year,"Event 2 in "+year,"Event 3 in "+year];
	if (year%4 === 0){
		EventsList[year].push("it was a leap year")
	}
}





module.exports = EventsList;