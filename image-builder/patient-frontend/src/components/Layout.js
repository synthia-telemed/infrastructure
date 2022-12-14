import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapDispatch = dispatch => ({
  setToken: value => dispatch.user.setToken(value)
});
const mapState = state => ({
  user: state.user
});
const Layout = props => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("CapacitorStorage.token")) {
    } else {
      navigate("/login");
    }
  }, []);

  return <div className="">{props.children}</div>;
};
export default connect(mapState, mapDispatch)(Layout);
