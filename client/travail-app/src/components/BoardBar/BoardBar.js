import React from 'react'
import './BoardBar.scss';
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap'

function BoardBar () {
    return (
        <nav className="navbar-board">
            <BootstrapContainer className='travail-app-container'>
                <Row>
                    <Col sm={10} xs={12} className="col-no-padding"> 
                        <div className='board-info'>
                            <div className='item board-logo-icon'><i className='fa fa-coffee' />&nbsp;&nbsp;<strong>Project MindX</strong></div>
                            <div className='divider'><i className='fa fa-star' /></div>
                            <div className='item board-type'>Private Workspace</div>
                            
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding"> 
                        <div className='board-actions'>
                            <div className='item menu'>Show menu</div>
                            
                        </div>
                    </Col>
                </Row>    
            </BootstrapContainer>
        </nav>
    )
}
export default BoardBar