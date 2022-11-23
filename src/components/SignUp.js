const SignUp = ({
  firstName,
  lastName,
  email,
  password,
  password2,
  handleSubmit,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setPassword2,
  updateProfile,
  about,
  setAbout,
  username,
  setUsername,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-3 offset-3">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            placeholder="First name"
          />
        </div>
        <div className="col-3">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 offset-3">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="name@example.com" disabled={updateProfile}
          />
        </div>
      </div>

      {updateProfile && (
        <>
          <div className="row">
            <div className="col-6 offset-3">
              <label>Username</label>
              <input
                type="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                id="username"
                placeholder="appleseed1"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6 offset-3">
              <label>About me</label>
              <textarea
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="form-control"
                id="about"
                placeholder="Here is a little bit about me...."
              />
            </div>
          </div>
        </>
      )}

      <div className="row">
        <div className="col-6 offset-3">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="inputPassword2"
            placeholder="Password"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 offset-3">
          {password !== password2 ? (
            <label className="warning">Confirm Password</label>
          ) : (
            <label>Confirm Password</label>
          )}
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="form-control warning"
            id="password2"
            placeholder="Retype password"
          />
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center p-3">
        <button
          disabled={
            updateProfile? false:
            !password ||
            !firstName ||
            !lastName ||
            !email ||
            password !== password2
          }
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {updateProfile ? "Save Info": "Submit"}
          
        </button>
      </div>
    </>
  );
};

export default SignUp;
