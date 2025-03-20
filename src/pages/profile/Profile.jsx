import { useEffect, useState } from "react";

import { useAuth, useProfile } from "/src/store/hooks";

import EditForm from "../../components/EditForm";
import { observer } from "mobx-react-lite";

const Profile = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      await fetchProfile(auth.token, profileStore);
    };
    if (auth.token && !isEditing) {
      fetchData();
    }
  }, [auth.token, isEditing, profileStore]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {loading ? "loading..." : profileStore.fullName}
        </h1>
        {isEditing ? (
          <EditForm handleCancel={() => setIsEditing(false)} />
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
});

export default Profile;
