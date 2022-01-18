import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap';
import { isEmpty, update } from 'lodash'
import './BoardContent.scss'
import Column from '../../components/Column/Column'
import { mapOrder } from '../../utilities/sorts'
import { applyDrag } from '../../utilities/dragDrop'
import { initialData } from '../../actions/initialData.js';



function BoardContent () {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    
    const newColumnInputRef = useRef(null)
    const [newColumnTitle, setNewColumnTitle] = useState('')
    const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm)
    }  


    // Ghép API Get Full Board vào giao diện
    useEffect(() => {
       const boardFromDB = initialData.boardss.find(board => board._id === 'board-1')
       if (boardFromDB) {
           setBoard(boardFromDB)


    
           setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, '_id'))
       }
    }, [])



    useEffect(() => {
       
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus() 
            newColumnInputRef.current.select() 
        }
     }, [openNewColumnForm])
    
    if (isEmpty(board)) {
        return <div className='not-found'>Board not found</div>
    }


    // Kéo thả Column
    const onColumnDrop = (dropResult) => {
        console.log(dropResult)
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard={...board}
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns

        // Call api update columnOder trên board
        setColumns(newColumns)
        setBoard(newBoard)
    }

    // Kéo thả Card
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(c => c._id === columnId )
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOder = currentColumn.cards.map(i => i._id)
            
            setColumns(newColumns)
            if (dropResult.removedIndex != null && dropResult.addedIndex !== null) {
                // move card trong column 
                // Call api update cardOrder trong current column
                
            } else {
                // move card giua cac column 
                // call api update cardOrder trong current column 
                // call api update columnId trong current card 
            }
            
        }
        
    }
   

    // Ghép các API CRUD Columns
    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }
        const newColumnToAdd = {
            boardId: board._id,
            title: newColumnTitle.trim(),
            
        }
        let newColumns = [...columns]
        newColumns.push(newColumnToAdd)

        let newBoard={...board}
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns


        setColumns(newColumns)
        setBoard(newBoard)
        setNewColumnTitle('')
        toggleOpenNewColumnForm()
    }
    const onUpdateColumn = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate._id

        let newColumns =[...columns]
        const columnIndexToUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate)
        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(columnIndexToUpdate, 1)
        } else {
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
        }

        let newBoard={...board}
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns


        setColumns(newColumns)
        setBoard(newBoard)
    }

    
    return (
        <div className="board-content">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={index => columns[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview'
          }}
        >
            {columns.map((column, index) => (
                <Draggable key={index}>
                    <Column  
                    column={column} 
                    onCardDrop={onCardDrop} 
                    onUpdateColumn={onUpdateColumn}
                    
                    />
                </Draggable>
                 
            ))}
        </Container>

        <BootstrapContainer className='travail-app-container'>
            {!openNewColumnForm &&
            <Row>
                <Col className='add-new-column' onClick={toggleOpenNewColumnForm}>
                    <i className="fa fa-plus icon"/> Add another column
                </Col>
            </Row>
            }
            
            {openNewColumnForm &&
            <Row>
                <Col className='enter-new-column'>
                <Form.Control
                    size="sm"
                    type="text"
                    placeholder='Enter column title... ' 
                    className='input-enter-new-column' 
                    ref={newColumnInputRef}
                    value={newColumnTitle}
                    onChange={onNewColumnTitleChange}
                    onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
                />
                <Button variant="success" size='sm' onClick={addNewColumn}>Add Column</Button>
                <span className='cancel-icon' onClick={toggleOpenNewColumnForm}><i className='fa fa-times icon' ></i></span>
                
                </Col>
            </Row>
            }
            

        </BootstrapContainer>
            
            
        
        </div>
    )
}
export default BoardContent