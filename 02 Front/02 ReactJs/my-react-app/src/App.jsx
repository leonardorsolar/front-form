// src/App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [responseMessage, setResponseMessage] = useState('');

  // Função para lidar com mudanças no formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    // Envia os dados para a API
    fetch("http://localhost:3000/criar-usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || "Erro ao registrar usuário");
          });
        }
        return response.json();
      })
      .then((data) => {
        setResponseMessage(`Usuário registrado com sucesso! Bem-vindo, ${data.name}.`);
      })
      .catch((error) => {
        setResponseMessage("Erro ao registrar usuário - front.");
        console.error("Erro:", error);
      });
  };

  return (
    <div className="container">
      <h1>Registrar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar</button>
      </form>
      <div className="responseMessage">{responseMessage}</div>
    </div>
  );
}

export default App;
