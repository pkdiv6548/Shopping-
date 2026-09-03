import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";
export default function Header({bag=0,wish=0}){
 const [open,setOpen]=useState(false),[q,setQ]=useState(""),nav=useNavigate();
 const submit=e=>{e.preventDefault();nav("/search"+(q?("?q="+encodeURIComponent(q)):""));setOpen(false)};
 return <header className="site-header">
  <div className="top-strip">Complimentary standard delivery · Easy returns · Member access</div>
  <div className="nav-main">
   <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Open menu">☰</button>
   <Link className="brand" to="/">ATELIER</Link>
   <nav className={open?"mobile-open":""}>
    <Link to="/category/Women" onClick={()=>setOpen(false)}>Women</Link><Link to="/category/Men" onClick={()=>setOpen(false)}>Men</Link><Link to="/category/Kids" onClick={()=>setOpen(false)}>Kids</Link><Link to="/category/Beauty" onClick={()=>setOpen(false)}>Beauty</Link><Link to="/category/Home" onClick={()=>setOpen(false)}>Home</Link><Link to="/category/Sale" onClick={()=>setOpen(false)}>Sale</Link><Link to="/editorial" onClick={()=>setOpen(false)}>Editorial</Link>
   </nav>
   <div className="nav-actions">
    <form className="nav-search" onSubmit={submit}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search"/><button>⌕</button></form>
    <Link to="/account" aria-label="Account">♙</Link><Link to="/wishlist" aria-label="Wishlist">♡<sup>{wish}</sup></Link><Link to="/cart" aria-label="Bag">Bag <sup>{bag}</sup></Link>
   </div>
  </div>
  <div className="mega-bar"><Link to="/category/Women">New in</Link><Link to="/category/Women">Dresses</Link><Link to="/category/Women">Tailoring</Link><Link to="/category/Men">Shirts</Link><Link to="/category/Men">Knitwear</Link><Link to="/category/Accessories">Accessories</Link><Link to="/gift-cards">Gift cards</Link><Link to="/stores">Stores</Link></div>
 </header>
}
