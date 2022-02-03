import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

function Sidebar({ show, title, menues }) {
  return (
    <>
      <div className={show ? 'visible-sidemenu active' : 'visible-sidemenu'}>
        <div className='title'>
          <Link to={'/'} style={{ textDecoration: 'none', color: '#551ABB' }}>
            {title}
          </Link>
        </div>
        <div className='sidemenu'>
          <ul className='sidebar-ul'>
            {menues.map((values, index) => {
              if (values.hasSubMenu) {
                return (
                  <MenuItem
                    name={values.name}
                    submenus={values.submenus}
                    key={index}
                    icons={values.icon}
                    hasSubMenus={values.hasSubMenu}
                    toLink={values.to}
                  />
                );
              } else {
                return (
                  <MenuItem
                    name={values.name}
                    key={index}
                    icons={values.icon}
                    hasSubMenus={values.hasSubMenu}
                    toLink={values.to}
                  />
                );
              }
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
