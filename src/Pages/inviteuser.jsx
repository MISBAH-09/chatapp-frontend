import Sidebar from "../components/sidebar";
import Header from "../components/header";
import NewUser from "../components/newuser"

function InviteUser() {
  return (
     <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden ">
        <Sidebar />
        <NewUser />
      </div>
    </div>
  );
}

export default InviteUser;
