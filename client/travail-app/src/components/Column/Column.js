import React, { useState, useEffect, useRef } from "react"
import { Container, Draggable } from 'react-smooth-dnd';
import { Dropdown, Form, Button } from 'react-bootstrap';
import { cloneDeep } from 'lodash'
import './Column.scss'
import Card from "../Card/Card"
import ConfirmModal from "../Common/ConfirmModal";
import { mapOrder } from '../../utilities/sorts'
import { MODAL_ACTIONS_CONFIRM } from '../../utilities/constants'

function Column (props) {
    const { column, onCardDrop, onUpdateColumn } = props
    const cards = mapOrder(column.cards, column.cardOrder, '_id')
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const toggleShowConfirmModal = () => setShowConfirmModal (!showConfirmModal)
    const [columnTitle, setColumnTitle] = useState('')
    const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () => {
        setOpenNewCardForm(!openNewCardForm)
    }

    const newCardTextareaRef = useRef(null)

    const [newCardTitle, setNewCardTitle] = useState('')
    const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)
    
    
    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])

    useEffect(() => {
       
        if (newCardTextareaRef && newCardTextareaRef.current) {
            newCardTextareaRef.current.focus() 
            newCardTextareaRef.current.select() 
        }
     }, [openNewCardForm])

    const onConfirmModalAction = (type) => { 
        if (type === MODAL_ACTIONS_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true
            
            }
            onUpdateColumn(newColumn)
        }
        
        toggleShowConfirmModal() 
    } 
    const selectAllInlineText = (e) => {
        e.target.focus()
        e.target.select()
    }

    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
           title: columnTitle
        
        }
        onUpdateColumn(newColumn)
    }


    // Ghép các API CRUD Cards
    const addNewCard = () => {
        if (!newCardTitle) {
            newCardTextareaRef.current.focus()
            return
        }
        const newCardToAdd = { 
            boardId: column.boardId,
            columnId: column._id,
            title: newCardTitle.trim(),
            cover: null  
        }
        let newColumn = cloneDeep(column) 
        newColumn.cards.push(newCardToAdd)
        newColumn.cardOrder.push(newCardToAdd._id)
        onUpdateColumn(newColumn)
        setNewCardTitle('')
        toggleOpenNewCardForm()
    }
    

    

    
    const saveContentAfterPressEnter = (e) => {
        if (e.key ==='Enter') {
            e.preventDefault()
            e.target.blur()
        }
    }
    return (
        <div className="column">
        <header className="column-drag-handle">
            <div className="column-title">
                
                <Form.Control
                    size="sm"
                    type="text"
                    className='travail-content-editable' 
                    value={columnTitle}
                    spellCheck="false"
                    onClick={selectAllInlineText}
                    onChange={handleColumnTitleChange}
                    onBlur={handleColumnTitleBlur}
                    onKeyDown={saveContentAfterPressEnter}
                    onMouseDown={e => e.preventDefault()}
                    // onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
                />
            </div>
            <div className="column-dropdown-actions">
            <Dropdown>
                 <Dropdown.Toggle  id="dropdown-basic" size="sm" className="dropdown-btn" />
                     
                

                <Dropdown.Menu>
                 <Dropdown.Item onClick={toggleOpenNewCardForm}>Add Card...</Dropdown.Item>
                 <Dropdown.Item onClick={toggleShowConfirmModal}>Remove Column...</Dropdown.Item>
                 <Dropdown.Item>More all card in this column...</Dropdown.Item>
                 <Dropdown.Item>Archive all card in this column...</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
            
        </header>
        <div className="card-list">
        <Container
                    groupName="travail-columns"
                    onDrop={dropResult => onCardDrop(column._id, dropResult)}
                    getChildPayload={index => cards[index] }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                   
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'card-drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >
            {cards.map((card, index) => (
                <Draggable key={index}>
                    <Card  card={card}/>
                </Draggable>
                
            ))}
        </Container>
        {openNewCardForm &&
            <div className="add-new-card-area">
            <Form.Control
                size="sm"
                as="textarea"
                row="3"
                placeholder='Enter card title... ' 
                className='textarea-enter-new-card' 
                ref={newCardTextareaRef}
                value={newCardTitle}
                onChange={onNewCardTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewCard()}
            />
            <Button variant="success" size='sm' onClick={addNewCard}>Add card</Button>
            <span className='cancel-icon' onClick={toggleOpenNewCardForm}><i className='fa fa-times icon' ></i></span>
            </div>  
        } 
         
        </div> 
        <footer>
        {!openNewCardForm &&
            <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon"/> Add another card
        </div>
        }
            
            
        </footer>

        <ConfirmModal 
            show={showConfirmModal}
            onAction={onConfirmModalAction}
            title="Remove column"
            content={`Are you sure you want to remove <strong>${column.title}</strong>. <br/> All related cards will also be removed!`}
        />
        </div>
    )
}
export default Column
