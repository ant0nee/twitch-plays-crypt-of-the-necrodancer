var TAPIC = require("./tapic/tapic.js"); 
var robot = require("robotjs");

var clientid = ''; // public client id
var oauth = ''; // oauth, requires chat_login, channel_editor

//connect to channels
TAPIC.setup(clientid, oauth, function (username) {
	
	TAPIC.joinChannel("ant0nee", function () {

	});
});

var actions = [];
//twitch chat listener
TAPIC.listen('message', function (e) {

	//e.text = text

	if (e.text == "!quit" && (e.mod == true || e.streamer == true)) {

		process.exit();

	}

	if (e.text.toLowerCase() == "w" || e.text.toLowerCase() == "a" || e.text.toLowerCase() == "s" || e.text.toLowerCase() == "d") {
		
		switch(e.text.toLowerCase()) {

			case "w":
				actions[actions.length] = "up"; 
			break;
			case "a":
				actions[actions.length] = "left"; 
			break;
			case "s":
				actions[actions.length] = "down"; 
			break;
			case "d":
				actions[actions.length] = "right"; 
			break;

		}
		
		
	}

	var split = e.text.toLowerCase().split(" ");

	if ((split[0] == "w" || split[0] == "a" || split[0] == "s" || split[0] == "d") && (split[1] == "w" || split[1] == "a" || split[1] == "s" || split[1] == "d")) {

		var combo = "";

		switch(split[0]) {

			case "w":
				combo += "up ";
			break;
			case "a":
				combo += "left ";
			break;
			case "s":
				combo += "down ";
			break;
			case "d":
				combo += "right ";
			break;

		}

		switch(split[1]) {

			case "w":
				combo += "up";
			break;
			case "a":
				combo += "left";
			break;
			case "s":
				combo += "down";
			break;
			case "d":
				combo += "right";
			break;

		}

		actions[actions.length] = combo;

	}
	
	if (e.text.toLowerCase() == "up" || e.text.toLowerCase() == "down" || e.text.toLowerCase() == "left" || e.text.toLowerCase() == "right") {
		
		actions[actions.length] = e.text.toLowerCase(); 
		
	}

	if (e.text.toLowerCase().substring(0, 5) == "!zone" && (e.mod == true || e.streamer == true)) {

		actions[actions.length] = e.text.toLowerCase();

	}

	if ((split[0] == "up" || split[0] == "down" || split[0] == "left" || split[0] == "right") && (split[1] == "up" || split[1] == "down" || split[1] == "left" || split[1] == "right")) {

		actions[actions.length] = e.text.toLowerCase(); 

	}

}); 

//looper

var zone = 1; 

setInterval(function() {

	robot.setKeyboardDelay(0);
	if (robot.getPixelColor(644, 612) == "ffffff"){

		robot.keyTap("up");
		robot.setKeyboardDelay(100);
		robot.keyTap("down");
	
		robot.keyTap("down");
		robot.keyTap("down");
		robot.keyTap("right");
		robot.keyTap("down");
		robot.keyTap("right");

	} else if (robot.getPixelColor(477, 119) == "ffffff") {

		robot.setKeyboardDelay(100);
		robot.keyTap("right");
		zone++;
		console.log(zone);
		if (zone > 4) {

			zone = 1; 

		}

		for (i = 0; i < zone; i++) {

			robot.keyTap("down");
			robot.keyTap("down");

		}

		robot.keyTap("right");

	} else if (robot.getPixelColor(696, 492) == "ffffff") {

		robot.setKeyboardDelay(100);
		robot.keyTap("down");
		robot.keyTap("right");

	} else if (actions.length > 0) {

		var item = actions.shift(); 
		if (item.substring(0,5) == "!zone") {

			block = true; 
			robot.setKeyboardDelay(100);
			robot.keyTap("escape");
			robot.keyTap("down");
			robot.keyTap("down");
			robot.keyTap("down");
			robot.keyTap("down");
			robot.keyTap("down");
			robot.keyTap("down");
			robot.keyTap("down");
			robot.keyTap("right");
			if (item == "!zone1") {

				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("right");
				zone = 1; 

			} else if (item == "!zone2") {

				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("right");
				zone = 2; 

			} else if (item == "!zone3") {

				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("right");
				zone = 3; 

			} else if (item == "!zone4") {

				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("down");
				robot.keyTap("right");
				zone = 4; 

			} else if (item == "!zonex") {

				robot.setKeyboardDelay(100);
				zone++; 
				if (zone > 4) {

					zone = 1; 

				}

				for (i = 0; i < zone; i++) {

					robot.keyTap("down");
					robot.keyTap("down");

				}

				robot.keyTap("right");

			}


		} else if (item.search(" ") == -1) {

			robot.keyTap(item);

		} else {

			var split = item.split(" ");
			robot.keyTap(split[0]);
			robot.keyTap(split[1]);

		}

	}

}, 500);