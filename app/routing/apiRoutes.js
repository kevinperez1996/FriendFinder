
var friends = require("../data/friends");


module.exports = function (app) {

    app.get("/api/friends", function (req, res) {

        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var response = req.body;

        for (var i = 0; i < response.scores.length; i++) {
            response.scores[i] = parseInt(response.scores[i])

        }

        var bestFriend = 0;
        var minDiff = 20;


        for (var i = 0; i < friends.length; i++) {
            var absoluteDifference = 0;

            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(response.scores[j] - friends[i].scores[j])

                absoluteDifference += difference;
            }

            if (absoluteDifference < minDiff) {
                bestFriend = i;
                minDiff = absoluteDifference;
            }
        }

        friends.push(response);
        res.json(friends[bestFriend]);

        console.log(friends[bestFriend]);

    });
}