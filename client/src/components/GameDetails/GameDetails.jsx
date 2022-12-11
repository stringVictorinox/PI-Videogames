import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { GetVideogameDetail, ClearDetails } from '../../actions/actions.js';
import './GameDetails.css';
import images from '../../icons/images.js';

export default function GameDetails(){

  const {id} = useParams();
  const dispatch = useDispatch();

  let {
		name,
		background_image,
		description,
		releaseDate,
		rating,
		genres,
    metacritic,
		platforms,
	} = useSelector((state) => state.gameDetails);

  if(!background_image){
    background_image = images.photo;
  }

  useEffect(() => {
    dispatch(GetVideogameDetail(id));

    return function Clear(){
      dispatch(ClearDetails());
    }
  }, [dispatch, id]);

  return (

    <div className='details-container' style={{backgroundImage: `url(${background_image})`, backgroundSize: "cover", backgroundPosition: "center center", }} >

      <div className='details-back'>
          <Link to="/home"> <button className='btn-create'>BACK</button> </Link>
      </div>

      <div className='details-tittle'>
        <h2>{name}</h2>
      </div>


      <div className='details-genres'> {
          <p>{`${genres}`}</p>
        }
      </div>

      <div className='list-platforms'> {
        platforms?.map(e => {
          let NombreLogo = images[e];
          console.log(images[e]);
          return (
            <div className='img'>
              <img src={NombreLogo} alt="photo" />
            </div>
          )
        })
      }
     </div>

     <div className='details-boxes'>
        <p>{description?.replace(/(<([^>]+)>)/gi, "")}</p>
      </div>

      <div className='details-footer'></div>

     <div className='details-info'>

      <div className='details-rating'>
        <h3>RATING</h3>
        <div className='details-footer'></div>
        <div className='details-circle'>
          <p>{rating}</p>
        </div>
      </div>

      <div className='details-released'>
        <h3>RELEASED</h3>
        <div className='details-footer'></div>
        <p>{releaseDate}</p>
      </div>

      <div className='details-metacritic'>
        <h3>METACRITIC</h3>
        <div className='details-footer'></div>
        <div className='details-circle'>
          <p>{metacritic}</p>
        </div>
      </div>

     </div>

      

     

    </div>
  )
}
