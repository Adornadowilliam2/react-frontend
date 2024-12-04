import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { login } from "../redux/authSlice";
import { checktoken } from "../api/auth";

const checkAuth = (WrappedComponent) => {
  const Authenticate = (props) => {
    const user = useSelector((state) => state.auth.user);
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();

    if (!user) {
      if (cookies.AUTH_TOKEN) {
        checktoken(cookies.AUTH_TOKEN).then((res) => {
          if (res?.ok) {
            dispatch(login(res.data));
          } else {
            removeCookie("AUTH_TOKEN");
          }
        });
      }
    }
    return <WrappedComponent {...props} />;
  };
  return Authenticate;
};

export default checkAuth;
