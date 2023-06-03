const getTokenFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";

 export const config = {
     headers: { Authorization: `Bearer ${getTokenFromLocalstorage.token}` },
     Accept : "appcliation/json",
}