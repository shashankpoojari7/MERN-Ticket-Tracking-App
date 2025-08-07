import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { LuAlarmClock, LuTickets } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, deleteTicket, updateTicket } from "../../api/ticketApi";
import LoadingOverlay from "../LoadingOverlay";

function ViewTicket() {
    const [toggle, setToggle] = useState(null)
    const [statusMap, setStatusMap] = useState({});
    const dispatch = useDispatch();
    const tickets = useSelector(state => state.ticket.tickets) || 0;
    const { isLoading, error } = useSelector(state => state.ticket);
    const userid = useSelector(state => state.auth.user._id)

    useEffect(() => {
        const newStatusMap = {};
        tickets.forEach((ticket) => {
            newStatusMap[ticket._id] = ticket.status;
        });
        setStatusMap(newStatusMap);
    }, [tickets])

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    function handleEditClick(id) {
        setToggle(id)
    }

    function handleSaveClick(id, ticketStatus) {
        const status = statusMap[id]
        if (ticketStatus !== status) {
            dispatch(updateTicket({ id, status }))
        }
        setToggle(null)
    }

    function deleteTick(id) {
        dispatch(deleteTicket(id))
    }

    function handleStatusChange(id, status) {
        setStatusMap((prev) => ({
            ...prev,
            [id]: status,
        }));
    }

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'In-Progress': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'Resolved': return 'bg-green-100 text-green-800 border-green-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    }

    if (error) return (
        <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Occurred</h3>
                <p className="text-red-600">{error}</p>
            </div>
        </div>
    );

    if (isLoading) return <LoadingOverlay text1="Fetching tickets..." text2="Please wait a moment" />

    return (
        <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {
                    tickets.length !== 0 ?
                        (
                            <>
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
                                        <LuTickets className="w-10 h-10 text-white" />
                                    </div>
                                    <h1 className="text-4xl font-bold text-gray-800 mb-2 uppercase tracking-wider">
                                        Support Tickets
                                    </h1>
                                    <p className="text-gray-600">Manage and track your requests</p>
                                </div>

                                <div className="space-y-6">
                                    {tickets.map(ticket => (
                                        ticket.status && (
                                            <div key={ticket._id} className="bg-white border-l-4 border-indigo-500 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm border border-gray-100">
                                                <div className="flex flex-col space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="font-semibold text-xl text-gray-800 flex items-center gap-3">
                                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                                <LuTickets className="text-indigo-600" />
                                                            </div>
                                                            <span>{ticket.title}</span>
                                                        </div>
                                                    </div>

                                                    <div className="text-gray-600 text-base leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                        {ticket.description}
                                                    </div>

                                                    <div className="flex flex-wrap gap-6 items-center justify-between bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex flex-wrap gap-6">
                                                            {(() => {
                                                                const createdAt = new Date(ticket.createdAt);
                                                                const formattedDate = createdAt.toLocaleDateString('en-IN', {
                                                                    day: '2-digit',
                                                                    month: '2-digit',
                                                                    year: 'numeric'
                                                                });
                                                                const formattedTime = createdAt.toLocaleTimeString([], {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    hour12: true
                                                                });

                                                                return (
                                                                    <>
                                                                        <div className="flex items-center gap-2 text-indigo-700 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-200">
                                                                            <SlCalender className="text-base" />
                                                                            <span className="font-medium">Created: {formattedDate}</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-2 text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                                                                            <LuAlarmClock className="text-base" />
                                                                            <span className="font-medium">{formattedTime}</span>
                                                                        </div>
                                                                    </>
                                                                );
                                                            })()}
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <strong className="text-gray-700 font-semibold">Status:</strong>
                                                            {ticket._id == toggle ? (
                                                                <select
                                                                    value={statusMap[ticket._id] || ticket.status}
                                                                    onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                                                                    className="border-2 border-gray-300 px-4 py-2 text-sm rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                                                                >
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="In-Progress">In-Progress</option>
                                                                    <option value="Resolved">Resolved</option>
                                                                </select>
                                                            ) : (
                                                                <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getStatusStyles(ticket.status)}`}>
                                                                    {ticket.status}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-gray-200 pt-6 flex justify-center items-center gap-4">
                                                        <button
                                                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${ticket._id == toggle
                                                                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                                                                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                                                                }`}
                                                            onClick={() => ticket._id == toggle ? handleSaveClick(ticket._id, ticket.status) : handleEditClick(ticket._id)}
                                                        >
                                                            {ticket._id == toggle ? <><FaRegSave className="w-4 h-4" /> Save</> : <><MdEdit className="w-4 h-4" /> Edit</>}
                                                        </button>

                                                        {userid == ticket.owner &&
                                                            <button
                                                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${ticket._id == toggle
                                                                    ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                                                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-xl'
                                                                    }`}
                                                                onClick={() => deleteTick(ticket._id)}
                                                                disabled={ticket._id == toggle}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                                Delete
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <div className="max-w-md mx-auto">
                                    <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-4">All Clear! ✨</h3>
                                    <p className="text-gray-600 text-xl">No tickets found — everything is resolved</p>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default ViewTicket;