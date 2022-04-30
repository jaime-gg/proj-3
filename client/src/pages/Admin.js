import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_BOOK } from '../utils/mutations';

function Admin() {
    const [formState, setFormState] = useState({ name: '', author: '', description: '', quantity: '', image: '', });
    const [addBook, { error }] = useMutation(ADD_BOOK);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addBook({
                variables: {
                    name: formState.name,
                    author: formState.author,
                    description: formState.description,
                    quantity: formState.quantity,
                    image: formState.image,

                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div>
            <Link to="/">← Return Home</Link>
            <h1>Welcome to the Admin Page!</h1>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="name">Enter New Book Name:</label>
                        <input
                            placeholder="Name"
                            name="name"
                            type="text"
                            id="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="author">Author Name:</label>
                        <input
                            placeholder="Author"
                            name="author"
                            type="text"
                            id="author"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="description">Description:</label>
                        <input
                            placeholder="Description"
                            name="description"
                            type="text"
                            id="description"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            placeholder="Quantity"
                            name="quantity"
                            type="number"
                            id="quantity"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="price">Price:</label>
                        <input
                            placeholder="Price"
                            name="price"
                            type="number"
                            id="price"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="image">Book Cover:</label>
                        <input
                            placeholder="Book Cover"
                            name="image"
                            type="file"
                            id="image"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row flex-end">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Admin;