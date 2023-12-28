import { createContext, useEffect, useReducer } from "react";
import { apiRouter, axiosGet, axiosPost } from "../services";
import axios from "../services/axios";
import setSession from "../utils/setSession";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  UPDATE_USER: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
});

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        let accessUser = window.localStorage.getItem("authUser")
          ? JSON.parse(window.localStorage.getItem("authUser"))
          : null;

        if (accessToken) {
          setSession(accessToken);

          const decoded = jwtDecode(accessToken);

          const response = await axiosGet(apiRouter.GET_USER, {
            id: decoded?.userId,
          });
          const { data } = response;

          if (data?.data) {
            accessUser = data?.data;
          }

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: accessUser,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (payload) => {
    const response = await axiosPost(apiRouter.LOGIN, payload);
    const { data } = response;
    if (!data?.data) {
      console.log(data.msg);
      return;
    }
    if (data?.data) {
      setSession(data.accessToken);
      localStorage.setItem("authUser", JSON.stringify(data.data));
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.data,
        },
      });
    }
  };

  const register = async (data) => {
    const response = await axios.post(apiRouter.REGISTER, { ...data });
    dispatch({
      type: "REGISTER",
      payload: {
        user: "",
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = async (userData) => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      let accessUser = window.localStorage.getItem("authUser")
        ? JSON.parse(window.localStorage.getItem("authUser"))
        : null;

      if (accessToken) {
        if (userData) {
          accessUser = userData;
        }

        dispatch({
          type: "UPDATE_USER",
          payload: {
            isAuthenticated: true,
            user: accessUser,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
