import React from 'react';
import InnerHeader from '../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import DisplayData from './../../common/DisplayData';
import '../../common/DisplayData.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={'Dashboard'} />
      <div className='main-content'>
        <div className='cardelement'>
          <DisplayData
            number={199}
            name={'Students'}
            icon={<FaIcons.FaUsers style={{ color: '#FFC36D' }} />}
          />
          <DisplayData
            number={111}
            name={'Teachers'}
            icon={<FaIcons.FaUserSecret style={{ color: '#FF7676' }} />}
          />
          <DisplayData
            number={8}
            name={'Faculties'}
            icon={<FaIcons.FaFlag style={{ color: '#009DDC' }} />}
          />
          <DisplayData
            number={89}
            name={'Announcements'}
            icon={<FaIcons.FaBullhorn style={{ color: '#27AE60' }} />}
          />
        </div>
        <div className='announcement-section'>
          <div className='announcement'>
            <span className='announcement-icon'>
              <FaIcons.FaBullhorn />
            </span>
            <span className='title'>ANNOUNCEMENT</span>
          </div>
          <div className='new-announcement'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
            aliquam impedit ipsam, qui neque corporis hic iusto eaque laudantium
            quis sed veniam assumenda, debitis praesentium maiores beatae eius.
            Illo, ad!
          </div>
          <div className='new-announcement'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
            aliquam impedit ipsam, qui neque corporis hic iusto eaque laudantium
            quis sed veniam assumenda, debitis praesentium maiores beatae eius.
            Illo, ad!
          </div>
          <div className='new-announcement'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
            aliquam impedit ipsam, qui neque corporis hic iusto eaque laudantium
            quis sed veniam assumenda, debitis praesentium maiores beatae eius.
            Illo, ad!
          </div>
          <div className='morebutton'>
            <Link to='/announcements' className='load-more'>
              Load More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
