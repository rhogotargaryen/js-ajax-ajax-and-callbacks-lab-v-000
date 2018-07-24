$(document).ready(function (){
});


function displayError() {
    $('#errors').html('there\'s an error! Please try again!')
}

function searchRepositories() {
    const searchTerms = $('#searchTerms').val()
    console.log(searchTerms)
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
        console.log(response)
        const repoList = `${response.items.map(r => displayRepo(r)).join("")}`
        $('#results').html(repoList)
    })
    
}

function displayRepo(result) {
    return `<div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
     </div></br>`
}

function showCommits(link) {
    const owner = link.dataset.owner
    const repository = link.dataset.repository
     $.get(`https://api.github.com/repos/${link.dataset.owner}/${link.dataset.repository}/commits`, function(response) {
         console.log(response)
         const commitList = `<ul> ${response.map(r => displayCommit(r)).join("")}</ul>`
         $('#details').html(commitList)
     })
}

function displayCommit(result) {
    return `<li><h3>${result.sha}</h3><p>${result.commit.message}</p></li>`
}



