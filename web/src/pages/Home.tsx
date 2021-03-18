import useSWR from "swr";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { OrderInput, Product } from "../types";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { Category } from "../components/Category";
import { useAuthDispatch } from "../context/order";

const Home: React.FC = () => {
    const [category, setCategory] = useState("laptop");
    const [orders, setOrders] = useState<OrderInput[]>([]);
    const [modal, setModal] = useState(false);
    const { data } = useSWR<Product[]>(`/product/${category}`);

    const dispatch = useAuthDispatch();
    const history = useHistory();

    if (!data) {
        return <div>Loading..</div>;
    }

    console.log("Category:", category);

    const addToCart = (product: Product) => {
        const foundProd = orders.find((o) => o.name === product.name);
        if (foundProd) {
            return;
        }
        const newOrder: OrderInput = {
            name: product.name,
            quantity: 1,
        };
        setOrders((arr) => [...arr, newOrder]);
    };

    const cancelOrder = () => {
        setModal(false);
    };

    const addQuantity = (index: number) => {
        let newArr = [...orders];
        newArr[index].quantity += 1;

        setOrders(newArr);
    };
    const subtractQuantity = (index: number) => {
        let newArr = [...orders];
        if (newArr[index].quantity === 1) {
            return;
        }
        newArr[index].quantity -= 1;

        setOrders(newArr);
    };

    const removeOrder = (index: number) => {
        setOrders((arr) => arr.filter((el) => el.name !== orders[index].name));
    };

    const checkout = async () => {
        if (orders.length <= 0) {
            return;
        }
        try {
            const res = await axios.post("/order", {
                orders,
            });
            dispatch("SET_RES_ORDER", res.data);
            history.push("/payment");
        } catch (err) {
            console.log(err);
        }
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
                                    Order Summary
                                </h3>
                            </div>
                            {/*body*/}
                            <div className='relative flex-auto p-5'>
                                {orders.map((o, i) => (
                                    <div
                                        key={o.name}
                                        className='flex justify-between mb-4'
                                    >
                                        <p>{o.name}</p>

                                        <div className='flex justify-center mx-auto'>
                                            <button
                                                className='mr-5 border-none focus:outline-none'
                                                onClick={() =>
                                                    subtractQuantity(i)
                                                }
                                            >
                                                -
                                            </button>
                                            <p className='mr-5'>{o.quantity}</p>

                                            <button
                                                className='focus:outline-none'
                                                onClick={() => addQuantity(i)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div
                                            className='ml-3 border-none focus:outline-none'
                                            onClick={() => removeOrder(i)}
                                        >
                                            <i className='far fa-trash-alt'></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/*footer*/}
                            <div className='flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b'>
                                <button
                                    className='px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none background-transparent focus:outline-none'
                                    type='button'
                                    style={{ transition: "all .15s ease" }}
                                    onClick={cancelOrder}
                                >
                                    Back to shopping
                                </button>
                                <button
                                    className='px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none'
                                    type='submit'
                                    style={{ transition: "all .15s ease" }}
                                    onClick={checkout}
                                >
                                    Checkout
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
            {/* Navbar */}
            <NavBar orderNum={orders.length} setModal={setModal} />

            {/* Content*/}
            <div className='container mx-auto mt-12'>
                <Category setValue={setCategory} category={category} />
                {/* Product list */}

                <div className='flex-col w-full p-2 lg:gap-4 lg:grid-cols-3 lg:grid'>
                    {data.map((product, index) => (
                        <div className='py-6' key={index}>
                            <div className='flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg'>
                                <div className='w-1/3 bg-cover'>
                                    {/* Images */}
                                </div>
                                <div className='w-2/3 p-4'>
                                    <h1 className='text-2xl font-bold text-gray-900'>
                                        {product.name}
                                    </h1>
                                    <p className='mt-2 text-sm text-gray-600'>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit In odit exercitationem
                                        fuga id nam quia
                                    </p>

                                    <div className='flex justify-between mt-3 item-center'>
                                        <h1 className='text-xl font-bold text-gray-700'>
                                            ${product.price}
                                        </h1>

                                        <button
                                            className='px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded'
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
