import {useEffect,useMemo,useState} from "react";
import {Routes,Route,useNavigate} from "react-router-dom";
import {products} from "./data/products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Returns from "./pages/Returns";
import Addresses from "./pages/Addresses";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Notifications from "./pages/Notifications";
import Membership from "./pages/Membership";
import Loyalty from "./pages/Loyalty";
import GiftCards from "./pages/GiftCards";
import StoreLocator from "./pages/StoreLocator";
import StoreEvents from "./pages/StoreEvents";
import ResaleProduct from "./pages/ResaleProduct";
import ResaleSell from "./pages/ResaleSell";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Newsletter from "./pages/Newsletter";
import Accessibility from "./pages/Accessibility";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import CookiePolicy from "./pages/CookiePolicy";
import ReturnsPolicy from "./pages/ReturnsPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import PaymentPolicy from "./pages/PaymentPolicy";
import PricingPolicy from "./pages/PricingPolicy";
import Warranty from "./pages/Warranty";
import SizeGuide from "./pages/SizeGuide";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import TrackOrder from "./pages/TrackOrder";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Editorial from "./pages/Editorial";
import Sustainability from "./pages/Sustainability";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSection from "./pages/AdminSection";
import Resale from "./pages/Resale";

export default function App(){
 const [wish,setWish]=useState(()=>JSON.parse(localStorage.getItem("wish")||"[]"));
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem("cart")||"[]"));
 const nav=useNavigate();
 useEffect(()=>localStorage.setItem("wish",JSON.stringify(wish)),[wish]);
 useEffect(()=>localStorage.setItem("cart",JSON.stringify(cart)),[cart]);
 const toggle=id=>setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
 const add=p=>{setCart(c=>c.find(x=>x.id===p.id)?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{id:p.id,qty:1}]);nav("/cart")};
 const qty=(id,d)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+d)}:x));
 const remove=id=>setCart(c=>c.filter(x=>x.id!==id));
 const items=useMemo(()=>cart.map(x=>({...products.find(p=>p.id===x.id),...x})).filter(x=>x.name),[cart]);
 const pageProps={products,wish,onWish:toggle,onAdd:add};
 const infoRoutes=[["/about",About],["/careers",Careers],["/press",Press],["/newsletter",Newsletter],["/accessibility",Accessibility],["/privacy-policy",PrivacyPolicy],["/terms",Terms],["/disclaimer",Disclaimer],["/cookie-policy",CookiePolicy],["/returns-policy",ReturnsPolicy],["/shipping-policy",ShippingPolicy],["/payment-policy",PaymentPolicy],["/pricing-policy",PricingPolicy],["/warranty",Warranty]];
 const admin=["products","inventory","orders","customers","promotions","loyalty","content","analytics"];
 return <><Header bag={cart.reduce((s,x)=>s+x.qty,0)} wish={wish.length}/><Routes>
  <Route path="/" element={<Home {...pageProps}/>}/>
  <Route path="/category/:name" element={<Category {...pageProps}/>}/>
  <Route path="/product/:id" element={<Product {...pageProps}/>}/>
  <Route path="/search" element={<Search products={products}/>}/>
  <Route path="/wishlist" element={<Wishlist {...pageProps}/>}/>
  <Route path="/cart" element={<Cart items={items} onQty={qty} onRemove={remove}/>}/>
  <Route path="/checkout" element={<Checkout items={items}/>}/>
  <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/forgot-password" element={<ForgotPassword/>}/>
  <Route path="/account" element={<Account/>}/><Route path="/account/profile" element={<Profile/>}/><Route path="/account/orders" element={<Orders/>}/><Route path="/account/returns" element={<Returns/>}/><Route path="/account/addresses" element={<Addresses/>}/><Route path="/account/payments" element={<Payments/>}/><Route path="/account/preferences" element={<Preferences/>}/><Route path="/account/notifications" element={<Notifications/>}/>
  <Route path="/membership" element={<Membership/>}/><Route path="/loyalty" element={<Loyalty/>}/><Route path="/gift-cards" element={<GiftCards/>}/>
  <Route path="/stores" element={<StoreLocator/>}/><Route path="/store-events" element={<StoreEvents/>}/>
  <Route path="/resale" element={<Resale/>}/><Route path="/resale/sell" element={<ResaleSell/>}/><Route path="/resale/product/:id" element={<ResaleProduct/>}/>
  <Route path="/editorial" element={<Editorial/>}/><Route path="/sustainability" element={<Sustainability/>}/><Route path="/support" element={<Support/>}/><Route path="/faq" element={<FAQ/>}/><Route path="/contact" element={<Contact/>}/><Route path="/track-order" element={<TrackOrder/>}/><Route path="/order-confirmation" element={<OrderConfirmation/>}/><Route path="/size-guide" element={<SizeGuide/>}/>
  {infoRoutes.map(([path,C])=><Route key={path} path={path} element={<C/>}/>)}
  <Route path="/admin" element={<AdminDashboard/>}/>
  {admin.map(x=><Route key={x} path={"/admin/"+x} element={<AdminSection title={x[0].toUpperCase()+x.slice(1)}/>}/>)}
 </Routes><Footer/></>
}
