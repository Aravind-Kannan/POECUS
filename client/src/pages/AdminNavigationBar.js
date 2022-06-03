import { Link } from "react-router-dom";

function AdminNavigationBar() {
  return (
    <nav className="bg-indigo-500 flex flex-col justify-between">
      <div>
        <Link
          className="flex align-center rounded-lg hover:bg-indigo-400 p-4 m-4 text-white font-semibold text-2xl"
          to="/batch"
        >
          <i className="fa-solid fa-school"></i>
          <span className="ml-6">Batch</span>
        </Link>
        <Link
          className="flex rounded-lg hover:bg-indigo-400 p-4 m-4 text-white font-semibold text-2xl"
          to="/subject"
        >
          <i className="fa-solid fa-book"></i>
          <span className="ml-6">Subject</span>
        </Link>
        <Link
          className="flex rounded-lg hover:bg-indigo-400 p-4 m-4 text-white font-semibold text-2xl"
          to="/form"
        >
          <i className="fa-solid fa-rectangle-list"></i>
          <span className="ml-6">Form</span>
        </Link>
      </div>
      <div>
        <Link
          className="flex rounded-lg hover:bg-indigo-400 p-4 m-4 text-white font-semibold text-2xl"
          to="/admin"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className="ml-6">Logout</span>
        </Link>
      </div>
    </nav>
  );
}

export default AdminNavigationBar;
