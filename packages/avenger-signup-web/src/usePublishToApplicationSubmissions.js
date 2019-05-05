import shortid from "shortid";

export const usePublishToApplicationSubmissions = () => {
  const submitApplication = name => {
    // @TODO:
    // realistically the token would be
    // generated api-side and returned
    // in the response to this post
    const token = shortid.generate();
    fetch(`/api/application/${token}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name
      })
    });
    return Promise.resolve(token)
  };
  return [submitApplication];
};
