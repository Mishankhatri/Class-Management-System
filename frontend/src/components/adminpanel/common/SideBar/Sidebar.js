import React from 'react';
import MenuItem from './MenuItem';

import { getValues } from './SideMenuValue';

function Sidebar({ show }) {
  const sidebarValue = getValues();
  return (
    <div className={show ? 'sidemenu active' : 'sidemenu'}>
      <ul>
        {sidebarValue.map((values, index) => {
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
  );
}

export default Sidebar;
