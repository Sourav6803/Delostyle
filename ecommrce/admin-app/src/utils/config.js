const getTokenFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

 export const config = {
     headers: { Authorization: `Bearer ${getTokenFromLocalstorage.token}` },
     Accept : "appcliation/json",
}