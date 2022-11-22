import './style.css';

type PropTypes = {
  history: any;
}

const FacetsHistory = ({ history }: PropTypes) => {
  const renderFacetHistory = (event: any) => {
      return (
          <div className="historytRow" key={event.title}>
              <div className="historytTop">
                  <h3 className="historytTitle">
                      {event.action}    
                  </h3>
                  <div className="historyTimestamp">
                    {`${(new Date(Number(event.timestamp) * 1000)).toLocaleDateString()} ${(new Date(Number(event.timestamp) * 1000)).toLocaleTimeString()}`}
                  </div>
              </div>
              <a className="genericLink historyAddress" href="/">facet: {event.facetAddr}</a>
              <div className="historyFuncName">function name: {event.functionName}</div>
          </div>
      )
  }
  return (
    <div className="facetsHistoryContainer">
        <h3 className={"title"}>History</h3>
        <div className="facetsHistory">
            {
                history.map(renderFacetHistory)
            }
        </div>
    </div>  
  )
}

export default FacetsHistory;