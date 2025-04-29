function showSuccess(msg) {
  if (window.success) {
    return;
  }
  const notification = document.createElement("div");
  notification.id = "success";

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
