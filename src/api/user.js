import request from "@/utils/request";

export function login(data) {
  var req = new Object();
  req.account = data.username;
  req.passwd = data.password;
  return request({
    url: "/api/v1/user/login",
    method: "post",
    data: req
  });
}

export function getInfo(token) {
  return request({
    url: "/api/v1/user/",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/api/v1/user/logout",
    method: "post"
  });
}
