import { useAuthDispatch, useAuthState } from "../context/order";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Payment: React.FC = () => {
    const [modal, setModal] = useState(false);
    const { orderResponse, authenticated } = useAuthState();
    const dispatch = useAuthDispatch();
    const history = useHistory();

    if (!authenticated) {
        history.push("/");
    }

    const confirmation = async () => {
        try {
            await axios.post(`/${orderResponse?.invoiceNumber}/pay`);
        } catch (err) {
            console.log(err);
        }
        dispatch("CHECKOUT");
        history.push("/");
    };

    let modalMakrkup = null;
    if (modal) {
        modalMakrkup = (
            <>
                <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
                    <div className='relative w-auto max-w-sm mx-auto my-6 '>
                        {/*content*/}
                        <div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
                            {/*header*/}
                            <div className='flex items-center justify-center p-5 border-b border-gray-300 border-solid rounded-t'>
                                <h3 className='text-3xl font-semibold'>
                                    CONFIRMED
                                </h3>
                            </div>
                            {/*body*/}
                            <div className='relative flex-auto p-5'>
                                We are shipping your order, thanks for shopping
                                with us
                            </div>
                            {/*footer*/}
                            <div className='flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b'>
                                <button
                                    className='px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none background-transparent focus:outline-none'
                                    type='button'
                                    style={{ transition: "all .15s ease" }}
                                    onClick={confirmation}
                                >
                                    Back to shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
            </>
        );
    }

    return (
        <>
            {modalMakrkup}
            <div className='flex justify-center my-6'>
                <div className='flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
                    <h1 className='mb-3 text-3xl font-bold'>
                        Invoice Id: {orderResponse?.invoiceNumber}
                    </h1>
                    <hr />
                    <div className='flex-1'>
                        <table
                            className='w-full text-sm lg:text-base'
                            cellSpacing='0'
                        >
                            <thead>
                                <tr className='h-12 uppercase'>
                                    <th className='hidden md:table-cell'></th>
                                    <th className='text-left'>Product</th>
                                    <th className='pl-5 text-left lg:text-right lg:pl-0'>
                                        <span
                                            className='lg:hidden'
                                            title='Quantity'
                                        >
                                            Qtd
                                        </span>
                                        <span className='hidden lg:inline'>
                                            Quantity
                                        </span>
                                    </th>
                                    <th className='hidden text-right md:table-cell'>
                                        Unit price
                                    </th>
                                    <th className='text-right'>Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderResponse?.newOrders?.map((or, i) => (
                                    <tr key={i}>
                                        <td className='hidden pb-4 md:table-cell'></td>
                                        <td>
                                            <p className='mb-2 md:ml-4'>
                                                {or.productName.name}
                                            </p>
                                        </td>
                                        <td className='justify-center mt-6 md:justify-end md:flex'>
                                            <div className='w-20 h-10'>
                                                <div className='relative flex flex-row w-full h-8'>
                                                    <p className='w-full pt-1 font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black'>
                                                        {or.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='hidden text-right md:table-cell'>
                                            <span className='text-sm font-medium lg:text-base'>
                                                ${or.productName.price}
                                            </span>
                                        </td>
                                        <td className='text-right'>
                                            <span className='text-sm font-medium lg:text-base'>
                                                ${or.totalPrice}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <hr className='pb-6 mt-6' />
                        <div className='my-4 mt-6 -mx-2 lg:flex'>
                            <div className='lg:px-2 lg:w-1/2'>
                                <div className='p-4 text-center bg-gray-100 rounded-full'>
                                    <h1 className='ml-2 font-bold uppercase'>
                                        Shipping Adrress
                                    </h1>
                                </div>
                                <div className='p-4'>
                                    <div className='justify-center md:flex'>
                                        <textarea className='w-full h-24 p-2 bg-gray-100 rounded focus:outline-none'></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='lg:px-2 lg:w-1/2'>
                                <div className='p-4 text-center bg-gray-100 rounded-full'>
                                    <h1 className='ml-2 font-bold uppercase'>
                                        Order Details
                                    </h1>
                                </div>
                                <div className='p-4'>
                                    <div className='flex justify-between border-b'>
                                        <div className='m-2 text-lg font-bold text-center text-gray-800 lg:px-4 lg:py-2 lg:text-xl'>
                                            Total
                                        </div>
                                        <div className='m-2 font-bold text-center text-gray-900 lg:px-4 lg:py-2 lg:text-lg'>
                                            ${orderResponse?.accumulativePrice}
                                        </div>
                                    </div>

                                    <button
                                        className='flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none'
                                        onClick={() => setModal(true)}
                                    >
                                        <span className='ml-2 mt-5px'>
                                            Confirm
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
