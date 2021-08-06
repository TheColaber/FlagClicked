const cookie = process.server ? require("cookie") : undefined;

export const actions = {
  async nuxtServerInit({ commit }, { req, res }) {
    // handle auth stuff

    let token;
    if (req.headers.cookie) {
      const parsed = cookie.parse(req.headers.cookie);
      try {
        token = parsed["token"];
      } catch (error) {
        console.log(error);
      }
    }

    if (token) {
      console.log("returning");
      console.log(await this.$axios.get("/auth/me"));
      return;
      const data = await fetch(`/auth/me`, {
        headers: { cookie: req.headers.cookie }
      }).then(res => res.json());
      console.log(data);

      if (data.error) {
        commit("auth/resetUser", null);
        commit("auth/resetToken", null);
        res.setHeader("Set-Cookie", [
          `token=false; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        ]);
      } else {
        commit("auth/setUser", data);
        commit("auth/setToken", token);
      }
    }
  }
};
