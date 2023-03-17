const { createApp } = Vue

const app = createApp({
    data(){
        return{
            listaCategorias : [],
            eventos:[],
            categorias:[],
            eventosFiltrados: [],
            checked:[],
            filtroBusqueda:""
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then( data => { 
            this.listaCategorias = Array.from( new Set (data.events.map( evento => evento.category)))
            this.eventosFiltrados = data.events.filter(evento=> evento.date < data.currentDate)
            this.eventos = data.events

            console.log(this.listaCategorias)
            
        })
        // .catch(error => console.log(error))
    },
    methods : {
        filtro(){
            this.eventosFiltrados = this.eventos.filter(evento=> evento.name.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) && (this.checked.includes(evento.category) || this.checked.length==0))
        }
    }


})


app.mount('#app')