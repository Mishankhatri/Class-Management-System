import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';

function MenuItem({ name, submenus, icons, hasSubMenus }) {
  const [expandMenu, setExpandMenu] = useState(false);

  return (
    <div>
      <li>
        <NavLink
          to={name.replace(' ', '').toLowerCase()}
          style={{
            textDecoration: 'none',
          }}
          onClick={() => setExpandMenu(!expandMenu)}
          className={(props) => {
            return `${
              props.isActive ? 'isActive active-link' : 'inactive-link'
            }`;
          }}>
          <div className='submenuitems'>
            <div className='icon'>{icons}</div>
            {name}
            {hasSubMenus && (
              <div className='submenuicon'>
                {expandMenu ? (
                  <BiIcons.BiDownArrow />
                ) : (
                  <BiIcons.BiRightArrow />
                )}
              </div>
            )}
          </div>
        </NavLink>

        {submenus && submenus.length > 0 ? (
          <ul className={`submenu ${expandMenu ? 'active' : 'collapse'}`}>
            {submenus.map((value, index) => {
              const splitname = value.replace(' ', '');

              const finalUrl = `${name.toLowerCase()}/${splitname.toLowerCase()}`;

              return (
                <li key={index}>
                  <NavLink
                    to={finalUrl}
                    style={{ textDecoration: 'none' }}
                    className={(props) => {
                      return `${
                        props.isActive
                          ? 'isActive active-link active-sublink'
                          : 'inactive-link'
                      }`;
                    }}>
                    {value}
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
