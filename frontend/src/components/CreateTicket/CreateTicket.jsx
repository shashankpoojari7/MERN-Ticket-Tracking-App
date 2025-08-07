import { useState } from 'react';
import Input from "../Input/Input"
import { useDispatch, useSelector } from 'react-redux'
import { addTicket } from '../../api/ticketApi';

function CreateTicket() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch()
    const id = useSelector(state => state.auth?.user?._id)

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addTicket({id, title, description}))
        setTitle('')
        setDescription('')
    }

    return (
        <div className='min-h-[calc(100vh-70px)] py-5 bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-100 flex items-center justify-center px-4'>
            <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 backdrop-blur-sm">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Create New Ticket
                    </h1>
                    <p className="text-gray-600">Submit your support request</p>
                </div>

                <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                    <Input
                        label="Ticket Title"
                        type="text"
                        placeholder="Brief description of your issue"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="transition-all duration-200"
                    />
                    <Input
                        label="Description"
                        type="textArea"
                        placeholder="Provide detailed information about your issue..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="min-h-[120px] transition-all duration-200"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-200"
                    >
                        <span className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Create Ticket</span>
                        </span>
                    </button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                        <strong>💡 Tip:</strong> Be as specific as possible in your description to help us resolve your issue quickly.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;