import styled from 'styled-components'
import Footer from '../components/footer'
import Header from '../components/header'

const Wrap = styled.div`
    display: grid;
    gap: 30px;
    padding: 0 30px;
    justify-content: stretch;
    @media only screen and (max-width: 1000px) {
        padding: 0 30px; 
    }
    @media only screen and (max-width: 500px) {
        gap: 20px;
        padding: 0 16px; 
    }
`
export default function MainLayer ({children}) {
  return (
      <div className='wrapper'>
          <Header/>
            <Wrap>
              {children}
            </Wrap>
          <Footer/>
      </div>
  )
}
