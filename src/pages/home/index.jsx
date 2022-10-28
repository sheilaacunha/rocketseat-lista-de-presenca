import React, { useState, useEffect } from "react";
import './style.css'
import { Card } from "../../components/card";

export function Home() {

  const [studentName, setstudentName] = useState('');
  const [students, setstudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });


  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
    setstudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/sheilaacunha')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      })
  }, []);


  return (
    <div className='container'>

      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto perfil git" />
        </div>

      </header>


      <input type="text" placeholder="Digite um nome..." onChange={e => setstudentName(e.target.value)} />

      <button onClick={handleAddStudent} type="button">Adicionar</button>

      {
        students.map(student => (
          <Card
            key={student.time} // aqui se usa o id, por enquanto vai ficar o time ate ser criado o id 
            // tem que ver como se limpa o inpt tbm depois
            name={student.name}
            time={student.time}
          />
        ))
      }



    </div>

  )
}

export default Home;

//aula imutabilidade rocketseat
// useStates é um hooks = saõ funcoes que permitem voce ligar conectar os recursos de estados e recursos de vida do react apartir de componentes totalmente funcionais. ele sempre comeca com o 'use' e o nome do hook