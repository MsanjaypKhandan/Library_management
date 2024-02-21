import { useEffect,useState } from 'react';
import axios from 'axios';
const User = () => { 
 
    const [books,setbooks] = useState([]);
    const [search,setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3// calculate total pages based on your data.
    const itemsPerPage = 10// specify the number of items per page.
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = books.slice(startIndex, endIndex);



    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/books");
                setbooks(res.data);
            }
            catch(err){
                console.log(err);
            }
        };
        fetchBooks();
    },[]);

    const handlesearch = async(e) => {
        setSearch(e.target.value);
    }

    const handleFilter = async(search) => {
        try{
            const res = await axios.get("http://localhost:8000/search/"+search);
            setbooks(res.data);
            //  window.location.reload();
          } catch(err){
            console.log(err);
          }
        } 

  return (
    <div className="list">
      <h1>Books List</h1>
      <div className='search'>
        <label htmlFor='search'>Search By title</label>
        <input type='text'
        id="search"
        value={search}
        onChange={handlesearch}/>
        {/* <button onClick={() => handleFilter(search)}>Search</button> */}
        <label htmlFor='search'>Author</label>
        <input type='text'
        id="search"
        value={search}
        onChange={handlesearch}/>
        {/* <button onClick={() => handleFilter(search)}>Search</button> */}
        <label htmlFor='search'>Subject</label>
        <input type='text'
        id="search"
        value={search}
        onChange={handlesearch}/>
        <button onClick={() => handleFilter(search)}>Search</button>
      </div>
      <table>
        <thead>
        <tr>
            <th>id</th>
            <th>Title</th>
            <th>Subject</th>
            <th>Author</th>
            <th>Publish Date</th>
        </tr>
        </thead>
        <tbody>
            {books && currentData.map((book) => (
                <tr key = {book.id}>
                    <td>{book.id}</td>
                    <td>{book.Title}</td>
                    <td>{book.Subject}</td>
                    <td>{book.Author}</td>
                    <td>{book.Publish_Date}</td>
                </tr>
            ))}
        </tbody>
        
      </table>
      <div className="page-btn">
      <button onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1}>
  Previous
</button>
<button onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={currentPage === totalPages}>
  Next
</button>
      </div>
 

    </div>
  )
}

export default User
