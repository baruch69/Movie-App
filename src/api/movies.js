import {API_KEY, API_HOST, LANG} from '../utils/constans';


export function getNewsMoviesApi(page=1){
    const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`
   
return fetch(url)
       .then((response)=>{
        return response.json()
    }).then((result)=>{
        return result
       
    })
}

export function getGenreApi(idGenres){
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&lenguage=${LANG}`
    return fetch(url)
       .then((res)=>{
           return res.json()
       })
       .then((result)=>{
           const  arrayGenres =[];
             idGenres.forEach((id) => {
                 result.genres.forEach((item)=>{
                     if(item.id === id) arrayGenres.push(item.name)
                 })
             });
           return arrayGenres
       })
}

export  const getAllGeneresApi=()=>{
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&lenguage=${LANG}`
    
    return fetch(url)
      .then((response)=>{
          return response.json()
      })
      .then((result)=>{
          return result;
      })

}


export const  getGenreMovieApi=(idGenres)=>{
    const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenres}&lenguage=${LANG}`
    return fetch(url)
    .then((response)=>{ 
        return response.json()
    })
    .then((result)=>{
        return result;
    })
}


export const getMovieById=(idMovie)=>{
    const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&lenguage=${LANG}`
    
    return fetch(url)
    .then((response)=>{ 
        return response.json()
    })
    .then((result)=>{
        return result;
    })
}

export function getVideoMovieApi(idMovie){
    
   const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&lenguage=${LANG}`;
   
   return fetch(url)
   .then((response)=>{ 
       return response.json()
   })
   .then((result)=>{
       return result;
   })
}

export function getPopularMovieApi(page =1){
    
    const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&lenguage=${LANG}&page=${page}`;
    console.log(url);
    return fetch(url)
    .then((response)=>{ 
        return response.json()
    })
    .then((result)=>{
        return result;
    })
 }