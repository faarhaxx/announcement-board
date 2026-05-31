import { useState, useEffect } from "react";
import API from "./api/api";

function App() {

  // LOGIN STATES

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  // ANNOUNCEMENT STATES

  const [announcements, setAnnouncements] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // WORKSPACE STATES

  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceName, setWorkspaceName] = useState("");

  const [selectedWorkspace, setSelectedWorkspace] = useState("");

  // MEMBER STATES

  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("member");

  // LOGIN

  const handleLogin = async () => {

    try {

      const response = await API.post("token/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access);

      setLoggedIn(true);

      alert("Login Success");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");
    }
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("token");

    setLoggedIn(false);
  };

  // FETCH ANNOUNCEMENTS

  const fetchAnnouncements = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "announcements/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnnouncements(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH WORKSPACES

  const fetchWorkspaces = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "workspaces/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorkspaces(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // CREATE WORKSPACE

  const createWorkspace = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "workspaces/",
        {
          name: workspaceName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Workspace Created");

      setWorkspaceName("");

      fetchWorkspaces();

    } catch (error) {

      console.log(error.response?.data);

      alert("Workspace Create Failed");
    }
  };

  // ADD MEMBER

  const addMember = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "workspaces/members/",
        {
          user: userId,
          workspace: selectedWorkspace,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Member Added");

      setUserId("");

    } catch (error) {

      console.log(error.response?.data);

      alert("Add Member Failed");
    }
  };

  {/* EDIT ANNOUNCEMENT */}

{
  editingId && (

    <div className="card p-4 mt-4 shadow">

      <h3>Edit Announcement</h3>

      <input
        type="text"
        className="form-control mb-3"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
      />

      <button
        className="btn btn-success"
        onClick={updateAnnouncement}
      >
        Update
      </button>

      <button
        className="btn btn-secondary ms-2"
        onClick={() => setEditingId(null)}
      >
        Cancel
      </button>

    </div>

  )
}

  // CREATE ANNOUNCEMENT

  const createAnnouncement = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "announcements/",
        {
          title,
          content,
          workspace: selectedWorkspace,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Announcement Created");

      setTitle("");
      setContent("");

      fetchAnnouncements();

    } catch (error) {

      console.log(error.response?.data);

      alert("Announcement Failed");
    }
  };

  // DELETE ANNOUNCEMENT

  const deleteAnnouncement = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(
        `announcements/delete/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Announcement Deleted");

      fetchAnnouncements();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };
// UPDATE ANNOUNCEMENT

const updateAnnouncement = async () => {

  try {

    const token = localStorage.getItem("token");

    await API.put(

      `announcements/update/${editingId}/`,

      {
        title: editTitle,
        content: editContent,
        workspace: selectedWorkspace,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Announcement Updated");

    setEditingId(null);

    fetchAnnouncements();

  } catch (error) {

    console.log(error);

    alert("Update Failed");
  }
};
  useEffect(() => {

    if (loggedIn) {

      fetchAnnouncements();
      fetchWorkspaces();
    }

  }, [loggedIn]);

  

  // LOGIN PAGE

  if (!loggedIn) {

    return (

      <div className="container mt-5">

        <h1 className="mb-4">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    );
  }

  // DASHBOARD

  return (

    <div className="container mt-5">

      <div className="d-flex justify-content-between">

        <h1>Announcement Dashboard</h1>

        <button
          className="btn btn-dark"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* CREATE WORKSPACE */}

      <div className="card p-4 mt-4 shadow">

        <h3>Create Workspace</h3>

        <input
          type="text"
          placeholder="Workspace Name"
          className="form-control mb-3"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={createWorkspace}
        >
          Create Workspace
        </button>

      </div>

      {/* ADD MEMBER */}

      <div className="card p-4 mt-4 shadow">

        <h3>Add Member</h3>

        <select
          className="form-control mb-3"
          onChange={(e) => setSelectedWorkspace(e.target.value)}
        >

          <option value="">Select Workspace</option>

          {

            workspaces.map((workspace) => (

              <option
                key={workspace.id}
                value={workspace.id}
              >
                {workspace.name}
              </option>

            ))
          }

        </select>

        <input
          type="number"
          placeholder="User ID"
          className="form-control mb-3"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >

          <option value="member">Member</option>
          <option value="owner">Owner</option>

        </select>

        <button
          className="btn btn-warning"
          onClick={addMember}
        >
          Add Member
        </button>

      </div>

      {/* CREATE ANNOUNCEMENT */}

      <div className="card p-4 mt-4 shadow">

        <h3>Create Announcement</h3>

        <select
          className="form-control mb-3"
          onChange={(e) => setSelectedWorkspace(e.target.value)}
        >

          <option value="">Select Workspace</option>

          {

            workspaces.map((workspace) => (

              <option
                key={workspace.id}
                value={workspace.id}
              >
                {workspace.name}
              </option>

            ))
          }

        </select>

        <input
          type="text"
          placeholder="Title"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="form-control mb-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={createAnnouncement}
        >
          Create Announcement
        </button>
      </div>
      {/* SEARCH */}

<div className="mt-4">

  <input
    type="text"
    placeholder="Search Announcement"
    className="form-control"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>
      

      {/* ANNOUNCEMENTS */}

      <div className="mt-5">

        <h3>All Announcements</h3>

        {

          announcements
.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase())
)
.map((item) => (

            <div
              key={item.id}
              className="card p-3 mb-3 shadow"
            >

              <h4>{item.title}</h4>

              <p>{item.content}</p>

              <small>
                Workspace ID: {item.workspace}
              </small>

              <br />

              <button
                className="btn btn-danger mt-2"
                onClick={() => deleteAnnouncement(item.id)}
              >
                Delete
              </button>
              <button
  className="btn btn-primary mt-2 ms-2"
  onClick={() => {

    setEditingId(item.id);

    setEditTitle(item.title);

    setEditContent(item.content);
  }}
>
  Edit
</button>


            </div>
          ))
        }

      </div>

    </div>
  );
}

export default App;