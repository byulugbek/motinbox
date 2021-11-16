import styled from 'styled-components';
import Footer from './footer';
import Header from './header';

import { motion } from 'framer-motion';

const Wrap = styled.div`
    display: grid;
    gap: 30px;
    padding: 0 50px;
    justify-content: stretch;
    @media only screen and (max-width: 1000px) {
        padding: 0 30px; 
    }
    @media only screen and (max-width: 500px) {
        gap: 20px;
        padding: 0 16px; 
    }
`
export default function MainLayer({ children }) {
  return (
    <div className='wrapper'>
      <Header />
      <motion.div
        exit={{ opacity: 0 }}
        initial='initial'
        animate='animate'
      >
        <Wrap>
          {children}
        </Wrap>
      </motion.div>
      <Footer />
    </div>
  )
}
