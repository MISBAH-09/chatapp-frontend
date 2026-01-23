import Sidebar from "../components/sidebar";
import Header from "../components/header";

function InviteUser() {
  return (
     <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden ">
        <Sidebar />
        <div className="flex flex-col flex-1">
        <h1 className="p-4 text-xl font-semibold">
           Invite Users Page
         </h1>
       </div>
      </div>
    </div>


    // <div className="flex h-screen">
    //   <Sidebar />

    //   <div className="flex flex-col flex-1">
    //     <Header />
    //     <h1 className="p-4 text-xl font-semibold">
    //       Invite Users Page
    //     </h1>
    //   </div>
    // </div>
  );
}

export default InviteUser;
