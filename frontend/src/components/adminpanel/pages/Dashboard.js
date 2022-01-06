import React from 'react';
import InnerHeader from '../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

import * as FaIcons from 'react-icons/fa';
import CardData from '../../common/CardData';
import '../../common/CardData.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={'Dashboard'} />
      <div className='main-content'>
        <div className='cardelement'>
          <CardData
            number={199}
            name={'Students'}
            icon={<FaIcons.FaUsers style={{ color: '#FFC36D' }} />}
          />
          <CardData
            number={111}
            name={'Teachers'}
            icon={<FaIcons.FaUserSecret style={{ color: '#FF7676' }} />}
          />
          <CardData
            number={8}
            name={'Faculties'}
            icon={<FaIcons.FaFlag style={{ color: '#009DDC' }} />}
          />
          <CardData
            number={9}
            name={'Classes'}
            icon={<FaIcons.FaFile style={{ color: '#27AE60' }} />}
          />
        </div>
        <div className='card-section'>
          <div className='heading'>
            <span className='title-icon'>
              <FaIcons.FaBullhorn />
            </span>
            <span className='title'>ANNOUNCEMENT</span>
          </div>
          <div className='content-section'>
            <div className='mid-content new-announcement'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              aliquam impedit ipsam, qui neque corporis hic iusto eaque
              laudantium quis sed veniam assumenda, debitis praesentium maiores
              beatae eius. Illo, ad!
            </div>
            <div className='mid-content new-announcement'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              aliquam impedit ipsam, qui neque corporis hic iusto eaque
              laudantium quis sed veniam assumenda, debitis praesentium maiores
              beatae eius. Illo, ad!
            </div>
            <div className='mid-content new-announcement'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              aliquam impedit ipsam, qui neque corporis hic iusto eaque
              laudantium quis sed veniam assumenda, debitis praesentium maiores
              beatae eius. Illo, ad! Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Magnam aliquam impedit ipsam, qui neque corporis
              hic iusto eaque laudantium quis sed veniam assumenda, debitis
              praesentium maiores beatae eius. Illo, ad!
            </div>
            <div className='mid-content new-announcement'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              aliquam impedit ipsam, qui neque corporis hic iusto eaque
              laudantium quis sed veniam assumenda, debitis praesentium maiores
              beatae eius. Illo, ad!
            </div>
            <div className='mid-content new-announcement'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              aliquam impedit ipsam, qui neque corporis hic iusto eaque
              laudantium quis sed veniam assumenda, debitis praesentium maiores
              beatae eius. Illo, ad!ajhfiuafiug
            </div>

            <Link to='/announcements' className='load-more'>
              <div className='morebutton'>Load More</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
