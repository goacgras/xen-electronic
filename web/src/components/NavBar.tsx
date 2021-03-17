import { Link } from "react-router-dom";
import Logo from "../images/Bank.svg";

interface navbarProps {
    orderNum: number;
    setModal: (b: boolean) => void;
}

const NavBar: React.FC<navbarProps> = ({ orderNum, setModal }) => {
    return (
        <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-5 bg-gray-300'>
            {/* Logo & title */}
            <div className='flex items-center'>
                <Link to='/'>
                    <img
                        className='w-10 h-10 mr-2'
                        src={Logo}
                        alt='Bank Logo'
                    />
                </Link>
                <span className='hidden text-lg font-semibold lg:block'>
                    <Link to='/'>XenElectronic</Link>
                </span>
            </div>
            {/* Cart */}
            <div className='flex flex-row p-2 px-4 truncate rounded cursor-pointer'>
                <div></div>
                <div className='flex flex-row-reverse w-full ml-2'>
                    <div
                        slot='icon'
                        className='relative'
                        onClick={() => setModal(true)}
                    >
                        <div className='absolute top-0 right-0 px-1 -mt-1 -mr-2 text-xs font-bold text-white bg-red-700 rounded-full'>
                            {orderNum}
                        </div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='100%'
                            height='100%'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='w-6 h-6 mt-2 feather feather-shopping-cart'
                        >
                            <circle cx='9' cy='21' r='1'></circle>
                            <circle cx='20' cy='21' r='1'></circle>
                            <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* <div className='flex-row h-full p-2 '>
                <p className='text-xl'>You Have {orderNum} orders</p>
                {orderNum !== 0 ? (
                    <button
                        onClick={() => setModal(true)}
                        className='p-0 text-xs '
                    >
                        To Checkout ?
                    </button>
                ) : null}
            </div> */}
        </div>
    );
};

export default NavBar;
