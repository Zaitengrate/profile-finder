$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        clietn_id:'301568bdde3da13bc0f7',
        client_secret:'229ac1fe4559e737acc775b43432b29d67f9c09a'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          clietn_id:'301568bdde3da13bc0f7',
          client_secret:'229ac1fe4559e737acc775b43432b29d67f9c09a',
          sort:'created: asc',
          per_page:5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
              <div class="well">
                <div class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong>: ${repo.description}
                  </div>
                  <div class="col-md-3">
                    <span class="badge badge-default">Forks: ${repo.forks_count}</span>
                    <span class="badge badge-primary">Watchers: ${user.watchers_count}</span>
                    <span class="label badge badge-success">Stars: ${user.stargazers_count}</span>
                  </div>
                  <div class="col-md-2">
                    <a href="${repo.html_url}" tatget="_blank" class="btn btn-default">Repo page</a>
                  </div>
                </div>
              </div>
            `);
        });
      });
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">Visit profile</a>
              </div>
              <div class="col-md-8">
                <span class="badge badge-default">Public repos: ${user.public_repos}</span>
                <span class="badge badge-primary">Public gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Site: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest repos</h3>
        <div id="repos"></div>
        `);
    });
  });
});
