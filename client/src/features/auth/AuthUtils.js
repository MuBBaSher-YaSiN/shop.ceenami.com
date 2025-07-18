import { setCredentials, logout } from "./authSlice";
import { authApi } from "./authApiSlice";

// Call this at app load to fetch fresh token and update redux
export const loadUserFromRefreshToken = (store) => {
  store
    .dispatch(authApi.endpoints.refreshToken.initiate())
    .unwrap()
    .then((data) => {
     const { accessToken, user, role } = data;
if (accessToken) {
  store.dispatch(setCredentials({ user, accessToken, role }));
}

    })
    .catch(() => {
      store.dispatch(logout());
    });
};

// Optional: token expiry check helper (we’ll expand in Step 9)
export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};
