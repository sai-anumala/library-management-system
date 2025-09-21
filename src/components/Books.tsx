import { useEffect, useState } from "react";
import {Button, Card,CardBody,CardImg, Col, Modal, ModalBody, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import type { DispatchType, RootState } from "../redux/store";
import { fetchBooks } from "../redux/slices/BooksSlice";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CiShoppingCart } from "react-icons/ci";
import type { BookType } from "../types/BooksSliceType";
import { LuUser } from "react-icons/lu";
import { BiArrowFromLeft } from "react-icons/bi";

function Books() {

  let [showModal,setShowModal]=useState<boolean>(false)

  // data to show on modal
  let [modalData,setModalData]=useState<BookType>({
    title:"",
    author:'',
    image_link:'',
    rating:0,
    reviews:'',
    availability:0,
    description:'',
    isbn:'',
    pages:0,
    genre:'',
  })
    
  let {books,status,error}=useSelector((state:RootState)=>state.books)
  // console.log(books)

  // to send data to slice
  let dispatch=useDispatch<DispatchType>()
  useEffect(()=>{
    let actionObj:ReturnType <typeof fetchBooks>=fetchBooks("http://localhost:3000/books")
    // console.log(typeof actionObj)
    dispatch(actionObj);
  },[])
  return (
    <div className="p-2 px-5 bg-light" >
        {
          status==="failed" && <h1 className="text-center text-warning">{error}</h1>
        }
        {
          status==="loading" && <div className="text-center text-warning mx-auto"><span className="spinner-border"></span>Loading</div>
        }
        {
          status==="successed" && <div style={{display:"flex",flexDirection:"row",gap:"20px",flexWrap:"wrap"}}>
            {
              books.map(bookObj=>(
                <Card key={bookObj.title} style={{width:"20rem"}}>
                <CardImg src={bookObj.image_link} style={{height:"18rem", overflow: "hidden"}} className="img-fluid rounded"></CardImg>
                <CardBody>
                  <div className="d-flex justify-around">
                    {bookObj.availability!==0 && <span className="bg-dark text-white p-2 rounded-4"style={{fontSize:"0.6rem"}} >Available</span> }
                  {bookObj.availability===0 && <span className="bg-dark text-white p-2 rounded-4" style={{fontSize:"0.5rem"}}>Not Available</span>}
                  <span className="ms-auto"> <i className="bi bi-star-fill text-warning"> </i>{bookObj.rating.toFixed(1)}</span>
                  </div>
                  <h6 className="text-dark mt-1">{bookObj.title}</h6>
                  <p className="text-secondary">by {bookObj.author}</p>
                  <p><span className="border rounded-2 p-1" style={{fontSize:"0.8rem"}}>{bookObj.genre}</span></p>
                  <br />
                  <span className="ms-1 text-secondary">{bookObj.availability} out of 20</span>
                  <div className="mt-1" style={{display:"flex", justifyContent:"space-between"}}>
                    <span>
                      <button type="button" className="btn btn-dark text-white rounded-2" onClick={()=>{setModalData(bookObj),setShowModal(true)}}>View Details</button>
                    </span>
                  <span className="ms-4">
                    <button type="button" className="btn btn-warning" disabled={bookObj.availability===0}><CiShoppingCart className="fs-4" /></button>
                    </span>
                  </div>
                </CardBody>
              </Card>
              ))
            }

            {/* Modal to dispaly full book details */}
            {
              showModal===true && <div>
                <Modal show={showModal} scrollable centered>
                    <Button className="m-2 ms-auto rounded-1" onClick={()=>setShowModal(false)}>x</Button>
                  
                    <ModalBody style={{
                                   maxHeight:"620px",
                                    overflowY:"auto", // only vertical scroll
                                    overflowX:"hidden",// no horizontal scroll 
                                    }}>
                      <Row>
                        <Col>
                        <img src={modalData.image_link} alt={modalData.title} width={"100%"} height={"250px"} className="rounded-2" />
                        </Col>
                        <Col>
                              <h4>{modalData.title}</h4>
                              <span className="text-secondary"><LuUser /> {modalData.author}</span>
                              <br />
                              <br />
                              <p className="d-flex justify-around">
                                <span>
                                  <i className="bi bi-star-fill text-warning"></i>
                                  {modalData.rating}
                                </span>
                                <span className="border rounded-3 ps-1 pe-1 ms-auto" style={{fontSize:"0.85rem"}}>
                                  {modalData.genre}
                                </span></p>
                                
                                  <div className="d-flex">
                                    {modalData.availability===0 ? <span className="bg-dark text-white p-2 rounded-4" style={{fontSize:"0.7rem"}}>Not Available</span>:<span className="bg-dark text-white p-2 rounded-4" style={{fontSize:"0.7rem"}}> Available</span>}
                                  <span className="ms-3 text-secondary">{modalData.availability} out of 20</span>
                                  </div>
                                
                                {/* <br /> */}
                                <hr />
                                <h5>Description</h5>
                                <p>{modalData.description}</p>
                                <hr />
                                <Row>
                                  <Col>
                                  <span><b>ISBN:</b></span>
                                  <br />
                                  <p>{modalData.isbn}</p>
                                  
                                  <span><b>Rating by:</b></span>
                                  <p>{modalData.reviews} people</p>
                                  </Col>
                                  <Col>
                                  {/* pages */}
                                  <span><b>Pages:</b></span>
                                  <p>{modalData.pages}</p>
                                  <br />
                                  {/* Availability */}
                                  <span>
                                    <b>Available:</b>
                                  </span>
                                  <p>{modalData.availability} out of 20</p>
                                  </Col>
                                </Row>
                                <hr />
                                {
                                  modalData.availability===0 &&
                                  <p className="border text-secondary rounded-3 ps-2">This book is currently unavailable....</p>
                                }

                                {/* buttons */}
                                <div className="d-flex justify-between mb-2">
                                  {/* Cart Button */}
                                  <span>
                                    <button type="button" className="btn btn-warning" disabled={modalData.availability===0}>
                                    <span>
                                      <CiShoppingCart className="fs-5 me-1"/> 
                                    </span> 
                                     Add Cart</button>
                                  </span>

                                  {/* Borrow Button */}
                                  <span className="ms-auto"> 
                                    <button className="btn btn-dark text-white" disabled={modalData.availability===0}>Borrow
                                      <BiArrowFromLeft className="fs-5"/>
                                    </button>
                                  </span>
                                </div>

                        </Col>
                      </Row>
                    </ModalBody>
                </Modal>
              </div>
            }
          </div>
        }
    </div>
  )
}

export default Books