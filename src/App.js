import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  // CALCULANDO OS ITENS POR PAGINA E ARREDONDANDO PRA MAIS
  const pages = Math.ceil(items.length / itemsPerPage);

  // LOGICA PARA INICIO E FINAL DOS PAGINAÇÃO
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // FAZENDO O FETCH DA API DA LISTA

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => data);

      setItems(result);
    };
    fetchData();
  }, []);

  // SEMPRE QUE ATULIZAR A AQUANTIDADE DE ITENS INICIAR EM ZERO

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);
  return (
    <div className="App">
      <div>
        {Array.from(Array(pages), (item, index) => {
          return (
            <button
              value={index}
              onClick={(e) => setCurrentPage(Number(e.target.value))}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <div>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={5}> 5 itens</option>
          <option value={10}>10 itens</option>
          <option value={15}>15 itens</option>
          <option value={20}> 20 itens</option>
        </select>

        
        {currentItems.map((item) => {
          return (
            <div className="item">
              <span>{item.id} - </span>
              <span>{item.title}</span>
            </div>
          );
        })}
        <div>{endIndex} de {items.length} itens</div>
      </div>
    </div>
  );
}

export default App;
