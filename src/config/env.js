export const LocalUrl = "https://turkish-mud-coffee.vercel.app/api/v1";
// export const LocalUrl = "http://localhost:4000/api/v1";
export const BranchFunction = (branch) => {
  return branch === "branch1"
    ? 1
    : branch === "branch2"
    ? 2
    : branch === "branch3"
    ? 3
    : branch === "branch4"
    ? 4
    : null;
};
