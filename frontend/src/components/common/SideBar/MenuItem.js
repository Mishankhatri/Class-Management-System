import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as BiIcons from "react-icons/bi";

function NavLink({
  to,
  className,
  activeClassName,
  inactiveClassName,
  name,
  ...rest
}) {
  //determine based on current location and to
  const location = useLocation();
  const isParent = location.pathname.includes(name);

  let isActive = isParent || location.pathname === `${to}`;

  let allClassName =
    className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);

  // className to remove text-decoration
  // activeClassName to show active link
  //inactiveClassName to show inactive lik

  return !isParent ? (
    <Link className={allClassName} to={to} {...rest} />
  ) : (
    <label className={allClassName} {...rest} style={{ cursor: "pointer" }} />
  );
}

//Function to generate Sidebar
function MenuItem({ name, submenus, icons, hasSubMenus, toLink }) {
  //State fot expanding submenus
  const [expandMenu, setExpandMenu] = useState(false);

  return (
    <div>
      {/* Creating menu with icons and name */}
      <li>
        <NavLink
          to={toLink}
          name={name.toLowerCase()}
          onClick={() => setExpandMenu(!expandMenu)}
          activeClassName="active-link"
          inactiveClassName="inactive-link"
          className="linktext">
          {/* Part of menu */}
          <div className="submenuitems">
            <div className="icon">{icons}</div>
            {name}

            {/* Submenu icon  */}
            {hasSubMenus && (
              <div className="submenuicon">
                {expandMenu ? (
                  <BiIcons.BiDownArrow />
                ) : (
                  <BiIcons.BiRightArrow />
                )}
              </div>
            )}
          </div>
        </NavLink>
        {/* Creating menu with icons and name */}
        {submenus && submenus.length > 0 ? (
          <ul className={`submenu ${expandMenu ? "active" : "collapse"}`}>
            {/* Mapping Submenu obtained from array */}
            {submenus.map((value, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={value.to}
                    className="linktext"
                    activeClassName="active-link active-sublink"
                    inactiveClassName="inactive-link">
                    {value.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ) : null}
      </li>
    </div>
  );
}

export default MenuItem;
