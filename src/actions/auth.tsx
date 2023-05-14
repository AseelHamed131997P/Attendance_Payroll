import { loginPayload } from "types";
import { api } from "ui/utils";

export const login = ({
  username,
  password,
  setError,
  setLoading,
}: loginPayload) => {
  console.log("here in action");
  console.log(username);
  console.log(password);
  api
    .get(
      "/checkUserInfo.php?username=" + username + "&userPassword=" + password
    )
    .then(({ data }) => {
      console.log(data);

      if (data[0].user_id) {
        console.log("enter condtion");
        localStorage.setItem("user", JSON.stringify(data));

        window.location.href = "/main";
        // setLoading(false)
      } else {
        setLoading(false);
        console.log("enter catch");
        setError(true);
      }

      return Promise.resolve();
    })

    .catch((error) => {
      setLoading(false);
      console.log("err", error);
      setError(true);
      return Promise.reject();
    });
};

export const logout = () => {
  console.log("logout");
  localStorage.removeItem("user");
  localStorage.removeItem("selectedOption");
  localStorage.removeItem("dateFrom");
  localStorage.removeItem("dateTo");
  localStorage.removeItem("accessToken");

  window.location.href = "/";
  return 0;
};
