function showSuccess(msg) {
  const notification = document.createElement("div");

  notification.style.display = "flex";
  notification.style.flexDirection = "column";

  notification.style.padding = "2rem 0";

  const button = document.createElement("button");
  button.innerText = msg || "Success! Click to dismiss.";


  button.addEventListener("click", () => {
    notification.remove();
  });

  notification.appendChild(button);
  document.body.appendChild(notification);

}
