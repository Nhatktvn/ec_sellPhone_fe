import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-white text-gray-500'>
      <div className='w-full h-[100px] bg-orange'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-white'>About Us</h3>
            <p className='text-sm'>
              We are your trusted destination for premium smart mobile devices, offering cutting-edge technology and
              exceptional customer service since 2010.
            </p>
            <button className='text-sm text-blue-400 hover:text-blue-300 transition duration-300'>Learn More →</button>
          </div>

          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-white'>Customer Service</h3>
            <ul className='space-y-2'>
              <li>
                <button className='text-sm hover:text-white transition duration-300 flex items-center gap-2'>
                  <FaPhone className='text-blue-400' />
                  Contact Us
                </button>
              </li>
              <li>
                <button className='text-sm hover:text-white transition duration-300'>Returns</button>
              </li>
              <li>
                <button className='text-sm hover:text-white transition duration-300'>FAQ</button>
              </li>
              <li>
                <button className='text-sm hover:text-white transition duration-300 flex items-center gap-2'>
                  <FaMapMarkerAlt className='text-blue-400' />
                  Store Locator
                </button>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-white'>Legal</h3>
            <ul className='space-y-2'>
              <li>
                <button className='text-sm hover:text-white transition duration-300'>Privacy Policy</button>
              </li>
              <li>
                <button className='text-sm hover:text-white transition duration-300'>Terms & Conditions</button>
              </li>
              <li>
                <button className='text-sm hover:text-white transition duration-300'>Warranty Information</button>
              </li>
              <li>
                <button className='text-sm hover:text-white transition duration-300'>Security</button>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-white'>Connect With Us</h3>
            <div className='flex space-x-4'>
              <button aria-label='Facebook' className='text-gray-400 hover:text-blue-500 transition duration-300'>
                <FaFacebook size={24} />
              </button>
              <button aria-label='Twitter' className='text-gray-400 hover:text-blue-400 transition duration-300'>
                <FaTwitter size={24} />
              </button>
              <button aria-label='Instagram' className='text-gray-400 hover:text-pink-500 transition duration-300'>
                <FaInstagram size={24} />
              </button>
              <button aria-label='LinkedIn' className='text-gray-400 hover:text-blue-600 transition duration-300'>
                <FaLinkedin size={24} />
              </button>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <FaEnvelope className='text-blue-400' />
                <span className='text-sm'>support@smartdevices.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <FaPhone className='text-blue-400' />
                <span className='text-sm'>1-800-SMART-DEVICES</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-gray-800'>
          <p className='text-center text-sm'>© {currentYear} Smart Mobile Devices. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
