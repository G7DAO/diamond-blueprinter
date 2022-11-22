import './index.css';
import { useNavigate, useParams } from "react-router-dom";

type PropsType = {
  data: any[],
}

const FacetsTable = (props: PropsType) => {
  const navigate = useNavigate();
  
  const renderFacet = (facet: any) => {
    return (
      <div className="facetTableRow" key={facet.name} onClick={() => navigate(`/facet/${facet.address}`)}>
        <div className="row70">
          {facet.name}
        </div>
        <div className="row30">
          {facet.timesUsed}
        </div>
      </div>
    )
  }

  return (
    <div className="tableContainer">
      <h1 className={"boxText"}>Facets Library</h1>
      <div className={"facetsTable"} >
          <div className={"tableHeaderContainer"}>
              <div className={"tableHeader tableHeader1"}>
                  <p>name</p>
              </div>
              <div className="tableHeader tableHeader2">
                  <p>users</p>
              </div>
          </div>
          <div className="tableOuter">
            {
              props.data.map(renderFacet)
            }
          </div>
      </div>
  </div>
  )
}
export default FacetsTable;