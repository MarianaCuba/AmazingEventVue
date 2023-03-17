const { createApp } = Vue

const app = createApp({
    data(){
        return{
            ordenLista:[],
            listaAsistenciaCapacidad:[],
            porcentajeMaximo:[],
            porcentajeMinimo:[],
            listaCapacidad:[],
            capacidadOrden:[],
            capacidadMaxima:[],
            filtroEventosPasados:[],
            filtroEventosFuturos:[],
            eventosPasados:[],
            eventosFuturos:[],
            totalCapacidad:[],
            listaCategorias:[],
            listaCategoriasDos:[]

        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then( data => { 
            this.listaAsistenciaCapacidad = data.events.map(evento=> {
                let aux= Object.assign({}, evento)
                aux.porcentaje = ((evento.assistance*100)/(evento.capacity))
                return aux})
                .filter(evento => evento.porcentaje)
           this.ordenLista = this.listaAsistenciaCapacidad.sort((a,b) => b.porcentaje -a.porcentaje)
           this.porcentajeMaximo=this.ordenLista.slice(0,1)
           this.porcentajeMinimo=this.ordenLista.slice(-1)
           this.listaCapacidad = data.events.filter(evento=> evento.capacity)
           this.capacidadOrden= this.listaCapacidad.sort((a,b)=> b.capacity -a.capacity)
           this.capacidadMaxima= this.capacidadOrden.slice(0,1)
            
           this.filtroEventosPasados = data.events.filter(evento => evento.date<data.currentDate)
           this.listaCategorias = Array.from(new Set (this.filtroEventosPasados.map(category=> category.category)))
     
            this.eventosPasados = this.listaCategorias.map( categoria=>{
             const filtroEventCategoria= this.filtroEventosPasados.filter( evento => evento.category === categoria )
             const ingresos= filtroEventCategoria.reduce((acc, valorActual)=> {
                 acc += valorActual.assistance* valorActual.price
                 return acc
             },0)
             console.log(ingresos);
            const asistenciaTotal= filtroEventCategoria.reduce((acc,valorActual)=>{
                 acc += valorActual.assistance
                 return acc
             },0) 
             console.log(asistenciaTotal);
            const totalCapacidad= filtroEventCategoria.reduce((acc, valorActual)=>{
                 acc += valorActual.capacity
                 return acc
             },0)
             console.log(totalCapacidad);

             let nuevoEventoPasado ={}
             nuevoEventoPasado.category= categoria
             nuevoEventoPasado.ganancia= ingresos
             nuevoEventoPasado.porcentaje= ((asistenciaTotal)/(totalCapacidad))*100
             return nuevoEventoPasado
        })
        console.log(this.listaCategorias)

        this.filtroEventosFuturos = data.events.filter(evento => evento.date>data.currentDate)
        this.listaCategoriasDos = Array.from(new Set (this.filtroEventosFuturos.map(category=> category.category)))
        console.log(this.listaCategoriasDos)

        this.eventosFuturos = this.listaCategoriasDos.map(categoria => {
            const filtroEventCategoria = this.filtroEventosFuturos.filter( evento => evento.category === categoria)
            const ingresos = filtroEventCategoria.reduce((acc, valorInicial)=>{
                acc += valorInicial.estimate* valorInicial.price
                return acc
            },0)
            console.log(this.ingresos)     
            const estimadoTotal = filtroEventCategoria.reduce((acc,valorInicial)=>{
                acc += valorInicial.estimate
                return acc
            },0)
            const totalCapacidad = filtroEventCategoria.reduce((acc, valorInicial)=>{
                acc += valorInicial.capacity
                return acc
            },0)
            console.log(this.totalCapacidad);
            let nuevoEventoFuturo={}
            nuevoEventoFuturo.category = categoria
            nuevoEventoFuturo.ganancia = ingresos
            nuevoEventoFuturo.porcentaje = ((estimadoTotal)/(totalCapacidad)*100)
            return nuevoEventoFuturo
         
        
    }) 
} )
 .catch(error => console.log(error))
}}) 
app.mount('#app')