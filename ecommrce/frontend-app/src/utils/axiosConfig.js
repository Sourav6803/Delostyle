export const base_url = "http://localhost:5000/"

const getTokenFromLocalstorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;


 export const config = {
     headers: { Authorization: `Bearer ${getTokenFromLocalstorage !== null ? getTokenFromLocalstorage.token : ""}`,
     Accept : "appcliation/json", },
     
}



