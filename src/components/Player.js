import { useState } from 'react'

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [isEditting, setIsEditting] = useState(false);
    const [name, setName] = useState(initialName);

    function handleEditClick() {
        setIsEditting((prev) => !prev);
        if (isEditting) {
            onChangeName(symbol, name);
        }
    }
    return (
        <li className={isActive ? 'active' : ''}>
            {isEditting
                ?
                (<input type='text' maxLength={10} required
                    value={name}
                    onChange={
                        (event) => setName(event.target.value)
                    }
                />)
                :
                (<span className='player-name'>{name}</span>)
            }
            <span className='player-symbol'>
                {symbol}
            </span>
            <button
                onClick={handleEditClick}>
                {isEditting ? 'Save' : 'Edit'}
            </button>
        </li>
    )
}