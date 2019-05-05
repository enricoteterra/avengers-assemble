export const sendApplication = name => {
  fetch("/application", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: {
      name
    }
  });
};
