import { useEffect, useState } from "react";
import Draft from "../components/Draft";
import { getDrafts } from "../api/drafts";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

function AllDrafts() {
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDrafts().then((res) => {
      if (res.status == 200) {
        setDrafts(res.data);
        setLoading(false);
      } else {
        navigate("/login");
      }
    });
  }, []);

  if (loading) {
    return (
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner />
      </div>
    );
  } else {
    return (
      <>
        <h1 className="text-center mb-4">Past Drafts</h1>
        {drafts &&
          drafts.map((draft, i) => {
            const score = draft.score;
            const classifications = draft.classifications;
            if (classifications) {
              return (
                <div key={i} className="mb-3 w-75 mx-auto form-control">
                  <div className="col text-center text-primary mb-2 fw-bold">
                    Score: {Math.round(score * 100)}%
                  </div>
                  <Draft classifications={classifications} />
                </div>
              );
            } else {
              return null;
            }
          })}
      </>
    );
  }
}

export default AllDrafts;
