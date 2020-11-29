const GITHUB_URL = "https://api.github.com";
const GITHUB_API_KEY = "0724e866f496485a4d85da9f88e3d744260a8af5";
const page = document.querySelector(".page");
const info = document.querySelector(".page-information");
const profilePicture = document.querySelector(".profile-image");
const profileName = document.querySelector(".profile-name");
const profileGithubLink = document.querySelector(".github-link");
const getCurrentUser = fetch(`${GITHUB_URL}/user`, {
  headers: {
    Authorization: `Bearer ${GITHUB_API_KEY}`,
  },
});

const displayPage = (showPage = true, message = null) => {
  if (showPage) {
    page.style.display = "block";s
    info.style.display = "none";
  } else {
    page.style.display = "none";
    info.style.display = "block";
    info.innerText = message;
  }
};
const setUser = (user) => {
  const avatar = user.avatar_url;
  const name = user.name;
  const githubLink = user.html_url;
  profilePicture.src = avatar;
  profileName.innerText = name;
  profileGithubLink.href = githubLink;
  console.log(user);
};

const main = () => {
  displayPage(false, "loading...");
  getCurrentUser
    .then((res) => {
      if (res.status !== 200) {
        switch (res.status) {
          case 401:
            displayPage(
              false,
              "The api key you provided is unauthorized to access this endpoint"
            );
            break;
          case 404:
            displayPage(false, "The requested resource does not exist (404)");
            break;
          case 500:
            displayPage(false, "Internal server error");
            break;
          default:
            displayPage(false, "there was an error reaching the github api...");
        }
      }
      else return res.json();
    })
    .catch((err) => console.log("err!!"))
    .then((user) => {
      setUser(user);
      displayPage(true);
    })
    .catch((err) => console.log("err!!"));
};
main();
