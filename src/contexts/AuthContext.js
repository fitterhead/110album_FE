import { SettingsAccessibilityOutlined } from "@mui/icons-material";
import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";
const DELETE_ACCOUNT = "AUTH.DELETE_ACCOUNT";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case INITIALIZE:
      const { isAuthenticated, user, isInitialized } = action.payload;
      // console.log("INITIALIZE RUNNING");
      return {
        ...state,
        isAuthenticated,
        isInitialized,
        user,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /* ------------ persistent login (van login sau khi refresh page) ----------- */
  useEffect(
    () => {
      const initialize = async () => {
        try {
          console.log("initialize running");
          // 1.lay accessToken tu localStorage
          const accessToken = window.localStorage.getItem("accessToken");
          //  2. Check xem accessToken co gia tri? accessToken co valid?
          if (accessToken && isValidToken(accessToken)) {
            //2.1 neu co, set token vao header bang setSession ()
            setSession(accessToken);
            //2.3 gui token cho server de lay thong tin nguoi dung

            const response = await apiService.get("/user/myInfo");
            const user = response.data.user;
            //2.4. sau khi co dc data, dispatch () de luu data do vao state
            dispatch({
              type: INITIALIZE,
              payload: { isInitialized: true, isAuthenticated: true, user },
            });
          } else {
            setSession(null);
            dispatch({
              type: INITIALIZE,
              payload: {
                isInitialized: true,
                isAuthenticated: false,
                user: null,
              },
            });
          }
        } catch (error) {
          // neu ko co token, session  = null va dispatch voi authenticated = false
          console.log(error);
        }
      };

      initialize();
      //useeffect chay function, trong function tao 1
      //function khac ten initialize,
      //va chay function do trong useEffect luon
    },
    []

    //bỏ trống trống[] : useeffect chỉ thực hiện 1 lần khi app render lần đầu tiên
  );

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;

    setSession(accessToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });

    callback();
  };

  const register = async ({ username, email, password }, callback) => {
    const response = await apiService.post("/user", {
      username,
      email,
      password,
    });
    const { user, accessToken } = response.data.data;

    setSession(accessToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const logout = (callback) => {
    setSession(null);
    dispatch({
      type: LOGOUT,
    });
    callback();
  };
  const deleteAccount = async ({ _id }, callback) => {
    const response = await apiService.delete(`/user/${_id}`);
    setSession(null);
    dispatch({
      type: DELETE_ACCOUNT,
      payload: { response },
    });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
