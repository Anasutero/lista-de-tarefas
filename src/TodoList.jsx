/* Importação */
import React, {useState, useEffect } from "react";
import './Todolist.css';
import Icon from './assets/icon.webp';

/* criação das funções e estados  */
function TodoList(){

/* foi criada essa constante para nao rezetar nossa lista de tarefas sempre que fecharmos , mais para ficar salva  */
    const listaStorage = localStorage.getItem('Teste')
    
    const [Lista,setLista] = useState(listaStorage ? JSON.parse(listaStorage) :[]);
    const[novoItem,setNovoItem]= useState("");

    useEffect(()=>{
        localStorage.setItem('Teste',JSON.stringify(Lista));

    },[Lista])


/* criação das funções   */
    function adicionaItem (form){
        form.preventDefault();

        if(!novoItem){
            return;
        }
        setLista([...Lista, {text:novoItem, isCompleted:false}])
        setNovoItem("");
        document.getElementById('input-entrada').focus();

    }

    function clicou (index){
        const listaAux = [...Lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);

    }
    function deleta(index){
        const  listaAux = [...Lista];
        listaAux.splice(index,1);
        setLista(listaAux);
    }
    function deletaTudo(){
        setLista([]);
    }

   /* Estruturação*/
    return(
        <div  >
            <h1>Lista de Tarefas </h1>
            <form onSubmit={adicionaItem}>
                <input 
                id="input-entrada"
                type="text" value={novoItem} onChange={(e)=>{setNovoItem(e.target.value)}}
                placeholder="Adicione uma tarefa "/>
                <button className="add" type="submit">Adicionar</button>
            </form>
            <div className="listaTarefas">
                <div style={{textAlign:'center'}}>
                {
                    Lista.length <1
                    ?
                    <img  className="icone-central" src={Icon}/>
                    :
                    Lista.map((item,index)=>(

                        <div 
                        key={index}
                        className={item.isCompleted ? "item completo" : "item"}
                        >
                        <span onClick={()=>{clicou(index)}}>{item.text}</span>
                        <button  onClick={()=>{deleta(index)}} className="del">Deletar</button>
                    </div>

                    ))
                 
                }
                {
                    Lista.length >0 &&
                    <button  onClick={()=>{deletaTudo()}} className="deleteAll">Deletar todas</button>
                }
                </div>

            </div>
        </div>
    )

}
export default TodoList