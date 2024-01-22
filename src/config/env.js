// export const LocalUrl = "http://localhost:4000/api/v1";
// export const ImageUrl = "http://localhost:4000";
export const LocalUrl = "https://testing2.zameeransari.com.pk/api/v1";
export const ImageUrl = "https://testing2.zameeransari.com.pk";
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
