import styled from "styled-components";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";

const Navbar = ({ navbarRef, history }) => {
  return (
    <Wrapper ref={navbarRef}>
      <div className="container">
        <BackButton onClick={() => history.goBack()} />
        <Logo />
        <div className="flex justify-end items-center">
          {/* <NavLink className="nav-item" to="/all-jobs">
            Back to 
          </NavLink> */}
          {/* <NavLink className="nav-item hidden sm:block" to="/dashboard">
            Dashboard
          </NavLink> */}
          <NavLink className="nav-item" to="/all-jobs">
            <span className="bg-[--color-primary] text-white px-6 py-2 rounded">
            Back to Projects
            </span>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0 5px 5px var(--shadow-light);
  padding: 1rem 0;
  .container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .container .nav-item {
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
    margin-left: 20px;
    color: var(--color-black);
  }
  .container .nav-item.active {
    color: var(--color-primary);
  }
  @media screen and (max-width: 1200px) {
    padding: 1rem 2rem;
  }
  @media screen and (max-width: 600px) {
    padding: 1.2rem 1rem;
    .container {
      display: flex;
      /* justify-content: center; */
    }
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: var(--color-primary);
  }
`;

export default Navbar;