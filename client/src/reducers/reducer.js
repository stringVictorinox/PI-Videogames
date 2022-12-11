import { GET_ALL_GAMES,
         GET_GENRES,
         GET_VIDEOGAME_DETAIL,
         ORDER_BY_ALPHABET,
         ORDER_BY_RATING,
         FILTER_BY_GENRES,
         FILTER_BY_INFO,
         CLEAR_DETAILS,
        } from "../actions/const.js";

        const initialState = {
          allGames: [],
          Games: [],
          genres: [],
          gameDetails: [],
        };
  
export default function rootReducer(state = initialState, action){
  switch (action.type){

    case GET_ALL_GAMES:
      return {
        ...state,
        allGames: action.payload,
        Games: action.payload,
    };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
    };
        
    case FILTER_BY_GENRES:
          
      let all = state.allGames;
      let GenresFilter = [];
          
      if( action.payload === 'all'){
        GenresFilter = all;
      } else{
        GenresFilter = all.filter((e) => e.genres.includes(action.payload));
      }
          
      if(GenresFilter.length === 0) {
        alert(`No videogames found for ${action.payload} genre`);
        return {
          ...state,
          Games: all
        }
        } else {
        return {
          ...state,
          Games: GenresFilter
        };
    }

    case ORDER_BY_ALPHABET:

      let all2 = state.Games;
        
      if(action.payload === 'A-Z') {
        all2.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
            return 0
          })
      }

      if( action.payload === 'Z-A') {
        all2.sort(function(a,b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return 1;
            }
            return 0;
        })
      }        

    return {
        ...state,
        Games: all2,
    }
          
    case ORDER_BY_RATING:
          
          const sortedRating = action.payload === 'asc' ?
          state.Games.sort(function (a, b) {
            return (a.rating - b.rating);
          }) :
          state.Games.sort(function (a, b) {
            return (b.rating - a.rating);
          });
          
          return {
            ...state,
            Games: sortedRating,
          }
          
    case FILTER_BY_INFO:
    
      if(action.payload === "all"){
        return {
          ...state,
          Games: state.allGames
        };
      }
      
      if(action.payload === "DATABASE"){
                
        let arr = [];
                
        state.allGames.forEach((e) => {
          if(typeof e.id !== "number"){
            arr.push(e);
          }
        });
                
        if (arr.length === 0) {
          alert(`No videogames were created yet`);
            return {
              ...state,
              Games: state.Games
            };
        }
        
        return {
          ...state,
          Games: arr,
        };
      }
            
      if(action.payload === "API"){
                return {
                  ...state,
                  Games: state.allGames.filter(
                    (g) => typeof g.id === "number"
                    ),
                  };
                }
            return {
              ...state,
              Games: action.payload,
            }
            
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        gameDetails: action.payload
    }

    case CLEAR_DETAILS:
      return {
        ...state,
        gameDetails: action.payload
      }

      default:
        return state;
    }
  }