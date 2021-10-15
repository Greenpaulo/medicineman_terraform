import { useState } from 'react'
import { Link } from 'react-router-dom'
import { renderImagePath } from "../../helpers/helpers"
import uuid from 'react-uuid'


const EssenceLinks = ({ essences, group }) => {

  const [isGrid, setIsGrid] = useState(false)

  const renderTable = (columnLength) => {
    return (
      <div id="table-container">
        <div id="view-selector">
          <button className="images-toggler" onClick={toggleTableImages}>Toggle images</button>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <ul>
                  {essences.map((essence, index) => {
                    if (index > 0 && index <= columnLength) {
                      return <li key={essence.name}><Link to={`/medicine/${essence.companySlug}/${essence.groupSlug}/${essence.nameSlug}`}>{essence.name}</Link></li>
                    }
                      return <li key={essence.name}></li>
                    }
                  )}
                </ul>
              </td>
              <td>
                <ul>
                  {essences.map((essence, index) => {
                    if (index > columnLength && index <= columnLength*2 ) {
                      return <li key={essence.name}><Link to={`/medicine/${essence.companySlug}/${essence.groupSlug}/${essence.nameSlug}`}>{essence.name}</Link></li>
                    }
                      return <li key={essence.name}></li>
                    }
                  )}
                </ul>
              </td>
              <td>
                <ul>
                  {essences.map((essence, index) => {
                    if (index > columnLength*2 && index <= columnLength*3) {
                      return <li key={essence.name}><Link to={`/medicine/${essence.companySlug}/${essence.groupSlug}/${essence.nameSlug}`}>{essence.name}</Link></li>
                    }
                      return <li key={essence.name}></li>
                    }
                  )}
                </ul>
              </td>
              <td>
                <ul>
                  {essences.map((essence, index) => {
                    if (index > columnLength*3 && index <= columnLength*4) {
                      return <li key={essence.name}><Link to={`/medicine/${essence.companySlug}/${essence.groupSlug}/${essence.nameSlug}`}>{essence.name}</Link></li>
                    }
                      return <li key={essence.name}></li>
                    }
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  const renderTableForLargeScreens = () => {
    let columnLength = 10;
    
    if (group === "Single Orchid Essences") {
      columnLength = 27;
    } else if (group === "Bush Flowers") {
      columnLength = 17;
    }

    return renderTable(columnLength);
  }

  const renderLinksForMobile = () => {
    return (
      <ul id="mobile-essence-links-list">
        {essences.map((essence) => (
          <li key={essence.name}><Link to={`/medicine/${essence.companySlug}/${essence.groupSlug}/${essence.nameSlug}`}>{essence.name}</Link></li>
        ))}
      </ul>
    )
  }

  const renderImageGrid = () => (
      <div id="image-grid-container">
        <div id="view-selector">
          <button className="images-toggler" onClick={toggleTableImages}>Toggle images</button>
        </div>
        <div id="image-grid">
          {essences.map((essence) => (
              <div key={uuid()} className="essence-link-container">
                <Link to={`/medicine/${essence.companySlug}/${essence.groupSlug}/${essence.nameSlug}`} className="essence-link">
                  <img className="essence-link-image" src={renderImage(essence, "200w")} alt="" />
                  {essence.name}
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    )

  // Toggle between list of essences and grid of photos
  const toggleTableImages = () => {
    setIsGrid(!isGrid);
    if (isGrid) {
      document.getElementById("table-container").style.display = "none";
      document.getElementById("image-grid-container").style.display = "grid";
    } else {
      document.getElementById("table-container").style.display = "block";
      document.getElementById("image-grid-container").style.display = "none";
    }
  }

  const renderImage = (essence, format) => {
    return renderImagePath(essence.images, format)
  }


  return (
    <section id="essence-links">
      {renderTableForLargeScreens()}
      {renderLinksForMobile()}
      {renderImageGrid()}
    </section>
  )
}

export default EssenceLinks
