import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import Meta from '../components/Meta';

const TermAndCondition = () => {
  return (
    <>
      <Meta title={"Term&Conditionm&"} />
      <BreadCrumbs title='Term&Conditionm' />
      <Container class1='policy-wrapper py-5 home-wrapper-2'>
          <div className='row'>
            <div className='col-12'>
              <div className='policy'></div>
            </div>
          </div>
      </Container>
    </>
  )
}

export default TermAndCondition