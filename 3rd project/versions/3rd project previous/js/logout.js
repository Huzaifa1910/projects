const logoutButton = document.querySelector("#logout-button");

logoutButton.addEventListener("click", () => {
    firebase.auth().signOut()
      .then(() => {
        // Logout successful
        console.log("User logged out");
        window.location.href = "../index.html"
        // Perform any additional actions or redirection as needed
      })
      .catch((error) => {
        // Handle logout error
        console.error("Logout error:", error);
      });
  });