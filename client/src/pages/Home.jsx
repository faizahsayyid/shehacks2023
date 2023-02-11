import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        style={{ height: "75vh", width: 506, margin: 'auto' }}
        className="d-flex flex-column align-items-center justify-content-center gap-2"
      >
        <h1 style={{ fontSize: "5rem" }} className="text-center text-black">
          SEM:ANTICS
        </h1>
        <p style={{ width: 500 }}>SEM:ANTICS is a comprehensive platform that allows users to edit emails, store their past emails, and give advice for students, managers, and employees to effectively learn to communicate to a professional standard.</p>
        <Link to='/playground' className="btn btn-primary align-self-start">Try It Out</Link>
      </div>
    </>
  );
}

export default Home;
