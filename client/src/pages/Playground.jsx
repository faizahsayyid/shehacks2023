import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Spinner from "../components/Spinner/Spinner";
import Draft from "../components/Draft";
import { postDraft } from "../api/drafts";
import { useNavigate } from "react-router-dom";

function Playground() {
  const [draftBody, setDraftBody] = useState("");
  const [loading, setLoading] = useState(false)
  const [classifications, setClassifications] = useState();
  const [score, setScore] = useState();

  const navigate = useNavigate();

  const onSubmit = () => {
    setLoading(true)
    postDraft(draftBody)
      .then((res) => {
          if (res.status == 200) {
            setClassifications(res.data.classifications);
            setScore(res.data.score)
            setDraftBody("")
            setLoading(false)
          } else {
            navigate('/login')
          }
      })
  };

  return (
    <div className="mb-5">
      <div className="row text-center mb-3">
        <h1>Playground</h1>
      </div>
      <div className="mb-4 row">
        <div style={{ height: "65vh" }} className="row gap-3">
          <div className="col form-control">
            <div className="col text-center text-muted mb-2">
              Previous Draft
            </div>
            {classifications && !loading &&
              <Draft classifications={classifications}/>
            }
            { loading && <div className="h-100 d-flex justify-content-center align-items-center"><Spinner /></div>}
            {!classifications && !loading && (
              <div className="d-flex justify-content-center mt-3 align-items-center fw-bold">
                <RiErrorWarningLine size={20} className="me-2" />
                You have no previous drafts from this session!
              </div>
            )}
          </div>
          <textarea
            value={draftBody}
            onChange={(e) => setDraftBody(e.target.value)}
            className="col form-control"
            placeholder="Write a new draft..."
          ></textarea>
        </div>
        <div className="mt-3 row gap-3">
          {score && (
            <div className="col text-center">
              Score: {Math.round(score * 100)}%
            </div>
          )}
          {!score && <div className="col text-center">Score: N/A</div>}
          <div className="col text-center">
            <button className="btn btn-primary" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
