import shortid from "shortid";

export const usePublishToApplicationSubmissions = () => {
  const submitApplication = ({ name, team }) => {
    return new Promise((resolve, reject) => {

      // @TODO:
      // realistically the token would be generated api-side and returned in the response to this post
      const token = shortid.generate();

      fetch(`/signup/application/${token}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, team})
      })
        .then(({ ok, statusText }) => ok || reject(new Error(statusText)))
        .then(() => resolve(token))
        .catch(() => reject(new Error("Network Error")));
    });
  };
  return [submitApplication];
};
