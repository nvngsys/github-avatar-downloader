var request = require('request');
var token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': token.GITHUB_TOKEN
        }
    };

    request(options, function (err, res, body) {
        //cb(err, body);
        
        var data = JSON.parse(body);
        console.log(data);
        data.forEach(function(each) {
          console.log(each.avatar_url);
        });

    });

}


getRepoContributors("jquery", "jquery", function (err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});