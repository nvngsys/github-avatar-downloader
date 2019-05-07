var request = require('request');
var fs = require('fs');
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
        var path = "./avatar";
        var data = JSON.parse(body);
        data.forEach(function (each) {
            var pathExtended = path + '/' + each.login + '.jpg';
            downloadImageByURL(each.avatar_url, pathExtended);
        });

    });

}

function downloadImageByURL(url, filePath) {
    request.get(url)
        .on('error', function (err) {
            throw err;
        })
        .on('response', function (response) {
            //console.log('Response Status Code: ', response.statusCode);
            console.log(`Response Status Code: ', ${response.statusMessage} ${response.headers['content-type']}`);
        })
        
        .on('end', function () {
            console.log('Download complete')
        })
        .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function (err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});