export const path = {
  api: "https://localhost:44370",
  ad: {
    adPath: ()=>path.api+"/ad",
    update: ()=>this.adPath+"/update",
    create: ""
  }
}