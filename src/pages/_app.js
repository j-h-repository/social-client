import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import Head from "next/head";
import "../../public/styles.css"

import { UserProvider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Head rel="stylesheets" />
        <Nav />
        <ToastContainer position="top-center" closeOnClick />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
