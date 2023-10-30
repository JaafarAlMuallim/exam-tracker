export const checkEnv = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  } else {
    return "https://exam-tracker.vercel.app";
  }
};
