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
        {/* <div className="flex flex-col flex-1"> */}
          {/* <h1 className="p-4 text-xl font-semibold">
            Invite Users Page
          </h1> */}
       {/* </div> */}
      </div>
    </div>
  );
}

export default InviteUser;
