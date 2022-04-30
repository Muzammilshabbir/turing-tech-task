import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleCall,addNote } from '../store/callSlice'
import {Card, Button,ListGroup , Container,Modal,Form} from 'react-bootstrap'

export default function ShowCall() {

const params = useParams()
const dispatch = useDispatch()
const [show, setShow] = useState(false);
const [note, setNote] = useState('');

useEffect(()=>{
    dispatch(fetchSingleCall(params.id))
},[params.id,dispatch])

const call = useSelector(state=> state.calls.call)

const handleNote = async() =>{
    dispatch(addNote({id:params.id, content:note}))
}

  return (
    <Container style={{ width: '350px' }}> 
        <Card style={{ width: '21rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title>Call Detail</Card.Title>
                <ListGroup>
                    <ListGroup.Item><b>Call Type:</b> {call?.call_type}</ListGroup.Item>
                    <ListGroup.Item><b>Direction:</b> {call?.direction}</ListGroup.Item>
                    <ListGroup.Item><b>Duration:</b> {call?.duration}</ListGroup.Item>
                    <ListGroup.Item><b>From:</b> {call?.from}</ListGroup.Item>
                    <ListGroup.Item><b>To:</b> {call?.to}</ListGroup.Item>
                    <ListGroup.Item><b>Via:</b> {call?.via}</ListGroup.Item>
                    <ListGroup.Item ><b>Notes:</b> <br/> {call?.notes?.map((note,index)=><> <b>{++index} </b>: {note.content}<br/></>)}</ListGroup.Item>
                </ListGroup>
                <Button className="m-2" onClick={() => setShow(true)} variant="primary" >Add Notes</Button>
            </Card.Body>
        </Card>

        <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          Write Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control type="text" placeholder="Write Note" onChange={(e)=>setNote(e.target.value)}/>

        </Modal.Body>
        <Button className="m-2" onClick={handleNote} variant="primary" >Add Notes</Button>

      </Modal>
    </Container>
  )
}
