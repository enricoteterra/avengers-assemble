export const sendApplication = name => {
  fetch("/api/application", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name
    })
  });
};
