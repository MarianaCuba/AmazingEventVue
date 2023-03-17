const { createApp } = Vue

const app = createApp({
    data(){
        return{
            params:"",
            idEvento:"",
            id:"",
            asistenciaEstimado:""
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then( data => { 
            this.params = new URLSearchParams(location.search)
            this.idEvento = this.params.get("id")
            console.log(this.idEvento);
            this.id = data.events.find(evento=> evento._id == this.idEvento)
            console.log(this.id)
            this.asistenciaEstimado = this.id.estimate? 'estimate' : 'assistance'
            
        })
        .catch(error => console.log(error))
    }
    

})


app.mount('#app')