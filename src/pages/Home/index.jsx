import React from 'react'
import "./style.scss"
import BannerSection from '../../components/home/BannerSection'
import Policy from '../../components/home/Policy'
import OutstandingProject from '../../components/home/OutstandingProject'

const Home = () => {
  return (
    <div className='home-page'>
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