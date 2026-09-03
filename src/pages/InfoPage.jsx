import {useState} from "react";
import {Link} from "react-router-dom";
export default function InfoPage({eyebrow="ATELIER",title,lead,sections=[],actions=[]}) {
  const [sent,setSent]=useState(false);
  return <main className="page-shell">
    <div className="page-hero"><small>{eyebrow}</small><h1>{title}</h1>{lead&&<p>{lead}</p>}</div>
    <div className="info-layout">
      <section className="info-main">
        {sections.map((s,i)=><article className="info-block" key={i}><h2>{s.title}</h2>{Array.isArray(s.body)?s.body.map((x,j)=><p key={j}>{x}</p>):<p>{s.body}</p>}{s.list&&<ul>{s.list.map((x,j)=><li key={j}>{x}</li>)}</ul>}</article>)}
      </section>
      {actions.length>0&&<aside className="info-aside">{actions.map((a,i)=><Link className="outline-btn" to={a.to||"#"} key={i}>{a.label}</Link>)}</aside>}
    </div>
    {eyebrow==="NEWSLETTER"&&<form className="newsletter-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><input required type="email" placeholder="Email address"/><button>{sent?"Subscribed":"Subscribe"}</button></form>}
  </main>
}
