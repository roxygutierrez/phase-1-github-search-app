const form = document.querySelector("#github-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = e.target.search.value;

  fetch(`https://api.github.com/search/users?q=${searchValue}`)
    .then((res) => res.json())
    .then((value) => {
      const userList = document.querySelector("#user-list");
      const items = value.items;
      while (userList.lastElementChild) {
        userList.removeChild(userList.lastElementChild);
      }
      items.forEach((user) => {
        const li = document.createElement("li");

        const userCard = document.createElement("div");
        userCard.addEventListener("click", (e) => {
          fetch(`https://api.github.com/users/${user.login}/repos`)
            .then((res) => res.json())
            .then((data) => {
              const repoList = document.querySelector("#repos-list");
              while (repoList.lastElementChild) {
                repoList.removeChild(repoList.lastElementChild);
              }
              data.forEach((repo) => {
                const li = document.createElement("li");
                li.textContent = repo.full_name;
                repoList.append(li);
              });
            });
        });

        const userImg = document.createElement("img");
        userImg.src = user.avatar_url;

        const username = document.createElement("h2");
        username.textContent = user.login;

        const userProfileLink = document.createElement("a");
        userProfileLink.href = user.html_url;
        userProfileLink.textContent = "User Profile";

        userCard.append(userImg, username, userProfileLink);
        li.append(userCard);
        userList.append(li);
      });
    });
});
