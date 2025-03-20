import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { observer } from "mobx-react-lite";

import { useAuth, useProfile } from "/src/store/hooks";

const Header = observer(() => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const profileStore = useProfile();

  const fetchProfile = async (token, profileStore) => {
    try {
      await profileStore.fetchProfile({ token });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (auth.token) {
        setLoading(true);
        await fetchProfile(auth.token, profileStore);
      }
    };
    fetchData();
  }, [auth.token, profileStore]);

  const handleSignOut = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="/src/assets/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {auth.token ? (
        <div>
          <Link to="/profile" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {loading ? "loading..." : profileStore.firstName}
          </Link>
          <Link to="/" className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
});

export default Header;
