import { useEffect, useState } from "react";
import NavigationBar from "../components/navigationBar";
import { useCookies } from "react-cookie";
import { authRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { useNavigate } from "react-router";
import LoaderItems from "../components/loader";
function Chat() {
  const key: string = import.meta.env.VITE_LOCALHOST_KEY;
  const [cookies] = useCookies([key]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const verifyCookie = async () => {
      setLoading(true);
      const { data } = await axios.post(
        authRoute,
        {},
        { withCredentials: true }
      );
      setLoading(false);
      if (!data.status) {
        navigate("/");
      }
    };
    verifyCookie();
  }, [cookies, navigate]);

  return (
    <>
      <NavigationBar logoutButton={true}></NavigationBar>
      {loading ? <LoaderItems /> : ""}
    </>
  );
}

export default Chat;
