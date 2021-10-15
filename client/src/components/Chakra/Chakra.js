import { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { EssencesContext } from "../../context/EssencesState"
import { checkLoading, scrollToTop } from "../../helpers/helpers"
import slugify from 'slugify'
import uuid from 'react-uuid'
import CircleLoader from "react-spinners/CircleLoader";


const Chakra = (props) => {
  const { essences, getEssenceNamesByChakra , setLoadingEssences, loadingEssences } = useContext(EssencesContext);

  const { chakra } = props.match.params;

  useEffect(() => {
    async function getEssenceNames(){
      getEssenceNamesByChakra(props.match.params.chakra);
      setLoadingEssences(false);
    }
    getEssenceNames();
    return () => {
      // Reset loading to true when component is removed
      setLoadingEssences(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.chakra])

  

  
  const renderEssences = () => {
    return essences.map(essence => {
      return (
        <p className="essence">
          <Link to={`/essence/${slugify(essence, { lower: true, replacement: '_' })}`}> 
            {essence}
          </Link>
        </p>
      )
    })
  }
    
  // Check data has loaded before render
  let isLoading = checkLoading([essences], [loadingEssences]);
  
  return (
    <>
      {isLoading && 
        <div className="container">
          <div className="spinner">
            <CircleLoader loading={isLoading} size={100} speedMultiplier={0.7} color="#ffd4bf"/>
          </div>
        </div>
      }

      {!isLoading &&
        <div className="container animate__animated animate__fadeIn">
          <h1 id="chakra-heading">{chakra}</h1>
          <section id="reference-info" className="mt-2">
              <div className="essence-links ml-2">
                {renderEssences()}
              </div>
          </section>
        </div>
      }
    </>
  )
}

export default Chakra
