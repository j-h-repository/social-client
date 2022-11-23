

const SignIn=({email,password, handleSubmit, setEmail, setPassword})=>{
    return(

      
        <>

      <div className="row">
        <div className="col-6 offset-3">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
        </div>
      </div>

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


      <div className="d-flex flex-row justify-content-center p-3">
        <button disabled={!password||!email } className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>

        </>
    )
};

export default SignIn;