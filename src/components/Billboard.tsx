import video from '../assets/video.mp4'
import BillBoardButton from './BillBoardButton'

const Billboard = () => {
  return (
    <div className="realtive h-screen">
        
        <video src={video} className='w-full h-full object-cover brightness-[60%] transition duration-500' autoPlay muted loop></video>
        <div className='absolute top-[40%] ml-16'>
            <p className='text-white mt-8 mb-5 drop-shadow-x text-7xl'>Fullmetal Alchemist</p>
            <div className='flex items-center mt-4 gap-3'>
                <BillBoardButton text='play' theme='light' />
                <BillBoardButton text='More Info' theme='dark' />
            </div>
        </div>
    </div>
  )
}

export default Billboard