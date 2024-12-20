const env = import.meta.env;

const {
  VITE_APP_API_URL,
  VITE_REACT_APP_SOCKET_IO,
  VITE_REACT_CHART,
  VITE_REACT_CHAT,
  VITE_REACT_HOME,
} = env;

export const config = {
  app: {
    VITE_APP_API_URL,
  },
  socket: {
    VITE_REACT_APP_SOCKET_IO,
    VITE_REACT_CHAT,
    VITE_REACT_HOME,
  },
  chart: {
    VITE_REACT_CHART,
  },
};
