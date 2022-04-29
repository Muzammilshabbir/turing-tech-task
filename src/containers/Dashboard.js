import { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCalls,fetchSingleCall,archiveCall } from '../store/callSlice'
import { Table, InputGroup } from "react-bootstrap"
import ReactPaginate from 'react-paginate';
import { ArrowRight } from 'react-bootstrap-icons';
import ShowCall from './ShowCall'
import {Link} from 'react-router-dom'

export default function Dashboard() {

  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 10;
  const dispatch = useDispatch()

  const calls = useSelector(state => state.calls.calls)

  console.log('state :>> ', calls);
  useEffect(() => {

    setLoading(true)
    dispatch(fetchCalls())
    setLoading(false)
    setPageCount(Math.ceil(calls.totalCount / limit));

  }, [calls.totalCount, dispatch])


  const handlePageClick = async (data) => {

    let offset = data.selected;

    if (offset > 0) {

      offset = data.selected * 10;
    }
    dispatch(fetchCalls(offset));

  }

  const handleArchive = (id) =>{
      dispatch(archiveCall(id))
  }
  

  return (
    <div>

      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Duration</th>
            <th>Archived</th>
            <th>From</th>
            <th>To</th>
            <th>Direction</th>
            <th>Call Type</th>
            <th>Via</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            calls?.nodes?.map((call) => (
              <tr>
                <td>{call.id}</td>
                <td>{call.duration}</td>
                <td>{call.is_archived ? 'Yes' : 'No'}</td>
                <td>{call.from}</td>
                <td>{call.to}</td>
                <td>{call.direction}</td>
                <td>{call.call_type}</td>
                <td>{call.via}</td>
                <td>
                <InputGroup.Text>
                <Link to={`/call/${call.id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                 
                  </Link>
                  <InputGroup onClick={() => handleArchive(call.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="m-2" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                      <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </InputGroup>
                  </InputGroup.Text>
                </td>

              </tr>
            ))
          }

        </tbody>
      </Table>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}

      />
    </div>
  )
}
