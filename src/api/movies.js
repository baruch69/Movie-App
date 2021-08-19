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
      .then((res)=>{
          return res.json()
      })
      .then((result)=>{
          return result;
      })

}