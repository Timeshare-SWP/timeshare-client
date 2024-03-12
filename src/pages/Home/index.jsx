import React from 'react'
import "./style.scss"
import BannerSection from '../../components/home/BannerSection'
import Policy from '../../components/home/Policy'
import OutstandingProject from '../../components/home/OutstandingProject'
import SupportIcon from '../../components/home/SupportIcon'

const Home = () => {
  return (
    <div className='home-page'>
      <SupportIcon/>
      <BannerSection />

      <div className='container'>
        <Policy />

        <div className='dash-line'></div>

        <OutstandingProject />
      </div>
    </div>
  )
}

export default Home